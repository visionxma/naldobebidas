// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Floating CTA visibility on scroll
    const floatingCta = document.getElementById('floatingCta');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide floating CTA based on scroll direction and position
        if (scrollTop > 200) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                floatingCta.style.transform = 'translateY(100px)';
                floatingCta.style.opacity = '0.7';
            } else {
                // Scrolling up
                floatingCta.style.transform = 'translateY(0)';
                floatingCta.style.opacity = '1';
            }
        } else {
            floatingCta.style.transform = 'translateY(0)';
            floatingCta.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.category-card, .about-image, .feature');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // WhatsApp button click tracking
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click tracking if needed
            console.log('WhatsApp button clicked');
            
            // Optional: Add Google Analytics event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'WhatsApp',
                    'value': 1
                });
            }
        });
    });

    // Zé Delivery button click tracking
    const zeButtons = document.querySelectorAll('a[href*="ze.delivery"]');
    
    zeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click tracking if needed
            console.log('Zé Delivery button clicked');
            
            // Optional: Add Google Analytics event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Ze Delivery',
                    'value': 1
                });
            }
        });
    });

    // Instagram button click tracking
    const instagramButtons = document.querySelectorAll('a[href*="instagram.com"]');
    
    instagramButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click tracking if needed
            console.log('Instagram button clicked');
            
            // Optional: Add Google Analytics event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Social',
                    'event_label': 'Instagram',
                    'value': 1
                });
            }
        });
    });

    // Lazy loading for images (fallback for browsers that don't support native lazy loading)
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for older browsers
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add hover effects for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Handle form submissions (if any forms are added later)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add form validation or processing here if needed
            console.log('Form submitted');
        });
    });

    // Add loading state to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a subtle loading effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Optional: Send performance data to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    'name': 'load',
                    'value': loadTime
                });
            }
        });
    }

    // Add accessibility improvements
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #FFCC00';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Add keyboard shortcuts if needed
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            const activeElement = document.activeElement;
            if (activeElement) {
                activeElement.blur();
            }
        }
    });
});

// Utility functions
function formatPhoneNumber(phone) {
    // Format phone number for display
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function validateEmail(email) {
    // Simple email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function debounce(func, wait) {
    // Debounce function for performance optimization
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for potential use in other scripts
window.NaldoBebidas = {
    formatPhoneNumber,
    validateEmail,
    debounce
};