/**
 * CHAI CULTURE - LANDING PAGE JAVASCRIPT
 * Handles form submission and interactive features
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FORM SUBMISSION HANDLING =====
    const notifyForm = document.getElementById('notifyForm');
    const emailInput = document.getElementById('emailInput');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', handleFormSubmit);
    }
    
    /**
     * Handle email notification form submission
     * @param {Event} e - Form submit event
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (validateEmail(email)) {
            // Show success message
            showNotification(`Thank you! We'll notify you at ${email} when we launch.`, 'success');
            
            // Clear the form
            emailInput.value = '';
            
            // Optional: Send data to backend (uncomment when backend is ready)
            // sendEmailToBackend(email);
        } else {
            // Show error message
            showNotification('Please enter a valid email address.', 'error');
        }
    }
    
    /**
     * Validate email format using regex
     * @param {string} email - Email address to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Show notification alert to user
     * @param {string} message - Message to display
     * @param {string} type - Type of notification ('success' or 'error')
     */
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 2rem;
            background: ${type === 'success' ? 'linear-gradient(135deg, #2E7D32, #4CAF50)' : 'linear-gradient(135deg, #C62828, #EF5350)'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.1rem;
            animation: slideDown 0.3s ease-out;
            max-width: 90%;
            text-align: center;
        `;
        
        // Add animation keyframes if not already present
        if (!document.querySelector('#notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
                @keyframes slideUp {
                    from {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    /**
     * Send email to backend API (placeholder function)
     * Uncomment and implement when backend is ready
     * @param {string} email - Email address to send
     */
    /*
    async function sendEmailToBackend(email) {
        try {
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    */
    
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchors (not just '#')
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    
    // ===== PARALLAX EFFECT FOR LANTERNS =====
    const lanterns = document.querySelectorAll('.lantern');
    
    if (lanterns.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            
        });
    }
    
    
    // ===== ACCESSIBILITY: KEYBOARD NAVIGATION FOR SOCIAL ICONS =====
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('keydown', function(e) {
            // Handle Enter and Space keys
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    
    // ===== EASTER EGG: KONAMI CODE =====
    // Type the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) for a surprise
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    /**
     * Activate special easter egg effect
     */
    function activateEasterEgg() {
        // Add golden rain effect
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createGoldenParticle(container);
            }, i * 100);
        }
        
        showNotification('🎉 You found the secret! Enjoy your chai! ☕', 'success');
    }
    
    /**
     * Create falling golden particle
     * @param {HTMLElement} container - Container element
     */
    function createGoldenParticle(container) {
        const particle = document.createElement('div');
        particle.textContent = '✨';
        particle.style.cssText = `
            position: fixed;
            font-size: 2rem;
            left: ${Math.random() * 100}vw;
            top: -50px;
            pointer-events: none;
            z-index: 9999;
            animation: fall ${3 + Math.random() * 2}s linear;
        `;
        
        // Add fall animation if not exists
        if (!document.querySelector('#particleStyles')) {
            const style = document.createElement('style');
            style.id = 'particleStyles';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    
    // ===== LOG INITIALIZATION =====
    console.log('%c🫖 Chai Culture Landing Page Loaded Successfully! ☕', 
        'color: #D4AF37; font-size: 16px; font-weight: bold; font-family: Cinzel, serif;');
    console.log('%cTry the Konami Code for a surprise! ↑ ↑ ↓ ↓ ← → ← → B A', 
        'color: #B8860B; font-size: 12px; font-family: Cormorant Garamond, serif;');
});
