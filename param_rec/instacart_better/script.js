// Sample product data
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
        tags: ["organic", "fresh"]
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
        tags: ["fresh", "dairy"]
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
        tags: ["premium", "meat"]
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
        tags: ["artisan", "fresh"]
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
        tags: ["pure", "juice"]
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
        tags: ["classic", "snacks"]
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
        tags: ["organic", "fresh", "healthy"]
    },
    {
        id: 8,
        name: "Greek Yogurt",
        description: "Creamy Greek yogurt, plain",
        price: 4.49,
        category: "dairy",
        rating: 4.6,
        image: "��",
        dietary: ["vegetarian", "keto"],
        tags: ["creamy", "protein"]
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
        tags: ["fresh", "premium", "healthy"]
    },
    {
        id: 10,
        name: "Croissants",
        description: "Buttery, flaky croissants",
        price: 3.99,
        category: "bakery",
        rating: 4.5,
        image: "��",
        dietary: ["vegetarian"],
        tags: ["buttery", "flaky"]
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
        tags: ["classic", "soda"]
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
        tags: ["chocolate", "sweet"]
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
        tags: ["gluten-free", "soft"]
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
        tags: ["dairy-free", "unsweetened"]
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
        tags: ["keto", "low-carb"]
    }
];

// Cart state
let cart = [];
let currentCategory = 'all';
let currentSort = 'name';
let searchQuery = '';
let userPreferences = {};

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
    loadUserPreferences();
    renderProducts();
    setupEventListeners();
    updateCartUI();
    showPersonalizedWelcome();
});

// Load user preferences from survey
function loadUserPreferences() {
    const savedSurvey = localStorage.getItem('freshCartSurvey');
    if (savedSurvey) {
        userPreferences = JSON.parse(savedSurvey);
        console.log('Loaded user preferences:', userPreferences);
    } else {
        // Default preferences if no survey data
        userPreferences = {
            dietary: ['none'],
            frequency: 'weekly',
            budget: '50-100',
            categories: ['produce', 'dairy'],
            delivery: 'delivery',
            special: ''
        };
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
    const dietaryPrefs = userPreferences.dietary.filter(d => d !== 'none');
    const favoriteCategories = userPreferences.categories;
    
    if (dietaryPrefs.length > 0) {
        return `Welcome back! We've highlighted ${dietaryPrefs.join(', ')} options for you.`;
    } else if (favoriteCategories.length > 0) {
        return `Welcome! We've prioritized ${favoriteCategories.join(', ')} based on your preferences.`;
    }
    return null;
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
            product.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
    }

    // Apply personalization filters
    filteredProducts = applyPersonalizationFilters(filteredProducts);

    // Sort products
    filteredProducts.sort((a, b) => {
        // Prioritize user's favorite categories
        const aInFavorites = userPreferences.categories.includes(a.category);
        const bInFavorites = userPreferences.categories.includes(b.category);
        
        if (aInFavorites && !bInFavorites) return -1;
        if (!aInFavorites && bInFavorites) return 1;
        
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

// Apply personalization filters based on user preferences
function applyPersonalizationFilters(products) {
    const dietaryPrefs = userPreferences.dietary.filter(d => d !== 'none');
    
    if (dietaryPrefs.length === 0) {
        return products;
    }
    
    return products.filter(product => {
        // If user has dietary preferences, show products that match
        return dietaryPrefs.some(pref => 
            product.dietary.includes(pref) || 
            (pref === 'organic' && product.tags.includes('organic'))
        );
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
    const dietaryMatch = getDietaryMatch(product);
    
    card.innerHTML = `
        ${isRecommended ? '<div class="recommended-badge">Recommended for you</div>' : ''}
        <div class="product-image">
            ${product.image}
        </div>
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description}</div>
        ${dietaryMatch ? `<div class="dietary-match">${dietaryMatch}</div>` : ''}
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

// Check if product is recommended based on user preferences
function isProductRecommended(product) {
    const dietaryPrefs = userPreferences.dietary.filter(d => d !== 'none');
    const favoriteCategories = userPreferences.categories;
    
    // Check if product is in favorite categories
    const categoryMatch = favoriteCategories.includes(product.category);
    
    // Check if product matches dietary preferences
    const dietaryMatch = dietaryPrefs.length === 0 || 
        dietaryPrefs.some(pref => 
            product.dietary.includes(pref) || 
            (pref === 'organic' && product.tags.includes('organic'))
        );
    
    return categoryMatch && dietaryMatch;
}

// Get dietary match text for display
function getDietaryMatch(product) {
    const dietaryPrefs = userPreferences.dietary.filter(d => d !== 'none');
    const matches = dietaryPrefs.filter(pref => 
        product.dietary.includes(pref) || 
        (pref === 'organic' && product.tags.includes('organic'))
    );
    
    if (matches.length > 0) {
        return `✓ ${matches.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}`;
    }
    return '';
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
    
    alert(`Thank you for your order!\n\nTotal: $${totalAmount.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);
    
    // Clear cart after checkout
    cart = [];
    updateCartUI();
    renderProducts();
    toggleCart();
});
