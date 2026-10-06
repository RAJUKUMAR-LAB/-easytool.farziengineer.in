/* ==========================================================================
   OmniToolbox - Code & Developer Studio Tools
   Python Runner (Pyodide), Code Formatter/Minifier, Live Web Playground,
   JSON Studio, Regex Laboratory
   ========================================================================== */

const CodeTools = {
  pyodideInstance: null,
  isPyodideLoading: false,

  // 1. In-Browser Python Runner
  renderPythonRunner(container) {
    container.innerHTML = `
      <div class="split-pane">
        <!-- Editor Column -->
        <div class="pane-card">
          <div class="pane-header">
            <span style="display:flex; align-items:center; gap:0.5rem;">
              <i class="fa-brands fa-python" style="color:#38bdf8;"></i> Python 3 Script Editor
            </span>
            <div style="display:flex; gap:0.5rem;">
              <select id="py-template-select" class="form-control" style="padding:0.25rem 0.5rem; font-size:0.8rem; width:auto;">
                <option value="hello">Sample: Hello & Math</option>
                <option value="primes">Sample: Primes & Fib</option>
                <option value="stats">Sample: Statistics</option>
                <option value="json">Sample: Data & JSON</option>
              </select>
            </div>
          </div>

          <div style="position:relative; flex:1; display:flex; flex-direction:column;">
            <textarea id="python-code-input" class="form-control" style="flex:1; min-height:300px; font-family:var(--font-mono); font-size:0.9rem; line-height:1.55; tab-size:4; background:#070a13;" spellcheck="false"></textarea>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; margin-top:0.85rem;">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <button class="btn btn-primary" id="btn-run-python">
                <i class="fa-solid fa-play"></i> Run Script
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-clear-py-code">Clear</button>
            </div>
            <div id="py-status-pill" class="badge" style="background:rgba(99,102,241,0.15); color:#a5b4fc; padding:0.4rem 0.75rem; border-radius:var(--radius-full); font-size:0.75rem;">
              <i class="fa-solid fa-circle-dot" style="font-size:0.6rem; margin-right:4px;"></i> Python Runtime Idle
            </div>
          </div>
        </div>

        <!-- Terminal Output Column -->
        <div class="pane-card">
          <div class="pane-header">
            <span style="display:flex; align-items:center; gap:0.5rem;">
              <i class="fa-solid fa-terminal"></i> Terminal Output
            </span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" id="btn-copy-py-out">
                <i class="fa-solid fa-copy"></i> Copy
              </button>
              <button class="btn btn-sm btn-secondary" id="btn-clear-py-out">
                <i class="fa-solid fa-eraser"></i> Clear
              </button>
            </div>
          </div>

          <div class="terminal-window" style="flex:1;">
            <div class="terminal-header">
              <div class="terminal-dots">
                <div class="terminal-dot red"></div>
                <div class="terminal-dot yellow"></div>
                <div class="terminal-dot green"></div>
              </div>
              <div class="terminal-title">python-wasm stdout</div>
            </div>
            <div class="terminal-body" id="python-terminal-out"># Click "Run Script" to execute Python right in your browser!
# Uses genuine CPython compiled to WebAssembly (Pyodide).
# Zero server calls - completely private execution.</div>
          </div>
        </div>
      </div>
    `;

    this.initPythonLogic();
  },

  initPythonLogic() {
    const editor = document.getElementById('python-code-input');
    const terminal = document.getElementById('python-terminal-out');
    const runBtn = document.getElementById('btn-run-python');
    const statusPill = document.getElementById('py-status-pill');
    const templateSelect = document.getElementById('py-template-select');
    const copyBtn = document.getElementById('btn-copy-py-out');
    const clearOutBtn = document.getElementById('btn-clear-py-out');
    const clearCodeBtn = document.getElementById('btn-clear-py-code');

    const templates = {
      hello: `# Python 3 In-Browser Demo
import math
import sys

print("Hello from Python 3 WebAssembly in your browser!")
print(f"Python Version: {sys.version.split()[0]}")

radius = 5.5
area = math.pi * (radius ** 2)
print(f"Area of circle (r={radius}) = {area:.4f}")

# List comprehension example
squares = [x**2 for x in range(1, 11)]
print(f"Squares 1..10: {squares}")
`,
      primes: `# Prime Numbers & Fibonacci Sequence
def get_primes(limit):
    primes = []
    for num in range(2, limit + 1):
        if all(num % i != 0 for i in range(2, int(num**0.5) + 1)):
            primes.append(num)
    return primes

def fibonacci(n):
    a, b = 0, 1
    fib = []
    for _ in range(n):
        fib.append(a)
        a, b = b, a + b
    return fib

print("First 15 Fibonacci numbers:")
print(fibonacci(15))

print("\\nPrime numbers up to 50:")
print(get_primes(50))
`,
      stats: `# Statistical Analysis Demo
import statistics

data = [12, 15, 12, 19, 24, 18, 22, 15, 29, 31, 24, 26]
print("Dataset:", data)
print("-" * 35)
print(f"Count:  {len(data)}")
print(f"Mean:   {statistics.mean(data):.2f}")
print(f"Median: {statistics.median(data):.2f}")
print(f"Mode:   {statistics.mode(data)}")
print(f"StdDev: {statistics.stdev(data):.2f}")
`,
      json: `# JSON Data Manipulation
import json

payload = {
    "project": "OmniToolbox",
    "features": ["Image Converter", "PDF Studio", "Python WASM", "Code Formatter"],
    "privacy": "100% Client-Side",
    "metrics": {"speed": "instant", "offline": True}
}

formatted_json = json.dumps(payload, indent=2)
print("Serialized JSON Output:")
print(formatted_json)
`
    };

    editor.value = templates.hello;

    templateSelect.addEventListener('change', () => {
      editor.value = templates[templateSelect.value] || '';
    });

    clearCodeBtn.addEventListener('click', () => {
      editor.value = '';
    });

    clearOutBtn.addEventListener('click', () => {
      terminal.textContent = '';
    });

    copyBtn.addEventListener('click', () => {
      App.copyToClipboard(terminal.textContent, 'Terminal output copied!');
    });

    // Indent tab support in textarea
    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
      }
    });

    runBtn.addEventListener('click', async () => {
      const code = editor.value.trim();
      if (!code) {
        App.showToast('Please enter some Python code to run', 'error');
        return;
      }

      runBtn.disabled = true;
      statusPill.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running...';
      statusPill.style.color = '#38bdf8';

      // Load Pyodide if not yet initialized
      if (!CodeTools.pyodideInstance) {
        terminal.textContent = '>>> Initializing WebAssembly Python Engine (Pyodide)...\n';
        try {
          if (typeof loadPyodide === 'undefined') {
            throw new Error('Pyodide script not loaded. Check internet connection for CDN.');
          }
          CodeTools.pyodideInstance = await loadPyodide();
          terminal.textContent += '>>> Python 3.12 Engine Ready.\n\n';
        } catch (err) {
          terminal.innerHTML = `<span class="term-err">>>> Failed to load Pyodide: ${err.message}</span>`;
          statusPill.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Load Error';
          statusPill.style.color = '#f87171';
          runBtn.disabled = false;
          return;
        }
      }

      const startTime = performance.now();
      terminal.textContent = '>>> Running Python Script...\n';

      try {
        // Redirect Python stdout and stderr to JS callback
        CodeTools.pyodideInstance.setStdout({
          batched: (str) => {
            terminal.textContent += str + '\n';
            terminal.scrollTop = terminal.scrollHeight;
          }
        });
        CodeTools.pyodideInstance.setStderr({
          batched: (str) => {
            const span = document.createElement('span');
            span.className = 'term-err';
            span.textContent = str + '\n';
            terminal.appendChild(span);
            terminal.scrollTop = terminal.scrollHeight;
          }
        });

        await CodeTools.pyodideInstance.runPythonAsync(code);

        const duration = Math.round(performance.now() - startTime);
        statusPill.innerHTML = `<i class="fa-solid fa-check"></i> Done (${duration}ms)`;
        statusPill.style.color = '#4ade80';
      } catch (err) {
        const errSpan = document.createElement('span');
        errSpan.className = 'term-err';
        errSpan.textContent = `\n[Traceback Error]:\n${err.message}\n`;
        terminal.appendChild(errSpan);
        statusPill.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error';
        statusPill.style.color = '#f87171';
      } finally {
        runBtn.disabled = false;
      }
    });
  },

  // 2. Code Formatter & Minifier (HTML, CSS, JS)
  renderFormatter(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span>Input Code</span>
            <div style="display:flex; gap:0.5rem;">
              <select id="code-lang-select" class="form-control" style="padding:0.25rem 0.5rem; font-size:0.8rem; width:auto;">
                <option value="html">HTML5</option>
                <option value="css">CSS3</option>
                <option value="js" selected>JavaScript (ES6+)</option>
              </select>
              <select id="code-indent-select" class="form-control" style="padding:0.25rem 0.5rem; font-size:0.8rem; width:auto;">
                <option value="2">2 Spaces</option>
                <option value="4" selected>4 Spaces</option>
              </select>
            </div>
          </div>

          <textarea id="code-raw-input" class="form-control" style="flex:1; min-height:300px; font-family:var(--font-mono); font-size:0.88rem; background:#070a13;" placeholder="Paste messy or unformatted code here..."></textarea>

          <div style="display:flex; gap:0.75rem; margin-top:0.85rem;">
            <button class="btn btn-primary" id="btn-beautify-code">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Beautify / Format
            </button>
            <button class="btn btn-secondary" id="btn-minify-code">
              <i class="fa-solid fa-compress"></i> Minify
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-sample-code">Sample</button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Formatted / Minified Result</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-emerald" id="btn-copy-code-out">
                <i class="fa-solid fa-copy"></i> Copy
              </button>
              <button class="btn btn-sm btn-secondary" id="btn-download-code-out">
                <i class="fa-solid fa-download"></i> Save
              </button>
            </div>
          </div>

          <textarea id="code-formatted-out" class="form-control" style="flex:1; min-height:300px; font-family:var(--font-mono); font-size:0.88rem; background:#070a13;" readonly placeholder="Formatted output will appear here..."></textarea>

          <div class="image-meta-strip" style="margin-top:0.85rem;">
            <div class="meta-chip">Input: <strong id="code-in-bytes">0 B</strong></div>
            <div class="meta-chip">Output: <strong id="code-out-bytes">0 B</strong></div>
            <div class="meta-chip">Ratio: <strong id="code-diff-ratio">0%</strong></div>
          </div>
        </div>
      </div>
    `;

    this.initFormatterLogic();
  },

  initFormatterLogic() {
    const rawInput = document.getElementById('code-raw-input');
    const formatOut = document.getElementById('code-formatted-out');
    const langSelect = document.getElementById('code-lang-select');
    const indentSelect = document.getElementById('code-indent-select');
    const beautifyBtn = document.getElementById('btn-beautify-code');
    const minifyBtn = document.getElementById('btn-minify-code');
    const sampleBtn = document.getElementById('btn-sample-code');
    const copyBtn = document.getElementById('btn-copy-code-out');
    const saveBtn = document.getElementById('btn-download-code-out');

    const inBytes = document.getElementById('code-in-bytes');
    const outBytes = document.getElementById('code-out-bytes');
    const diffRatio = document.getElementById('code-diff-ratio');

    const samples = {
      js: `function calculateMetrics(items){let total=0;for(let i=0;i<items.length;i++){total+=items[i].price*items[i].qty;}const tax=total*0.18;const grandTotal=total+tax;return{subtotal:total,tax:tax,total:grandTotal};}`,
      html: `<div class="card"><div class="card-header"><h3>OmniToolbox</h3></div><div class="card-body"><p>Instant browser utilities</p><button class="btn">Learn More</button></div></div>`,
      css: `.container{display:flex;align-items:center;justify-content:center;background:#0d121d;border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.4);}`
    };

    rawInput.value = samples.js;

    sampleBtn.addEventListener('click', () => {
      rawInput.value = samples[langSelect.value] || '';
      updateStats();
    });

    langSelect.addEventListener('change', () => {
      rawInput.value = samples[langSelect.value] || '';
      updateStats();
    });

    function updateStats() {
      const inLen = new Blob([rawInput.value]).size;
      const outLen = new Blob([formatOut.value]).size;
      inBytes.textContent = App.formatBytes(inLen);
      outBytes.textContent = App.formatBytes(outLen);
      if (inLen > 0 && outLen > 0) {
        const ratio = Math.round((outLen / inLen) * 100);
        diffRatio.textContent = ratio + '%';
      }
    }

    beautifyBtn.addEventListener('click', () => {
      const code = rawInput.value;
      const lang = langSelect.value;
      const indent = parseInt(indentSelect.value) || 4;

      try {
        let result = '';
        if (typeof html_beautify !== 'undefined') {
          if (lang === 'html') {
            result = html_beautify(code, { indent_size: indent });
          } else if (lang === 'css') {
            result = css_beautify(code, { indent_size: indent });
          } else {
            result = js_beautify(code, { indent_size: indent });
          }
        } else {
          // Fallback simple formatter
          result = code;
        }
        formatOut.value = result;
        updateStats();
        App.showToast('Code beautified successfully!', 'success');
      } catch (err) {
        App.showToast('Format error: ' + err.message, 'error');
      }
    });

    minifyBtn.addEventListener('click', () => {
      const code = rawInput.value;
      const lang = langSelect.value;
      let minified = '';

      if (lang === 'html') {
        minified = code.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').trim();
      } else if (lang === 'css') {
        minified = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*([{:;,])\s*/g, '$1').replace(/\s+/g, ' ').trim();
      } else {
        // JS safe strip comments and whitespace
        minified = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').replace(/\s+/g, ' ').trim();
      }
      formatOut.value = minified;
      updateStats();
      App.showToast('Code minified!', 'success');
    });

    copyBtn.addEventListener('click', () => {
      App.copyToClipboard(formatOut.value, 'Formatted code copied!');
    });

    saveBtn.addEventListener('click', () => {
      const lang = langSelect.value;
      const blob = new Blob([formatOut.value], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `formatted_code.${lang}`;
      a.click();
    });
  },

  // 3. Live Web Code Playground
  renderPlayground(container) {
    container.innerHTML = `
      <div class="split-pane" style="grid-template-columns: 1.1fr 0.9fr;">
        <div class="pane-card">
          <div class="tabs-header" style="margin-bottom:0.75rem;">
            <button class="tab-btn active" data-code-tab="html"><i class="fa-brands fa-html5" style="color:#e34f26;"></i> HTML</button>
            <button class="tab-btn" data-code-tab="css"><i class="fa-brands fa-css3-alt" style="color:#264de4;"></i> CSS</button>
            <button class="tab-btn" data-code-tab="js"><i class="fa-brands fa-square-js" style="color:#f7df1e;"></i> JS</button>
            <div style="margin-left:auto; display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-primary" id="btn-run-playground">
                <i class="fa-solid fa-play"></i> Run Preview
              </button>
            </div>
          </div>

          <div style="flex:1; display:flex; flex-direction:column;">
            <textarea id="pg-html" class="form-control" style="flex:1; min-height:340px; font-family:var(--font-mono); font-size:0.85rem; background:#070a13;"></textarea>
            <textarea id="pg-css" class="form-control" style="flex:1; min-height:340px; font-family:var(--font-mono); font-size:0.85rem; background:#070a13; display:none;"></textarea>
            <textarea id="pg-js" class="form-control" style="flex:1; min-height:340px; font-family:var(--font-mono); font-size:0.85rem; background:#070a13; display:none;"></textarea>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-desktop"></i> Live Sandbox View</span>
            <button class="btn btn-sm btn-secondary" id="btn-refresh-preview">
              <i class="fa-solid fa-rotate-right"></i>
            </button>
          </div>
          <iframe id="playground-iframe" class="sandbox-frame" sandbox="allow-scripts allow-modals"></iframe>
        </div>
      </div>
    `;

    const htmlArea = document.getElementById('pg-html');
    const cssArea = document.getElementById('pg-css');
    const jsArea = document.getElementById('pg-js');
    const iframe = document.getElementById('playground-iframe');
    const runBtn = document.getElementById('btn-run-playground');
    const refreshBtn = document.getElementById('btn-refresh-preview');

    htmlArea.value = `<div class="card">
  <h2>⚡ Interactive Glow Counter</h2>
  <p>Live sandbox running client-side</p>
  <div class="counter-display" id="count-num">0</div>
  <div class="btn-group">
    <button id="btn-decrement">- Decrease</button>
    <button id="btn-increment">+ Increase</button>
  </div>
</div>`;

    cssArea.value = `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: system-ui, sans-serif;
  background: #090d16;
  color: #fff;
}
.card {
  background: #131b2e;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.counter-display {
  font-size: 3rem;
  font-weight: 800;
  color: #38bdf8;
  margin: 1.25rem 0;
  text-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
}
.btn-group {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}
button {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(99,102,241,0.3);
}
button:active {
  transform: scale(0.96);
}`;

    jsArea.value = `let count = 0;
const display = document.getElementById('count-num');
document.getElementById('btn-increment').addEventListener('click', () => {
  count++;
  display.textContent = count;
});
document.getElementById('btn-decrement').addEventListener('click', () => {
  count--;
  display.textContent = count;
});`;

    // Tabs
    const tabs = document.querySelectorAll('[data-code-tab]');
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        const lang = t.dataset.codeTab;
        htmlArea.style.display = lang === 'html' ? 'block' : 'none';
        cssArea.style.display = lang === 'css' ? 'block' : 'none';
        jsArea.style.display = lang === 'js' ? 'block' : 'none';
      });
    });

    function executePreview() {
      const srcDoc = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${cssArea.value}</style>
          </head>
          <body>
            ${htmlArea.value}
            <script>${jsArea.value}<\/script>
          </body>
        </html>
      `;
      iframe.srcdoc = srcDoc;
    }

    runBtn.addEventListener('click', executePreview);
    refreshBtn.addEventListener('click', executePreview);
    executePreview();
  },

  // 4. JSON Studio (Validator, Beautifier, Converter)
  renderJsonStudio(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span>JSON Input</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" id="btn-sample-json">Sample</button>
              <button class="btn btn-sm btn-secondary" id="btn-clear-json">Clear</button>
            </div>
          </div>

          <textarea id="json-input" class="form-control" style="flex:1; min-height:300px; font-family:var(--font-mono); font-size:0.85rem; background:#070a13;" placeholder="Paste JSON here..."></textarea>

          <div style="display:flex; flex-wrap:wrap; gap:0.6rem; margin-top:0.85rem;">
            <button class="btn btn-primary btn-sm" id="btn-beautify-json">
              <i class="fa-solid fa-align-left"></i> Beautify
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-minify-json">
              <i class="fa-solid fa-compress"></i> Minify
            </button>
            <button class="btn btn-cyan btn-sm" id="btn-json-to-csv">
              <i class="fa-solid fa-table"></i> To CSV
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span id="json-status-header">Output / Inspection</span>
            <button class="btn btn-sm btn-emerald" id="btn-copy-json">
              <i class="fa-solid fa-copy"></i> Copy
            </button>
          </div>

          <textarea id="json-output" class="form-control" style="flex:1; min-height:300px; font-family:var(--font-mono); font-size:0.85rem; background:#070a13;" readonly></textarea>

          <div id="json-validation-badge" style="margin-top:0.85rem; padding:0.5rem 0.85rem; border-radius:6px; font-size:0.82rem; background:rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
            <span>Status: <strong id="json-valid-text" style="color:var(--text-muted);">Ready</strong></span>
            <span id="json-keys-count">0 keys</span>
          </div>
        </div>
      </div>
    `;

    this.initJsonLogic();
  },

  initJsonLogic() {
    const input = document.getElementById('json-input');
    const output = document.getElementById('json-output');
    const validText = document.getElementById('json-valid-text');
    const keysCount = document.getElementById('json-keys-count');

    const sampleObj = {
      name: "OmniToolbox",
      version: "2.5.0",
      description: "Ultimate browser-based utilities suite",
      features: ["Image Converter", "PDF Merger", "Python Runner", "QR Scanner"],
      author: {
        role: "Lead Architect",
        license: "MIT"
      },
      active: true,
      stats: {
        users: 12500,
        stars: 340
      }
    };

    input.value = JSON.stringify(sampleObj, null, 2);

    document.getElementById('btn-sample-json').addEventListener('click', () => {
      input.value = JSON.stringify(sampleObj, null, 2);
      validateJson();
    });

    document.getElementById('btn-clear-json').addEventListener('click', () => {
      input.value = '';
      output.value = '';
      validText.textContent = 'Ready';
      validText.style.color = 'var(--text-muted)';
      keysCount.textContent = '0 keys';
    });

    function validateJson() {
      const str = input.value.trim();
      if (!str) return null;
      try {
        const parsed = JSON.parse(str);
        validText.textContent = 'Valid JSON ✓';
        validText.style.color = 'var(--accent-emerald)';
        const count = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 1;
        keysCount.textContent = `${count} root keys`;
        return parsed;
      } catch (err) {
        validText.textContent = `Invalid JSON: ${err.message}`;
        validText.style.color = 'var(--accent-rose)';
        keysCount.textContent = 'Error';
        return null;
      }
    }

    document.getElementById('btn-beautify-json').addEventListener('click', () => {
      const parsed = validateJson();
      if (parsed !== null) {
        output.value = JSON.stringify(parsed, null, 2);
        App.showToast('JSON Beautified!', 'success');
      } else {
        App.showToast('Invalid JSON syntax', 'error');
      }
    });

    document.getElementById('btn-minify-json').addEventListener('click', () => {
      const parsed = validateJson();
      if (parsed !== null) {
        output.value = JSON.stringify(parsed);
        App.showToast('JSON Minified!', 'success');
      } else {
        App.showToast('Invalid JSON syntax', 'error');
      }
    });

    document.getElementById('btn-json-to-csv').addEventListener('click', () => {
      const parsed = validateJson();
      if (!parsed) {
        App.showToast('Please provide valid JSON array or object', 'error');
        return;
      }

      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (!arr.length || typeof arr[0] !== 'object') {
        App.showToast('JSON to CSV requires an array of objects', 'error');
        return;
      }

      const headers = Object.keys(arr[0]);
      let csv = headers.join(',') + '\n';
      arr.forEach(row => {
        csv += headers.map(h => {
          let val = row[h] !== undefined ? row[h] : '';
          if (typeof val === 'object') val = JSON.stringify(val);
          return `"${String(val).replace(/"/g, '""')}"`;
        }).join(',') + '\n';
      });

      output.value = csv;
      App.showToast('Converted JSON to CSV!', 'success');
    });

    document.getElementById('btn-copy-json').addEventListener('click', () => {
      App.copyToClipboard(output.value, 'JSON copied to clipboard!');
    });

    validateJson();
  },

  // 5. Regex Laboratory
  renderRegex(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span>Regex Pattern & Presets</span>
            <select id="regex-presets-select" class="form-control" style="width:auto; padding:0.25rem 0.5rem; font-size:0.8rem;">
              <option value="">Quick Presets...</option>
              <option value="email">Email Address</option>
              <option value="url">URL / Hyperlink</option>
              <option value="ipv4">IPv4 Address</option>
              <option value="hex">Hex Color (#ffffff)</option>
              <option value="date">Date (YYYY-MM-DD)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Expression / Pattern</label>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="font-family:var(--font-mono); font-size:1.1rem; color:var(--primary);">/</span>
              <input type="text" id="regex-pattern" class="form-control" style="font-family:var(--font-mono);" value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}">
              <span style="font-family:var(--font-mono); font-size:1.1rem; color:var(--primary);">/</span>
              <input type="text" id="regex-flags" class="form-control" style="width:70px; font-family:var(--font-mono);" value="g">
            </div>
          </div>

          <div class="form-group" style="flex:1; display:flex; flex-direction:column;">
            <label class="form-label">Test String</label>
            <textarea id="regex-test-text" class="form-control" style="flex:1; min-height:180px; font-family:var(--font-mono);" placeholder="Type sample text to test matches..."></textarea>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Match Results (<span id="regex-match-count">0</span> matches)</span>
          </div>

          <div class="form-group">
            <label class="form-label">Highlighted Matches</label>
            <div id="regex-highlight-view" class="regex-matches-box"></div>
          </div>

          <div class="form-group" style="margin-top:1rem;">
            <label class="form-label">Matches List</label>
            <div id="regex-match-list" style="max-height:160px; overflow-y:auto; display:flex; flex-direction:column; gap:0.4rem;"></div>
          </div>
        </div>
      </div>
    `;

    this.initRegexLogic();
  },

  initRegexLogic() {
    const patternInput = document.getElementById('regex-pattern');
    const flagsInput = document.getElementById('regex-flags');
    const testText = document.getElementById('regex-test-text');
    const highlightView = document.getElementById('regex-highlight-view');
    const matchList = document.getElementById('regex-match-list');
    const countSpan = document.getElementById('regex-match-count');
    const presetSelect = document.getElementById('regex-presets-select');

    const presets = {
      email: {
        regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        flags: 'g',
        text: 'Contact our support team at support@omnitoolbox.dev or founder.alex@startup.io for any questions.'
      },
      url: {
        regex: 'https?:\\/\\/[\\w\\-\\.]+(\\:[0-9]+)?(/[\\w\\-\\.\\/?%&=]*)?',
        flags: 'g',
        text: 'Check docs at https://developer.mozilla.org or visit our app at http://localhost:8080/tools'
      },
      ipv4: {
        regex: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b',
        flags: 'g',
        text: 'Server IP: 192.168.1.1, Gateway: 10.0.0.254 and DNS: 8.8.8.8'
      },
      hex: {
        regex: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b',
        flags: 'g',
        text: 'Selected palette: #6366f1 primary, #06b6d4 cyan, and #fff white'
      },
      date: {
        regex: '\\b\\d{4}-\\d{2}-\\d{2}\\b',
        flags: 'g',
        text: 'Project milestones: start date 2026-05-15, beta release 2026-10-01, final 2026-12-31'
      }
    };

    testText.value = presets.email.text;

    presetSelect.addEventListener('change', () => {
      const p = presets[presetSelect.value];
      if (p) {
        patternInput.value = p.regex;
        flagsInput.value = p.flags;
        testText.value = p.text;
        evaluateRegex();
      }
    });

    function evaluateRegex() {
      const pattern = patternInput.value;
      const flags = flagsInput.value;
      const text = testText.value;

      matchList.innerHTML = '';
      if (!pattern || !text) {
        highlightView.textContent = text;
        countSpan.textContent = '0';
        return;
      }

      try {
        const re = new RegExp(pattern, flags);
        const matches = [...text.matchAll(re)];
        countSpan.textContent = matches.length;

        // Render highlights
        let html = '';
        let lastIdx = 0;

        matches.forEach((m, idx) => {
          const matchStart = m.index;
          const matchEnd = matchStart + m[0].length;

          html += escapeHtml(text.substring(lastIdx, matchStart));
          html += `<mark class="regex-highlight" title="Match #${idx + 1}">${escapeHtml(m[0])}</mark>`;
          lastIdx = matchEnd;

          // Render match list card
          const item = document.createElement('div');
          item.style.cssText = 'background:var(--bg-surface); padding:0.4rem 0.75rem; border-radius:6px; font-family:var(--font-mono); font-size:0.8rem; display:flex; justify-content:space-between; border:1px solid var(--border-subtle);';
          item.innerHTML = `<span><strong style="color:var(--accent-amber);">#${idx + 1}:</strong> "${escapeHtml(m[0])}"</span><span class="text-muted">pos: ${matchStart}</span>`;
          matchList.appendChild(item);
        });

        html += escapeHtml(text.substring(lastIdx));
        highlightView.innerHTML = html;
      } catch (err) {
        highlightView.innerHTML = `<span class="term-err">Regex Error: ${err.message}</span>`;
        countSpan.textContent = '0';
      }
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    patternInput.addEventListener('input', evaluateRegex);
    flagsInput.addEventListener('input', evaluateRegex);
    testText.addEventListener('input', evaluateRegex);
    evaluateRegex();
  },

  // 6. SQL Query Formatter & Beautifier
  renderSqlFormatter(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span>Messy / Unformatted SQL</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" id="btn-sample-sql">Sample Query</button>
              <button class="btn btn-sm btn-secondary" id="btn-clear-sql">Clear</button>
            </div>
          </div>

          <textarea id="sql-input-code" class="form-control" style="flex:1; min-height:300px; font-family:var(--font-mono); font-size:0.88rem; background:#070a13;" placeholder="Paste raw SQL query here..."></textarea>

          <div style="display:flex; gap:0.75rem; margin-top:0.85rem;">
            <button class="btn btn-primary" id="btn-format-sql">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Beautify SQL Query
            </button>
            <button class="btn btn-secondary" id="btn-minify-sql">
              <i class="fa-solid fa-compress"></i> Compact One-Line
            </button>
          </div>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span>Formatted SQL Output</span>
            <button class="btn btn-sm btn-emerald" id="btn-copy-sql">
              <i class="fa-solid fa-copy"></i> Copy Query
            </button>
          </div>

          <textarea id="sql-output-code" class="form-control" style="flex:1; min-height:300px; font-family:var(--font-mono); font-size:0.88rem; background:#070a13;" readonly placeholder="Formatted SQL will appear here..."></textarea>

          <div class="image-meta-strip" style="margin-top:0.85rem;">
            <div class="meta-chip">Keywords: <strong style="color:var(--accent-cyan);">Uppercase Auto-Align</strong></div>
            <div class="meta-chip">Lines: <strong id="sql-line-count">0</strong></div>
          </div>
        </div>
      </div>
    `;

    this.initSqlLogic();
  },

  initSqlLogic() {
    const input = document.getElementById('sql-input-code');
    const output = document.getElementById('sql-output-code');
    const linesEl = document.getElementById('sql-line-count');
    const sampleBtn = document.getElementById('btn-sample-sql');
    const clearBtn = document.getElementById('btn-clear-sql');
    const formatBtn = document.getElementById('btn-format-sql');
    const minifyBtn = document.getElementById('btn-minify-sql');
    const copyBtn = document.getElementById('btn-copy-sql');

    const sample = `select u.id, u.username, u.email, count(o.id) as total_orders, sum(o.amount) as total_revenue from users u left join orders o on u.id = o.user_id where u.status = 'active' and o.created_at >= '2026-01-01' group by u.id, u.username, u.email having sum(o.amount) > 500 order by total_revenue desc limit 50;`;
    input.value = sample;

    sampleBtn.addEventListener('click', () => {
      input.value = sample;
      formatSql();
    });
    clearBtn.addEventListener('click', () => {
      input.value = '';
      output.value = '';
      linesEl.textContent = '0';
    });

    function formatSql() {
      const sql = input.value.trim();
      if (!sql) return;

      const keywords = [
        'SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'JOIN',
        'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'UNION ALL', 'UNION',
        'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE',
        'DROP TABLE', 'ON', 'AS', 'AND', 'OR', 'IN', 'NOT IN', 'EXISTS', 'NOT EXISTS',
        'BETWEEN', 'LIKE', 'ILIKE', 'IS NULL', 'IS NOT NULL', 'DESC', 'ASC', 'CASE', 'WHEN',
        'THEN', 'ELSE', 'END', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'DISTINCT'
      ];

      // Standardize spacing
      let formatted = sql.replace(/\s+/g, ' ');

      // Normalize keywords to uppercase
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        formatted = formatted.replace(regex, kw);
      });

      // Insert newlines before major clauses
      const majorClauses = [
        'SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN',
        'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'
      ];

      majorClauses.forEach(clause => {
        const regex = new RegExp(`\\s+(${clause})\\b`, 'g');
        formatted = formatted.replace(regex, `\n$1`);
      });

      // Indent sub-clauses like AND, OR
      formatted = formatted.replace(/\s+(AND|OR)\b/g, '\n  $1');

      output.value = formatted;
      linesEl.textContent = formatted.split('\n').length;
      App.showToast('SQL Formatted!', 'success');
    }

    minifyBtn.addEventListener('click', () => {
      output.value = input.value.replace(/\s+/g, ' ').trim();
      linesEl.textContent = '1';
      App.showToast('SQL Compacted!', 'info');
    });

    formatBtn.addEventListener('click', formatSql);
    copyBtn.addEventListener('click', () => {
      App.copyToClipboard(output.value, 'SQL query copied!');
    });

    formatSql();
  },

  // 7. Markdown Live Editor & Preview
  renderMarkdownEditor(container) {
    container.innerHTML = `
      <div class="split-pane">
        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-brands fa-markdown"></i> Markdown Editor</span>
            <div style="display:flex; gap:0.4rem;">
              <button class="btn btn-sm btn-secondary" id="btn-md-sample">Sample</button>
            </div>
          </div>

          <div style="display:flex; gap:0.35rem; margin-bottom:0.6rem; flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary" data-md-action="bold" title="Bold"><b>B</b></button>
            <button class="btn btn-sm btn-secondary" data-md-action="italic" title="Italic"><i>I</i></button>
            <button class="btn btn-sm btn-secondary" data-md-action="h1" title="Heading 1">H1</button>
            <button class="btn btn-sm btn-secondary" data-md-action="h2" title="Heading 2">H2</button>
            <button class="btn btn-sm btn-secondary" data-md-action="quote" title="Quote">&ldquo;</button>
            <button class="btn btn-sm btn-secondary" data-md-action="code" title="Code">&lt;/&gt;</button>
            <button class="btn btn-sm btn-secondary" data-md-action="list" title="List">• List</button>
          </div>

          <textarea id="md-editor-input" class="form-control" style="flex:1; min-height:320px; font-family:var(--font-mono); font-size:0.88rem; background:#070a13; line-height:1.6;" placeholder="Type markdown here..."></textarea>
        </div>

        <div class="pane-card">
          <div class="pane-header">
            <span><i class="fa-solid fa-eye"></i> Rendered Document Preview</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-emerald" id="btn-copy-md-html">
                <i class="fa-solid fa-code"></i> Copy HTML
              </button>
              <button class="btn btn-sm btn-secondary" id="btn-download-md">
                <i class="fa-solid fa-download"></i> Save .md
              </button>
            </div>
          </div>

          <div id="md-preview-pane" style="flex:1; min-height:340px; background:#070a13; border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:1.25rem; overflow-y:auto; line-height:1.7;"></div>
        </div>
      </div>
    `;

    this.initMarkdownLogic();
  },

  initMarkdownLogic() {
    const input = document.getElementById('md-editor-input');
    const preview = document.getElementById('md-preview-pane');
    const copyHtmlBtn = document.getElementById('btn-copy-md-html');
    const downloadBtn = document.getElementById('btn-download-md');
    const sampleBtn = document.getElementById('btn-md-sample');

    const sampleMd = `# 🚀 OmniToolbox Architecture
Everyday utility toolkit running directly in your browser.

## Key Features
- **100% Client-Side Privacy**: Zero data sent to remote servers
- **Python 3 WASM**: Full execution of Python scripts via Pyodide
- **Universal Image Converter**: PNG, JPG, WEBP, BMP, and SVG support
- **PDF Manipulation**: Merge, split, and extract pages seamlessly

> "Simplicity is the soul of efficiency." — Austin Freeman

### Code Example
\`\`\`javascript
const tools = ['image', 'pdf', 'python', 'security'];
console.log('Active utilities:', tools.length);
\`\`\`

Ready for instant daily workflows!`;

    input.value = sampleMd;

    function parseMarkdown(md) {
      let html = md;
      // Escape script tags
      html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3 style="color:#a5b4fc; margin-top:1rem; margin-bottom:0.5rem;">$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2 style="color:#38bdf8; margin-top:1.25rem; margin-bottom:0.5rem;">$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1 style="color:#ffffff; margin-top:0.5rem; margin-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.4rem;">$1</h1>');

      // Blockquotes
      html = html.replace(/^\> (.*$)/gim, '<blockquote style="border-left:3px solid var(--primary); padding-left:1rem; color:var(--text-secondary); margin:1rem 0; font-style:italic;">$1</blockquote>');

      // Code blocks
      html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre style="background:#0c101c; padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); font-family:var(--font-mono); font-size:0.85rem; overflow-x:auto; margin:0.8rem 0;"><code>$2</code></pre>');

      // Inline code
      html = html.replace(/`([^`]+)`/gim, '<code style="background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px; font-family:var(--font-mono); color:#38bdf8;">$1</code>');

      // Bold & Italic
      html = html.replace(/\*\*([^*]+)\*\*/gim, '<strong style="color:#fff;">$1</strong>');
      html = html.replace(/\*([^*]+)\*/gim, '<em>$1</em>');

      // Unordered lists
      html = html.replace(/^\- (.*$)/gim, '<li style="margin-left:1.25rem; color:var(--text-secondary);">$1</li>');

      // Paragraphs & Line breaks
      html = html.replace(/\n\n/gim, '<p style="margin-bottom:0.85rem; color:var(--text-secondary);"></p>');

      return html;
    }

    function renderMd() {
      preview.innerHTML = parseMarkdown(input.value);
    }

    input.addEventListener('input', renderMd);

    sampleBtn.addEventListener('click', () => {
      input.value = sampleMd;
      renderMd();
    });

    document.querySelectorAll('[data-md-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.mdAction;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const sel = input.value.substring(start, end) || 'text';
        let rep = '';

        if (action === 'bold') rep = `**${sel}**`;
        else if (action === 'italic') rep = `*${sel}*`;
        else if (action === 'h1') rep = `\n# ${sel}\n`;
        else if (action === 'h2') rep = `\n## ${sel}\n`;
        else if (action === 'quote') rep = `\n> ${sel}\n`;
        else if (action === 'code') rep = `\n\`\`\`javascript\n${sel}\n\`\`\`\n`;
        else if (action === 'list') rep = `\n- ${sel}`;

        input.value = input.value.substring(0, start) + rep + input.value.substring(end);
        renderMd();
      });
    });

    copyHtmlBtn.addEventListener('click', () => {
      App.copyToClipboard(preview.innerHTML, 'Rendered HTML copied to clipboard!');
    });

    downloadBtn.addEventListener('click', () => {
      const blob = new Blob([input.value], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'document.md';
      a.click();
      App.showToast('Downloaded document.md!', 'success');
    });

    renderMd();
  }
};
