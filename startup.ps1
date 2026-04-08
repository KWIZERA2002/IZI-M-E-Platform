#!/usr/bin/env powershell

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  IZI M&E Platform - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCheck) {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/3] Installing dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "Backend\node_modules")) {
    Push-Location Backend
    npm install
    Pop-Location
}

Write-Host ""
Write-Host "[2/3] Starting Backend Server..." -ForegroundColor Yellow
Write-Host ""

# Start backend in new PowerShell process
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PWD\Backend'; npm start"

Write-Host ""
Write-Host "[3/3] Opening Frontend..." -ForegroundColor Yellow
Write-Host ""

# Wait for backend to start
Start-Sleep -Seconds 2

# Open HTML file with default browser
$htmlPath = Resolve-Path "Frontend\IZI-ME-Platform.html"
Start-Process $htmlPath

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Platform Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:   http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend:  $htmlPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop: Close the backend PowerShell window." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter when ready"
