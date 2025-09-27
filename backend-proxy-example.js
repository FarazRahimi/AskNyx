// Example backend proxy using Express.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables
require('dotenv').config();

// Keep API key in environment variable (optional for testing)
const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || 'test-key';
let genAI = null;

console.log('🔍 Environment check:');
console.log('  - API_KEY length:', API_KEY ? API_KEY.length : 0);
console.log('  - API_KEY starts with:', API_KEY ? API_KEY.substring(0, 10) + '...' : 'none');

// Initialize Google AI Studio API only if API key is provided
if (API_KEY && API_KEY !== 'test-key' && API_KEY !== 'your_actual_gemini_api_key_here') {
    try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        genAI = new GoogleGenerativeAI(API_KEY);
        console.log('✅ Google AI Studio API initialized with real API key');
    } catch (error) {
        console.log('⚠️ Google AI Studio API not available, using sample responses');
        console.log('   Error:', error.message);
    }
} else {
    console.log('⚠️ No valid API key provided, using sample responses');
    console.log('   Expected: GEMINI_API_KEY or API_KEY in .env file');
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration - allow all origins (more permissive)
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Additional CORS headers as backup
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Set proper UTF-8 encoding for responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        ai_available: !!genAI,
        timestamp: new Date().toISOString()
    });
});

app.post('/api/fortune', async (req, res) => {
    try {
        const { cards, astroSign, language } = req.body;
        
        console.log(`📝 Generating fortune for: ${cards} + ${astroSign} (${language})`);
        
        // Try real AI if available
        if (genAI) {
            try {
                // Use Gemma 3 model (available through Google AI Studio)
                const model = genAI.getGenerativeModel({ model: "gemma-2-9b-it" });
                console.log('✅ Using Gemma 3 model (gemma-2-9b-it)');
                
                const prompt = language === 'fa' ? 
                    `Please write a mystical fortune reading in Persian/Farsi language for these tarot cards: ${cards} and astro sign: ${astroSign}. Write ONLY in Persian/Farsi script using proper Persian characters. Do not use English or Latin script. Write a beautiful, poetic interpretation that combines the tarot card meanings with the astrological influences. Include how the astro sign affects the reading. Keep it mystical and inspiring, about 3-4 sentences. Make sure to use proper Persian grammar and vocabulary.` :
                    `Generate a mystical fortune reading in English for these tarot cards: ${cards} and astro sign: ${astroSign}. Write a beautiful, poetic interpretation that combines the tarot card meanings with the astrological influences. Include how the astro sign affects the reading. Keep it mystical and inspiring, about 3-4 sentences.`;
                
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const aiFortune = response.text();
                
                console.log('✅ AI fortune generated successfully');
                
                // Validate Farsi text - check if it contains proper Persian characters
                if (language === 'fa') {
                    const persianRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
                    if (!persianRegex.test(aiFortune)) {
                        console.log('⚠️ AI generated non-Persian text for Farsi request, using sample');
                        throw new Error('Invalid Persian text generated');
                    }
                    
                    // Check for garbled text (too many random characters)
                    const garbledRegex = /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\.,!?،؛]/;
                    const nonPersianChars = (aiFortune.match(garbledRegex) || []).length;
                    if (nonPersianChars > aiFortune.length * 0.3) { // More than 30% non-Persian chars
                        console.log('⚠️ AI generated garbled text, using sample');
                        throw new Error('Garbled Persian text generated');
                    }
                }
                
                return res.json({ fortune: aiFortune });
            } catch (aiError) {
                console.error('❌ AI generation failed:', aiError);
                // Fall through to sample response
            }
        }
        
        // Fallback to sample response
        console.log('📖 Using sample fortune response');
        
        // Convert card names to appropriate language
        let displayCards = cards;
        if (language === 'fa') {
            // Convert English card names to Farsi
            const cardTranslations = {
                'The Fool': 'احمق',
                'The Magician': 'جادوگر',
                'The High Priestess': 'کاهنه بزرگ',
                'The Empress': 'ملکه',
                'The Emperor': 'امپراتور',
                'The Hierophant': 'روحانی',
                'The Lovers': 'عشاق',
                'The Chariot': 'ارابه',
                'Strength': 'قدرت',
                'The Hermit': 'زاهد',
                'Wheel of Fortune': 'چرخ بخت',
                'Justice': 'عدالت',
                'The Hanged Man': 'مرد آویزان',
                'Death': 'مرگ',
                'Temperance': 'اعتدال',
                'The Devil': 'شیطان',
                'The Tower': 'برج',
                'The Star': 'ستاره',
                'The Moon': 'ماه',
                'The Sun': 'خورشید',
                'Judgement': 'داوری',
                'The World': 'جهان',
                'Ace of Wands': 'آس چماق',
                'Two of Wands': 'دو چماق',
                'Three of Wands': 'سه چماق',
                'Four of Wands': 'چهار چماق',
                'Five of Wands': 'پنج چماق',
                'Six of Wands': 'شش چماق',
                'Seven of Wands': 'هفت چماق',
                'Eight of Wands': 'هشت چماق',
                'Nine of Wands': 'نه چماق',
                'Ten of Wands': 'ده چماق',
                'Ace of Cups': 'آس جام',
                'Two of Cups': 'دو جام',
                'Three of Cups': 'سه جام',
                'Four of Cups': 'چهار جام',
                'Five of Cups': 'پنج جام',
                'Six of Cups': 'شش جام',
                'Seven of Cups': 'هفت جام',
                'Eight of Cups': 'هشت جام',
                'Nine of Cups': 'نه جام',
                'Ten of Cups': 'ده جام',
                'Ace of Swords': 'آس شمشیر',
                'Two of Swords': 'دو شمشیر',
                'Three of Swords': 'سه شمشیر',
                'Four of Swords': 'چهار شمشیر',
                'Five of Swords': 'پنج شمشیر',
                'Six of Swords': 'شش شمشیر',
                'Seven of Swords': 'هفت شمشیر',
                'Eight of Swords': 'هشت شمشیر',
                'Nine of Swords': 'نه شمشیر',
                'Ten of Swords': 'ده شمشیر',
                'Ace of Pentacles': 'آس سکه',
                'Two of Pentacles': 'دو سکه',
                'Three of Pentacles': 'سه سکه',
                'Four of Pentacles': 'چهار سکه',
                'Five of Pentacles': 'پنج سکه',
                'Six of Pentacles': 'شش سکه',
                'Seven of Pentacles': 'هفت سکه',
                'Eight of Pentacles': 'هشت سکه',
                'Nine of Pentacles': 'نه سکه',
                'Ten of Pentacles': 'ده سکه'
            };
            
            displayCards = cards.split(', ').map(card => 
                cardTranslations[card.trim()] || card.trim()
            ).join('، ');
        }
        
        const sampleFortunes = {
            en: [
                `The cosmic forces have revealed powerful cards: ${displayCards}. Combined with your ${astroSign} energy, these cards weave a story of transformation and guidance for your journey ahead. Your astrological nature amplifies the messages of these ancient symbols, offering you wisdom tailored to your celestial essence.`,
                `Your selected cards ${displayCards} speak of a time of change and opportunity, enhanced by your ${astroSign} characteristics. The universe is aligning to bring you new insights and possibilities. Trust in the wisdom of these ancient symbols as they guide you toward your highest potential.`,
                `The cards ${displayCards} have been drawn for you at this moment for a reason, influenced by your ${astroSign} nature. They tell a story of growth, challenges overcome, and new beginnings. Pay attention to the messages they bring, for they hold the keys to your current path.`
            ],
            fa: [
                `نیروهای کیهانی کارت‌های قدرتمند را آشکار کرده‌اند: ${displayCards}. همراه با انرژی ${astroSign} شما، این کارت‌ها داستانی از تحول و راهنمایی برای سفر آینده شما می‌بافند. طبیعت نجومی شما پیام‌های این نمادهای باستانی را تقویت می‌کند.`,
                `کارت‌های انتخاب شده شما ${displayCards} از زمان تغییر و فرصت سخن می‌گویند، که با ویژگی‌های ${astroSign} شما تقویت می‌شود. جهان در حال همسویی برای آوردن بینش‌ها و امکانات جدید است.`,
                `کارت‌های ${displayCards} در این لحظه به دلیلی برای شما کشیده شده‌اند، تحت تأثیر طبیعت ${astroSign} شما. آن‌ها داستانی از رشد، چالش‌های پشت سر گذاشته شده و آغازهای جدید را می‌گویند.`
            ]
        };
        
        const fortunes = sampleFortunes[language] || sampleFortunes.en;
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        
        res.json({ fortune: randomFortune });
    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({ error: 'Failed to generate fortune' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
