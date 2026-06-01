#!/bin/bash

# Rakshit Export - Secure Admin Panel Launcher
# macOS/Linux Shell Script

echo ""
echo "============================================================"
echo "  RAKSHIT EXPORT - SECURE ADMIN PANEL"
echo "============================================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python3 is not installed"
    echo "Please install Python 3.7+ using: brew install python3"
    exit 1
fi

echo "[INFO] Starting Admin Panel Server..."
echo "[INFO] Admin Panel will be available at: http://127.0.0.1:9000"
echo ""
echo "[SECURITY NOTES]:"
echo "- This admin panel is SEPARATE from the main website"
echo "- Keep this URL private and share only with administrators"
echo "- Default credentials: admin / admin123 (change immediately)"
echo "- Sessions expire after 2 hours of inactivity"
echo ""
echo "Press Ctrl+C to stop the server"
echo "============================================================"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the admin-panel directory
cd "$SCRIPT_DIR"

# Start the admin panel server
python3 run_admin_panel.py
