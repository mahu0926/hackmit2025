// OpenAI API Configuration
const OPENAI_API_KEY = 'your-openai-api-key-here'; // Replace with actual API key
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// User profile data
let userProfile = {};
let generatedMealPlan = null;
let groceryList = [];

// DOM elements
const profileSummary = document.getElementById('profileSummary');
const generateMealPlanBtn = document.getElementById('generateMealPlan');
const loadingState = document.getElementById('loadingState');
const mealPlanResults = document.getElementById('mealPlanResults');
const groceryListSection = document.getElementById('groceryListSection');
const groceryList = document.getElementById('groceryList');
const addAllToCartBtn = document.getElementById('addAllToCart');
const exportListBtn = document.getElementById('exportList');

// Initialize the meal planner
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    displayProfileSummary();
    setupEventListeners();
});

// Load user profile from survey data
function loadUserProfile() {
    const savedProfile = localStorage.getItem('freshCartUserProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        console.log('Loaded user profile for meal planning:', userProfile);
    } else {
        // Redirect to survey if no profile found
        window.location.href = 'survey.html';
    }
}

// Display user profile summary
function displayProfileSummary() {
    const profileHTML = `
        <h2>Your Profile Summary</h2>
        <div class="profile-grid">
            <div class="profile-item">
                <div class="profile-label">Name</div>
                <div class="profile-value">${userProfile.name || 'Not specified'}</div>
            </div>
            <div class="profile-item">
                <div class="profile-label">Age Range</div>
                <div class="profile-value">${userProfile.age || 'Not specified'}</div>
            </div>
            <div class="profile-item">
                <div class="profile-label">Favorite Cuisines</div>
                <div class="profile-value">
                    <div class="profile-tags">
                        ${(userProfile.cuisines || []).map(cuisine => 
                            `<span class="profile-tag">${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <div class="profile-item">
                <div class="profile-label">Health Goals</div>
                <div class="profile-value">
                    <div class="profile-tags">
                        ${(userProfile.goals || []).map(goal => 
                            `<span class="profile-tag">${goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <div class="profile-item">
                <div class="profile-label">Dietary Restrictions</div>
                <div class="profile-value">
                    <div class="profile-tags">
                        ${(userProfile.restrictions || []).map(restriction => 
                            `<span class="profile-tag">${restriction.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <div class="profile-item">
                <div class="profile-label">Health Data Access</div>
                <div class="profile-value">${userProfile.healthDataAccess ? 'Yes' : 'No'}</div>
            </div>
        </div>
    `;
    
    profileSummary.innerHTML = profileHTML;
}

// Setup event listeners
function setupEventListeners() {
    generateMealPlanBtn.addEventListener('click', generateMealPlan);
    addAllToCartBtn.addEventListener('click', addAllToCart);
    exportListBtn.addEventListener('click', exportGroceryList);
}

// Generate meal plan using OpenAI
async function generateMealPlan() {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
        showNotification('Please configure your OpenAI API key to use this feature', 'warning');
        return;
    }

    generateMealPlanBtn.disabled = true;
    loadingState.style.display = 'block';
    mealPlanResults.style.display = 'none';
    groceryListSection.style.display = 'none';

    try {
        const prompt = createMealPlanPrompt();
        const response = await callOpenAI(prompt);
        
        if (response) {
            generatedMealPlan = parseMealPlanResponse(response);
            displayMealPlan(generatedMealPlan);
            generateGroceryList(generatedMealPlan);
            showNotification('Meal plan generated successfully!', 'success');
        }
    } catch (error) {
        console.error('Error generating meal plan:', error);
        showNotification('Failed to generate meal plan. Please try again.', 'error');
    } finally {
        generateMealPlanBtn.disabled = false;
        loadingState.style.display = 'none';
    }
}

// Create prompt for OpenAI
function createMealPlanPrompt() {
    const cuisines = (userProfile.cuisines || []).join(', ');
    const goals = (userProfile.goals || []).join(', ');
    const restrictions = (userProfile.restrictions || []).join(', ');
    const age = userProfile.age || '25-34';
    const additionalInfo = userProfile.additionalInfo || '';

    return `Create a personalized 7-day meal plan for someone with the following profile:

Name: ${userProfile.name || 'User'}
Age Range: ${age}
Favorite Cuisines: ${cuisines}
Health Goals: ${goals}
Dietary Restrictions: ${restrictions}
Additional Information: ${additionalInfo}

Please provide:
1. 7 days of meals (breakfast, lunch, dinner, and 2 snacks per day)
2. Each meal should include:
   - Name of the dish
   - Brief description
   - Estimated calories, protein, and carbs
   - List of main ingredients
3. Focus on the favorite cuisines mentioned
4. Ensure meals align with health goals and respect dietary restrictions
5. Make meals practical and easy to prepare
6. Include variety throughout the week

Format the response as JSON with this structure:
{
  "mealPlan": [
    {
      "day": "Monday",
      "meals": {
        "breakfast": {
          "name": "Meal Name",
          "description": "Brief description",
          "nutrition": {
            "calories": 400,
            "protein": "25g",
            "carbs": "45g"
          },
          "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
        },
        "lunch": { ... },
        "dinner": { ... },
        "snack1": { ... },
        "snack2": { ... }
      }
    }
  ]
}`;
}

// Call OpenAI API
async function callOpenAI(prompt) {
    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional nutritionist and meal planning expert. Create detailed, personalized meal plans based on user preferences, dietary restrictions, and health goals. Always respond with valid JSON format.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 3000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}

// Parse meal plan response from OpenAI
function parseMealPlanResponse(response) {
    try {
        // Clean the response to extract JSON
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error('No valid JSON found in response');
        }
    } catch (error) {
        console.error('Error parsing meal plan response:', error);
        // Fallback to demo data
        return generateDemoMealPlan();
    }
}

// Generate demo meal plan (fallback)
function generateDemoMealPlan() {
    return {
        mealPlan: [
            {
                day: "Monday",
                meals: {
                    breakfast: {
                        name: "Mediterranean Omelet",
                        description: "Fluffy omelet with spinach, tomatoes, and feta cheese",
                        nutrition: { calories: 350, protein: "22g", carbs: "8g" },
                        ingredients: ["eggs", "spinach", "tomatoes", "feta cheese", "olive oil"]
                    },
                    lunch: {
                        name: "Quinoa Buddha Bowl",
                        description: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
                        nutrition: { calories: 450, protein: "18g", carbs: "55g" },
                        ingredients: ["quinoa", "sweet potato", "broccoli", "chickpeas", "tahini"]
                    },
                    dinner: {
                        name: "Grilled Salmon with Herbs",
                        description: "Fresh salmon with lemon herb seasoning and roasted asparagus",
                        nutrition: { calories: 400, protein: "35g", carbs: "12g" },
                        ingredients: ["salmon fillet", "lemon", "herbs", "asparagus", "olive oil"]
                    },
                    snack1: {
                        name: "Greek Yogurt with Berries",
                        description: "Protein-rich snack with fresh mixed berries",
                        nutrition: { calories: 150, protein: "12g", carbs: "20g" },
                        ingredients: ["greek yogurt", "mixed berries", "honey"]
                    },
                    snack2: {
                        name: "Almonds and Apple",
                        description: "Healthy combination of nuts and fruit",
                        nutrition: { calories: 200, protein: "6g", carbs: "25g" },
                        ingredients: ["almonds", "apple"]
                    }
                }
            }
        ]
    };
}

// Display meal plan
function displayMealPlan(mealPlanData) {
    const mealPlanHTML = mealPlanData.mealPlan.map(day => `
        <div class="meal-card">
            <div class="meal-type">${day.day}</div>
            ${Object.entries(day.meals).map(([mealType, meal]) => `
                <div class="meal-item">
                    <div class="meal-name">${meal.name}</div>
                    <div class="meal-description">${meal.description}</div>
                    <div class="meal-nutrition">
                        <div class="nutrition-item">
                            <div class="nutrition-value">${meal.nutrition.calories}</div>
                            <div class="nutrition-label">Calories</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${meal.nutrition.protein}</div>
                            <div class="nutrition-label">Protein</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${meal.nutrition.carbs}</div>
                            <div class="nutrition-label">Carbs</div>
                        </div>
                    </div>
                    <div class="meal-ingredients">
                        <div class="ingredients-title">Ingredients:</div>
                        <div class="ingredients-list">
                            ${meal.ingredients.map(ingredient => 
                                `<span class="ingredient-tag">${ingredient}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    mealPlanResults.innerHTML = `
        <div class="meal-plan-grid">
            ${mealPlanHTML}
        </div>
    `;
    
    mealPlanResults.style.display = 'block';
}

// Generate grocery list from meal plan
function generateGroceryList(mealPlanData) {
    const ingredientCount = {};
    
    mealPlanData.mealPlan.forEach(day => {
        Object.values(day.meals).forEach(meal => {
            meal.ingredients.forEach(ingredient => {
                const normalizedIngredient = ingredient.toLowerCase().trim();
                ingredientCount[normalizedIngredient] = (ingredientCount[normalizedIngredient] || 0) + 1;
            });
        });
    });

    groceryList = Object.entries(ingredientCount).map(([ingredient, count]) => ({
        name: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
        quantity: count > 1 ? `${count} servings` : '1 serving',
        category: getIngredientCategory(ingredient),
        checked: false
    }));

    displayGroceryList();
    groceryListSection.style.display = 'block';
}

// Get ingredient category for organization
function getIngredientCategory(ingredient) {
    const categories = {
        'produce': ['spinach', 'tomatoes', 'broccoli', 'sweet potato', 'asparagus', 'apple', 'berries', 'lemon'],
        'dairy': ['eggs', 'feta cheese', 'greek yogurt', 'milk', 'cheese'],
        'meat': ['salmon', 'chicken', 'beef', 'turkey', 'fish'],
        'pantry': ['quinoa', 'olive oil', 'honey', 'tahini', 'herbs'],
        'snacks': ['almonds', 'nuts', 'seeds']
    };

    for (const [category, items] of Object.entries(categories)) {
        if (items.some(item => ingredient.includes(item))) {
            return category;
        }
    }
    return 'other';
}

// Display grocery list
function displayGroceryList() {
    const groceryHTML = groceryList.map((item, index) => `
        <div class="grocery-item">
            <input type="checkbox" id="grocery-${index}" ${item.checked ? 'checked' : ''} 
                   onchange="toggleGroceryItem(${index})">
            <div class="grocery-details">
                <div class="grocery-name">${item.name}</div>
                <div class="grocery-category">${item.category}</div>
            </div>
            <div class="grocery-quantity">${item.quantity}</div>
        </div>
    `).join('');

    groceryList.innerHTML = groceryHTML;
}

// Toggle grocery item
function toggleGroceryItem(index) {
    groceryList[index].checked = !groceryList[index].checked;
}

// Add all items to cart
function addAllToCart() {
    const selectedItems = groceryList.filter(item => item.checked);
    
    if (selectedItems.length === 0) {
        showNotification('Please select items to add to cart', 'warning');
        return;
    }

    // Store grocery list in localStorage for the main shopping interface
    localStorage.setItem('freshCartGroceryList', JSON.stringify(selectedItems));
    
    showNotification(`${selectedItems.length} items added to your shopping cart!`, 'success');
    
    // Redirect to main shopping interface
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Export grocery list
function exportGroceryList() {
    const selectedItems = groceryList.filter(item => item.checked);
    const allItems = selectedItems.length > 0 ? selectedItems : groceryList;
    
    const listText = allItems.map(item => 
        `- ${item.name} (${item.quantity}) - ${item.category}`
    ).join('\n');
    
    const blob = new Blob([listText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grocery-list.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Grocery list exported successfully!', 'success');
}

// Go to shopping interface
function goToShopping() {
    window.location.href = 'index.html';
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}
