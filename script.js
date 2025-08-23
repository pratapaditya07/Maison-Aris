// MAISON ARIS - LUXURY SMOOTH SCROLLING EXPERIENCE
// Saint Laurent inspired smooth section transitions

// Dropdown functionality (keep your existing code)
document.querySelectorAll(".menu-item").forEach(item => {
    const targetId = item.getAttribute("data-target");
    const targetBox = document.getElementById(targetId);
    let hideTimeout;

    item.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        targetBox.style.marginTop = "0";
        targetBox.style.transition = "margin-top 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    });

    item.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            targetBox.style.marginTop = "-70vh";
            targetBox.style.transition = "margin-top 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        }, 200);
    });

    targetBox.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    targetBox.addEventListener("mouseleave", () => {
        targetBox.style.marginTop = "-70vh";
    });
});

// LUXURY SCROLL CONTROLLER FOR MAISON ARIS
class MaisonArisScrollController {
    constructor() {
        this.scrollContainer = document.querySelector('.scroll-container');
        this.sections = document.querySelectorAll('.snap-section');
        this.sectionNames = ['hero', 'categories', 'about', 'contact'];
        this.currentSection = 0;
        this.isScrolling = false;
        this.wheelAccumulator = 0;
        this.touchStartY = 0;
        this.scrollThreshold = 80; // Sensitivity for wheel
        
        this.init();
    }
    
    init() {
        this.disableDefaultScroll();
        this.bindEvents();
        this.updateCurrentSection();
        
        // Add loading animation
        document.body.style.opacity = '0';
        window.addEventListener('load', () => {
            document.body.style.transition = 'opacity 0.6s ease-out';
            document.body.style.opacity = '1';
        });
    }
    
    disableDefaultScroll() {
        // Prevent default scroll behavior
        this.scrollContainer.addEventListener('scroll', (e) => {
            if (!this.isScrolling) {
                e.preventDefault();
                this.scrollContainer.scrollTop = this.currentSection * window.innerHeight;
            }
        });
    }
    
    updateCurrentSection() {
        const scrollTop = this.scrollContainer.scrollTop;
        this.currentSection = Math.round(scrollTop / window.innerHeight);
        this.updateSectionEffects();
    }
    
    updateSectionEffects() {
        // Update header color based on section
        const header = document.querySelector('header');
        if (this.currentSection === 0) {
            // Hero section - keep original style
            header.style.color = 'white';
            header.style.mixBlendMode = 'difference';
        } else {
            // Other sections
            header.style.color = 'white';
            header.style.mixBlendMode = 'difference';
        }
        
        // Video fade effect for hero section
        const heroVideo = document.querySelector('#hero video');
        if (heroVideo) {
            if (this.currentSection === 0) {
                heroVideo.style.opacity = '0.65';
                heroVideo.style.transform = 'translate(-50%, -50%) scale(1)';
            } else {
                heroVideo.style.opacity = '0.3';
                heroVideo.style.transform = 'translate(-50%, -50%) scale(1.05)';
            }
            heroVideo.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        // Add active state to sections
        this.sections.forEach((section, index) => {
            if (index === this.currentSection) {
                section.style.transform = 'scale(1)';
                section.style.opacity = '1';
            } else {
                section.style.transform = 'scale(0.98)';
                section.style.opacity = '0.95';
            }
            section.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    }
    
    smoothScrollTo(targetSection, duration = 1000) {
        if (this.isScrolling) return;
        if (targetSection < 0 || targetSection >= this.sections.length) return;
        
        this.isScrolling = true;
        const startY = this.scrollContainer.scrollTop;
        const targetY = targetSection * window.innerHeight;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        // Luxury easing function
        const easeInOutQuart = (t) => {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        };
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutQuart(progress);
            
            this.scrollContainer.scrollTop = startY + (distance * easedProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isScrolling = false;
                this.currentSection = targetSection;
                this.updateSectionEffects();
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    handleWheel(e) {
        if (this.isScrolling) {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        
        // Accumulate wheel delta for smoother control
        this.wheelAccumulator += e.deltaY;
        
        // Clear accumulator after delay
        clearTimeout(this.wheelTimeout);
        this.wheelTimeout = setTimeout(() => {
            this.wheelAccumulator = 0;
        }, 200);
        
        // Check threshold for section change
        if (Math.abs(this.wheelAccumulator) > this.scrollThreshold) {
            const direction = this.wheelAccumulator > 0 ? 1 : -1;
            const targetSection = this.currentSection + direction;
            
            this.smoothScrollTo(targetSection);
            this.wheelAccumulator = 0;
        }
    }
    
    handleKeyboard(e) {
        if (this.isScrolling) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
            case ' ': // Spacebar
                e.preventDefault();
                this.smoothScrollTo(this.currentSection + 1);
                break;
                
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.smoothScrollTo(this.currentSection - 1);
                break;
                
            case 'Home':
                e.preventDefault();
                this.smoothScrollTo(0);
                break;
                
            case 'End':
                e.preventDefault();
                this.smoothScrollTo(this.sections.length - 1);
                break;
                
            case 'Escape':
                // Close dropdowns
                document.querySelectorAll('.dropbox').forEach(box => {
                    box.style.marginTop = '-70vh';
                });
                break;
        }
    }
    
    handleTouch(e) {
        switch(e.type) {
            case 'touchstart':
                this.touchStartY = e.touches[0].clientY;
                break;
                
            case 'touchend':
                if (this.isScrolling) return;
                
                const touchEndY = e.changedTouches[0].clientY;
                const deltaY = this.touchStartY - touchEndY;
                const threshold = 50;
                
                if (Math.abs(deltaY) > threshold) {
                    const direction = deltaY > 0 ? 1 : -1;
                    this.smoothScrollTo(this.currentSection + direction);
                }
                break;
        }
    }
    
    bindEvents() {
        // Mouse wheel events
        this.scrollContainer.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch events for mobile
        this.scrollContainer.addEventListener('touchstart', (e) => this.handleTouch(e), { passive: true });
        this.scrollContainer.addEventListener('touchend', (e) => this.handleTouch(e), { passive: true });
        
        // Prevent context menu on right click during scroll
        this.scrollContainer.addEventListener('contextmenu', (e) => {
            if (this.isScrolling) e.preventDefault();
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.updateCurrentSection();
        });
        
        // Prevent dropdown interference
        document.querySelectorAll('.dropbox').forEach(dropdown => {
            dropdown.addEventListener('wheel', (e) => {
                if (dropdown.style.marginTop === '0px') {
                    e.stopPropagation();
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (!this.isScrolling) {
                this.scrollContainer.scrollTop = this.currentSection * window.innerHeight;
            }
        });
    }
    
    // Public method to manually navigate to section
    goToSection(sectionName) {
        const sectionIndex = this.sectionNames.indexOf(sectionName);
        if (sectionIndex !== -1) {
            this.smoothScrollTo(sectionIndex);
        }
    }
}

// Initialize the luxury scroll controller
document.addEventListener('DOMContentLoaded', () => {
    const maisonScroll = new MaisonArisScrollController();
    
    // Expose to global scope for manual navigation
    window.maisonScroll = maisonScroll;
    
    // Optional: Add section navigation dots
    createNavigationDots();
});

// Optional: Create navigation dots
function createNavigationDots() {
    const dotContainer = document.createElement('div');
    dotContainer.className = 'scroll-dots';
    dotContainer.style.cssText = `
        position: fixed;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 500;
        display: flex;
        flex-direction: column;
        gap: 15px;
    `;
    
    const sectionNames = ['hero', 'categories', 'about', 'contact'];
    
    sectionNames.forEach((name, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        dot.style.cssText = `
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border: 2px solid transparent;
        `;
        
        dot.addEventListener('click', () => {
            window.maisonScroll.smoothScrollTo(index);
        });
        
        dot.addEventListener('mouseenter', () => {
            dot.style.background = 'rgba(255, 255, 255, 0.8)';
            dot.style.transform = 'scale(1.2)';
        });
        
        dot.addEventListener('mouseleave', () => {
            dot.style.background = 'rgba(255, 255, 255, 0.4)';
            dot.style.transform = 'scale(1)';
        });
        
        dotContainer.appendChild(dot);
    });
    
    document.body.appendChild(dotContainer);
    
    // Update active dot on scroll
    const updateActiveDot = () => {
        const dots = document.querySelectorAll('.scroll-dot');
        dots.forEach((dot, index) => {
            if (index === window.maisonScroll.currentSection) {
                dot.style.background = 'white';
                dot.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            } else {
                dot.style.background = 'rgba(255, 255, 255, 0.4)';
                dot.style.borderColor = 'transparent';
            }
        });
    };
    
    // Check for section changes
    setInterval(updateActiveDot, 100);
}