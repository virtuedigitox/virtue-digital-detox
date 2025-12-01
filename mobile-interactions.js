/**
 * Mobile Interactions for Virtue Digital Detox Website
 * Handles mobile navigation, touch gestures, and mobile-specific behaviors
 */

(function() {
    'use strict';

    // Mobile Navigation Toggle
    function initMobileNav() {
        var toggle = document.getElementById('virtueNavToggle');
        var nav = document.querySelector('.virtue-nav');
        
        if (!toggle || !nav) return;
        
        // Toggle menu on button click
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            var isExpanded = nav.classList.contains('active');
            toggle.setAttribute('aria-expanded', isExpanded);
            
            // Change icon
            toggle.textContent = isExpanded ? '✕' : '☰';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = '☰';
            }
        });
        
        // Close menu when clicking on a link
        var navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = '☰';
            });
        });

        // Handle dropdown on mobile
        var dropdownBtns = nav.querySelectorAll('.virtue-nav-dropdown-btn');
        dropdownBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    var dropdown = btn.closest('.virtue-nav-dropdown');
                    var content = dropdown.querySelector('.virtue-nav-dropdown-content');
                    
                    if (content) {
                        content.style.display = content.style.display === 'block' ? 'none' : 'block';
                        content.style.opacity = content.style.display === 'block' ? '1' : '0';
                        content.style.visibility = content.style.display === 'block' ? 'visible' : 'hidden';
                    }
                }
            });
        });
    }

    // Touch-friendly carousel improvements
    function initTouchCarousels() {
        var carousels = document.querySelectorAll('.virtue-carousel-wrapper-outer, .virtue-testimonials-wrapper-outer');
        
        carousels.forEach(function(carousel) {
            var startX = 0;
            var scrollLeft = 0;
            var isDown = false;
            var hasMoved = false;
            
            carousel.addEventListener('touchstart', function(e) {
                isDown = true;
                hasMoved = false;
                startX = e.touches[0].pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            }, { passive: true });
            
            carousel.addEventListener('touchmove', function(e) {
                if (!isDown) return;
                hasMoved = true;
                var x = e.touches[0].pageX - carousel.offsetLeft;
                var walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            }, { passive: true });
            
            carousel.addEventListener('touchend', function() {
                isDown = false;
            });

            // Prevent click events if user was scrolling
            carousel.addEventListener('click', function(e) {
                if (hasMoved) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        });
    }

    // Improve button tap targets on mobile
    function improveTapTargets() {
        if ('ontouchstart' in window) {
            var buttons = document.querySelectorAll('button:not(.virtue-nav-toggle), a.virtue-playstore-btn, a.virtue-cta-button');
            buttons.forEach(function(btn) {
                var currentMinHeight = window.getComputedStyle(btn).minHeight;
                var currentMinWidth = window.getComputedStyle(btn).minWidth;
                
                if (parseInt(currentMinHeight) < 44) {
                    btn.style.minHeight = '44px';
                }
                if (parseInt(currentMinWidth) < 44) {
                    btn.style.minWidth = '44px';
                }
            });
        }
    }

    // Prevent zoom on double tap for specific elements
    function preventDoubleTapZoom() {
        var lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            var now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Handle orientation change
    function handleOrientationChange() {
        window.addEventListener('orientationchange', function() {
            // Close mobile menu on orientation change
            var nav = document.querySelector('.virtue-nav');
            var toggle = document.getElementById('virtueNavToggle');
            
            if (nav && toggle) {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = '☰';
            }

            // Recalculate carousel positions
            setTimeout(function() {
                var carousels = document.querySelectorAll('.virtue-carousel-wrapper-outer, .virtue-testimonials-wrapper-outer');
                carousels.forEach(function(carousel) {
                    carousel.scrollLeft = 0;
                });
            }, 300);
        });
    }

    // Smooth scroll for anchor links on mobile
    function initSmoothScroll() {
        var links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    var nav = document.querySelector('.virtue-nav');
                    var toggle = document.getElementById('virtueNavToggle');
                    if (nav && toggle) {
                        nav.classList.remove('active');
                        toggle.setAttribute('aria-expanded', 'false');
                        toggle.textContent = '☰';
                    }
                    
                    // Smooth scroll to target
                    var headerHeight = document.querySelector('.virtue-header')?.offsetHeight || 0;
                    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Lazy load images on mobile for better performance
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            var images = document.querySelectorAll('img[data-src]');
            
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // Detect if user is on mobile device
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= 768);
    }

    // Add mobile-specific class to body
    function addMobileClass() {
        if (isMobileDevice()) {
            document.body.classList.add('is-mobile');
        }
        
        // Update on resize
        window.addEventListener('resize', function() {
            if (isMobileDevice()) {
                document.body.classList.add('is-mobile');
            } else {
                document.body.classList.remove('is-mobile');
            }
        });
    }

    // Initialize all mobile features
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initMobileNav();
                initTouchCarousels();
                improveTapTargets();
                handleOrientationChange();
                initSmoothScroll();
                initLazyLoading();
                addMobileClass();
            });
        } else {
            initMobileNav();
            initTouchCarousels();
            improveTapTargets();
            handleOrientationChange();
            initSmoothScroll();
            initLazyLoading();
            addMobileClass();
        }
    }

    // Start initialization
    init();

})();
