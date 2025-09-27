# Secure AI Integration Setup

## ⚠️ Security Issue Fixed
**Never put API keys in client-side code!** This setup uses a secure backend proxy.

## 🚀 Quick Setup

### 1. Install Backend Dependencies
```bash
npm install
```

### 2. Create Environment File
Create `.env` file in the project root:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3000
```

### 3. Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new project
3. Generate an API key
4. Add it to your `.env` file

### 4. Start Backend Server
```bash
npm start
```

### 5. Update Frontend URL (if needed)
If your frontend runs on a different port, update `BACKEND_URL` in `script.js`:
```javascript
const BACKEND_URL = 'http://localhost:3000'; // Change this if needed
```

## 🔒 Security Benefits

### ✅ Secure
- API key hidden on server
- No client-side exposure
- Environment variable protection

### ✅ Controlled
- Rate limiting possible
- Usage monitoring
- Access control

### ✅ Scalable
- Multiple users supported
- Server-side caching
- Error handling

## 🌐 Deployment Options

### Option 1: Heroku
```bash
# Install Heroku CLI
# Login and create app
heroku create your-app-name
heroku config:set GEMINI_API_KEY=your_key
git push heroku main
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel
vercel --env GEMINI_API_KEY=your_key
```

### Option 3: Railway/Render
Similar process - set environment variables in dashboard.

## 🛡️ Additional Security

### Rate Limiting
Add to backend:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

### API Key Rotation
- Rotate keys regularly
- Monitor usage in Google AI Studio
- Set spending limits

## 🚨 Never Do This
```javascript
// ❌ NEVER put API keys in frontend
const API_KEY = 'your-secret-key'; // Visible to everyone!
```

## ✅ Always Do This
```javascript
// ✅ Keep API keys on server
const API_KEY = process.env.GEMINI_API_KEY; // Secure!
```
