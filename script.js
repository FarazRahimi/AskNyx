// Updated for true circular sparkles - Cache bust v4
// Create animated stars for background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numStars = 50;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        starsContainer.appendChild(star);
    }
}

// Create PERFECTLY CIRCULAR sparkles - NO RECTANGLES!
function createCircularSparkles(cardElement) {
    console.log('Creating circular sparkles!');
    const cardRect = cardElement.getBoundingClientRect();
    const sparkleCount = 12;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random sparkle type
        const sparkleTypes = ['sparkle-white', 'sparkle-purple', 'sparkle-pink'];
        const randomType = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
        sparkle.classList.add(randomType);
        
        // FORCE circular size
        const size = Math.random() * 4 + 4; // 4px to 8px
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.borderRadius = '50%';
        
        // Position around the card
        const angle = (Math.PI * 2 * i) / sparkleCount;
        const distance = 60; // Fixed distance
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Random animation delay
        sparkle.style.animationDelay = Math.random() * 0.3 + 's';
        
        // Add to document
        document.body.appendChild(sparkle);
        console.log('Added sparkle:', sparkle);
        
        // Remove after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
}

// Translation object
const translations = {
    en: {
        mainTitle: "Nyx's Vision",
        subtitle: "Discover your destiny through her wisdom",
        startBtn: "Start",
        instruction: "Envision the future, set your intention,\nand choose your cards of destiny.",
        card1Title: "Wisdom",
        card1Desc: "Ancient knowledge awaits",
        card1BackTitle: "Insight",
        card1BackDesc: "The path to enlightenment",
        card2Title: "Power",
        card2Desc: "Inner strength revealed",
        card2BackTitle: "Energy",
        card2BackDesc: "Harness your potential",
        card3Title: "Mystery",
        card3Desc: "Secrets yet to unfold",
        card3BackTitle: "Revelation",
        card3BackDesc: "Truth shall be revealed",
        astroQuestion: "What star was watching when you arrived?",
        resultsTitle: "Your Fortune Awaits",
        restartBtn: "Try Again",
        nextCardBtn: "Next Card",
        fortuneText: "The cards have spoken! Your chosen path reveals a destiny filled with wisdom, power, and mystery. The ancient energies align in your favor, guiding you toward enlightenment and success.",
        loadingTitle: "Preparing Your Fortune...",
        loadingSubtitle: "The mystical energies are aligning",
        disclaimerTitle: "For Entertainment Purposes Only",
        disclaimerText: "This reading is meant for fun and entertainment. Please do not rely solely on this guidance for important life decisions.",
        copyright: "© 2025 AskNyx. All rights reserved.",
        developerLink: "✨ Visit the Wizard"
    },
    fa: {
        mainTitle: "بینش اسرارآمیز",
        subtitle: "سرنوشت خود را از طریق حکمت باستانی کشف کنید",
        startBtn: "شروع",
        instruction: " آینده را تصور کن،\nنیت کن و کارت‌های سرنوشتت را برگزین",
        card1Title: "حکمت",
        card1Desc: "دانش باستانی در انتظار است",
        card1BackTitle: "بینش",
        card1BackDesc: "راه به سوی روشنگری",
        card2Title: "قدرت",
        card2Desc: "قدرت درونی آشکار می‌شود",
        card2BackTitle: "انرژی",
        card2BackDesc: "پتانسیل خود را مهار کنید",
        card3Title: "راز",
        card3Desc: "اسرار هنوز آشکار نشده",
        card3BackTitle: "وحی",
        card3BackDesc: "حقیقت آشکار خواهد شد",
        astroQuestion: "در لحظه‌ی میلادت کدام اختر بر تو می‌تابید؟",
        resultsTitle: "فال شما آماده است",
        restartBtn: "دوباره امتحان کنید",
        nextCardBtn: "کارت بعدی",
        fortuneText: "کارت‌ها سخن گفته‌اند! مسیر انتخاب شده شما سرنوشتی پر از حکمت، قدرت و راز را آشکار می‌کند. انرژی‌های باستانی به نفع شما همسو شده‌اند و شما را به سوی روشنگری و موفقیت هدایت می‌کنند.",
        loadingTitle: "در حال آماده‌سازی فال شما...",
        loadingSubtitle: "انرژی‌های اسرارآمیز در حال همسویی هستند",
        disclaimerTitle: "فقط برای سرگرمی",
        disclaimerText: "این فال برای سرگرمی و تفریح است. لطفاً برای تصمیمات مهم زندگی فقط به این راهنمایی تکیه نکنید.",
        copyright: "© 2025 AskNyx. تمامی حقوق محفوظ است.",
        developerLink: "✨ از جادوگر بازدید کنید"
    }
};

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const astroSignScreen = document.getElementById('astroSignScreen');
const cardSelectionScreen = document.getElementById('cardSelectionScreen');
const loadingScreen = document.getElementById('loadingScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const langEnBtn = document.getElementById('lang-en');
const langFaBtn = document.getElementById('lang-fa');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Zodiac Signs Data
const zodiacSigns = [
    { name: 'Aries', icon: '♈', nameFa: 'برج حمل' },
    { name: 'Taurus', icon: '♉', nameFa: 'برج ثور' },
    { name: 'Gemini', icon: '♊', nameFa: 'برج جوزا' },
    { name: 'Cancer', icon: '♋', nameFa: 'برج سرطان' },
    { name: 'Leo', icon: '♌', nameFa: 'برج اسد' },
    { name: 'Virgo', icon: '♍', nameFa: 'برج سنبله' },
    { name: 'Libra', icon: '♎', nameFa: 'برج میزان' },
    { name: 'Scorpio', icon: '♏', nameFa: 'برج عقرب' },
    { name: 'Sagittarius', icon: '♐', nameFa: 'برج قوس' },
    { name: 'Capricorn', icon: '♑', nameFa: 'برج جدی' },
    { name: 'Aquarius', icon: '♒', nameFa: 'برج دلو' },
    { name: 'Pisces', icon: '♓', nameFa: 'برج حوت' }
];

// Selected astrology sign
let selectedAstroSign = null;

// Video elements
const startingVideo = document.getElementById('startingVideo');
const englishVideo = document.getElementById('englishVideo');
const farsiVideo = document.getElementById('farsiVideo');
const englishAstroVideo = document.getElementById('englishAstroVideo');
const farsiAstroVideo = document.getElementById('farsiAstroVideo');
const englishResultsVideo = document.getElementById('englishResultsVideo');
const farsiResultsVideo = document.getElementById('farsiResultsVideo');

// Results elements
const resultsTitle = document.getElementById('resultsTitle');
const chosenCards = document.getElementById('chosenCards');
const fortuneText = document.getElementById('fortuneText');

// Text elements for translation
const textElements = {
    mainTitle: document.getElementById('mainTitle'),
    subtitle: document.getElementById('subtitle'),
    startBtn: document.getElementById('startBtn'),
    astroQuestion: document.getElementById('astroQuestion'),
    instruction: document.getElementById('instruction'),
    card1Title: document.getElementById('card1Title'),
    card1Desc: document.getElementById('card1Desc'),
    card1BackTitle: document.getElementById('card1BackTitle'),
    card1BackDesc: document.getElementById('card1BackDesc'),
    card2Title: document.getElementById('card2Title'),
    card2Desc: document.getElementById('card2Desc'),
    card2BackTitle: document.getElementById('card2BackTitle'),
    card2BackDesc: document.getElementById('card2BackDesc'),
    card3Title: document.getElementById('card3Title'),
    card3Desc: document.getElementById('card3Desc'),
    card3BackTitle: document.getElementById('card3BackTitle'),
    card3BackDesc: document.getElementById('card3BackDesc'),
    resultsTitle: document.getElementById('resultsTitle'),
    restartBtn: document.getElementById('restartBtn'),
    fortuneText: document.getElementById('fortuneText'),
    loadingTitle: document.getElementById('loadingTitle'),
    loadingSubtitle: document.getElementById('loadingSubtitle'),
    disclaimerTitle: document.querySelector('.disclaimer-text'),
    disclaimerText: document.querySelector('.disclaimer-subtext'),
    copyright: document.querySelector('.copyright'),
    developerLink: document.querySelector('.developer-text')
};

// Current language state
let currentLanguage = 'en';

// Google Analytics tracking functions
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
        console.log('📊 Analytics Event:', eventName, parameters);
    }
}

function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        const gaId = window.APP_CONFIG?.GOOGLE_ANALYTICS_ID;
        if (gaId && gaId !== 'GA_MEASUREMENT_ID') {
            gtag('config', gaId, {
                page_title: pageName,
                page_location: window.location.href
            });
            console.log('📊 Page View:', pageName);
        }
    }
}

// Track flipped cards
let flippedCards = [];
let totalCards = 3;
let currentCardIndex = 0;

// Update text content based on current language
function updateTextContent() {
    const currentTranslations = translations[currentLanguage];
    
    Object.keys(textElements).forEach(key => {
        if (textElements[key] && currentTranslations[key]) {
            textElements[key].textContent = currentTranslations[key];
        }
    });
}

// Switch video based on language
function switchVideo(lang) {
    // Hide all videos
    startingVideo.style.opacity = '0';
    englishVideo.style.opacity = '0';
    farsiVideo.style.opacity = '0';
    
    // Show appropriate video
    setTimeout(() => {
        const targetVideo = lang === 'fa' ? farsiVideo : englishVideo;
        targetVideo.style.opacity = '1';
        targetVideo.currentTime = 0;
        targetVideo.play();
    }, 100);
}

// Switch language video (after start button is clicked)
function switchLanguageVideo(lang) {
    console.log('switchLanguageVideo called with lang:', lang);
    console.log('Astro screen visible:', astroSignScreen.classList.contains('visible'));
    console.log('Card screen visible:', cardSelectionScreen.classList.contains('visible'));
    
    // Hide all videos first and pause/mute them
    englishVideo.style.opacity = '0';
    englishVideo.pause();
    farsiVideo.style.opacity = '0';
    farsiVideo.pause();
    englishAstroVideo.style.opacity = '0';
    englishAstroVideo.pause();
    farsiAstroVideo.style.opacity = '0';
    farsiAstroVideo.pause();
    
    // Show appropriate language video based on current screen
    setTimeout(() => {
        if (astroSignScreen.classList.contains('visible')) {
            // Astrology screen - hide starting video and show astrology video
            console.log('Showing astrology video for lang:', lang);
            startingVideo.style.opacity = '0';
            startingVideo.pause();
            const targetVideo = lang === 'fa' ? farsiAstroVideo : englishAstroVideo;
            console.log('Target video:', targetVideo.id);
            targetVideo.style.opacity = '1';
            targetVideo.currentTime = 0;
            targetVideo.play();
        } else if (cardSelectionScreen.classList.contains('visible')) {
            // Card selection screen - hide starting video and show language video
            console.log('Showing card selection video for lang:', lang);
            startingVideo.style.opacity = '0';
            startingVideo.pause();
            const targetVideo = lang === 'fa' ? farsiVideo : englishVideo;
            console.log('Target video:', targetVideo.id);
            targetVideo.style.opacity = '1';
            targetVideo.currentTime = 0;
            targetVideo.play();
        } else {
            console.log('No visible screen detected, keeping starting video');
        }
    }, 100);
}

// Handle results video switching
function switchResultsVideo(lang) {
    // Hide all results videos and pause them
    englishResultsVideo.style.opacity = '0';
    englishResultsVideo.pause();
    farsiResultsVideo.style.opacity = '0';
    farsiResultsVideo.pause();
    
    // Hide results content initially
    const resultsContent = document.querySelector('.results-content');
    resultsContent.style.opacity = '0';
    
    // Show appropriate results video
    setTimeout(() => {
        const targetVideo = lang === 'fa' ? farsiResultsVideo : englishResultsVideo;
        playResultsVideo(targetVideo);
    }, 100);
}

// Play results video and handle sequence
function playResultsVideo(video) {
    video.style.opacity = '1';
    video.currentTime = 0;
    
    // Play video and handle any errors
    video.play().catch(e => {
        console.log('Results video play failed:', e);
        // If video fails to play, show content immediately
        showResultsContent();
    });
    
    // After 8 seconds (video duration), pause video and show content
    setTimeout(() => {
        video.pause(); // Stop the video
        showResultsContent();
    }, 8000); // 8 seconds
}

// Show results content (fade video to background and show text)
function showResultsContent() {
    // Fade video to background
    const videos = document.querySelectorAll('.results-video');
    videos.forEach(video => {
        if (video.style.opacity === '1') {
            video.style.opacity = '0.3';
        }
    });
    
    // Show results content
    const resultsContent = document.querySelector('.results-content');
    resultsContent.style.opacity = '1';
    resultsContent.classList.add('visible');
    
    // Clear individual cards section
    const individualSection = document.getElementById('individualCardsSection');
    individualSection.innerHTML = '';
    
    // Start the new flow: stacked cards -> AI overview -> individual cards -> try again
    displayStackedCards();
    
    // Start AI typing after a short delay
    setTimeout(async () => {
        await createAIOverallFortune();
    }, 1000);
}

// Handle video end - stop on last frame
function handleVideoEnd(video) {
    video.pause();
    // Keep the last frame visible
}

// Current card index for sequential viewing (declared above with other globals)

// Display stacked cards overview
function displayStackedCards() {
    const stackedContainer = document.getElementById('stackedCardsContainer');
    stackedContainer.innerHTML = '';
    
    flippedCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'stacked-card';
        
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
        `;
        
        stackedContainer.appendChild(cardElement);
    });
}

// Create AI overall fortune with typing animation
async function createAIOverallFortune() {
    const textElement = document.getElementById('aiOverallText');
    
    // Update typing indicator to show AI is working
    textElement.innerHTML = '<div class="ai-typing-indicator">AI is analyzing your cards and astro sign...</div>';
    textElement.classList.add('typing');
    
    try {
        // Generate overall AI fortune text
        const overallFortune = await generateOverallAIFortune();
        
        // Clear typing indicator and start typing
        textElement.innerHTML = '';
        textElement.classList.add('typing');
        
        // Set proper text direction for RTL languages
        if (currentLanguage === 'fa') {
            textElement.setAttribute('dir', 'rtl');
        } else {
            textElement.removeAttribute('dir');
        }
        
        let i = 0;
        const typingSpeed = 50; // milliseconds per character
        
        function typeCharacter() {
            if (i < overallFortune.length) {
                // For RTL languages, build the text properly
                const currentText = overallFortune.substring(0, i + 1);
                textElement.innerHTML = currentText;
                i++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Typing complete
                textElement.classList.remove('typing');
                
                // Show button to view individual cards after AI finishes
                setTimeout(() => {
                    showViewCardsButton();
                }, 1000);
            }
        }
        
        typeCharacter();
    } catch (error) {
        console.error('Error creating AI fortune:', error);
        
        // Show error message and fallback to sample text
        textElement.innerHTML = '<div class="ai-typing-indicator">Generating your fortune reading...</div>';
        
        // Fallback to sample text
        const fallbackFortune = generateOverallAIFortune();
        textElement.innerHTML = '';
        textElement.classList.add('typing');
        
        // Set proper text direction for RTL languages
        if (currentLanguage === 'fa') {
            textElement.setAttribute('dir', 'rtl');
        } else {
            textElement.removeAttribute('dir');
        }
        
        let i = 0;
        const typingSpeed = 50;
        
        function typeFallback() {
            if (i < fallbackFortune.length) {
                // For RTL languages, build the text properly
                const currentText = fallbackFortune.substring(0, i + 1);
                textElement.innerHTML = currentText;
                i++;
                setTimeout(typeFallback, typingSpeed);
            } else {
                textElement.classList.remove('typing');
                setTimeout(() => {
                    showViewCardsButton();
                }, 1000);
            }
        }
        
        typeFallback();
    }
}

// Backend API configuration - now from config
const BACKEND_URL = window.APP_CONFIG?.BACKEND_URL || 'http://localhost:3000';
const USE_BACKEND = window.APP_CONFIG?.USE_BACKEND || false;

// Generate overall AI fortune text using backend API
async function generateOverallAIFortune() {
    // Skip backend if disabled
    if (!USE_BACKEND) {
        console.log('📖 Backend disabled, using sample fortune');
        return generateSampleFortune();
    }
    
    try {
        // Get card names and astro sign
        const cardNames = flippedCards.map(card => card.name).join(', ');
        const astroSign = getCurrentAstroSign();
        
        console.log(`🔄 Calling backend API for: ${cardNames} + ${astroSign}`);
        
        // Call your backend API
        const response = await fetch(`${BACKEND_URL}/api/fortune`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cards: cardNames,
                astroSign: astroSign,
                language: currentLanguage
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Backend API success');
            return data.fortune;
        } else {
            throw new Error('Backend API failed');
        }
    } catch (error) {
        console.error('❌ Backend API error:', error);
        console.log('📖 Falling back to sample fortune');
    }
    
    // Fallback to sample text if AI fails or is not available
    return generateSampleFortune();
}

// Generate sample fortune text (fallback)
function generateSampleFortune() {
    const cardNames = flippedCards.map(card => 
        currentLanguage === 'fa' ? card.nameFa : card.name
    ).join(', ');
    
    const astroSign = getCurrentAstroSign();
    
    // Sample fortune texts - in a real app, this would call an AI API
    const sampleFortunes = {
        en: [
            `The cosmic forces have revealed three powerful cards: ${cardNames}. Combined with your ${astroSign} energy, these cards weave a story of transformation and guidance for your journey ahead. Your astrological nature amplifies the messages of these ancient symbols, offering you wisdom tailored to your celestial essence.`,
            `Your selected cards ${cardNames} speak of a time of change and opportunity, enhanced by your ${astroSign} characteristics. The universe is aligning to bring you new insights and possibilities. Trust in the wisdom of these ancient symbols as they guide you toward your highest potential.`,
            `The cards ${cardNames} have been drawn for you at this moment for a reason, influenced by your ${astroSign} nature. They tell a story of growth, challenges overcome, and new beginnings. Pay attention to the messages they bring, for they hold the keys to your current path.`
        ],
        fa: [
            `نیروهای کیهانی سه کارت قدرتمند را آشکار کرده‌اند: ${cardNames}. همراه با انرژی ${astroSign} شما، این کارت‌ها داستانی از تحول و راهنمایی برای سفر آینده شما می‌بافند. طبیعت نجومی شما پیام‌های این نمادهای باستانی را تقویت می‌کند.`,
            `کارت‌های انتخاب شده شما ${cardNames} از زمان تغییر و فرصت سخن می‌گویند، که با ویژگی‌های ${astroSign} شما تقویت می‌شود. جهان در حال همسویی برای آوردن بینش‌ها و امکانات جدید است.`,
            `کارت‌های ${cardNames} در این لحظه به دلیلی برای شما کشیده شده‌اند، تحت تأثیر طبیعت ${astroSign} شما. آن‌ها داستانی از رشد، چالش‌های پشت سر گذاشته شده و آغازهای جدید را می‌گویند.`
        ]
    };
    
    const fortunes = currentLanguage === 'fa' ? sampleFortunes.fa : sampleFortunes.en;
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    
    return randomFortune;
}

// Get current astro sign
function getCurrentAstroSign() {
    if (selectedAstroSign) {
        return currentLanguage === 'fa' ? selectedAstroSign.nameFa : selectedAstroSign.name;
    }
    // Default fallback if no astro sign selected
    return currentLanguage === 'fa' ? 'برج حمل' : 'Aries';
}

// Show button to view individual cards
function showViewCardsButton() {
    console.log('showViewCardsButton called');
    
    // Check if results screen is visible
    const resultsScreen = document.getElementById('resultsScreen');
    if (!resultsScreen || resultsScreen.style.display === 'none') {
        console.error('Results screen not visible!');
        return;
    }
    
    const individualSection = document.getElementById('individualCardsSection');
    
    if (!individualSection) {
        console.error('individualCardsSection element not found in showViewCardsButton!');
        console.log('Available elements:', document.querySelectorAll('[id*="individual"]'));
        return;
    }
    
    individualSection.innerHTML = '';
    
    const viewCardsBtn = document.createElement('button');
    viewCardsBtn.className = 'view-cards-btn';
    viewCardsBtn.id = 'viewCardsBtn';
    
    const buttonText = currentLanguage === 'fa' ? 'مشاهده کارت‌های انتخاب شده' : 'View Your Selected Cards';
    viewCardsBtn.textContent = buttonText;
    
    individualSection.appendChild(viewCardsBtn);
    console.log('View cards button created and appended');
    
    // Show button with animation
    setTimeout(() => {
        viewCardsBtn.classList.add('visible');
        console.log('View cards button made visible');
    }, 500);
    
    // Add click handler
    viewCardsBtn.addEventListener('click', async () => {
        console.log('View cards button clicked');
        await startCardNavigation();
    });
}

// Start card navigation (show first card)
async function startCardNavigation() {
    console.log('Starting card navigation');
    const individualSection = document.getElementById('individualCardsSection');
    
    if (!individualSection) {
        console.error('individualCardsSection element not found in startCardNavigation!');
        return;
    }
    
    individualSection.innerHTML = '';
    
    currentCardIndex = 0;
    await showCurrentCard();
}

// Show current card with navigation
async function showCurrentCard() {
    console.log('Showing current card:', currentCardIndex);
    const individualSection = document.getElementById('individualCardsSection');
    
    if (!individualSection) {
        console.error('individualCardsSection element not found!');
        return;
    }
    
    individualSection.innerHTML = '';
    
    const card = flippedCards[currentCardIndex];
    const displayName = getTranslatedCardName(card.name);
    const displayDescription = await loadCardDescription(card.name, currentLanguage);
    
    const cardElement = document.createElement('div');
    cardElement.className = 'individual-card visible';
    cardElement.id = `individual-card-${currentCardIndex}`;
    
    cardElement.innerHTML = `
        <h3 class="individual-card-title">${displayName}</h3>
        <div class="individual-card-image">
            <img src="${card.image}" alt="${displayName}">
            </div>
        <p class="individual-card-description">${displayDescription}</p>
            <div class="card-navigation">
            <button class="nav-btn" id="nextCardBtn">
                ${currentCardIndex === flippedCards.length - 1 ? 
                    translations[currentLanguage].restartBtn : 
                    translations[currentLanguage].nextCardBtn
                }
                </button>
        </div>
    `;
    
    individualSection.appendChild(cardElement);
    
    // Add click handler for navigation button
    const nextBtn = document.getElementById('nextCardBtn');
    nextBtn.addEventListener('click', async () => {
        if (currentCardIndex === flippedCards.length - 1) {
            // Last card - restart app
            restartApp();
        } else {
            // Next card
            currentCardIndex++;
            await showCurrentCard();
        }
    });
}

// Generate AI fortune text
function generateAIFortune(card, cardName) {
    const fortunes = {
        'The Fool': {
            en: "The Fool represents new beginnings and infinite potential. This card suggests you are on the verge of an exciting new journey in your life. Trust your instincts and embrace the unknown with an open heart. The universe is offering you a fresh start, and your youthful enthusiasm will be your greatest asset.",
            fa: "احمق نمایانگر شروع جدید و پتانسیل بی‌نهایت است. این کارت نشان می‌دهد که شما در آستانه یک سفر هیجان‌انگیز جدید در زندگی خود هستید. به غریزه خود اعتماد کنید و ناشناخته‌ها را با قلب باز بپذیرید. جهان یک شروع تازه به شما ارائه می‌دهد."
        },
        'The Magician': {
            en: "The Magician reveals your inner power and ability to manifest your desires. You possess all the tools necessary to create the life you envision. This is a time of action and transformation - channel your energy wisely and watch as your dreams become reality through focused intention.",
            fa: "جادوگر قدرت درونی شما و توانایی تحقق آرزوهایتان را آشکار می‌کند. شما تمام ابزارهای لازم برای خلق زندگی مورد نظر خود را دارید. این زمان عمل و تحول است - انرژی خود را هوشمندانه هدایت کنید."
        },
        'The High Priestess': {
            en: "The High Priestess calls you to trust your intuition and inner wisdom. There are hidden truths waiting to be discovered through quiet reflection and meditation. Listen to your dreams and pay attention to synchronicities - the answers you seek lie within your subconscious mind.",
            fa: "کاهنه بزرگ شما را فرا می‌خواند تا به شهود و خرد درونی خود اعتماد کنید. حقایق پنهانی وجود دارند که از طریق تأمل و مراقبه منتظر کشف شدن هستند. به رویاهای خود گوش دهید."
        }
    };
    
    // Default fortune if card not found
    const defaultFortune = {
        en: `${cardName} brings powerful energy to your reading. This card holds deep meaning for your current life path and suggests important developments are unfolding. Trust in the process and remain open to the guidance this card offers for your journey ahead.`,
        fa: `${cardName} انرژی قدرتمندی به خوانش شما می‌آورد. این کارت معنای عمیقی برای مسیر زندگی فعلی شما دارد و نشان می‌دهد که تحولات مهمی در حال رخ دادن است.`
    };
    
    const fortune = fortunes[cardName] || defaultFortune;
    return currentLanguage === 'fa' ? fortune.fa : fortune.en;
}

// Old functions removed - using new card navigation flow

// Load card description from file
async function loadCardDescription(cardName, language) {
    try {
        const fileName = language === 'fa' ? 'farsi.txt' : 'english.txt';
        const response = await fetch(`cards/${cardName}/${fileName}`);
        if (response.ok) {
            return await response.text();
        } else {
            return `Description for ${cardName} not available.`;
        }
    } catch (error) {
        console.error('Error loading card description:', error);
        return `Description for ${cardName} not available.`;
    }
}

// Show loading screen
function showLoadingScreen() {
    // Hide card selection screen first
    cardSelectionScreen.classList.remove('visible');
    
    // Hide all language videos immediately and pause them
    englishVideo.style.opacity = '0';
    englishVideo.pause();
    farsiVideo.style.opacity = '0';
    farsiVideo.pause();
    englishAstroVideo.style.opacity = '0';
    englishAstroVideo.pause();
    farsiAstroVideo.style.opacity = '0';
    farsiAstroVideo.pause();
    
    // Show loading screen
    setTimeout(() => {
        loadingScreen.classList.add('visible');
        
        // Update loading screen text
        updateTextContent();
        
        // Start loading the results video
        loadResultsVideo();
    }, 500);
}

// Load results video and show results when ready
function loadResultsVideo() {
    const targetVideo = currentLanguage === 'fa' ? farsiResultsVideo : englishResultsVideo;
    
    // Ensure video is loaded
    if (targetVideo.readyState < 3) {
        targetVideo.load();
    }
    
    // Show loading screen for exactly 4 seconds
    setTimeout(() => {
        showResultsScreen();
    }, 4000); // 4 seconds
}

// Show results screen (called after loading is complete)
function showResultsScreen() {
    // Hide loading screen
    loadingScreen.classList.remove('visible');
    
    // Track fortune reading completion
    const cardNames = flippedCards.map(card => card.name).join(', ');
    trackEvent('fortune_reading_completed', {
        cards: cardNames,
        astro_sign: selectedAstroSign ? selectedAstroSign.name : 'unknown',
        language: currentLanguage,
        total_cards: flippedCards.length
    });
    
    // Show results screen
    setTimeout(() => {
        resultsScreen.classList.add('visible');
        
        // Update text content for results screen
        updateTextContent();
        
        // Switch to results video (this will handle the playing)
        switchResultsVideo(currentLanguage);
    }, 300);
}

// Handle starting video end - stop on last frame and don't loop
function handleStartingVideoEnd() {
    startingVideo.pause();
    // Keep the last frame visible, don't loop
}

// Setup video event listeners
function setupVideoListeners() {
    // Configure all videos for Safari compatibility
    const allVideos = [startingVideo, englishVideo, farsiVideo, englishAstroVideo, farsiAstroVideo, englishResultsVideo, farsiResultsVideo];
    
    allVideos.forEach(video => {
        // Safari-specific video configuration
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('disablepictureinpicture', '');
        video.setAttribute('preload', 'metadata');
        
        // Prevent context menu and interactions
        video.addEventListener('contextmenu', e => e.preventDefault());
        video.addEventListener('selectstart', e => e.preventDefault());
        video.addEventListener('dragstart', e => e.preventDefault());
        
        // Ensure videos don't show controls
        video.controls = false;
        video.controlsList = 'nodownload nofullscreen noremoteplaybook';
    });
    
    // Ensure starting video plays (muted initially for autoplay)
    startingVideo.addEventListener('loadeddata', () => {
        startingVideo.play().catch(e => console.log('Video autoplay failed:', e));
    });
    
    // Starting video should stop at last frame, not loop
    startingVideo.addEventListener('ended', handleStartingVideoEnd);
    englishVideo.addEventListener('ended', () => handleVideoEnd(englishVideo));
    farsiVideo.addEventListener('ended', () => handleVideoEnd(farsiVideo));
    
    // Astrology videos should stop at last frame
    englishAstroVideo.addEventListener('ended', () => handleVideoEnd(englishAstroVideo));
    farsiAstroVideo.addEventListener('ended', () => handleVideoEnd(farsiAstroVideo));
    
    // Results videos should stop at last frame
    englishResultsVideo.addEventListener('ended', () => handleVideoEnd(englishResultsVideo));
    farsiResultsVideo.addEventListener('ended', () => handleVideoEnd(farsiResultsVideo));
    
    // Pre-load all videos
    englishAstroVideo.load();
    farsiAstroVideo.load();
    englishResultsVideo.load();
    farsiResultsVideo.load();
    
    // Set initial volume to 70%
    const initialVolume = 0.7;
    startingVideo.volume = initialVolume;
    englishVideo.volume = initialVolume;
    farsiVideo.volume = initialVolume;
    englishAstroVideo.volume = initialVolume;
    farsiAstroVideo.volume = initialVolume;
    englishResultsVideo.volume = initialVolume;
    farsiResultsVideo.volume = initialVolume;
    
    // Ensure starting video is visible and try to play it
    startingVideo.style.opacity = '1';
    
    // Add video load event listener
    startingVideo.addEventListener('loadeddata', () => {
        console.log('Video loaded, attempting to play...');
        console.log('Video dimensions:', startingVideo.videoWidth, 'x', startingVideo.videoHeight);
        console.log('Video display style:', window.getComputedStyle(startingVideo).display);
        startingVideo.play().catch(e => console.log('Video play failed:', e));
    });
    
    startingVideo.addEventListener('error', (e) => {
        console.log('Video load error:', e);
    });
    
    setTimeout(() => {
        startingVideo.play().catch(e => console.log('Video play failed:', e));
    }, 1000);
}

// Switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update HTML direction for Farsi
    if (lang === 'fa') {
        htmlElement.setAttribute('dir', 'rtl');
        bodyElement.classList.add('farsi');
        // Update footer direction
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            footerContent.setAttribute('dir', 'rtl');
        }
    } else {
        htmlElement.setAttribute('dir', 'ltr');
        bodyElement.classList.remove('farsi');
        // Update footer direction
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            footerContent.removeAttribute('dir');
        }
    }
    
    // Update active language button
    langEnBtn.classList.toggle('active', lang === 'en');
    langFaBtn.classList.toggle('active', lang === 'fa');
    
    // Update text content
    updateTextContent();
    
    // Recreate zodiac signs if astrology screen is visible
    if (astroSignScreen.classList.contains('visible')) {
        createZodiacSigns();
        // Switch to appropriate astrology video
        switchLanguageVideo(lang);
    } else if (cardSelectionScreen.classList.contains('visible')) {
        // Switch to appropriate card selection video
        switchLanguageVideo(lang);
    }
}

// Handle start button click
function handleStartClick() {
    // Fade out welcome screen
    welcomeScreen.classList.add('hidden');
    
    // Show astrology sign screen
    setTimeout(() => {
        astroSignScreen.classList.add('visible');
        createZodiacSigns();
        // Switch to appropriate astrology video
        switchLanguageVideo(currentLanguage);
    }, 800);
}

// Create zodiac signs UI
function createZodiacSigns() {
    console.log('=== CREATEZODIACSIGNS FUNCTION CALLED ===');
    const zodiacContainer = document.getElementById('zodiacSigns');
    console.log('Creating zodiac signs - Container:', zodiacContainer);
    console.log('Container classes:', zodiacContainer.className);
    console.log('Zodiac signs array length:', zodiacSigns.length);
    
    if (!zodiacContainer) {
        console.error('Container not found!');
        return;
    }
    
    // Create zodiac signs with names
    zodiacContainer.innerHTML = `
        <div class="zodiac-row">
            <div class="zodiac-sign" data-sign="Aries">
                <span class="zodiac-icon">♈</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج حمل' : 'Aries'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Taurus">
                <span class="zodiac-icon">♉</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج ثور' : 'Taurus'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Gemini">
                <span class="zodiac-icon">♊</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج جوزا' : 'Gemini'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Cancer">
                <span class="zodiac-icon">♋</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج سرطان' : 'Cancer'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Leo">
                <span class="zodiac-icon">♌</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج اسد' : 'Leo'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Virgo">
                <span class="zodiac-icon">♍</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج سنبله' : 'Virgo'}</div>
            </div>
        </div>
        <div class="zodiac-row">
            <div class="zodiac-sign" data-sign="Libra">
                <span class="zodiac-icon">♎</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج میزان' : 'Libra'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Scorpio">
                <span class="zodiac-icon">♏</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج عقرب' : 'Scorpio'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Sagittarius">
                <span class="zodiac-icon">♐</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج قوس' : 'Sagittarius'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Capricorn">
                <span class="zodiac-icon">♑</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج جدی' : 'Capricorn'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Aquarius">
                <span class="zodiac-icon">♒</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج دلو' : 'Aquarius'}</div>
            </div>
            <div class="zodiac-sign" data-sign="Pisces">
                <span class="zodiac-icon">♓</span>
                <div class="zodiac-name">${currentLanguage === 'fa' ? 'برج حوت' : 'Pisces'}</div>
            </div>
        </div>
    `;
    
    // Add click event listeners to all signs
    zodiacContainer.querySelectorAll('.zodiac-sign').forEach(signElement => {
        const signName = signElement.dataset.sign;
        const sign = zodiacSigns.find(s => s.name === signName);
        if (sign) {
        signElement.addEventListener('click', () => selectZodiacSign(sign, signElement));
        }
    });
    
    console.log('Created simple test layout');
    console.log('Container final HTML:', zodiacContainer.innerHTML);
}

// No scroll functions needed anymore - using grid layout

// Handle zodiac sign selection
function selectZodiacSign(sign, element) {
    // Remove previous selection
    document.querySelectorAll('.zodiac-sign').forEach(el => el.classList.remove('selected'));
    
    // Select current sign
    element.classList.add('selected');
    selectedAstroSign = sign;
    
    // Track zodiac sign selection
    trackEvent('zodiac_sign_selected', {
        sign: sign.name,
        language: currentLanguage
    });
    
    // Proceed to card selection after a short delay
    setTimeout(() => {
        astroSignScreen.classList.remove('visible');
        cardSelectionScreen.classList.add('visible');
        
        // Switch to appropriate language video
        switchLanguageVideo(currentLanguage);
    }, 500);
}

// Handle card flipping
function handleCardClick(cardId) {
    const card = document.getElementById(cardId);
    const isFlipped = card.classList.contains('flipped');
    
    if (!isFlipped) {
        // Create circular sparkles immediately
        createCircularSparkles(card);
        
        // Update card back with actual card data
        updateCardBack(cardId);
        
        // Flip the card
        card.classList.add('flipped');
        
        // Store card data for results
        const cardData = getCardData(cardId);
        flippedCards.push(cardData);
        
        // Track card selection
        trackEvent('card_selected', {
            card_id: cardId,
            card_name: cardData.name,
            cards_flipped: flippedCards.length,
            language: currentLanguage
        });
        
        // Add a subtle glow effect
        card.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.6)';
        
        // Remove glow after animation
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 600);
        
        // Start magical disappearing effect immediately
            card.classList.add('disappearing');
            
            // Remove card from DOM after animation completes
            setTimeout(() => {
                card.style.display = 'none';
                
                // Check if all cards are flipped
                if (flippedCards.length === totalCards) {
                    // Show loading screen after a short delay
                    setTimeout(() => {
                        showLoadingScreen();
                    }, 1000);
                }
        }, 1000); // 1 second for the magicalDisappear animation
    }
}

// Card name translations
const cardNameTranslations = {
    en: {
        "The Fool": "The Fool",
        "The Magician": "The Magician",
        "The High Priestess": "The High Priestess",
        "The Empress": "The Empress",
        "The Emperor": "The Emperor",
        "The Hierophant": "The Hierophant",
        "The Lovers": "The Lovers",
        "The Chariot": "The Chariot",
        "Justice": "Justice",
        "The Hermit": "The Hermit",
        "Wheel of Fortune": "Wheel of Fortune",
        "Strength": "Strength",
        "The Hanged Man": "The Hanged Man",
        "Death": "Death",
        "Temperance": "Temperance",
        "The Devil": "The Devil",
        "The Tower": "The Tower",
        "The Star": "The Star",
        "The Moon": "The Moon",
        "The Sun": "The Sun",
        "Judgement": "Judgement",
        "The World": "The World",
        "Ace of Wands": "Ace of Wands",
        "Two of Wands": "Two of Wands",
        "Three of Wands": "Three of Wands",
        "Four of Wands": "Four of Wands",
        "Five of Wands": "Five of Wands",
        "Six of Wands": "Six of Wands",
        "Seven of Wands": "Seven of Wands",
        "Eight of Wands": "Eight of Wands",
        "Nine of Wands": "Nine of Wands",
        "Ten of Wands": "Ten of Wands",
        "Page of Wands": "Page of Wands",
        "Knight of Wands": "Knight of Wands",
        "Queen of Wands": "Queen of Wands",
        "King of Wands": "King of Wands",
        "Ace of Cups": "Ace of Cups",
        "Two of Cups": "Two of Cups",
        "Three of Cups": "Three of Cups",
        "Four of Cups": "Four of Cups",
        "Five of Cups": "Five of Cups",
        "Six of Cups": "Six of Cups",
        "Seven of Cups": "Seven of Cups",
        "Eight of Cups": "Eight of Cups",
        "Nine of Cups": "Nine of Cups",
        "Ten of Cups": "Ten of Cups",
        "Page of Cups": "Page of Cups",
        "Knight of Cups": "Knight of Cups",
        "Queen of Cups": "Queen of Cups",
        "King of Cups": "King of Cups",
        "Ace of Swords": "Ace of Swords",
        "Two of Swords": "Two of Swords",
        "Three of Swords": "Three of Swords",
        "Four of Swords": "Four of Swords",
        "Five of Swords": "Five of Swords",
        "Six of Swords": "Six of Swords",
        "Seven of Swords": "Seven of Swords",
        "Eight of Swords": "Eight of Swords",
        "Nine of Swords": "Nine of Swords",
        "Ten of Swords": "Ten of Swords",
        "Page of Swords": "Page of Swords",
        "Knight of Swords": "Knight of Swords",
        "Queen of Swords": "Queen of Swords",
        "King of Swords": "King of Swords",
        "Ace of Pentacles": "Ace of Pentacles",
        "Two of Pentacles": "Two of Pentacles",
        "Three of Pentacles": "Three of Pentacles",
        "Four of Pentacles": "Four of Pentacles",
        "Five of Pentacles": "Five of Pentacles",
        "Six of Pentacles": "Six of Pentacles",
        "Seven of Pentacles": "Seven of Pentacles",
        "Eight of Pentacles": "Eight of Pentacles",
        "Nine of Pentacles": "Nine of Pentacles",
        "Ten of Pentacles": "Ten of Pentacles",
        "Page of Pentacles": "Page of Pentacles",
        "Knight of Pentacles": "Knight of Pentacles",
        "Queen of Pentacles": "Queen of Pentacles",
        "King of Pentacles": "King of Pentacles"
    },
    fa: {
        "The Fool": "احمق",
        "The Magician": "جادوگر",
        "The High Priestess": "کاهنه بزرگ",
        "The Empress": "ملکه",
        "The Emperor": "امپراتور",
        "The Hierophant": "هیروفانت",
        "The Lovers": "عشاق",
        "The Chariot": "ارابه",
        "Justice": "عدالت",
        "The Hermit": "عابد",
        "Wheel of Fortune": "چرخ تقدیر",
        "Strength": "قدرت",
        "The Hanged Man": "مرد آویزان",
        "Death": "مرگ",
        "Temperance": "اعتدال",
        "The Devil": "شیطان",
        "The Tower": "برج",
        "The Star": "ستاره",
        "The Moon": "ماه",
        "The Sun": "خورشید",
        "Judgement": "داوری",
        "The World": "جهان",
        "Ace of Wands": "آس چوب",
        "Two of Wands": "دو چوب",
        "Three of Wands": "سه چوب",
        "Four of Wands": "چهار چوب",
        "Five of Wands": "پنج چوب",
        "Six of Wands": "شش چوب",
        "Seven of Wands": "هفت چوب",
        "Eight of Wands": "هشت چوب",
        "Nine of Wands": "نه چوب",
        "Ten of Wands": "ده چوب",
        "Page of Wands": "پیاده چوب",
        "Knight of Wands": "شوالیه چوب",
        "Queen of Wands": "ملکه چوب",
        "King of Wands": "پادشاه چوب",
        "Ace of Cups": "آس جام",
        "Two of Cups": "دو جام",
        "Three of Cups": "سه جام",
        "Four of Cups": "چهار جام",
        "Five of Cups": "پنج جام",
        "Six of Cups": "شش جام",
        "Seven of Cups": "هفت جام",
        "Eight of Cups": "هشت جام",
        "Nine of Cups": "نه جام",
        "Ten of Cups": "ده جام",
        "Page of Cups": "پیاده جام",
        "Knight of Cups": "شوالیه جام",
        "Queen of Cups": "ملکه جام",
        "King of Cups": "پادشاه جام",
        "Ace of Swords": "آس شمشیر",
        "Two of Swords": "دو شمشیر",
        "Three of Swords": "سه شمشیر",
        "Four of Swords": "چهار شمشیر",
        "Five of Swords": "پنج شمشیر",
        "Six of Swords": "شش شمشیر",
        "Seven of Swords": "هفت شمشیر",
        "Eight of Swords": "هشت شمشیر",
        "Nine of Swords": "نه شمشیر",
        "Ten of Swords": "ده شمشیر",
        "Page of Swords": "پیاده شمشیر",
        "Knight of Swords": "شوالیه شمشیر",
        "Queen of Swords": "ملکه شمشیر",
        "King of Swords": "پادشاه شمشیر",
        "Ace of Pentacles": "آس سکه",
        "Two of Pentacles": "دو سکه",
        "Three of Pentacles": "سه سکه",
        "Four of Pentacles": "چهار سکه",
        "Five of Pentacles": "پنج سکه",
        "Six of Pentacles": "شش سکه",
        "Seven of Pentacles": "هفت سکه",
        "Eight of Pentacles": "هشت سکه",
        "Nine of Pentacles": "نه سکه",
        "Ten of Pentacles": "ده سکه",
        "Page of Pentacles": "پیاده سکه",
        "Knight of Pentacles": "شوالیه سکه",
        "Queen of Pentacles": "ملکه سکه",
        "King of Pentacles": "پادشاه سکه"
    }
};

// Get translated card name
function getTranslatedCardName(cardName) {
    return cardNameTranslations[currentLanguage][cardName] || cardName;
}

// Update card back with actual card data
function updateCardBack(cardId) {
    const cardIndex = parseInt(cardId.replace('card', '')) - 1;
    const cardName = selectedCards[cardIndex];
    const cardImage = cardImageMap[cardName];
    const translatedCardName = getTranslatedCardName(cardName);
    
    const card = document.getElementById(cardId);
    const cardBack = card.querySelector('.card-back');
    
    // Update the card back with actual card data
    cardBack.innerHTML = `
        <div class="card-image">
            <img src="cards/${cardName}/${cardImage}" alt="${cardName}" />
        </div>
    `;
}

// Array of all available tarot cards
const allTarotCards = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", "The Hierophant", "The Lovers", "The Chariot", "Justice", "The Hermit", "Wheel of Fortune", "Strength", "The Hanged Man", "Death", "Temperance", "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World",
    "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands", "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands", "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands",
    "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups", "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups", "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
    "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords", "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords", "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",
    "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles", "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles", "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
];

// Selected cards for this reading
let selectedCards = [];

// Randomly select 3 cards for this reading
function selectRandomCards() {
    const shuffled = [...allTarotCards].sort(() => 0.5 - Math.random());
    selectedCards = shuffled.slice(0, 3);
    console.log('Selected cards:', selectedCards);
}

// Get card data for results display
function getCardData(cardId) {
    const cardIndex = parseInt(cardId.replace('card', '')) - 1;
    const cardName = selectedCards[cardIndex];
    
    return {
        name: cardName,
        image: `cards/${cardName}/${getCardImage(cardName)}`,
        description: null // Will be loaded dynamically
    };
}

// Get the image filename for a card (since names are random)
function getCardImage(cardName) {
    // This will be populated when we scan the directory
    return cardImageMap[cardName] || 'default.png';
}

// Map of card names to their image filenames
let cardImageMap = {};

// Load card image mapping with actual filenames
function loadCardImageMap() {
    const imageMappings = {
        "Ace of Cups": "Gemini_Generated_Image_rsenqursenqursen.png",
        "Ace of Pentacles": "Gemini_Generated_Image_7xy8md7xy8md7xy8.png",
        "Ace of Swords": "Gemini_Generated_Image_wsr1s7wsr1s7wsr1.png",
        "Ace of Wands": "Gemini_Generated_Image_q5615mq5615mq561.png",
        "Death": "Gemini_Generated_Image_l9xp6nl9xp6nl9xp (2).png",
        "Eight of Cups": "Gemini_Generated_Image_10teko10teko10te (1).png",
        "Eight of Pentacles": "Gemini_Generated_Image_f01blaf01blaf01b (1).png",
        "Eight of Swords": "Gemini_Generated_Image_g27gixg27gixg27g (3).png",
        "Eight of Wands": "Gemini_Generated_Image_ps5w8dps5w8dps5w (3).png",
        "Five of Cups": "Gemini_Generated_Image_wyqqxrwyqqxrwyqq.png",
        "Five of Pentacles": "Gemini_Generated_Image_uyu0euyu0euyu0eu (2).png",
        "Five of Swords": "Gemini_Generated_Image_g27gixg27gixg27g.png",
        "Five of Wands": "Gemini_Generated_Image_ps5w8dps5w8dps5w.png",
        "Four of Cups": "Gemini_Generated_Image_c4ow4gc4ow4gc4ow.png",
        "Four of Pentacles": "Gemini_Generated_Image_uyu0euyu0euyu0eu (1).png",
        "Four of Swords": "Gemini_Generated_Image_wsr1s7wsr1s7wsr1 (3).png",
        "Four of Wands": "Gemini_Generated_Image_garf6ggarf6ggarf.png",
        "Judgement": "Gemini_Generated_Image_giuommgiuommgiuo.png",
        "Justice": "Gemini_Generated_Image_g0d7y5g0d7y5g0d7 (3).png",
        "King of Cups": "Gemini_Generated_Image_yzpollyzpollyzpo.png",
        "King of Pentacles": "Gemini_Generated_Image_dlsfk0dlsfk0dlsf (3).png",
        "King of Swords": "Gemini_Generated_Image_5o87275o87275o87.png",
        "King of Wands": "Gemini_Generated_Image_garf6ggarf6ggarf (1).png",
        "Knight of Cups": "Gemini_Generated_Image_rm87k8rm87k8rm87.png",
        "Knight of Pentacles": "Gemini_Generated_Image_dlsfk0dlsfk0dlsf (1).png",
        "Knight of Swords": "Gemini_Generated_Image_klelyvklelyvklel.png",
        "Knight of Wands": "Gemini_Generated_Image_f0x16kf0x16kf0x1 (1).png",
        "Nine of Cups": "Gemini_Generated_Image_10teko10teko10te (2).png",
        "Nine of Pentacles": "Gemini_Generated_Image_f01blaf01blaf01b (2).png",
        "Nine of Swords": "Gemini_Generated_Image_loo9btloo9btloo9.png",
        "Nine of Wands": "Gemini_Generated_Image_fg1fkqfg1fkqfg1f.png",
        "Page of Cups": "Gemini_Generated_Image_mkb02imkb02imkb0.png",
        "Page of Pentacles": "Gemini_Generated_Image_dlsfk0dlsfk0dlsf.png",
        "Page of Swords": "Gemini_Generated_Image_h1j63nh1j63nh1j6.png",
        "Page of Wands": "Gemini_Generated_Image_yxm6bbyxm6bbyxm6.png",
        "Queen of Cups": "Gemini_Generated_Image_9pqwzk9pqwzk9pqw.png",
        "Queen of Pentacles": "Gemini_Generated_Image_dlsfk0dlsfk0dlsf (2).png",
        "Queen of Swords": "Gemini_Generated_Image_5uysip5uysip5uys.png",
        "Queen of Wands": "Gemini_Generated_Image_hneaj6hneaj6hnea.png",
        "Seven of Cups": "Gemini_Generated_Image_10teko10teko10te.png",
        "Seven of Pentacles": "Gemini_Generated_Image_f01blaf01blaf01b.png",
        "Seven of Swords": "Gemini_Generated_Image_g27gixg27gixg27g (2).png",
        "Seven of Wands": "Gemini_Generated_Image_ps5w8dps5w8dps5w (2).png",
        "Six of Cups": "Gemini_Generated_Image_ucfldaucfldaucfl.png",
        "Six of Pentacles": "Gemini_Generated_Image_uyu0euyu0euyu0eu (3).png",
        "Six of Swords": "Gemini_Generated_Image_g27gixg27gixg27g (1).png",
        "Six of Wands": "Gemini_Generated_Image_ps5w8dps5w8dps5w (1).png",
        "Strength": "Gemini_Generated_Image_g0d7y5g0d7y5g0d7.png",
        "Temperance": "Gemini_Generated_Image_l9xp6nl9xp6nl9xp (3).png",
        "Ten of Cups": "Gemini_Generated_Image_10teko10teko10te (3).png",
        "Ten of Pentacles": "Gemini_Generated_Image_f01blaf01blaf01b (3).png",
        "Ten of Swords": "Gemini_Generated_Image_5ugz0b5ugz0b5ugz.png",
        "Ten of Wands": "Gemini_Generated_Image_fg1fkqfg1fkqfg1f (1).png",
        "The Chariot": "Gemini_Generated_Image_pd0btqpd0btqpd0b (3).png",
        "The Devil": "Gemini_Generated_Image_l9xp6nl9xp6nl9xp (4).png",
        "The Emperor": "Gemini_Generated_Image_pd0btqpd0btqpd0b.png",
        "The Empress": "Gemini_Generated_Image_v20mduv20mduv20m (3).png",
        "The Fool": "Gemini_Generated_Image_v20mduv20mduv20m.png",
        "The Hanged Man": "Gemini_Generated_Image_l9xp6nl9xp6nl9xp (1).png",
        "The Hermit": "Gemini_Generated_Image_g0d7y5g0d7y5g0d7 (1).png",
        "The Hierophant": "Gemini_Generated_Image_pd0btqpd0btqpd0b (1).png",
        "The High Priestess": "Gemini_Generated_Image_v20mduv20mduv20m (2).png",
        "The Lovers": "Gemini_Generated_Image_pd0btqpd0btqpd0b (2).png",
        "The Magician": "Gemini_Generated_Image_v20mduv20mduv20m (1).png",
        "The Moon": "Gemini_Generated_Image_asyk7kasyk7kasyk (3).png",
        "The Star": "Gemini_Generated_Image_asyk7kasyk7kasyk (2).png",
        "The Sun": "Gemini_Generated_Image_asyk7kasyk7kasyk.png",
        "The Tower": "Gemini_Generated_Image_asyk7kasyk7kasyk (1).png",
        "The World": "Gemini_Generated_Image_giuommgiuommgiuo (1).png",
        "Three of Cups": "Gemini_Generated_Image_so7zhyso7zhyso7z.png",
        "Three of Pentacles": "Gemini_Generated_Image_uyu0euyu0euyu0eu.png",
        "Three of Swords": "Gemini_Generated_Image_wsr1s7wsr1s7wsr1 (2).png",
        "Three of Wands": "Gemini_Generated_Image_11nu3p11nu3p11nu.png",
        "Two of Cups": "Gemini_Generated_Image_rsenqursenqursen (1).png",
        "Two of Pentacles": "Gemini_Generated_Image_7xy8md7xy8md7xy8 (1).png",
        "Two of Swords": "Gemini_Generated_Image_wsr1s7wsr1s7wsr1 (1).png",
        "Two of Wands": "Gemini_Generated_Image_f0x16kf0x16kf0x1.png",
        "Wheel of Fortune": "Gemini_Generated_Image_g0d7y5g0d7y5g0d7 (2).png"
    };
    
    cardImageMap = imageMappings;
}

// Enable video sound on user interaction
function enableVideoSound() {
    // Enable sound for all videos on first user interaction
    startingVideo.muted = false;
    englishVideo.muted = false;
    farsiVideo.muted = false;
    englishAstroVideo.muted = false;
    farsiAstroVideo.muted = false;
    englishResultsVideo.muted = false;
    farsiResultsVideo.muted = false;
}

// Restart the application
function restartApp() {
    console.log('🔄 Restarting app...');
    
    // Reset flipped cards
    flippedCards = [];
    
    // Reset card index
    currentCardIndex = 0;
    
    // Select new random cards for the next reading
    selectRandomCards();
    
    // Reset all screens
    resultsScreen.classList.remove('visible');
    loadingScreen.classList.remove('visible');
    cardSelectionScreen.classList.remove('visible');
    astroSignScreen.classList.remove('visible');
    
    // Ensure welcome screen is visible and not hidden
    welcomeScreen.classList.remove('hidden');
    welcomeScreen.classList.add('visible');
    
    console.log('✅ Welcome screen should be visible now');
    
    // Reset all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped', 'disappearing');
        card.style.display = '';
        card.style.boxShadow = '';
    });
    
    // Reset videos - pause all and hide them
    englishVideo.style.opacity = '0';
    englishVideo.pause();
    farsiVideo.style.opacity = '0';
    farsiVideo.pause();
    englishAstroVideo.style.opacity = '0';
    englishAstroVideo.pause();
    farsiAstroVideo.style.opacity = '0';
    farsiAstroVideo.pause();
    englishResultsVideo.style.opacity = '0';
    englishResultsVideo.pause();
    farsiResultsVideo.style.opacity = '0';
    farsiResultsVideo.pause();
    
    // Play starting video
    startingVideo.style.opacity = '1';
    startingVideo.currentTime = 0;
    startingVideo.play();
}

// Initialize the application
function init() {
    // Load card image mapping
    loadCardImageMap();
    
    // Select random cards for this reading
    selectRandomCards();
    
    // Create animated background
    createStars();
    
    // Setup video listeners
    setupVideoListeners();
    
    // Set up event listeners
    startBtn.addEventListener('click', () => {
        enableVideoSound();
        trackEvent('journey_started', {
            language: currentLanguage
        });
        handleStartClick();
    });
    
    langEnBtn.addEventListener('click', () => {
        enableVideoSound();
        trackEvent('language_changed', {
            language: 'en'
        });
        switchLanguage('en');
        // Switch video if we're past the welcome screen
        if (cardSelectionScreen.classList.contains('visible') || astroSignScreen.classList.contains('visible')) {
            switchLanguageVideo('en');
        }
    });
    langFaBtn.addEventListener('click', () => {
        enableVideoSound();
        trackEvent('language_changed', {
            language: 'fa'
        });
        switchLanguage('fa');
        // Switch video if we're past the welcome screen
        if (cardSelectionScreen.classList.contains('visible') || astroSignScreen.classList.contains('visible')) {
            switchLanguageVideo('fa');
        }
    });
    
    // Card click handlers
    document.getElementById('card1').addEventListener('click', () => handleCardClick('card1'));
    document.getElementById('card2').addEventListener('click', () => handleCardClick('card2'));
    document.getElementById('card3').addEventListener('click', () => handleCardClick('card3'));
    
    // Restart button handler (if it exists)
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            enableVideoSound();
            trackEvent('app_restarted', {
                language: currentLanguage
            });
            restartApp();
        });
    }
    
    // Enable sound on any user interaction
    document.addEventListener('click', enableVideoSound, { once: true });
    document.addEventListener('touchstart', enableVideoSound, { once: true });
    
    // Backend API will be called when needed
    
    // Initialize with English (but don't switch video yet - starting video should play first)
    switchLanguage('en', false);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Track initial page view
    trackPageView('Nyx\'s Vision - Welcome');
    init();
});