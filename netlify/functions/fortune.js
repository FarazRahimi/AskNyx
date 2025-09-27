// Netlify Function for AI Fortune Generation
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
require('dotenv').config();

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const { cards, astroSign, language } = JSON.parse(event.body);

    // Initialize AI if API key is available
    const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
    let genAI = null;

    console.log('🔍 Environment check:');
    console.log('  - GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
    console.log('  - API_KEY exists:', !!process.env.API_KEY);
    console.log('  - API_KEY length:', API_KEY ? API_KEY.length : 0);
    console.log('  - API_KEY starts with:', API_KEY ? API_KEY.substring(0, 10) + '...' : 'none');

    if (API_KEY && API_KEY !== 'test-key' && API_KEY !== 'your_actual_gemini_api_key_here') {
      try {
        genAI = new GoogleGenerativeAI(API_KEY);
        console.log('✅ Google AI Studio API initialized');
      } catch (error) {
        console.log('⚠️ Google AI Studio API not available:', error.message);
      }
    } else {
      console.log('⚠️ No valid API key provided, using sample responses');
    }

    let fortune = '';

    // Try AI generation if available
    if (genAI) {
      try {
        // Try different models
        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro', 'gemini-pro'];
        let model = null;
        
        for (const modelName of models) {
          try {
            model = genAI.getGenerativeModel({ model: modelName });
            console.log(`✅ Using model: ${modelName}`);
            break;
          } catch (error) {
            console.log(`❌ Model ${modelName} failed:`, error.message);
          }
        }

        if (model) {
          // Convert English card names to Farsi for better AI understanding
          let displayCards = cards;
          if (language === 'fa') {
            const cardTranslations = {
              'The Fool': 'احمق',
              'The Magician': 'جادوگر',
              'The High Priestess': 'کاهنه بزرگ',
              'The Empress': 'ملکه',
              'The Emperor': 'امپراتور',
              'The Hierophant': 'هیروفانت',
              'The Lovers': 'عشاق',
              'The Chariot': 'ارابه',
              'Justice': 'عدالت',
              'The Hermit': 'عابد',
              'Wheel of Fortune': 'چرخ تقدیر',
              'Strength': 'قدرت',
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
              'Page of Cups': 'پیاده جام',
              'Knight of Cups': 'شوالیه جام',
              'Queen of Cups': 'ملکه جام',
              'King of Cups': 'پادشاه جام',
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
              'Page of Swords': 'پیاده شمشیر',
              'Knight of Swords': 'شوالیه شمشیر',
              'Queen of Swords': 'ملکه شمشیر',
              'King of Swords': 'پادشاه شمشیر',
              'Ace of Wands': 'آس چوب',
              'Two of Wands': 'دو چوب',
              'Three of Wands': 'سه چوب',
              'Four of Wands': 'چهار چوب',
              'Five of Wands': 'پنج چوب',
              'Six of Wands': 'شش چوب',
              'Seven of Wands': 'هفت چوب',
              'Eight of Wands': 'هشت چوب',
              'Nine of Wands': 'نه چوب',
              'Ten of Wands': 'ده چوب',
              'Page of Wands': 'پیاده چوب',
              'Knight of Wands': 'شوالیه چوب',
              'Queen of Wands': 'ملکه چوب',
              'King of Wands': 'پادشاه چوب',
              'Ace of Pentacles': 'آس سکه',
              'Two of Pentacles': 'دو سکه',
              'Three of Pentacles': 'سه سکه',
              'Four of Pentacles': 'چهار سکه',
              'Five of Pentacles': 'پنج سکه',
              'Six of Pentacles': 'شش سکه',
              'Seven of Pentacles': 'هفت سکه',
              'Eight of Pentacles': 'هشت سکه',
              'Nine of Pentacles': 'نه سکه',
              'Ten of Pentacles': 'ده سکه',
              'Page of Pentacles': 'پیاده سکه',
              'Knight of Pentacles': 'شوالیه سکه',
              'Queen of Pentacles': 'ملکه سکه',
              'King of Pentacles': 'پادشاه سکه'
            };
            
            displayCards = cards.split(', ').map(card => 
              cardTranslations[card.trim()] || card.trim()
            ).join('، ');
          }

          const prompt = language === 'fa' ? 
            `کارت‌های تاروت ${displayCards} و برج ${astroSign} برای شما کشیده شده‌اند. لطفاً یک فال اسرارآمیز و الهام‌بخش به زبان فارسی بنویسید که معنای این کارت‌ها را با تأثیرات نجومی ترکیب کند. از نام‌های فارسی کارت‌ها استفاده کنید: ${displayCards}. فال باید شامل پیش‌بینی‌های مشخص درباره آینده، چالش‌ها، فرصت‌ها و راهنمایی‌های عملی باشد. فقط به زبان فارسی و با استفاده از حروف فارسی بنویسید. فال باید 4-5 جمله باشد و شامل پیش‌بینی‌های واقعی باشد.` :
            `The tarot cards ${displayCards} and zodiac sign ${astroSign} have been drawn for you. Please write a mystical and inspiring fortune reading in English that combines the meanings of these cards with astrological influences. Use the card names: ${displayCards}. The reading should include specific predictions about the future, challenges, opportunities, and practical guidance. Make it 4-5 sentences and include real predictions.`;

          const result = await model.generateContent(prompt);
          fortune = result.response.text();

          // Validate Farsi text if needed
          if (language === 'fa') {
            const persianRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
            if (!persianRegex.test(fortune)) {
              throw new Error('Invalid Persian text generated');
            }
          }

          console.log('✅ AI fortune generated successfully');
        } else {
          console.log('❌ No valid AI model available');
          throw new Error('No valid AI model available');
        }
      } catch (error) {
        console.log('❌ AI generation failed:', error.message);
        console.log('❌ Error details:', error);
        throw error;
      }
    } else {
      console.log('❌ No AI API key available');
      throw new Error('No AI API key available');
    }

    // Fallback to sample text if AI fails
    if (!fortune) {
      fortune = generateSampleFortune(cards, astroSign, language);
      console.log('📖 Using sample fortune');
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ fortune }),
    };

  } catch (error) {
    console.error('❌ Error generating fortune:', error);
    
    // Return sample fortune as fallback
    const sampleFortune = generateSampleFortune(
      JSON.parse(event.body).cards || '',
      JSON.parse(event.body).astroSign || '',
      JSON.parse(event.body).language || 'en'
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ fortune: sampleFortune }),
    };
  }
};

// Generate sample fortune text
function generateSampleFortune(cards, astroSign, language) {
  // Card name translations for Farsi
  const cardTranslations = {
    'The Fool': 'احمق',
    'The Magician': 'جادوگر',
    'The High Priestess': 'کاهنه بزرگ',
    'The Empress': 'ملکه',
    'The Emperor': 'امپراتور',
    'The Hierophant': 'هیروفانت',
    'The Lovers': 'عشاق',
    'The Chariot': 'ارابه',
    'Justice': 'عدالت',
    'The Hermit': 'عابد',
    'Wheel of Fortune': 'چرخ تقدیر',
    'Strength': 'قدرت',
    'The Hanged Man': 'مرد آویزان',
    'Death': 'مرگ',
    'Temperance': 'اعتدال',
    'The Devil': 'شیطان',
    'The Tower': 'برج',
    'The Star': 'ستاره',
    'The Moon': 'ماه',
    'The Sun': 'خورشید',
    'Judgement': 'داوری',
    'The World': 'جهان'
  };

  // Convert card names to appropriate language
  let displayCards = cards;
  if (language === 'fa') {
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
      `نیروهای کیهانی کارت‌های قدرتمندی را آشکار کرده‌اند: ${displayCards}. همراه با انرژی ${astroSign} شما، این کارت‌ها داستانی از تحول و راهنمایی برای سفر آینده شما می‌بافند. طبیعت نجومی شما پیام‌های این نمادهای باستانی را تقویت می‌کند.`,
      `کارت‌های انتخاب شده شما ${displayCards} از زمان تغییر و فرصت سخن می‌گویند، که با ویژگی‌های ${astroSign} شما تقویت می‌شود. جهان در حال همسویی برای آوردن بینش‌ها و امکانات جدید است.`,
      `کارت‌های ${displayCards} در این لحظه به دلیلی برای شما کشیده شده‌اند، تحت تأثیر طبیعت ${astroSign} شما. آن‌ها داستانی از رشد، چالش‌های پشت سر گذاشته شده و آغازهای جدید را می‌گویند.`
    ]
  };

  const fortunes = language === 'fa' ? sampleFortunes.fa : sampleFortunes.en;
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}
