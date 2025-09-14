// Survey functionality
let surveyData = {
    dietary: [],
    frequency: '',
    budget: '',
    categories: [],
    delivery: '',
    special: ''
};

// Form validation
function validateForm() {
    const form = document.getElementById('surveyForm');
    const formData = new FormData(form);
    
    // Reset survey data
    surveyData = {
        dietary: [],
        frequency: '',
        budget: '',
        categories: [],
        delivery: '',
        special: ''
    };
    
    // Collect dietary preferences
    const dietaryInputs = form.querySelectorAll('input[name="dietary"]:checked');
    dietaryInputs.forEach(input => {
        surveyData.dietary.push(input.value);
    });
    
    // Collect frequency
    const frequencyInput = form.querySelector('input[name="frequency"]:checked');
    if (frequencyInput) {
        surveyData.frequency = frequencyInput.value;
    }
    
    // Collect budget
    const budgetInput = form.querySelector('input[name="budget"]:checked');
    if (budgetInput) {
        surveyData.budget = budgetInput.value;
    }
    
    // Collect categories
    const categoryInputs = form.querySelectorAll('input[name="categories"]:checked');
    categoryInputs.forEach(input => {
        surveyData.categories.push(input.value);
    });
    
    // Collect delivery preference
    const deliveryInput = form.querySelector('input[name="delivery"]:checked');
    if (deliveryInput) {
        surveyData.delivery = deliveryInput.value;
    }
    
    // Collect special requirements
    surveyData.special = form.querySelector('textarea[name="special"]').value.trim();
    
    return true;
}

// Skip survey function
function skipSurvey() {
    // Set default values
    surveyData = {
        dietary: ['none'],
        frequency: 'weekly',
        budget: '50-100',
        categories: ['produce', 'dairy'],
        delivery: 'delivery',
        special: ''
    };
    
    // Store survey data and redirect
    localStorage.setItem('freshCartSurvey', JSON.stringify(surveyData));
    window.location.href = 'index.html';
}

// Form submission
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Store survey data in localStorage
        localStorage.setItem('freshCartSurvey', JSON.stringify(surveyData));
        
        // Show loading animation
        showLoadingAnimation();
        
        // Redirect to main app after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
});

// Loading animation
function showLoadingAnimation() {
    const form = document.getElementById('surveyForm');
    form.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <h3>Setting up your personalized experience...</h3>
            <p>This will just take a moment</p>
        </div>
    `;
    
    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-container {
            text-align: center;
            padding: 3rem 2rem;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #e9ecef;
            border-top: 4px solid #2c5530;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-container h3 {
            color: #333;
            margin-bottom: 0.5rem;
            font-size: 1.3rem;
        }
        
        .loading-container p {
            color: #666;
            font-size: 1rem;
        }
    `;
    document.head.appendChild(style);
}

// Check if user has already completed survey
document.addEventListener('DOMContentLoaded', function() {
    const existingSurvey = localStorage.getItem('freshCartSurvey');
    if (existingSurvey) {
        // Show option to retake survey or continue
        showSurveyChoice();
    }
});

function showSurveyChoice() {
    const surveyCard = document.querySelector('.survey-card');
    surveyCard.innerHTML = `
        <div class="survey-header">
            <div class="logo">
                <i class="fas fa-shopping-cart"></i>
                <span>FreshCart</span>
            </div>
            <h1>Welcome Back!</h1>
            <p>We have your preferences saved</p>
        </div>
        <div class="choice-container">
            <div class="choice-card">
                <i class="fas fa-shopping-bag"></i>
                <h3>Continue Shopping</h3>
                <p>Use your saved preferences</p>
                <button class="btn-continue" onclick="continueWithSavedData()">Start Shopping</button>
            </div>
            <div class="choice-card">
                <i class="fas fa-edit"></i>
                <h3>Update Preferences</h3>
                <p>Retake the survey</p>
                <button class="btn-skip" onclick="retakeSurvey()">Retake Survey</button>
            </div>
        </div>
    `;
    
    // Add choice styles
    const style = document.createElement('style');
    style.textContent = `
        .choice-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }
        
        .choice-card {
            text-align: center;
            padding: 2rem;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            transition: all 0.3s ease;
        }
        
        .choice-card:hover {
            border-color: #2c5530;
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .choice-card i {
            font-size: 3rem;
            color: #2c5530;
            margin-bottom: 1rem;
        }
        
        .choice-card h3 {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .choice-card p {
            color: #666;
            margin-bottom: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .choice-container {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

function continueWithSavedData() {
    window.location.href = 'index.html';
}

function retakeSurvey() {
    localStorage.removeItem('freshCartSurvey');
    location.reload();
}
