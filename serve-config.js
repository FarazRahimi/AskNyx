// Simple server to serve environment variables dynamically
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Serve config.js with environment variables
app.get('/config.js', (req, res) => {
    const config = `
// Configuration file for environment variables
// This file is dynamically generated from environment variables

window.APP_CONFIG = {
    // Google Analytics Configuration
    GOOGLE_ANALYTICS_ID: '${process.env.GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID'}',
    
    // Backend Configuration
    BACKEND_URL: '${process.env.BACKEND_URL || 'http://localhost:3000'}',
    USE_BACKEND: ${process.env.USE_BACKEND === 'true' ? 'true' : 'false'},
    
    // App Configuration
    APP_NAME: 'Nyx\\'s Vision',
    VERSION: '1.0.0'
};
    `;
    
    res.setHeader('Content-Type', 'application/javascript');
    res.send(config);
});

// Serve static files
app.use(express.static('.'));

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Google Analytics: ${process.env.GA_MEASUREMENT_ID ? 'Enabled' : 'Disabled'}`);
    console.log(`🔧 Backend: ${process.env.USE_BACKEND === 'true' ? 'Enabled' : 'Disabled'}`);
});
