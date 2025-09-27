# Mystic Vision - Magical Web Application

A mystical, magical web application with smooth video transitions and bilingual support.

## 🎬 Video Setup

### Required Video Files
Place your videos in the `videos/` folder with these exact names:

```
videos/
├── starting-video.mp4    # Video shown on welcome screen
├── english-video.mp4     # Video shown when English is selected
└── farsi-video.mp4       # Video shown when Farsi is selected
```

### Video Specifications
- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1280x720 or higher
- **Duration**: 10-30 seconds (plays once, stops on last frame)
- **File Size**: Keep under 10MB each for better performance

### Video Content Suggestions
- **Starting Video**: Mystical, welcoming atmosphere (plays first, then stops on last frame)
- **English Video**: Content that complements English text (plays when English is selected)
- **Farsi Video**: Content that complements Farsi text (plays when Farsi is selected)

### Video Behavior
1. **Page Load**: Starting video plays automatically with sound
2. **Video End**: Videos stop on their last frame (no looping)
3. **Language Switch**: Smooth 1.5-second fade transition between videos
4. **Volume Control**: Adjustable volume slider in top-right corner

## 🚀 How to Run

### Method 1: Local Server (Recommended)
```bash
# Navigate to project folder
cd "C:\Users\faraz\OneDrive\Desktop\Code\AstroWeb"

# Start Python server
python -m http.server 8000

# Open browser and go to:
# http://localhost:8000
```

### Method 2: Direct File Opening
1. Double-click `index.html`
2. Opens in default browser

## ✨ Features

- **Magical Aesthetic**: Purple background with twinkling stars
- **Smooth Video Transitions**: 1.5-second fade between videos
- **Bilingual Support**: English/Farsi with RTL support
- **Responsive Design**: Mobile-first approach
- **Interactive Cards**: Flippable cards with hover effects
- **No Scrolling**: Fixed viewport design

## 🎯 User Flow

1. **Welcome Screen**: Starting video plays
2. **Click "Start Journey"**: Transitions to English video
3. **Language Switching**: Smooth video transitions
4. **Card Selection**: Interactive mystical cards

## 📁 File Structure

```
AstroWeb/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # All JavaScript functionality
├── videos/             # Video files folder
│   ├── starting-video.mp4
│   ├── english-video.mp4
│   └── farsi-video.mp4
└── README.md           # This file
```

## 🛠️ Customization

- **Colors**: Edit `styles.css` to change the magical color scheme
- **Text**: Modify translations in `script.js`
- **Videos**: Replace video files in `videos/` folder
- **Animations**: Adjust timing in CSS transitions

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

Enjoy your mystical journey! ✨🔮🌟
