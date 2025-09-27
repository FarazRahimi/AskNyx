# Google Analytics Setup for Nyx's Vision

## Setup Instructions

1. **Create a Google Analytics Account**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property for your website
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Update the Tracking Code**
   - Open `index.html`
   - Replace `GA_MEASUREMENT_ID` with your actual Measurement ID in two places:
     ```html
     <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"></script>
     <script>
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'YOUR_MEASUREMENT_ID');
     </script>
     ```

3. **Update JavaScript Configuration**
   - Open `script.js`
   - Replace `GA_MEASUREMENT_ID` with your actual Measurement ID in the `trackPageView` function:
     ```javascript
     function trackPageView(pageName) {
         if (typeof gtag !== 'undefined') {
             gtag('config', 'YOUR_MEASUREMENT_ID', {
                 page_title: pageName,
                 page_location: window.location.href
             });
             console.log('📊 Page View:', pageName);
         }
     }
     ```

## Tracked Events

The app automatically tracks the following user interactions:

### Core Events
- **journey_started** - When user clicks "Start Journey"
- **language_changed** - When user switches between English/Farsi
- **zodiac_sign_selected** - When user selects their zodiac sign
- **card_selected** - When user flips each card (3 events total)
- **fortune_reading_completed** - When the full reading is completed
- **app_restarted** - When user clicks "Try Again"

### Event Parameters
Each event includes relevant context:
- `language` - Current language (en/fa)
- `sign` - Selected zodiac sign name
- `card_id` - Card identifier (card1, card2, card3)
- `card_name` - Actual card name (e.g., "The Fool")
- `cards_flipped` - Number of cards flipped so far
- `astro_sign` - Selected zodiac sign
- `total_cards` - Total number of cards (always 3)

## Analytics Dashboard

Once set up, you can view analytics data in your Google Analytics dashboard:

1. **Real-time Reports** - See live user activity
2. **Events Report** - View detailed event tracking data
3. **Audience Reports** - Understand your user demographics
4. **Behavior Reports** - See how users navigate through your app

## Privacy Considerations

- The app only tracks user interactions, not personal data
- No sensitive information is collected
- Users can disable tracking by blocking Google Analytics in their browser
- Consider adding a privacy notice if required by your jurisdiction

## Testing

To test if analytics is working:

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for messages starting with "📊 Analytics Event:" or "📊 Page View:"
4. Check Google Analytics Real-time reports for live data

## Troubleshooting

- **No data appearing**: Check that your Measurement ID is correct
- **Console errors**: Ensure the Google Analytics script loads properly
- **Missing events**: Verify JavaScript is enabled and not blocked by ad blockers
