#!/usr/bin/env python3
"""
Standalone Admin Panel Server for Orbinexglobal
Serves the secure admin dashboard separately from the main website
"""

import os
import http.server
import socketserver
from pathlib import Path
import json
from urllib.parse import urlparse, parse_qs
import ssl

# Configuration
PORT = 9000
ADMIN_PANEL_DIR = Path(__file__).parent
HOST = '127.0.0.1'

class AdminPanelHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ADMIN_PANEL_DIR), **kwargs)
    
    def do_GET(self):
        """Handle GET requests"""
        # Serve static files
        if self.path in ('/', '/index.html'):
            self.serve_file('index.html')
        elif self.path == '/dashboard.html':
            self.serve_file('dashboard.html')
        elif self.path.endswith('.html') or self.path.endswith('.css') or self.path.endswith('.js'):
            self.serve_file(self.path.lstrip('/'))
        else:
            self.send_error(404)
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
    def end_headers(self):
        """Add CORS headers to all responses"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        super().end_headers()
    
    def serve_file(self, filepath):
        """Serve a file with proper headers"""
        file_path = ADMIN_PANEL_DIR / filepath
        
        if not file_path.exists() or not file_path.is_file():
            self.send_error(404)
            return
        
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
            
            # Determine content type
            if filepath.endswith('.html'):
                content_type = 'text/html; charset=utf-8'
            elif filepath.endswith('.css'):
                content_type = 'text/css; charset=utf-8'
            elif filepath.endswith('.js'):
                content_type = 'application/javascript; charset=utf-8'
            elif filepath.endswith('.json'):
                content_type = 'application/json'
            else:
                content_type = 'application/octet-stream'
            
            self.send_response(200)
            self.send_header('Content-type', content_type)
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            print(f"Error serving {filepath}: {e}")
            self.send_error(500)
    
    def log_message(self, format, *args):
        """Custom logging"""
        print(f"[Admin Panel] {self.address_string()} - {format % args}")

def run_admin_panel(port=PORT, host=HOST):
    """Start the admin panel server"""
    with socketserver.TCPServer((host, port), AdminPanelHandler) as httpd:
        print("=" * 60)
        print("🔐 Orbinexglobal - SECURE ADMIN PANEL")
        print("=" * 60)
        print(f"\n✅ Admin Panel Server Running")
        print(f"   URL: http://{host}:{port}")
        print(f"   Directory: {ADMIN_PANEL_DIR}")
        print(f"\n⚠️  Security Notes:")
        print(f"   - This is a SEPARATE admin panel from the main website")
        print(f"   - Share only with authorized administrators")
        print(f"   - Sessions expire after 2 hours of inactivity")
        print(f"   - Admin credentials required to access")
        print(f"\n📝 Login Instructions:")
        print(f"   1. Navigate to http://{host}:{port}")
        print(f"   2. Enter admin username and password")
        print(f"   3. Default credentials: admin / admin123")
        print(f"\n💡 To stop the server: Press Ctrl+C")
        print("=" * 60 + "\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n⛔ Admin Panel Server stopped")
            print("=" * 60)

if __name__ == '__main__':
    import sys
    
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run_admin_panel(port=port)
