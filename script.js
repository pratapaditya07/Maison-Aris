document.querySelectorAll(".menu-item").forEach(item => {
    const targetId = item.getAttribute("data-target");
    const targetBox = document.getElementById(targetId);
    let hideTimeout;

    item.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        targetBox.style.marginTop = "0";
        targetBox.style.transition = "margin-top 0.3s ease";
    });

    item.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            targetBox.style.marginTop = "-70vh";
        }, 200);
    });

    targetBox.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
    });

    targetBox.addEventListener("mouseleave", () => {
        targetBox.style.marginTop = "-70vh";
    });
});

// FIXED DROPDOWN MENU SCRIPT
        document.querySelectorAll(".menu-item").forEach(item => {
            const targetId = item.getAttribute("data-target");
            const targetBox = document.getElementById(targetId);
            let hideTimeout;

            item.addEventListener("mouseenter", () => {
                clearTimeout(hideTimeout);
                targetBox.style.marginTop = "0";
                targetBox.style.transition = "margin-top 1200ms ease";
            });

            item.addEventListener("mouseleave", () => {
                hideTimeout = setTimeout(() => {
                    targetBox.style.marginTop = "-70vh";
                }, 200);
            });

            targetBox.addEventListener("mouseenter", () => {
                clearTimeout(hideTimeout);
            });

            targetBox.addEventListener("mouseleave", () => {
                targetBox.style.marginTop = "-70vh";
            });
        });

        // SNAP SCROLLING FUNCTIONALITY - IMPROVED
        let isScrolling = false;
        let currentSection = 0;
        let scrollTimeout;
        const sections = document.querySelectorAll('.snap-section');
        const totalSections = sections.length;
        const scrollContainer = document.querySelector('.scroll-container');

        // Smooth scroll function with no flicker
        function scrollToSection(index) {
            if (index >= 0 && index < totalSections && !isScrolling) {
                isScrolling = true;
                
                // Direct transform instead of scrollIntoView to prevent flicker
                const targetPosition = index * window.innerHeight;
                scrollContainer.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Longer timeout to prevent multiple scrolls
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            }
        }

        // Improved wheel event with debouncing
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            if (isScrolling) {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            
            // Clear previous timeout
            clearTimeout(wheelTimeout);
            
            // Debounce wheel events
            wheelTimeout = setTimeout(() => {
                const scrollDirection = e.deltaY > 0 ? 1 : -1;
                const newSection = currentSection + scrollDirection;
                
                if (newSection >= 0 && newSection < totalSections) {
                    currentSection = newSection;
                    scrollToSection(currentSection);
                }
            }, 50); // Small delay to group rapid wheel events
            
        }, { passive: false });

        // Improved touch events with better control
        let touchStartY = 0;
        let touchEndY = 0;
        let touchTimeout;

        document.addEventListener('touchstart', (e) => {
            if (!isScrolling) {
                touchStartY = e.changedTouches[0].screenY;
            }
        });

        document.addEventListener('touchend', (e) => {
            if (isScrolling) return;
            
            touchEndY = e.changedTouches[0].screenY;
            const touchDiff = touchStartY - touchEndY;
            
            // Clear previous timeout
            clearTimeout(touchTimeout);
            
            // Minimum swipe distance and debounce
            if (Math.abs(touchDiff) > 80) {
                touchTimeout = setTimeout(() => {
                    if (touchDiff > 0 && currentSection < totalSections - 1) {
                        currentSection++;
                        scrollToSection(currentSection);
                    } else if (touchDiff < 0 && currentSection > 0) {
                        currentSection--;
                        scrollToSection(currentSection);
                    }
                }, 100);
            }
        });

        // Improved keyboard navigation
        let keyTimeout;
        document.addEventListener('keydown', (e) => {
            if (isScrolling) return;
            
            clearTimeout(keyTimeout);
            
            keyTimeout = setTimeout(() => {
                switch(e.key) {
                    case 'ArrowDown':
                    case ' ': // Spacebar
                        if (currentSection < totalSections - 1) {
                            currentSection++;
                            scrollToSection(currentSection);
                        }
                        break;
                    case 'ArrowUp':
                        if (currentSection > 0) {
                            currentSection--;
                            scrollToSection(currentSection);
                        }
                        break;
                }
            }, 100);
        });

        // Track current section without interference
        let observerTimeout;
        const observer = new IntersectionObserver((entries) => {
            if (isScrolling) return; // Don't update during programmatic scrolling
            
            clearTimeout(observerTimeout);
            observerTimeout = setTimeout(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        const sectionIndex = Array.from(sections).indexOf(entry.target);
                        if (sectionIndex !== currentSection) {
                            currentSection = sectionIndex;
                        }
                    }
                });
            }, 200);
        }, {
            threshold: [0.1, 0.5, 0.9]
        });

        sections.forEach(section => {
            observer.observe(section);
        });