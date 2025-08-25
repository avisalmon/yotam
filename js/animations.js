// Animations JavaScript - משל יותם
// Advanced animations and visual effects

// Animation configuration
const ANIMATION_CONFIG = {
    duration: {
        fast: 200,
        normal: 400,
        slow: 800
    },
    easing: {
        ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingTrees();
    initTextRevealAnimations();
    initCounterAnimations();
    initParticleEffect();
    initScrollProgressBar();
    initHoverEffects();
    initPageTransitions();
    
    console.log('אנימציות נטענו בהצלחה');
});

// Floating trees animation in hero
function initFloatingTrees() {
    const trees = document.querySelectorAll('.hero-trees .tree');
    
    trees.forEach((tree, index) => {
        // Base floating animation
        tree.style.animation = `float 6s ease-in-out infinite`;
        tree.style.animationDelay = `${index * 1.5}s`;
        
        // Add subtle rotation on hover
        tree.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        tree.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Click ripple effect
        tree.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Text reveal animations
function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTextReveal(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    textElements.forEach(element => {
        textObserver.observe(element);
    });
}

function animateTextReveal(element) {
    // Skip if already animated
    if (element.classList.contains('animated')) return;
    
    element.classList.add('animated');
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    // Animate in
    requestAnimationFrame(() => {
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    if (element.classList.contains('animated')) return;
    
    element.classList.add('animated');
    const text = element.textContent.trim();
    const isInfinity = text === '∞';
    
    if (isInfinity) {
        // Special animation for infinity symbol
        element.style.transform = 'rotate(0deg)';
        element.style.transition = 'transform 2s ease-in-out';
        
        setTimeout(() => {
            element.style.transform = 'rotate(360deg)';
        }, 100);
        return;
    }
    
    // Extract number
    const targetNumber = parseInt(text.replace(/[^0-9]/g, ''));
    if (isNaN(targetNumber)) return;
    
    const suffix = text.replace(/[0-9]/g, '');
    let currentNumber = 0;
    const increment = targetNumber / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(currentNumber) + suffix;
    }, stepTime);
}

// Particle effect for background
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${left}%;
        top: 100%;
        animation: floatUp ${animationDuration}s linear infinite;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle when animation ends
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, (animationDuration + delay) * 1000);
}

// Scroll progress bar
function initScrollProgressBar() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--olive-green), var(--golden-yellow));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Tree cards hover effect
    const treeCards = document.querySelectorAll('.tree-card');
    treeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            this.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            this.style.setProperty('--x', '50%');
            this.style.setProperty('--y', '50%');
        });
        
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--x', x + '%');
            this.style.setProperty('--y', y + '%');
        });
    });
}

// Page transitions
function initPageTransitions() {
    // Smooth transitions between sections
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Add transition overlay
                    const overlay = document.createElement('div');
                    overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(45deg, var(--olive-green), var(--golden-yellow));
                        z-index: 10000;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.3s ease;
                    `;
                    
                    document.body.appendChild(overlay);
                    
                    // Animate overlay
                    requestAnimationFrame(() => {
                        overlay.style.opacity = '0.8';
                    });
                    
                    // Scroll to section
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Remove overlay
                        setTimeout(() => {
                            overlay.style.opacity = '0';
                            setTimeout(() => {
                                document.body.removeChild(overlay);
                            }, 300);
                        }, 300);
                    }, 200);
                }
            }
        });
    });
}

// Ripple effect utility
function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Parallax scrolling for sections
function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Intersection Observer for complex animations
function initComplexAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const complexObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animate;
                
                switch (animation) {
                    case 'slideInRight':
                        slideInRight(element);
                        break;
                    case 'slideInLeft':
                        slideInLeft(element);
                        break;
                    case 'fadeInUp':
                        fadeInUp(element);
                        break;
                    case 'zoomIn':
                        zoomIn(element);
                        break;
                    default:
                        fadeInUp(element);
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        complexObserver.observe(element);
    });
}

// Animation functions
function slideInRight(element) {
    element.style.transform = 'translateX(100px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    
    requestAnimationFrame(() => {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    });
}

function slideInLeft(element) {
    element.style.transform = 'translateX(-100px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    
    requestAnimationFrame(() => {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    });
}

function fadeInUp(element) {
    element.style.transform = 'translateY(50px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    
    requestAnimationFrame(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    });
}

function zoomIn(element) {
    element.style.transform = 'scale(0.5)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    requestAnimationFrame(() => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    });
}

// CSS animations definitions
const animationStyles = `
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes floatUp {
    0% {
        opacity: 1;
        transform: translateY(0px);
    }
    100% {
        opacity: 0;
        transform: translateY(-100vh);
    }
}

@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(139, 125, 58, 0.3); }
    50% { box-shadow: 0 0 20px rgba(139, 125, 58, 0.6); }
}

.loaded {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
}

.loading {
    opacity: 0.7;
    pointer-events: none;
}
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Export animation functions
window.YotamAnimations = {
    createRippleEffect,
    fadeInUp,
    slideInRight,
    slideInLeft,
    zoomIn,
    ANIMATION_CONFIG
};

console.log('מערכת האנימציות הופעלה');

// Initialize complex animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initComplexAnimations();
        initParallaxScrolling();
    }, 500);
});
