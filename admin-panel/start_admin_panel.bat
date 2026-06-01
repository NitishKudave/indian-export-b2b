@echo off
REM Rakshit Export - Secure Admin Panel Launcher
REM Windows Batch Script to start the admin panel

echo.
echo ============================================================
echo   RAKSHIT EXPORT - SECURE ADMIN PANEL
echo ============================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.7+ and add it to your PATH
    pause
    exit /b 1
)

echo [INFO] Starting Admin Panel Server...
echo [INFO] Admin Panel will be available at: http://127.0.0.1:9000
echo.
echo [SECURITY NOTES]:
echo - This admin panel is SEPARATE from the main website
echo - Keep this URL private and share only with administrators
echo - Default credentials: admin / admin123 (change immediately)
echo - Sessions expire after 2 hours of inactivity
echo.
echo Press Ctrl+C to stop the server
echo ============================================================
echo.

cd /d "%~dp0"

REM Start the admin panel server
python run_admin_panel.py

pause
