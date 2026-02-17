/* ===================================================================
   Lin Chuming - Personal Portfolio
   "Deep Intelligence" Theme - Interactions & tsParticles
   =================================================================== */

(function () {
    'use strict';

    // ===================================================================
    // THEME MANAGEMENT
    // ===================================================================
    function isLightTheme() {
        return document.documentElement.getAttribute('data-theme') === 'light';
    }

    function initTheme() {
        var saved = localStorage.getItem('theme');
        var themeToggle = document.getElementById('themeToggle');

        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        // Update toggle button state
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', isLightTheme() ? 'true' : 'false');
        }

        // Listen for system preference changes (only when no manual preference)
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
                if (!localStorage.getItem('theme')) {
                    document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
                    updateParticlesForTheme();
                    if (themeToggle) {
                        themeToggle.setAttribute('aria-pressed', e.matches ? 'true' : 'false');
                    }
                }
            });
        }
    }

    function toggleTheme() {
        var next = isLightTheme() ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateParticlesForTheme();

        var themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
        }

        // Update meta theme-color for browser chrome
        var metaTheme = document.getElementById('metaThemeColor');
        if (metaTheme) {
            metaTheme.content = next === 'light' ? '#F7F8FC' : '#060B18';
        }
    }

    // Bind toggle button
    var themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Initialize theme immediately (before load event to prevent flash)
    initTheme();

    // ===================================================================
    // HERO PARTICLE NETWORK (tsParticles) — Theme-Aware
    // ===================================================================
    function getParticleConfig() {
        var light = isLightTheme();
        return {
            fullScreen: { enable: false },
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        area: 900
                    }
                },
                color: {
                    value: light
                        ? ["#0088B3", "#4A32C9", "#0B8A5E"]
                        : ["#00D4FF", "#7B61FF", "#34D399"]
                },
                shape: { type: "circle" },
                opacity: {
                    value: light
                        ? { min: 0.20, max: 0.50 }
                        : { min: 0.15, max: 0.40 },
                    animation: {
                        enable: true,
                        speed: 0.8,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: { min: 1.5, max: 3.5 },
                    animation: {
                        enable: true,
                        speed: 1.5,
                        minimumValue: 1,
                        sync: false
                    }
                },
                links: {
                    enable: true,
                    distance: 160,
                    color: light ? "#0088B3" : "#00D4FF",
                    opacity: light ? 0.14 : 0.10,
                    width: 0.8
                },
                move: {
                    enable: true,
                    speed: 0.4,
                    direction: "none",
                    outModes: { default: "bounce" },
                    random: true,
                    straight: false
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        links: {
                            opacity: light ? 0.30 : 0.25,
                            color: light ? "#0088B3" : "#00D4FF"
                        }
                    }
                }
            },
            detectRetina: true,
            responsive: [
                {
                    maxWidth: 640,
                    options: {
                        particles: {
                            number: { value: 40 },
                            links: { distance: 120 }
                        },
                        interactivity: {
                            events: {
                                onHover: { enable: false }
                            }
                        }
                    }
                }
            ]
        };
    }

    function initParticles() {
        if (typeof tsParticles === 'undefined') return;
        tsParticles.load("tsparticles", getParticleConfig());
    }

    function updateParticlesForTheme() {
        if (typeof tsParticles === 'undefined') return;
        var container = tsParticles.domItem(0);
        if (container) {
            container.destroy();
        }
        tsParticles.load("tsparticles", getParticleConfig());
    }

    // ===================================================================
    // PAUSE PARTICLES WHEN HERO NOT VISIBLE
    // ===================================================================
    function initParticleVisibility() {
        if (!('IntersectionObserver' in window)) return;
        if (typeof tsParticles === 'undefined') return;

        var heroEl = document.getElementById('hero');
        if (!heroEl) return;

        var heroObserver = new IntersectionObserver(function (entries) {
            var container = tsParticles.domItem(0);
            if (!container) return;
            if (entries[0].isIntersecting) {
                container.play();
            } else {
                container.pause();
            }
        }, { threshold: 0.05 });

        heroObserver.observe(heroEl);
    }

    // ===================================================================
    // NAVIGATION
    // ===================================================================
    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('.section, .hero');

    // Mobile Navigation Toggle
    function closeNav() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var isOpen = navMenu.classList.contains('active');
            if (isOpen) {
                closeNav();
            } else {
                navToggle.classList.add('active');
                navMenu.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                closeNav();
            });
        });

        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                closeNav();
            }
        });
    }

    // Navbar scroll effect
    var scrollTicking = false;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Active nav link tracking
    function updateActiveNavLink() {
        var scrollPosition = window.scrollY + 120;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Single throttled scroll handler for performance
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                updateNavbar();
                updateActiveNavLink();
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
    // PROJECT METRIC ANIMATION
    // ===================================================================
    function animateProjectMetrics() {
        var metrics = document.querySelectorAll('.proj-metric-val');
        if (!metrics.length) return;

        var metricObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(8px)';
                    setTimeout(function () {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 150);
                    metricObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        metrics.forEach(function (metric) {
            metricObserver.observe(metric);
        });
    }

    // ===================================================================
    // SMOOTH SCROLL
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
    // KEYBOARD ACCESSIBILITY
    // ===================================================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeNav();
            navToggle.focus();
        }
    });

    // ===================================================================
    // INITIALIZATION
    // ===================================================================
    window.addEventListener('load', function () {
        initParticles();
        initScrollReveal();
        updateNavbar();
        updateActiveNavLink();

        // Delay particle visibility check to allow tsParticles to initialize
        setTimeout(function () {
            initParticleVisibility();
        }, 1000);
    });

    // Initialize animations
    if ('IntersectionObserver' in window) {
        animateHeroStats();
        animateProjectMetrics();
    }

})();
