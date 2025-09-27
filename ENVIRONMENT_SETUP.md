# Environment Variables Setup for Nyx's Vision

## Overview
This guide explains how to set up environment variables for your Nyx's Vision app, including Google Analytics and backend configuration.

## Quick Start

### 1. Create Environment File
Copy the example environment file:
```bash
cp env.example .env
```

### 2. Configure Your Settings
Edit `.env` file with your actual values:
```env
# Google Analytics Configuration
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Backend Configuration  
BACKEND_URL=http://localhost:3000
USE_BACKEND=true

# App Configuration
APP_NAME=Nyx's Vision
VERSION=1.0.0
```

### 3. Run with Environment Variables
```bash
# Option 1: Use the config server (recommended for development)
npm run serve

# Option 2: Build config and serve static files
npm run build-config
# Then serve with any static server

# Option 3: Use the combined command
npm run start-with-config
```

## Environment Variables Explained

### Google Analytics
- **`GA_MEASUREMENT_ID`**: Your Google Analytics Measurement ID (format: G-XXXXXXXXXX)
  - Get this from [Google Analytics](https://analytics.google.com/)
  - If not set, analytics will be disabled

### Backend Configuration
- **`BACKEND_URL`**: URL of your backend server
  - Default: `http://localhost:3000`
  - Change this for production deployment

- **`USE_BACKEND`**: Whether to use the AI backend
  - `true`: Use AI-generated fortunes
  - `false`: Use sample fortunes (no backend required)

### App Configuration
- **`APP_NAME`**: Display name for the app
- **`VERSION`**: App version for tracking

## Deployment Options

### Option 1: Static Hosting (GitHub Pages, Netlify, Vercel)
1. Set up your environment variables in your hosting platform
2. Use `npm run build-config` to generate `config-built.js`
3. Update `index.html` to use `config-built.js` instead of `config.js`
4. Deploy the built files

### Option 2: Server with Dynamic Config
1. Deploy both your app and the config server
2. Use `npm run serve` to serve with dynamic environment injection
3. Environment variables are injected at runtime

### Option 3: Build-time Configuration
1. Set environment variables in your build process
2. Run `npm run build-config`
3. Deploy the generated `config-built.js` with your app

## Security Notes

### ✅ Safe to Commit
- `env.example` - Example configuration
- `config.js` - Template with placeholders
- `build-config.js` - Build script
- `serve-config.js` - Server script

### ❌ Never Commit
- `.env` - Contains actual secrets
- `config-built.js` - Generated file with secrets

## Testing

### Test Google Analytics
1. Set `GA_MEASUREMENT_ID` in your `.env`
2. Run `npm run serve`
3. Open browser console and look for "📊 Analytics Event:" messages
4. Check Google Analytics Real-time reports

### Test Backend
1. Set `USE_BACKEND=true` in your `.env`
2. Start backend: `npm start`
3. Start frontend: `npm run serve`
4. Complete a fortune reading to test AI generation

## Troubleshooting

### Google Analytics Not Working
- Check that `GA_MEASUREMENT_ID` is set correctly
- Verify the ID format (G-XXXXXXXXXX)
- Check browser console for errors
- Ensure ad blockers aren't blocking analytics

### Backend Not Connecting
- Verify `BACKEND_URL` matches your backend server
- Check that `USE_BACKEND=true`
- Ensure backend is running on the specified port
- Check browser network tab for failed requests

### Environment Variables Not Loading
- Verify `.env` file exists and has correct format
- Check that variable names match exactly
- Restart the server after changing `.env`
- Use `console.log(window.APP_CONFIG)` to debug

## Production Deployment

### For Static Hosts (GitHub Pages, Netlify, Vercel)
1. Set environment variables in your hosting platform's dashboard
2. Update your build process to run `npm run build-config`
3. Ensure `config-built.js` is included in your deployment

### For Server Hosts (VPS, Cloud Servers)
1. Upload your `.env` file to the server
2. Use `npm run serve` to run with dynamic config injection
3. Set up process manager (PM2) for production

## Example Configurations

### Development
```env
GA_MEASUREMENT_ID=G-XXXXXXXXXX
BACKEND_URL=http://localhost:3000
USE_BACKEND=true
```

### Production
```env
GA_MEASUREMENT_ID=G-PRODUCTION123
BACKEND_URL=https://your-backend.com
USE_BACKEND=true
```

### Analytics Only (No Backend)
```env
GA_MEASUREMENT_ID=G-XXXXXXXXXX
USE_BACKEND=false
```
