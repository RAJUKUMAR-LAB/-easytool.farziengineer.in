# ==========================================================
# EasyTool - Secure PowerShell Local HTTP Server & API Proxy
# ==========================================================
$port = 8080
$url = "http://localhost:$port/"
$prefix = $url

# 1. Parse .env file if it exists
$baseDir = if ($PSScriptRoot) { $PSScriptRoot } elseif ($MyInvocation.MyCommand.Path) { Split-Path -Parent $MyInvocation.MyCommand.Path } else { (Get-Location).Path }
$envFile = Join-Path $baseDir ".env"
$geminiApiKey = ""
$removeBgApiKey = ""

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $parts = $line.Split("=", 2)
            if ($parts.Length -eq 2) {
                $k = $parts[0].Trim()
                $v = $parts[1].Trim().Trim('"').Trim("'")
                if ($k -eq "GEMINI_API_KEY") { $geminiApiKey = $v }
                if ($k -eq "REMOVE_BG_API_KEY") { $removeBgApiKey = $v }
                if ($k -eq "PORT" -and [int]::TryParse($v, [ref]$port)) {
                    $url = "http://localhost:$port/"
                    $prefix = $url
                }
            }
        }
    }
}

if (-not $geminiApiKey -and $env:GEMINI_API_KEY) { $geminiApiKey = $env:GEMINI_API_KEY }
if (-not $removeBgApiKey -and $env:REMOVE_BG_API_KEY) { $removeBgApiKey = $env:REMOVE_BG_API_KEY }

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".ico"  = "image/x-icon"
    ".wasm" = "application/wasm"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

function Send-Json([System.Net.HttpListenerResponse]$res, [int]$status, [string]$jsonStr) {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonStr)
    $res.StatusCode = $status
    $res.ContentType = "application/json"
    $res.Headers.Add("Access-Control-Allow-Origin", "*")
    $res.Headers.Add("Access-Control-Allow-Headers", "Content-Type, x-custom-key")
    $res.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
    $res.Close()
}

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  EasyTool Secure Server & API Proxy is running!" -ForegroundColor Green
    Write-Host "  URL: $url" -ForegroundColor Yellow
    $geminiStatus = if ([string]::IsNullOrEmpty($geminiApiKey)) { "NOT CONFIGURED" } else { "PROTECTED (Ready)" }
    $geminiColor = if ([string]::IsNullOrEmpty($geminiApiKey)) { "Red" } else { "Green" }
    $removeBgStatus = if ([string]::IsNullOrEmpty($removeBgApiKey)) { "NOT CONFIGURED" } else { "PROTECTED (Ready)" }
    $removeBgColor = if ([string]::IsNullOrEmpty($removeBgApiKey)) { "Red" } else { "Green" }

    Write-Host "  Gemini API Proxy:    $geminiStatus" -ForegroundColor $geminiColor
    Write-Host "  remove.bg API Proxy: $removeBgStatus" -ForegroundColor $removeBgColor
    Write-Host "  All API Keys are hidden securely on the backend!" -ForegroundColor Cyan
    Write-Host "  Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Cyan

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $localPath = $request.Url.LocalPath

            # Handle CORS preflight
            if ($request.HttpMethod -eq "OPTIONS") {
                $response.StatusCode = 204
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, x-custom-key")
                $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                $response.Close()
                continue
            }

            # ROUTE: /api/status
            if ($localPath -eq "/api/status" -or $localPath -eq "/api/health") {
                $statusJson = @{
                    status = "online"
                    geminiConfigured = (-not [string]::IsNullOrEmpty($geminiApiKey))
                    removeBgConfigured = (-not [string]::IsNullOrEmpty($removeBgApiKey))
                    mode = "powershell_backend_proxy"
                } | ConvertTo-Json
                Send-Json $response 200 $statusJson
                continue
            }

            # ROUTE: /api/gemini
            if ($localPath -eq "/api/gemini" -and $request.HttpMethod -eq "POST") {
                $customKey = $request.Headers["x-custom-key"]
                $activeKey = if ($customKey) { $customKey } else { $geminiApiKey }

                if (-not $activeKey) {
                    Send-Json $response 500 '{"error":"GEMINI_API_KEY is not configured on the backend server."}'
                    continue
                }

                $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
                $bodyText = $reader.ReadToEnd()
                $reader.Close()

                try {
                    $jsonReq = $bodyText | ConvertFrom-Json
                    $prompt = $jsonReq.prompt
                    if (-not $prompt) { $prompt = $jsonReq.userPrompt }
                    $systemPrompt = $jsonReq.systemPrompt
                    $fullPrompt = if ($systemPrompt) { "$systemPrompt`n`nUser Input / Request:`n$prompt" } else { $prompt }

                    $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$activeKey"
                    $geminiBody = @{
                        contents = @(
                            @{ parts = @( @{ text = $fullPrompt } ) }
                        )
                        generationConfig = @{
                            temperature = 0.7
                            maxOutputTokens = 2500
                        }
                    } | ConvertTo-Json -Depth 5

                    $res = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $geminiBody -ContentType "application/json"
                    $outText = $res.candidates[0].content.parts[0].text
                    
                    $outJson = @{ text = $outText; model = "gemini-2.5-flash" } | ConvertTo-Json
                    Send-Json $response 200 $outJson
                } catch {
                    $err = $_.Exception.Message
                    Send-Json $response 502 (@{ error = "Gemini API Proxy Error: $err" } | ConvertTo-Json)
                }
                continue
            }

            # ROUTE: /api/remove-bg
            if ($localPath -eq "/api/remove-bg" -and $request.HttpMethod -eq "POST") {
                $customKey = $request.Headers["x-custom-key"]
                $activeKey = if ($customKey) { $customKey } else { $removeBgApiKey }

                if (-not $activeKey) {
                    Send-Json $response 500 '{"error":"REMOVE_BG_API_KEY is not configured on the backend server."}'
                    continue
                }

                try {
                    # Proxy request to remove.bg
                    $webReq = [System.Net.HttpWebRequest]::Create("https://api.remove.bg/v1.0/removebg")
                    $webReq.Method = "POST"
                    $webReq.Headers.Add("X-Api-Key", $activeKey)
                    $webReq.ContentType = $request.ContentType
                    $webReq.ContentLength = $request.ContentLength64

                    $reqStream = $webReq.GetRequestStream()
                    $request.InputStream.CopyTo($reqStream)
                    $reqStream.Close()

                    $apiResp = $webReq.GetResponse()
                    $response.StatusCode = 200
                    $response.ContentType = "image/png"
                    $response.Headers.Add("Access-Control-Allow-Origin", "*")

                    $apiStream = $apiResp.GetResponseStream()
                    $apiStream.CopyTo($response.OutputStream)
                    $apiStream.Close()
                    $apiResp.Close()
                    $response.Close()
                } catch {
                    $err = $_.Exception.Message
                    Send-Json $response 502 (@{ error = "remove.bg Proxy Error: $err" } | ConvertTo-Json)
                }
                continue
            }

            # STATIC FILE ROUTING
            if ($localPath -eq "/" -or $localPath -eq "") {
                $localPath = "/index.html"
            }

            $filePath = Join-Path $baseDir ($localPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar))

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }

                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 200
                $response.Headers.Add("Access-Control-Allow-Origin", "*")

                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
                $response.ContentType = "text/plain"
                $response.ContentLength64 = $errBytes.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                }
            }
            $response.Close()
        } catch {
            # Ignore per-request transient errors
        }
    }
} catch {
    Write-Host "Server stopped: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) { $listener.Stop() }
    $listener.Close()
}
