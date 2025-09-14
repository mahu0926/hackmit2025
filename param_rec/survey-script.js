// Survey state
let currentQuestion = 1;
const totalQuestions = 7;
let surveyData = {};

// Initialize survey
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Form submission
    document.getElementById('surveyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitSurvey();
    });
    
    // Input validation
    document.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('input', validateCurrentQuestion);
    });
    
    // Radio button validation
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', validateCurrentQuestion);
    });
}

// Navigation functions
function nextQuestion() {
    if (validateCurrentQuestion()) {
        if (currentQuestion < totalQuestions) {
            // Save current question data
            saveCurrentQuestionData();
            
            // Hide current question
            document.querySelector(`[data-question="${currentQuestion}"]`).classList.remove('active');
            
            // Show next question
            currentQuestion++;
            document.querySelector(`[data-question="${currentQuestion}"]`).classList.add('active');
            
            // Update progress
            updateProgress();
        }
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        // Hide current question
        document.querySelector(`[data-question="${currentQuestion}"]`).classList.remove('active');
        
        // Show previous question
        currentQuestion--;
        document.querySelector(`[data-question="${currentQuestion}"]`).classList.add('active');
        
        // Update progress
        updateProgress();
    }
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

// Validate current question
function validateCurrentQuestion() {
    const currentQuestionElement = document.querySelector(`[data-question="${currentQuestion}"]`);
    const requiredInputs = currentQuestionElement.querySelectorAll('input[required]');
    const radioGroups = currentQuestionElement.querySelectorAll('input[type="radio"]');
    
    // Check required inputs
    for (let input of requiredInputs) {
        if (!input.value.trim()) {
            showValidationError('Please fill in all required fields');
            return false;
        }
    }
    
    // Check radio groups (at least one must be selected)
    const radioGroupNames = [...new Set(Array.from(radioGroups).map(radio => radio.name))];
    for (let groupName of radioGroupNames) {
        const groupRadios = currentQuestionElement.querySelectorAll(`input[name="${groupName}"]`);
        const isChecked = Array.from(groupRadios).some(radio => radio.checked);
        if (!isChecked) {
            showValidationError('Please select an option');
            return false;
        }
    }
    
    clearValidationError();
    return true;
}

// Show validation error
function showValidationError(message) {
    clearValidationError();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    const currentQuestionElement = document.querySelector(`[data-question="${currentQuestion}"]`);
    currentQuestionElement.appendChild(errorDiv);
    
    // Add error styles
    const style = document.createElement('style');
    style.textContent = `
        .validation-error {
            background: #f8d7da;
            color: #721c24;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border: 1px solid #f5c6cb;
        }
        
        .validation-error i {
            color: #dc3545;
        }
    `;
    document.head.appendChild(style);
}

// Clear validation error
function clearValidationError() {
    const existingError = document.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
}

// Save current question data
function saveCurrentQuestionData() {
    const currentQuestionElement = document.querySelector(`[data-question="${currentQuestion}"]`);
    
    // Get all form inputs in current question
    const inputs = currentQuestionElement.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                if (!surveyData[input.name]) {
                    surveyData[input.name] = [];
                }
                if (Array.isArray(surveyData[input.name])) {
                    surveyData[input.name].push(input.value);
                } else {
                    surveyData[input.name] = [surveyData[input.name], input.value];
                }
            }
        } else {
            surveyData[input.name] = input.value;
        }
    });
}

// Submit survey
function submitSurvey() {
    if (validateCurrentQuestion()) {
        // Save final question data
        saveCurrentQuestionData();
        
        // Process survey data
        processSurveyData();
        
        // Show loading animation
        showLoadingAnimation();
        
        // Store survey data and redirect
        localStorage.setItem('freshCartSurvey', JSON.stringify(surveyData));
        localStorage.setItem('freshCartUserProfile', JSON.stringify(createUserProfile()));
        
        // Redirect to main app after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Process survey data
function processSurveyData() {
    // Convert arrays to single values where appropriate
    Object.keys(surveyData).forEach(key => {
        if (Array.isArray(surveyData[key]) && surveyData[key].length === 1) {
            surveyData[key] = surveyData[key][0];
        }
    });
    
    console.log('Survey data processed:', surveyData);
}

// Create user profile from survey data
function createUserProfile() {
    const profile = {
        name: surveyData.name || 'User',
        age: surveyData.age || '25-34',
        cuisines: surveyData.cuisine || [],
        healthDataAccess: surveyData.healthData === 'yes',
        goals: surveyData.goals || [],
        restrictions: surveyData.restrictions || [],
        additionalInfo: surveyData.additionalInfo || '',
        completedAt: new Date().toISOString()
    };
    
    return profile;
}

// Show loading animation
function showLoadingAnimation() {
    const form = document.getElementById('surveyForm');
    form.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <h3>Creating your personalized experience...</h3>
            <p>This will just take a moment</p>
        </div>
    `;
}

// Skip survey function (if needed)
function skipSurvey() {
    // Set default values
    surveyData = {
        name: 'User',
        age: '25-34',
        cuisine: ['american'],
        healthData: 'no',
        goals: ['maintain-current'],
        restrictions: ['none'],
        additionalInfo: ''
    };
    
    // Store survey data and redirect
    localStorage.setItem('freshCartSurvey', JSON.stringify(surveyData));
    localStorage.setItem('freshCartUserProfile', JSON.stringify(createUserProfile()));
    window.location.href = 'index.html';
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (currentQuestion < totalQuestions) {
            nextQuestion();
        } else {
            document.getElementById('surveyForm').dispatchEvent(new Event('submit'));
        }
    }
    
    if (e.key === 'Escape') {
        if (currentQuestion > 1) {
            prevQuestion();
        }
    }
});

// Auto-save functionality
setInterval(function() {
    if (currentQuestion > 1) {
        saveCurrentQuestionData();
        localStorage.setItem('freshCartSurveyDraft', JSON.stringify(surveyData));
    }
}, 30000); // Auto-save every 30 seconds

// Load draft on page load
document.addEventListener('DOMContentLoaded', function() {
    const draft = localStorage.getItem('freshCartSurveyDraft');
    if (draft) {
        surveyData = JSON.parse(draft);
        // Restore form state based on saved data
        restoreFormState();
    }
});

// Restore form state from draft
function restoreFormState() {
    Object.keys(surveyData).forEach(key => {
        const inputs = document.querySelectorAll(`[name="${key}"]`);
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (Array.isArray(surveyData[key])) {
                    input.checked = surveyData[key].includes(input.value);
                } else {
                    input.checked = surveyData[key] === input.value;
                }
            } else {
                input.value = surveyData[key];
            }
        });
    });
}
