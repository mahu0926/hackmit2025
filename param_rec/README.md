# FreshCart - AI-Powered Grocery Shopping & Meal Planning

A comprehensive grocery shopping platform with AI-powered meal planning, personalized recommendations, and intelligent grocery list generation.

## Features

### 🎯 Personalized Survey System
- **7-question onboarding survey** covering:
  - Personal information (name, age)
  - Cuisine preferences (12 options)
  - Health data access consent
  - Food goals (12 options)
  - Dietary restrictions (12 options)
  - Additional requirements

### 🤖 AI Meal Planning
- **OpenAI ChatGPT integration** for personalized meal plans
- 7-day meal suggestions based on user preferences
- Nutritional information for each meal
- Ingredient lists with quantities
- Cuisine-specific recommendations

### 🛒 Smart Grocery Shopping
- **Personalized product recommendations** based on survey data
- Category filtering and search functionality
- Real-time cart management
- Integration with meal plan grocery lists
- Custom product creation for meal plan items

### 📱 Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation
- Real-time notifications
- Progress tracking

## Setup Instructions

### 1. OpenAI API Configuration

To enable AI meal planning functionality:

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Open `meal-planner-script.js`
3. Replace `your-openai-api-key-here` with your actual API key:

```javascript
const OPENAI_API_KEY = 'sk-your-actual-api-key-here';
```

### 2. File Structure

```
hackmit2025/
├── index.html              # Main shopping interface
├── survey.html             # Onboarding survey
├── meal-planner.html       # AI meal planning interface
├── styles.css              # Main stylesheet
├── survey-styles.css       # Survey-specific styles
├── meal-planner-styles.css # Meal planner styles
├── script.js               # Main shopping functionality
├── survey-script.js        # Survey functionality
├── meal-planner-script.js  # AI meal planning functionality
└── README.md               # This file
```

### 3. Running the Application

1. Open `survey.html` in your browser to start the onboarding process
2. Complete the survey to create your personalized profile
3. Access the main shopping interface at `index.html`
4. Use the meal planner at `meal-planner.html` for AI-generated meal plans

## How It Works

### Survey → Personalization → Meal Planning → Shopping

1. **Survey Collection**: Users complete a comprehensive survey
2. **Profile Creation**: Survey data is processed into a user profile
3. **Meal Planning**: AI generates personalized meal plans using OpenAI
4. **Grocery List**: Ingredients are automatically converted to a shopping list
5. **Smart Shopping**: Products are filtered and recommended based on preferences

### AI Integration

The meal planning feature uses OpenAI's GPT-3.5-turbo model to:
- Analyze user preferences and restrictions
- Generate culturally appropriate meal suggestions
- Provide nutritional information
- Create practical ingredient lists
- Ensure dietary compliance

### Data Flow

```
Survey Data → User Profile → AI Prompt → Meal Plan → Grocery List → Shopping Cart
```

## Customization

### Adding New Products
Edit the `products` array in `script.js` to add new items with:
- Basic information (name, price, category)
- Dietary tags and restrictions
- Cuisine preferences
- Health goals alignment

### Modifying Survey Questions
Update `survey.html` and `survey-script.js` to:
- Add new question types
- Modify existing questions
- Change validation rules
- Update data processing

### Styling
All styles are organized in separate CSS files:
- `styles.css` - Main application styles
- `survey-styles.css` - Survey-specific styles
- `meal-planner-styles.css` - Meal planner styles

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security Notes

- API keys should be stored securely in production
- Consider implementing server-side API calls for production use
- User data is stored locally in browser localStorage

## Future Enhancements

- User authentication and cloud storage
- Recipe integration and cooking instructions
- Nutritional tracking and analytics
- Social features and meal sharing
- Integration with real grocery APIs
- Mobile app development

## Troubleshooting

### OpenAI API Issues
- Verify API key is correct and active
- Check API usage limits and billing
- Ensure network connectivity

### Survey Not Loading
- Check browser console for JavaScript errors
- Verify all files are in the correct directory
- Clear browser cache and localStorage

### Meal Plan Generation Fails
- Confirm OpenAI API key is configured
- Check internet connection
- Verify API quota and limits

## Support

For issues or questions, please check the browser console for error messages and ensure all files are properly configured.
