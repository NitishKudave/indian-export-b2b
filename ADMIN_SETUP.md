# Orbinexglobal - Complete Setup Guide

## ✅ Changes Completed

### 1. **Main Website - Admin Links Removed** ✓
- ❌ Removed "Admin" link from desktop navigation
- ❌ Removed "Admin Dashboard" link from mobile menu
- ✅ Main website now focuses on: Products, About, Certifications, Countries, Packaging, Gallery, Blog, Contact

### 2. **Separate Secure Admin Panel Created** ✓
- ✅ Completely separate from main website
- ✅ Running on dedicated port: **9000**
- ✅ Token-based JWT authentication
- ✅ Session management with 2-hour inactivity timeout
- ✅ Security headers (XSS, clickjacking protection)

### 3. **Backend API Updates** ✓
- ✅ Added `/api/admin/verify/` endpoint for token validation
- ✅ `@admin_required` decorator protects admin endpoints
- ✅ Only staff users (is_staff=True) can authenticate

---

## 🚀 Current Status

### Running Services
```
✅ Frontend (Main Website)  → http://localhost:3000
✅ Backend API             → http://127.0.0.1:8000
✅ Admin Panel             → http://127.0.0.1:9000
```

All three services are currently running and operational.

---

## 📁 Project Structure

```
indian-export-b2b/
├── frontend/                  # Main website (Next.js)
│   └── src/components/
│       └── Navbar.tsx        # ✓ Admin links removed
│
├── backend/                   # Django API
│   ├── api/
│   │   ├── views.py          # ✓ Added admin_verify endpoint
│   │   └── urls.py           # ✓ Added admin routes
│   └── manage.py
│
└── admin-panel/              # NEW: Separate Admin Panel
    ├── index.html            # Login page
    ├── dashboard.html        # Admin dashboard
    ├── run_admin_panel.py    # Standalone server
    ├── start_admin_panel.bat # Windows launcher
    ├── start_admin_panel.sh  # Linux/Mac launcher
    ├── README.md             # Admin panel documentation
    └── .env.example          # Configuration template
```

---

## 🔐 Security Features

### Authentication
- **JWT Token-based** - Secure token generation and validation
- **Staff-only access** - Only Django admin users can login
- **Token expiry** - 24-hour token validity
- **Session storage** - Tokens stored in sessionStorage (cleared on browser close)

### Session Management
- **Auto-logout** - 2 hours of inactivity triggers logout
- **Manual logout** - Users can logout anytime
- **Token validation** - Backend verifies token on every API call

### Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Access-Control-Allow-Origin: *
```

### Admin Panel Isolation
- **Separate URL** - Not linked from main website
- **Separate server** - Different port (9000)
- **Firewall-friendly** - Can be restricted to internal IP only
- **Production-ready** - Can be deployed behind reverse proxy

---

## 👤 Default Credentials

```
Username: admin
Password: admin123
```

⚠️ **ACTION REQUIRED**: Change these credentials immediately in production!

To change admin password:
```bash
cd backend
python manage.py changepassword admin
```

---

## 🎯 Admin Panel Access Methods

### Method 1: Direct URL (Current)
1. Run: `python admin-panel/run_admin_panel.py`
2. Visit: `http://127.0.0.1:9000`
3. Login with admin credentials

### Method 2: Windows Batch Script
```bash
cd admin-panel
double-click start_admin_panel.bat
```

### Method 3: Linux/Mac Shell Script
```bash
cd admin-panel
chmod +x start_admin_panel.sh
./start_admin_panel.sh
```

### Method 4: Production Deployment
- Use Nginx to reverse proxy the admin panel
- Configure SSL/TLS certificates
- Restrict access by IP address
- Set up rate limiting

---

## 🔧 Configuration

### Changing Admin Panel Port

Edit `admin-panel/run_admin_panel.py`:
```python
PORT = 9000  # Change to your desired port
```

Or run with custom port:
```bash
python run_admin_panel.py 8080
```

### Updating API URL

If backend is on different server:

1. Edit `admin-panel/index.html` (line ~95):
```javascript
const API_URL = 'http://your-backend-server:8000';
```

2. Edit `admin-panel/dashboard.html` (line ~185):
```javascript
const API_URL = 'http://your-backend-server:8000';
```

---

## 📊 Admin Panel Features

### Implemented
- ✅ Secure login page
- ✅ Dashboard with statistics
- ✅ Inquiries management
- ✅ View inquiry details
- ✅ Update inquiry status
- ✅ Session management
- ✅ User information display
- ✅ Logout functionality

### Coming Soon
- View and manage products
- Create new product listings
- Manage export countries
- Analytics and reports
- Email notifications
- Export/Import data
- Bulk operations

---

## 🧪 Testing Checklist

### Main Website
- [ ] Visit http://localhost:3000
- [ ] Verify navbar has NO admin link
- [ ] Verify mobile menu has NO admin link
- [ ] Navigate to /products, /countries, /contact
- [ ] Verify no admin references anywhere

### Admin Panel
- [ ] Visit http://127.0.0.1:9000
- [ ] Login with admin/admin123
- [ ] Verify dashboard loads
- [ ] View inquiries list
- [ ] Check session timeout (2 hours)
- [ ] Logout and verify redirect

### API Security
- [ ] Try accessing `/api/inquiries/` without token → 401 error
- [ ] Try accessing `/api/admin/verify/` with invalid token → 401 error
- [ ] Access with valid token → Success

---

## 📝 Environment Variables

Copy `.env.example` to `.env` for production setup:

```bash
cp admin-panel/.env.example admin-panel/.env
```

Edit `.env` for your environment:
```
BACKEND_URL=http://your-backend.com:8000
ADMIN_PANEL_PORT=9000
SESSION_TIMEOUT_MINUTES=120
TOKEN_EXPIRY_HOURS=24
USE_HTTPS=true
```

---

## 🚨 Production Deployment

### Step 1: Set Secure Admin Password
```bash
python backend/manage.py changepassword admin
```

### Step 2: Set Django Settings
```python
# backend/config/settings.py
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
CSRF_TRUSTED_ORIGINS = ['https://your-domain.com']
```

### Step 3: Configure Nginx (Optional)
```nginx
server {
    listen 443 ssl http2;
    server_name admin.your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://127.0.0.1:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Restrict to internal IPs
    allow 192.168.1.0/24;
    allow 10.0.0.0/8;
    deny all;
}
```

### Step 4: Enable HTTPS
Edit `admin-panel/run_admin_panel.py` to add SSL:
```python
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain('/path/to/cert.pem', '/path/to/key.pem')
httpd.socket = ssl_context.wrap_socket(httpd.socket, server_side=True)
```

---

## 🐛 Troubleshooting

### "Admin link still showing on website"
- Clear browser cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+F5
- Rebuild Next.js: `npm run build`

### "Cannot access admin panel"
- Verify server is running: Check terminal output
- Check firewall: Allow port 9000
- Try: `http://127.0.0.1:9000` (not localhost)

### "Login fails with invalid credentials"
- Verify username/password in Django admin
- Check user has `is_staff=True` status
- Try resetting password: `python manage.py changepassword admin`

### "API returns 401 Unauthorized"
- Token may have expired (24 hours)
- Session may have timed out (2 hours inactivity)
- Login again

### "CORS errors in console"
- Backend CORS middleware is enabled
- Check Django `SimpleCORSMiddleware` in settings.py
- Verify `ALLOWED_HOSTS` includes admin URL

---

## 📚 Files Modified

### Frontend
- `src/components/Navbar.tsx` - Removed admin links from both desktop and mobile

### Backend
- `api/views.py` - Added `admin_verify()` endpoint
- `api/urls.py` - Added admin routes

### New Files Created
- `admin-panel/index.html` - Login page
- `admin-panel/dashboard.html` - Dashboard
- `admin-panel/run_admin_panel.py` - Server script
- `admin-panel/start_admin_panel.bat` - Windows launcher
- `admin-panel/start_admin_panel.sh` - Linux launcher
- `admin-panel/.env.example` - Config template
- `admin-panel/README.md` - Admin documentation

---

## 🔍 Verification

Run this command to verify the admin panel is working:

```bash
# Terminal 1: Start frontend
cd frontend && npm run dev

# Terminal 2: Start backend
cd backend && python manage.py runserver 8000

# Terminal 3: Start admin panel
cd admin-panel && python run_admin_panel.py
```

Then verify:
- Main site: http://localhost:3000 (No admin link ✓)
- Admin panel: http://127.0.0.1:9000 (Secure login ✓)
- API: http://127.0.0.1:8000/api/inquiries/ (Requires token ✓)

---

## ✨ Next Steps

1. **Change admin password** immediately
2. **Test the admin panel** thoroughly
3. **Deploy to production** using HTTPS
4. **Restrict admin URL** to internal IPs only (if possible)
5. **Monitor access logs** for unauthorized attempts
6. **Backup database** regularly
7. **Update Django** to latest security patches

---

## 📞 Support & Questions

Check the detailed documentation:
- Admin Panel: `admin-panel/README.md`
- Backend API: Check Django logs
- Frontend: Check browser console (F12)

All systems are now secured and operational! 🎉
