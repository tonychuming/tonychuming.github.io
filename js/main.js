/* ===================================================================
   Lin Chuming - Personal Portfolio
   JavaScript Interactions & Animations
   =================================================================== */

(function () {
    'use strict';

    // --- DOM References ---
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    const revealElements = document.querySelectorAll('.reveal');

    // --- Mobile Navigation Toggle ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Navbar Scroll Effect ---
    var lastScrollY = 0;
    var ticking = false;

    function updateNavbar() {
        var scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // --- Active Navigation Link Tracking ---
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

    window.addEventListener('scroll', function () {
        window.requestAnimationFrame(updateActiveNavLink);
    });

    // --- Scroll Reveal Animation ---
    function revealOnScroll() {
        var windowHeight = window.innerHeight;
        var revealPoint = 80;

        revealElements.forEach(function (el) {
            var elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    // Run on load and scroll
    window.addEventListener('scroll', function () {
        window.requestAnimationFrame(revealOnScroll);
    });

    // Initial check on page load
    window.addEventListener('load', function () {
        revealOnScroll();
        updateNavbar();
        updateActiveNavLink();
    });

    // Also run after a short delay to catch elements visible on load
    setTimeout(revealOnScroll, 100);

    // --- Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior) ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerOffset = 72;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Staggered reveal for project cards ---
    var projectCards = document.querySelectorAll('.project-card.reveal');
    var observer = null;

    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    // Add a stagger delay based on the card's position
                    var delay = 0;
                    projectCards.forEach(function (card, i) {
                        if (card === entry.target) {
                            delay = i * 100;
                        }
                    });

                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        projectCards.forEach(function (card) {
            observer.observe(card);
        });
    }

    // --- Highlight card counter animation ---
    function animateCounters() {
        var counters = document.querySelectorAll('.highlight-card h3');
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var target = entry.target;
                    var finalValue = target.textContent;
                    var isFloat = finalValue.includes('.');

                    if (isFloat) {
                        var end = parseFloat(finalValue);
                        var duration = 1200;
                        var start = 0;
                        var startTime = null;

                        function step(timestamp) {
                            if (!startTime) startTime = timestamp;
                            var progress = Math.min((timestamp - startTime) / duration, 1);
                            // Ease out cubic
                            var eased = 1 - Math.pow(1 - progress, 3);
                            var current = start + (end - start) * eased;
                            target.textContent = current.toFixed(2);
                            if (progress < 1) {
                                window.requestAnimationFrame(step);
                            } else {
                                target.textContent = finalValue;
                            }
                        }
                        window.requestAnimationFrame(step);
                    } else {
                        var endVal = parseInt(finalValue);
                        if (!isNaN(endVal) && endVal > 0) {
                            var dur = 1000;
                            var startVal = 0;
                            var startT = null;

                            function stepInt(timestamp) {
                                if (!startT) startT = timestamp;
                                var prog = Math.min((timestamp - startT) / dur, 1);
                                var easedVal = 1 - Math.pow(1 - prog, 3);
                                target.textContent = Math.round(startVal + (endVal - startVal) * easedVal);
                                if (prog < 1) {
                                    window.requestAnimationFrame(stepInt);
                                } else {
                                    target.textContent = finalValue;
                                }
                            }
                            window.requestAnimationFrame(stepInt);
                        }
                    }

                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    if ('IntersectionObserver' in window) {
        animateCounters();
    }

    // --- Metric value animation ---
    function animateMetrics() {
        var metrics = document.querySelectorAll('.metric-value');
        var metricObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(10px)';
                    setTimeout(function () {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                    metricObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        metrics.forEach(function (metric) {
            metricObserver.observe(metric);
        });
    }

    if ('IntersectionObserver' in window) {
        animateMetrics();
    }

    // --- Keyboard accessibility: close mobile menu with Escape ---
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

})();
