@echo off
title EasyTool Secure Server
echo ========================================================
echo   EasyTool - Secure Server & API Proxy Launcher
echo ========================================================
echo.
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js detected. Starting Node server...
    node "%~dp0server.js"
) else (
    echo [OK] Launching PowerShell secure server...
    powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
)
pause
