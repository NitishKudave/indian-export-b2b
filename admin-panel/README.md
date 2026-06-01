# Orbinexglobal - Secure Admin Panel

## 🔐 Overview

This is a **COMPLETELY SEPARATE** admin panel from the main website. It is isolated, secured, and accessible only to authorized administrators.

### Key Features:
✅ **Separate from main website** - Not accessible via public website navigation  
✅ **Token-based authentication** - JWT tokens for secure API communication  
✅ **Session expiration** - Auto-logout after 2 hours of inactivity  
✅ **Secure headers** - Protection against XSS, clickjacking, and other attacks  
✅ **Admin-only access** - Only users with staff privileges can login  
✅ **HTTPS ready** - Can be configured with SSL/TLS certificates  

---

## 🚀 Getting Started

### Prerequisites
- Python 3.7+
- Django backend running on `http://127.0.0.1:8000`
- Admin credentials (default: `admin` / `admin123`)

### Running the Admin Panel

**Option 1: Using Python HTTP Server (Recommended)**
```bash
cd admin-panel
python run_admin_panel.py
```

The admin panel will be available at: **http://127.0.0.1:9000**

**Option 2: Using Python's Built-in Server**
```bash
cd admin-panel
python -m http.server 9000
```

**Option 3: Deploy on Production Server**
- Use Nginx or Apache to serve the static files
- Configure SSL/TLS for HTTPS
- Update the `API_URL` in `index.html` and `dashboard.html`

---

## 📋 Login Instructions

1. Navigate to the admin panel URL (e.g., `http://127.0.0.1:9000`)
2. Enter your admin username
3. Enter your admin password
4. Click "Authenticate Access"

### Default Admin Credentials
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Change these credentials immediately in production!

---

## 🛡️ Security Features

### Authentication
- **JWT Token-based** authentication
- Tokens expire after **24 hours**
- Tokens stored in `sessionStorage` (cleared on browser close)
- Automatic token validation on page load

### Session Management
- **Auto-logout after 2 hours of inactivity**
- Manual logout option available
- Session timeout warning before expiration

### API Security
- **Authorization header required** for all API calls
- **Bearer token** validation on backend
- Admin-only endpoints protected with `@admin_required` decorator
- User must have `is_staff=True` to authenticate

### Security Headers
```
X-Frame-Options: DENY                    # Prevents clickjacking
X-Content-Type-Options: nosniff          # Prevents MIME type sniffing
X-XSS-Protection: 1; mode=block          # XSS protection
Strict-Transport-Security: max-age=...   # Forces HTTPS in production
```

---

## 📁 File Structure

```
admin-panel/
├── index.html              # Login page
├── dashboard.html          # Admin dashboard
├── run_admin_panel.py      # Standalone server script
└── README.md              # This file
```

---

## 🔄 API Endpoints Used

### Authentication
- `POST /api/token/` - Login endpoint (returns JWT token)
- `GET /api/admin/verify/` - Verify token validity

### Data Access (Protected)
- `GET /api/inquiries/` - List all inquiries
- `GET /api/products/` - List all products
- `GET /api/countries/` - List export destinations

---

## 🚫 Removed from Main Website

The following have been **REMOVED** from the public website:
- ❌ Admin login link from navbar
- ❌ Admin dashboard link from mobile menu
- ❌ Any reference to admin panel in navigation

The main website now focuses solely on:
- ✅ Product catalog
- ✅ Company information
- ✅ Export inquiries
- ✅ Blog and certifications
- ✅ Contact information

---

## 🔧 Configuration

### Changing the Admin Panel Port

Edit `run_admin_panel.py` and change:
```python
PORT = 9000  # Change this to your desired port
```

Or run with custom port:
```bash
python run_admin_panel.py 8080
```

### Updating API URL

If your backend is running on a different URL, edit the `API_URL` in:
- `admin-panel/index.html` (line ~95)
- `admin-panel/dashboard.html` (line ~185)

```javascript
const API_URL = 'http://YOUR_BACKEND_URL:8000';
```

---

## 📊 Dashboard Features

### Current Functionality
- **Inquiries Management** - View all trade inquiries
- **Dashboard Stats** - Total inquiries, new inquiries, products, countries
- **Inquiry Status Updates** - Mark inquiries as contacted, completed, etc.
- **User Information** - Display logged-in user and session time
- **Auto-logout** - Session expiration on inactivity

### Future Enhancements
- Product management (add/edit/delete)
- Inquiry response templates
- Export reports
- Analytics and charts
- Email notifications

---

## 🐛 Troubleshooting

### "Invalid credentials" error
- Check your username and password
- Ensure your account has admin privileges in Django admin
- Verify the backend is running on `http://127.0.0.1:8000`

### "Authentication failed" on dashboard
- Your token may have expired (24 hours)
- Login again with your credentials

### CORS errors
- Make sure backend CORS is configured
- Check that `SimpleCORSMiddleware` is enabled in Django settings

### API not responding
- Verify backend is running: `python manage.py runserver 8000`
- Check firewall settings
- Ensure correct API_URL is set in HTML files

---

## 🔒 Best Practices

1. **Change default admin credentials** immediately after setup
2. **Use HTTPS** in production (configure SSL certificates)
3. **Keep admin panel URL private** - Don't expose in public documentation
4. **Disable admin endpoint** in public settings if needed
5. **Use strong passwords** for admin accounts
6. **Monitor login attempts** for suspicious activity
7. **Backup admin data** regularly
8. **Update Django** to latest security patches

---

## 📞 Support

For issues or questions:
1. Check Django logs: `backend/` directory
2. Check browser console: F12 → Console tab
3. Verify backend is running and accessible

---

## 📜 License & Ownership

Orbinexglobal Admin Panel - Confidential  
For authorized personnel only
