// Sample product data with enhanced categorization
const products = [
    {
        id: 1,
        name: "Organic Bananas",
        description: "Fresh, ripe bananas from local farms",
        price: 2.99,
        category: "produce",
        rating: 4.5,
        image: "🍌",
        dietary: ["organic", "vegan", "vegetarian"],
        tags: ["organic", "fresh"],
        cuisines: ["american", "mediterranean"],
        goals: ["improve-diet", "energy-boost", "heart-health"],
        restrictions: ["vegan", "vegetarian", "gluten-free"]
    },
    {
        id: 2,
        name: "Whole Milk",
        description: "Fresh, creamy whole milk",
        price: 3.49,
        category: "dairy",
        rating: 4.2,
        image: "🥛",
        dietary: ["vegetarian"],
        tags: ["fresh", "dairy"],
        cuisines: ["american", "french"],
        goals: ["muscle-building", "maintain-current"],
        restrictions: ["vegetarian"]
    },
    {
        id: 3,
        name: "Ground Beef",
        description: "Premium ground beef, 80/20 lean",
        price: 8.99,
        category: "meat",
        rating: 4.7,
        image: "🥩",
        dietary: [],
        tags: ["premium", "meat"],
        cuisines: ["american", "italian", "mexican"],
        goals: ["muscle-building", "weight-gain"],
        restrictions: []
    },
    {
        id: 4,
        name: "Sourdough Bread",
        description: "Artisan sourdough bread, freshly baked",
        price: 4.99,
        category: "bakery",
        rating: 4.8,
        image: "🍞",
        dietary: ["vegetarian"],
        tags: ["artisan", "fresh"],
        cuisines: ["french", "italian", "american"],
        goals: ["maintain-current"],
        restrictions: ["vegetarian"]
    },
    {
        id: 5,
        name: "Orange Juice",
        description: "100% pure orange juice, no pulp",
        price: 3.99,
        category: "beverages",
        rating: 4.3,
        image: "🧃",
        dietary: ["vegan", "vegetarian"],
        tags: ["pure", "juice"],
        cuisines: ["american", "mediterranean"],
        goals: ["energy-boost", "immune-support", "improve-diet"],
        restrictions: ["vegan", "vegetarian", "gluten-free"]
    },
    {
        id: 6,
        name: "Potato Chips",
        description: "Classic salted potato chips",
        price: 2.49,
        category: "snacks",
        rating: 4.1,
        image: "🍟",
        dietary: ["vegan", "vegetarian", "gluten-free"],
        tags: ["classic", "snacks"],
        cuisines: ["american"],
        goals: ["maintain-current"],
        restrictions: ["vegan", "vegetarian", "gluten-free"]
    },
    {
        id: 7,
        name: "Fresh Spinach",
        description: "Organic baby spinach leaves",
        price: 3.99,
        category: "produce",
        rating: 4.4,
        image: "🥬",
        dietary: ["organic", "vegan", "vegetarian", "keto"],
        tags: ["organic", "fresh", "healthy"],
        cuisines: ["mediterranean", "italian", "american"],
        goals: ["improve-diet", "heart-health", "immune-support", "weight-loss"],
        restrictions: ["vegan", "vegetarian", "keto"]
    },
    {
        id: 8,
        name: "Greek Yogurt",
        description: "Creamy Greek yogurt, plain",
        price: 4.49,
        category: "dairy",
        rating: 4.6,
        image: "🥛",
        dietary: ["vegetarian", "keto"],
        tags: ["creamy", "protein"],
        cuisines: ["mediterranean", "greek", "american"],
        goals: ["muscle-building", "digestive-health", "weight-loss"],
        restrictions: ["vegetarian"]
    },
    {
        id: 9,
        name: "Salmon Fillet",
        description: "Fresh Atlantic salmon fillet",
        price: 12.99,
        category: "meat",
        rating: 4.9,
        image: "🐟",
        dietary: ["keto"],
        tags: ["fresh", "premium", "healthy"],
        cuisines: ["japanese", "mediterranean", "american"],
        goals: ["heart-health", "muscle-building", "brain-health"],
        restrictions: ["keto"]
    },
    {
        id: 10,
        name: "Croissants",
        description: "Buttery, flaky croissants",
        price: 3.99,
        category: "bakery",
        rating: 4.5,
        image: "🥐",
        dietary: ["vegetarian"],
        tags: ["buttery", "flaky"],
        cuisines: ["french", "american"],
        goals: ["maintain-current"],
        restrictions: ["vegetarian"]
    },
    {
        id: 11,
        name: "Coca Cola",
        description: "Classic Coca Cola, 12 pack",
        price: 6.99,
        category: "beverages",
        rating: 4.0,
        image: "🥤",
        dietary: ["vegan", "vegetarian"],
        tags: ["classic", "soda"],
        cuisines: ["american"],
        goals: ["maintain-current"],
        restrictions: ["vegan", "vegetarian"]
    },
    {
        id: 12,
        name: "Chocolate Cookies",
        description: "Soft chocolate chip cookies",
        price: 4.49,
        category: "snacks",
        rating: 4.3,
        image: "🍪",
        dietary: ["vegetarian"],
        tags: ["chocolate", "sweet"],
        cuisines: ["american"],
        goals: ["maintain-current"],
        restrictions: ["vegetarian"]
    },
    {
        id: 13,
        name: "Gluten-Free Bread",
        description: "Soft gluten-free sandwich bread",
        price: 5.99,
        category: "bakery",
        rating: 4.2,
        image: "🍞",
        dietary: ["gluten-free", "vegan", "vegetarian"],
        tags: ["gluten-free", "soft"],
        cuisines: ["american", "mediterranean"],
        goals: ["digestive-health", "improve-diet"],
        restrictions: ["gluten-free", "vegan", "vegetarian"]
    },
    {
        id: 14,
        name: "Almond Milk",
        description: "Unsweetened almond milk",
        price: 3.99,
        category: "dairy",
        rating: 4.4,
        image: "🥛",
        dietary: ["vegan", "vegetarian", "gluten-free"],
        tags: ["dairy-free", "unsweetened"],
        cuisines: ["american", "mediterranean"],
        goals: ["digestive-health", "weight-loss", "improve-diet"],
        restrictions: ["vegan", "vegetarian", "gluten-free", "lactose-intolerance"]
    },
    {
        id: 15,
        name: "Keto Granola",
        description: "Low-carb keto-friendly granola",
        price: 7.99,
        category: "snacks",
        rating: 4.6,
        image: "🥣",
        dietary: ["keto", "gluten-free"],
        tags: ["keto", "low-carb"],
        cuisines: ["american"],
        goals: ["weight-loss", "muscle-building", "energy-boost"],
        restrictions: ["keto", "gluten-free"]
    }
];

// Cart state
let cart = [];
let currentCategory = 'all';
let currentSort = 'name';
let searchQuery = '';
let userProfile = {};

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const sectionTitle = document.getElementById('sectionTitle');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    renderProducts();
    setupEventListeners();
    updateCartUI();
    showPersonalizedWelcome();
    updateHeaderWithUserInfo();
});

// Load user profile from survey
function loadUserProfile() {
    const savedProfile = localStorage.getItem('freshCartUserProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        console.log('Loaded user profile:', userProfile);
    } else {
        // Default profile if no survey data
        userProfile = {
            name: 'User',
            age: '25-34',
            cuisines: ['american'],
            healthDataAccess: false,
            goals: ['maintain-current'],
            restrictions: ['none'],
            additionalInfo: '',
            completedAt: new Date().toISOString()
        };
    }
}

// Update header with user info
function updateHeaderWithUserInfo() {
    const logo = document.querySelector('.logo span');
    if (userProfile.name && userProfile.name !== 'User') {
        logo.textContent = `Welcome, ${userProfile.name}!`;
    }
}

// Show personalized welcome message
function showPersonalizedWelcome() {
    const welcomeMessage = createWelcomeMessage();
    if (welcomeMessage) {
        showNotification(welcomeMessage, 'info');
    }
}

function createWelcomeMessage() {
    const name = userProfile.name || 'there';
    const cuisines = userProfile.cuisines || [];
    const goals = userProfile.goals || [];
    
    if (cuisines.length > 0 && goals.length > 0) {
        return `Welcome ${name}! We've curated ${cuisines.join(', ')} options to help with your ${goals.join(', ')} goals.`;
    } else if (cuisines.length > 0) {
        return `Welcome ${name}! We've highlighted ${cuisines.join(', ')} cuisine options for you.`;
    } else if (goals.length > 0) {
        return `Welcome ${name}! We've selected products to support your ${goals.join(', ')} goals.`;
    }
    return `Welcome ${name}! Let's find some great products for you.`;
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

// Event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.toLowerCase();
        renderProducts();
    });

    // Sort functionality
    sortSelect.addEventListener('change', function(e) {
        currentSort = e.target.value;
        renderProducts();
    });

    // Category filtering
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            sectionTitle.textContent = this.textContent === 'All' ? 'All Products' : this.textContent;
            renderProducts();
        });
    });

    // Cart functionality
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
}

// Render products with personalization
function renderProducts() {
    let filteredProducts = products;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }

    // Filter by search query
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
            product.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchQuery))
        );
    }

    // Apply personalization filters
    filteredProducts = applyPersonalizationFilters(filteredProducts);

    // Sort products
    filteredProducts.sort((a, b) => {
        // Prioritize user's favorite cuisines
        const aCuisineMatch = userProfile.cuisines.some(cuisine => a.cuisines.includes(cuisine));
        const bCuisineMatch = userProfile.cuisines.some(cuisine => b.cuisines.includes(cuisine));
        
        if (aCuisineMatch && !bCuisineMatch) return -1;
        if (!aCuisineMatch && bCuisineMatch) return 1;
        
        // Then prioritize user's goals
        const aGoalMatch = userProfile.goals.some(goal => a.goals.includes(goal));
        const bGoalMatch = userProfile.goals.some(goal => b.goals.includes(goal));
        
        if (aGoalMatch && !bGoalMatch) return -1;
        if (!aGoalMatch && bGoalMatch) return 1;
        
        // Then apply regular sorting
        switch (currentSort) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    // Clear grid
    productsGrid.innerHTML = '';

    // Show no products message if filtered list is empty
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    // Render product cards
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Apply personalization filters based on user profile
function applyPersonalizationFilters(products) {
    const userRestrictions = userProfile.restrictions || [];
    const userGoals = userProfile.goals || [];
    const userCuisines = userProfile.cuisines || [];
    
    return products.filter(product => {
        // Filter out products that conflict with user restrictions
        if (userRestrictions.includes('none')) {
            return true; // No restrictions
        }
        
        // Check if product matches user restrictions
        const hasConflictingRestriction = userRestrictions.some(restriction => {
            if (restriction === 'none') return false;
            return product.restrictions.includes(restriction);
        });
        
        if (hasConflictingRestriction) {
            return false;
        }
        
        // If user has specific goals, prioritize products that support those goals
        if (userGoals.length > 0 && !userGoals.includes('maintain-current')) {
            const supportsUserGoals = userGoals.some(goal => product.goals.includes(goal));
            return supportsUserGoals;
        }
        
        return true;
    });
}

// Create product card with personalization
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isInCart = cart.find(item => item.id === product.id);
    const quantity = isInCart ? isInCart.quantity : 0;
    
    // Check if product matches user preferences
    const isRecommended = isProductRecommended(product);
    const matchReasons = getMatchReasons(product);
    
    card.innerHTML = `
        ${isRecommended ? '<div class="recommended-badge">Recommended for you</div>' : ''}
        <div class="product-image">
            ${product.image}
        </div>
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description}</div>
        ${matchReasons ? `<div class="match-reasons">${matchReasons}</div>` : ''}
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-rating">
            <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
            <span class="rating-text">(${product.rating})</span>
        </div>
        <button class="add-to-cart" ${quantity > 0 ? 'disabled' : ''} onclick="addToCart(${product.id})">
            ${quantity > 0 ? 'In Cart' : 'Add to Cart'}
        </button>
    `;

    return card;
}

// Check if product is recommended based on user profile
function isProductRecommended(product) {
    const userCuisines = userProfile.cuisines || [];
    const userGoals = userProfile.goals || [];
    
    // Check if product matches user's favorite cuisines
    const cuisineMatch = userCuisines.some(cuisine => product.cuisines.includes(cuisine));
    
    // Check if product supports user's goals
    const goalMatch = userGoals.some(goal => product.goals.includes(goal));
    
    return cuisineMatch || goalMatch;
}

// Get match reasons for display
function getMatchReasons(product) {
    const reasons = [];
    const userCuisines = userProfile.cuisines || [];
    const userGoals = userProfile.goals || [];
    
    // Check cuisine matches
    const matchingCuisines = userCuisines.filter(cuisine => product.cuisines.includes(cuisine));
    if (matchingCuisines.length > 0) {
        reasons.push(`✓ ${matchingCuisines.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')} cuisine`);
    }
    
    // Check goal matches
    const matchingGoals = userGoals.filter(goal => product.goals.includes(goal));
    if (matchingGoals.length > 0) {
        reasons.push(`✓ Supports ${matchingGoals.map(g => g.replace('-', ' ')).join(', ')}`);
    }
    
    return reasons.join(' • ');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    renderProducts(); // Re-render to update button states
    showNotification(`${product.name} added to cart!`, 'success');
}

// Remove from cart
function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    renderProducts(); // Re-render to update button states
    showNotification(`${product.name} removed from cart`, 'info');
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <h3>Your cart is empty</h3>
                <p>Add some items to get started</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Update totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const totalAmount = subtotalAmount + deliveryFee;

    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    total.textContent = `$${totalAmount.toFixed(2)}`;

    // Update checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cart.length === 0;
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
}

// Checkout functionality
document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (cart.length === 0) return;
    
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 2.99;
    const userName = userProfile.name || 'there';
    
    alert(`Thank you for your order, ${userName}!\n\nTotal: $${totalAmount.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);
    
    // Clear cart after checkout
    cart = [];
    updateCartUI();
    renderProducts();
    toggleCart();
});

// Survey integration functions
function updatePreferences() {
    window.location.href = 'survey.html';
}

function goToSurvey() {
    window.location.href = 'survey.html';
}

// Load grocery list from meal planner
function loadGroceryListFromMealPlanner() {
    const savedGroceryList = localStorage.getItem('freshCartGroceryList');
    if (savedGroceryList) {
        const groceryItems = JSON.parse(savedGroceryList);
        console.log('Loading grocery list from meal planner:', groceryItems);
        
        // Add grocery items to cart
        groceryItems.forEach(item => {
            // Find matching product in our catalog
            const matchingProduct = findMatchingProduct(item.name);
            if (matchingProduct) {
                addToCart(matchingProduct.id);
            } else {
                // Create a custom product for items not in our catalog
                const customProduct = createCustomProduct(item);
                addCustomProductToCart(customProduct);
            }
        });
        
        // Clear the saved grocery list
        localStorage.removeItem('freshCartGroceryList');
        
        showNotification(`Added ${groceryItems.length} items from your meal plan to cart!`, 'success');
    }
}

// Find matching product in our catalog
function findMatchingProduct(itemName) {
    const normalizedName = itemName.toLowerCase();
    
    return products.find(product => {
        const productName = product.name.toLowerCase();
        const productDescription = product.description.toLowerCase();
        
        // Check for exact match or partial match
        return productName.includes(normalizedName) || 
               normalizedName.includes(productName) ||
               productDescription.includes(normalizedName);
    });
}

// Create custom product for items not in catalog
function createCustomProduct(item) {
    return {
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: item.name,
        description: `Custom item from meal plan`,
        price: 5.99, // Default price for custom items
        category: item.category || 'other',
        rating: 4.0,
        image: getCategoryIcon(item.category),
        dietary: [],
        tags: ['custom', 'meal-plan'],
        cuisines: [],
        goals: [],
        restrictions: [],
        isCustom: true
    };
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'produce': '🥬',
        'dairy': '🥛',
        'meat': '🥩',
        'pantry': '🥫',
        'snacks': '🍪',
        'other': '📦'
    };
    return icons[category] || '📦';
}

// Add custom product to cart
function addCustomProductToCart(customProduct) {
    const existingItem = cart.find(item => item.id === customProduct.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...customProduct,
            quantity: 1
        });
    }
}

// Enhanced initialization to load grocery list
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    renderProducts();
    setupEventListeners();
    updateCartUI();
    showPersonalizedWelcome();
    updateHeaderWithUserInfo();
    
    // Load grocery list from meal planner after a short delay
    setTimeout(() => {
        loadGroceryListFromMealPlanner();
        updateCartUI();
        renderProducts();
    }, 1000);
});

// Enhanced product card creation to show meal plan items
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isInCart = cart.find(item => item.id === product.id);
    const quantity = isInCart ? isInCart.quantity : 0;
    
    // Check if product matches user preferences
    const isRecommended = isProductRecommended(product);
    const matchReasons = getMatchReasons(product);
    const isFromMealPlan = product.tags && product.tags.includes('meal-plan');
    
    card.innerHTML = `
        ${isRecommended ? '<div class="recommended-badge">Recommended for you</div>' : ''}
        ${isFromMealPlan ? '<div class="meal-plan-badge">From Meal Plan</div>' : ''}
        <div class="product-image">
            ${product.image}
        </div>
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description}</div>
        ${matchReasons ? `<div class="match-reasons">${matchReasons}</div>` : ''}
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-rating">
            <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
            <span class="rating-text">(${product.rating})</span>
        </div>
        <button class="add-to-cart" ${quantity > 0 ? 'disabled' : ''} onclick="addToCart(${product.id})">
            ${quantity > 0 ? 'In Cart' : 'Add to Cart'}
        </button>
    `;

    return card;
}
