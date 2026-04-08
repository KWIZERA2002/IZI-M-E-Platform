@echo off
REM IZI M&E Platform Startup Script

echo.
echo ========================================
echo   IZI M&E Platform - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Installing dependencies...
if not exist "Backend\node_modules" (
    cd Backend
    call npm install
    cd ..
)

echo.
echo [2/3] Starting Backend Server...
echo.
start cmd /k "cd Backend && npm start"

echo.
echo [3/3] Opening Frontend...
echo.

REM Try to open the HTML file with default browser
timeout /t 2 >nul
start Frontend\IZI-ME-Platform.html

echo.
echo ========================================
echo   Platform Started!
echo ========================================
echo.
echo Backend:   http://localhost:5000
echo Frontend:  Frontend/IZI-ME-Platform.html
echo.
echo To stop the backend, close the backend window.
echo.
pause
