// Configuration file for environment variables
// This file should be loaded before the main script

window.APP_CONFIG = {
    // Google Analytics Configuration
    GOOGLE_ANALYTICS_ID: process.env.GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID',
    
    // Backend Configuration
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
    USE_BACKEND: process.env.USE_BACKEND === 'true' || false,
    
    // App Configuration
    APP_NAME: 'Nyx\'s Vision',
    VERSION: '1.0.0'
};
