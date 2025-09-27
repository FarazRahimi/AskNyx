// Build script to inject environment variables into config.js
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Read the template config
const configTemplate = fs.readFileSync('config.js', 'utf8');

// Replace environment variables
const config = configTemplate
    .replace(/process\.env\.GA_MEASUREMENT_ID \|\| 'GA_MEASUREMENT_ID'/, `'${process.env.GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID'}'`)
    .replace(/process\.env\.BACKEND_URL \|\| 'http:\/\/localhost:3000'/, `'${process.env.BACKEND_URL || 'http://localhost:3000'}'`)
    .replace(/process\.env\.USE_BACKEND === 'true' \|\| false/, process.env.USE_BACKEND === 'true' ? 'true' : 'false');

// Write the built config
fs.writeFileSync('config-built.js', config);

console.log('✅ Config built successfully!');
console.log(`📊 Google Analytics: ${process.env.GA_MEASUREMENT_ID ? 'Enabled' : 'Disabled'}`);
console.log(`🔧 Backend: ${process.env.USE_BACKEND === 'true' ? 'Enabled' : 'Disabled'}`);
console.log(`🌐 Backend URL: ${process.env.BACKEND_URL || 'http://localhost:3000'}`);
