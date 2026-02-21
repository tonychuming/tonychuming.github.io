/* ===================================================================
   Lin Chuming - Personal Portfolio
   "Editorial Intelligence" — Interactions
   =================================================================== */

(function () {
    'use strict';

    // ===================================================================
    // HERO CHARACTER ANIMATION
    // Split hero name into individual characters with staggered reveal
    // ===================================================================
    function initCharacterAnimation() {
        var heroName = document.querySelector('.hero-name');
        if (!heroName) return;

        // Check reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var text = heroName.textContent.trim();
        heroName.setAttribute('aria-label', text);
        heroName.innerHTML = '';

        text.split('').forEach(function (char, i) {
            var span = document.createElement('span');
            span.classList.add('char');
            span.setAttribute('aria-hidden', 'true');
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = char;
            }
            span.style.animationDelay = (0.05 * i + 0.3) + 's';
            heroName.appendChild(span);
        });
    }

    // ===================================================================
    // FULL-SCREEN NAVIGATION OVERLAY
    // ===================================================================
    var menuTrigger = document.getElementById('menuTrigger');
    var navOverlay = document.getElementById('navOverlay');
    var navOverlayClose = document.getElementById('navOverlayClose');
    var overlayLinks = navOverlay ? navOverlay.querySelectorAll('.nav-overlay-link') : [];

    function openNav() {
        if (!navOverlay) return;
        navOverlay.classList.add('active');
        if (menuTrigger) menuTrigger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // Move focus into overlay
        setTimeout(function () {
            if (navOverlayClose) navOverlayClose.focus();
        }, 100);
    }

    function closeNav() {
        if (!navOverlay) return;
        navOverlay.classList.remove('active');
        if (menuTrigger) {
            menuTrigger.setAttribute('aria-expanded', 'false');
            menuTrigger.focus();
        }
        document.body.style.overflow = '';
    }

    if (menuTrigger) {
        menuTrigger.addEventListener('click', openNav);
    }

    if (navOverlayClose) {
        navOverlayClose.addEventListener('click', closeNav);
    }

    // Close on link click
    Array.prototype.forEach.call(overlayLinks, function (link) {
        link.addEventListener('click', closeNav);
    });

    // Focus trap + Escape to close
    if (navOverlay) {
        navOverlay.addEventListener('keydown', function (e) {
            if (!navOverlay.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeNav();
                return;
            }

            if (e.key === 'Tab') {
                var focusable = navOverlay.querySelectorAll('a[href], button');
                if (!focusable.length) return;
                var first = focusable[0];
                var last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // ===================================================================
    // NAVBAR SCROLL EFFECT
    // ===================================================================
    var navbar = document.getElementById('navbar');
    var scrollTicking = false;

    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                updateNavbar();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // ===================================================================
    // SCROLL REVEAL (IntersectionObserver)
    // ===================================================================
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length || !('IntersectionObserver' in window)) {
            // Fallback: show everything
            revealElements.forEach(function (el) { el.classList.add('visible'); });
            return;
        }

        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // ===================================================================
    // HERO METRIC COUNTER ANIMATION
    // ===================================================================
    function animateHeroStats() {
        var statValues = document.querySelectorAll('.hero-metric-value[data-count]');
        if (!statValues.length) return;

        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-count'));
                    var duration = 1200;
                    var startTime = null;

                    function step(timestamp) {
                        if (!startTime) startTime = timestamp;
                        var progress = Math.min((timestamp - startTime) / duration, 1);
                        var eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(target * eased);
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        }
                    }
                    requestAnimationFrame(step);
                    statsObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(function (el) {
            statsObserver.observe(el);
        });
    }

    // ===================================================================
    // ABOUT PHOTO PARALLAX
    // Subtle vertical translation based on scroll position
    // ===================================================================
    function initParallax() {
        var parallaxEl = document.querySelector('[data-parallax]');
        if (!parallaxEl) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        window.addEventListener('scroll', function () {
            var rect = parallaxEl.getBoundingClientRect();
            var inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
                var scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                var offset = (scrolled - 0.5) * 30; // -15px to +15px range
                parallaxEl.style.transform = 'translateY(' + offset + 'px)';
            }
        }, { passive: true });
    }

    // ===================================================================
    // SMOOTH SCROLL for anchor links
    // ===================================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerOffset = 76;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================================================
    // KEYBOARD ACCESSIBILITY — global Escape fallback
    // ===================================================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navOverlay && navOverlay.classList.contains('active')) {
            closeNav();
        }
    });

    // ===================================================================
    // INITIALIZATION
    // ===================================================================
    initCharacterAnimation();

    window.addEventListener('load', function () {
        initScrollReveal();
        updateNavbar();
        initParallax();
    });

    // Start observers early
    if ('IntersectionObserver' in window) {
        animateHeroStats();
    }

})();
