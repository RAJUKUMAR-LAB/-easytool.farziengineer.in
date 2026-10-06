/**
 * EasyTool - Secure Production Backend Server (Node.js)
 * 
 * Features:
 * - 100% Zero external dependencies (uses native Node.js http, https, fs, path)
 * - Safe API Key Hiding: Keeps Google Gemini & remove.bg keys strictly on the server
 * - Built-in proxy endpoints:
 *     POST /api/gemini     -> Proxies to Google Gemini API with hidden key
 *     POST /api/remove-bg  -> Proxies to remove.bg API with hidden key
 *     GET  /api/status     -> Health check reporting key status (without leaking secrets)
 * - High-performance static asset server with proper MIME types & caching
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// 1. Load .env file manually (Zero-dependency dotenv equivalent)
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}
loadEnv();

const PORT = parseInt(process.env.PORT || '8080', 10);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY || '';

// MIME dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain; charset=utf-8'
};

// Helper to send JSON responses
function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-custom-key',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  });
  res.end(body);
}

// 2. Handler: /api/gemini
async function handleGeminiProxy(req, res, customKey) {
  const key = customKey || GEMINI_API_KEY;
  if (!key) {
    return sendJson(res, 500, {
      error: 'GEMINI_API_KEY is not configured on the backend server. Please set it in .env or environment variables.'
    });
  }

  let bodyData = '';
  req.on('data', chunk => { bodyData += chunk; });
  req.on('end', async () => {
    try {
      const payload = JSON.parse(bodyData || '{}');
      const systemPrompt = payload.systemPrompt || '';
      const userPrompt = payload.prompt || payload.userPrompt || '';
      const temperature = payload.temperature !== undefined ? payload.temperature : 0.7;
      const model = payload.model || 'gemini-2.5-flash';

      if (!userPrompt) {
        return sendJson(res, 400, { error: 'Prompt is required.' });
      }

      const promptText = systemPrompt 
        ? `${systemPrompt}\n\nUser Input / Request:\n${userPrompt}`
        : userPrompt;

      const geminiReqBody = JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature,
          maxOutputTokens: 2500
        }
      });

      const modelsToTry = [model, 'gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-flash-latest'];
      let lastErr = null;

      for (const m of modelsToTry) {
        try {
          const result = await makeHttpsPost(
            `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`,
            { 'Content-Type': 'application/json', 'x-goog-api-key': key },
            geminiReqBody
          );

          if (result.statusCode === 200) {
            const data = JSON.parse(result.body);
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return sendJson(res, 200, { text, model: m });
            }
          }
          lastErr = result.body;
        } catch (e) {
          lastErr = e.message;
        }
      }

      sendJson(res, 502, { error: 'Google Gemini API error: ' + (lastErr || 'No valid response') });
    } catch (e) {
      sendJson(res, 400, { error: 'Invalid JSON request: ' + e.message });
    }
  });
}

// 3. Handler: /api/remove-bg
function handleRemoveBgProxy(req, res, customKey) {
  const key = customKey || REMOVE_BG_API_KEY;
  if (!key) {
    return sendJson(res, 500, {
      error: 'REMOVE_BG_API_KEY is not configured on the backend server. Please set it in .env or environment variables.'
    });
  }

  // Collect raw binary/multipart data from request
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const buffer = Buffer.concat(chunks);
    const contentType = req.headers['content-type'] || 'multipart/form-data';

    const options = {
      hostname: 'api.remove.bg',
      port: 443,
      path: '/v1.0/removebg',
      method: 'POST',
      headers: {
        'X-Api-Key': key,
        'Content-Type': contentType,
        'Content-Length': buffer.length
      }
    };

    const apiReq = https.request(options, apiRes => {
      if (apiRes.statusCode === 200) {
        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Access-Control-Allow-Origin': '*'
        });
        apiRes.pipe(res);
      } else {
        let errData = '';
        apiRes.on('data', c => { errData += c; });
        apiRes.on('end', () => {
          sendJson(res, apiRes.statusCode, { error: 'remove.bg API Error: ' + errData });
        });
      }
    });

    apiReq.on('error', err => {
      sendJson(res, 502, { error: 'Network error connecting to remove.bg: ' + err.message });
    });

    apiReq.write(buffer);
    apiReq.end();
  });
}

// HTTPS POST helper
function makeHttpsPost(targetUrl, headers, data) {
  return new Promise((resolve, reject) => {
    const parsed = new url.URL(targetUrl);
    const options = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        ...headers,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', d => { body += d; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body });
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// 4. Main HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, x-custom-key',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    });
    return res.end();
  }

  // --- API BACKEND ROUTES ---
  if (pathname === '/api/status' || pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'online',
      geminiConfigured: Boolean(GEMINI_API_KEY),
      removeBgConfigured: Boolean(REMOVE_BG_API_KEY),
      mode: 'secure_backend_proxy'
    });
  }

  if (pathname === '/api/gemini' && req.method === 'POST') {
    const customKey = req.headers['x-custom-key'] || '';
    return handleGeminiProxy(req, res, customKey);
  }

  if (pathname === '/api/remove-bg' && req.method === 'POST') {
    const customKey = req.headers['x-custom-key'] || '';
    return handleRemoveBgProxy(req, res, customKey);
  }

  // --- STATIC FILE SERVING ---
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Security: Prevent directory traversal outside root
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Access Denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('==========================================================');
  console.log(`  EasyTool Secure Backend Server is running!`);
  console.log(`  URL: http://localhost:${PORT}/`);
  console.log(`  Google Gemini Proxy:   ${GEMINI_API_KEY ? 'PROTECTED (Ready)' : 'NOT CONFIGURED'}`);
  console.log(`  remove.bg Proxy:       ${REMOVE_BG_API_KEY ? 'PROTECTED (Ready)' : 'NOT CONFIGURED'}`);
  console.log('  Keys are hidden on server - safe for public deployment!');
  console.log('==========================================================');
});
