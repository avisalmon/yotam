// Main JavaScript - משל יותם
// Core functionality and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroInteractions();
    initTreesInteraction();
    initTextControls();
    initTimeline();
    initEducationTabs();
    initScrollAnimations();
    initQuickStart();
    initNewsletterForm();
    
    console.log('משל יותם - האתר נטען בהצלחה');
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Active nav link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--pure-white)';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Hero section interactions
function initHeroInteractions() {
    const heroTrees = document.querySelectorAll('.hero-trees .tree');
    
    heroTrees.forEach(tree => {
        tree.addEventListener('click', function() {
            const treeType = this.dataset.tree;
            highlightTreeInfo(treeType);
            
            // Scroll to analysis section
            const analysisSection = document.getElementById('analysis');
            if (analysisSection) {
                analysisSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
        
        // Add hover effects
        tree.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.filter = 'drop-shadow(0 0 30px rgba(255,255,255,0.5))';
        });
        
        tree.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'none';
        });
    });
}

// Trees interaction (analysis section)
function initTreesInteraction() {
    const treeCards = document.querySelectorAll('.tree-card');
    const treeDetails = document.querySelectorAll('.tree-detail');
    
    treeCards.forEach(card => {
        card.addEventListener('click', function() {
            const treeType = this.dataset.tree;
            
            // Remove active class from all cards
            treeCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show corresponding detail
            showTreeDetail(treeType);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Initialize with first tree active
    if (treeCards.length > 0) {
        treeCards[0].classList.add('active');
        showTreeDetail(treeCards[0].dataset.tree);
    }
}

function showTreeDetail(treeType) {
    const treeDetails = document.querySelectorAll('.tree-detail');
    
    // Hide all details
    treeDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show specific detail
    const targetDetail = document.getElementById(`${treeType}Detail`);
    if (targetDetail) {
        setTimeout(() => {
            targetDetail.classList.add('active');
        }, 200);
    }
}

function highlightTreeInfo(treeType) {
    // This function is called from hero trees click
    const targetCard = document.querySelector(`[data-tree="${treeType}"]`);
    if (targetCard) {
        // Trigger click on the corresponding tree card
        targetCard.click();
    }
}

// Text controls (biblical text section)
function initTextControls() {
    const controlButtons = document.querySelectorAll('.btn-control');
    const pointedTexts = document.querySelectorAll('.verse-text.pointed');
    const unpointedTexts = document.querySelectorAll('.verse-text.unpointed');
    const playButton = document.getElementById('playAudio');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const version = this.dataset.version;
            
            if (version === 'pointed') {
                // Remove active from all buttons
                controlButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show pointed, hide unpointed
                pointedTexts.forEach(text => text.classList.remove('hidden'));
                unpointedTexts.forEach(text => text.classList.add('hidden'));
            } else if (version === 'unpointed') {
                // Remove active from all buttons
                controlButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show unpointed, hide pointed
                unpointedTexts.forEach(text => text.classList.remove('hidden'));
                pointedTexts.forEach(text => text.classList.add('hidden'));
            }
        });
    });
    
    // Audio play button
    if (playButton) {
        playButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const text = this.textContent.trim();
            
            if (text.includes('האזנה')) {
                // Start playing
                icon.className = 'fas fa-pause';
                this.innerHTML = '<i class="fas fa-pause"></i> עצור';
                
                // Simulate audio playback
                playBiblicalText();
                
                // Reset after simulation (10 seconds)
                setTimeout(() => {
                    icon.className = 'fas fa-play';
                    this.innerHTML = '<i class="fas fa-play"></i> האזנה';
                }, 10000);
            } else {
                // Stop playing
                icon.className = 'fas fa-play';
                this.innerHTML = '<i class="fas fa-play"></i> האזנה';
                stopBiblicalText();
            }
        });
    }
}

// Timeline interactions
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create intersection observer for timeline animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        
        observer.observe(item);
        
        // Click interaction
        item.addEventListener('click', function() {
            const content = this.querySelector('.timeline-content');
            content.style.transform = 'scale(1.02)';
            content.style.boxShadow = 'var(--shadow-xl)';
            
            setTimeout(() => {
                content.style.transform = 'scale(1)';
                content.style.boxShadow = 'var(--shadow-md)';
            }, 200);
        });
    });
}

// Education tabs
function initEducationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show target tab content
            const targetContent = document.getElementById(`${targetTab}Tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.stat-box, .quick-start-card, .contemporary-card, .resource-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Quick start interactions
function initQuickStart() {
    const quickStartCards = document.querySelectorAll('.quick-start-card');
    
    quickStartCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.dataset.target;
            if (target) {
                const targetSection = document.querySelector(target);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        // Hover effect enhancement
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'rotate(5deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

// Newsletter form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Simulate form submission
            button.textContent = 'נרשם...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'נרשמת בהצלחה!';
                button.style.background = 'var(--forest-green)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
            
            console.log('Newsletter subscription:', email);
        });
    }
}

// Utility functions
function playBiblicalText() {
    // This would integrate with a real audio player
    console.log('Playing biblical text audio...');
    
    // Simulate highlighting verses while playing
    const verses = document.querySelectorAll('.verse-container');
    let currentVerse = 0;
    
    const highlightInterval = setInterval(() => {
        // Remove previous highlight
        verses.forEach(v => v.style.background = '');
        
        // Highlight current verse
        if (verses[currentVerse]) {
            verses[currentVerse].style.background = 'var(--golden-yellow)';
            verses[currentVerse].style.borderRadius = 'var(--border-radius)';
            verses[currentVerse].style.transition = 'all 0.3s ease';
        }
        
        currentVerse++;
        if (currentVerse >= verses.length) {
            clearInterval(highlightInterval);
            // Remove all highlights
            verses.forEach(v => v.style.background = '');
        }
    }, 1000);
    
    // Store interval for cleanup
    window.currentAudioInterval = highlightInterval;
}

function stopBiblicalText() {
    console.log('Stopping biblical text audio...');
    
    // Clear highlighting interval
    if (window.currentAudioInterval) {
        clearInterval(window.currentAudioInterval);
    }
    
    // Remove all verse highlights
    const verses = document.querySelectorAll('.verse-container');
    verses.forEach(v => v.style.background = '');
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Support for RTL navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('tree-card')) {
            e.preventDefault();
            const treeCards = Array.from(document.querySelectorAll('.tree-card'));
            const currentIndex = treeCards.indexOf(activeElement);
            
            let nextIndex;
            if (e.key === 'ArrowRight') {
                // In RTL, right arrow goes to previous
                nextIndex = currentIndex > 0 ? currentIndex - 1 : treeCards.length - 1;
            } else {
                // In RTL, left arrow goes to next
                nextIndex = currentIndex < treeCards.length - 1 ? currentIndex + 1 : 0;
            }
            
            treeCards[nextIndex].click();
            treeCards[nextIndex].focus();
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('שגיאה באתר:', e.error);
});

// Performance monitoring
let startTime = performance.now();
window.addEventListener('load', function() {
    let loadTime = performance.now() - startTime;
    console.log(`האתר נטען תוך ${Math.round(loadTime)}ms`);
});

// Export functions for use in other scripts
window.YotamSite = {
    showTreeDetail,
    highlightTreeInfo,
    playBiblicalText,
    stopBiblicalText
};
