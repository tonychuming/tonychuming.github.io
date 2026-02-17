# Lin Chuming - Personal Portfolio Website

A premium AI/ML-themed personal portfolio website with a dark, sophisticated design. Built with pure HTML, CSS, and JavaScript -- no build tools or server required.

## How to View

Simply open `index.html` in any modern web browser:

- **macOS**: Double-click `index.html`, or right-click and select "Open With" > your browser
- **Windows**: Double-click `index.html`
- **Linux**: `xdg-open index.html` or open directly in your browser

The page loads instantly with no server setup needed.

## Project Structure

```
personal_web/
├── index.html          # Main page (single-page application)
├── css/
│   └── style.css       # All styles (dark theme, responsive, animations)
├── js/
│   └── main.js         # Neural network canvas, scroll animations, navigation
├── assets/
│   ├── images/
│   │   └── profile.jpg # Professional headshot (circular crop in hero)
│   └── docs/
│       ├── scholarship.pdf                # MFU scholarship certificate
│       └── nectec-internship-certificate.pdf  # NSTDA internship certificate
└── README.md           # This file
```

## External Dependencies (via CDN)

- **Google Fonts**: Inter (body), Space Grotesk (headings), JetBrains Mono (metrics/code)
- **Font Awesome 6.5**: Icons throughout the page

Both gracefully degrade if CDN is unavailable -- the page remains fully functional with system fonts and without icons.

## Design Theme

The design is built around an AI/ML aesthetic:

- **Dark base palette** with deep navy/charcoal tones (#0a0e1a)
- **Electric cyan (#00d4ff) to purple (#7c5cfc) gradient** as the primary accent
- **Animated neural network** particle canvas in the hero section (interactive -- responds to mouse movement)
- **Monospace typography** (JetBrains Mono) for metrics and technical elements
- **Glassmorphic cards** with subtle border glows on hover
- **Skill bars** with gradient fills that animate on scroll

## Customization

### Profile Photo
Replace `assets/images/profile.jpg` with a new image (same filename), or update the `src` attribute on the `<img class="hero-avatar-img">` tag in `index.html`.

### Color Scheme
Edit the CSS custom properties at the top of `css/style.css` under `:root`. Key variables:
- `--accent`: Primary accent color (currently electric cyan)
- `--accent-alt`: Secondary accent (currently purple)
- `--bg-primary`: Main background color
- `--gradient-accent`: Accent gradient used on buttons and fills

### Content Updates
All content is directly in `index.html` -- edit the text in each section as needed. Project cards can be duplicated or removed.

### Neural Network Canvas
Adjust the canvas configuration in `js/main.js` under the `config` object to change particle count, connection distance, colors, and speed.

## Browser Support

Tested and compatible with all modern browsers:
- Chrome / Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome for Android)

## Features

- Interactive neural network particle animation (canvas-based, GPU-friendly)
- Dark mode AI/ML-themed design
- Responsive layout (mobile, tablet, desktop)
- Scroll-triggered reveal animations with staggered timing
- Animated skill progress bars
- Counter animations for hero statistics
- Active navigation link tracking
- Smooth scrolling with offset for fixed header
- Credential badges linking to verifiable documents
- Print-friendly styles (dark theme converts to light for printing)
- Keyboard accessible (Escape closes mobile menu)
- Semantic HTML5 structure
- Performance-optimized (canvas pauses when hero is out of view)
