# Lin Chuming - Personal Portfolio Website

A professional single-page personal introduction website designed for job applications. Built with pure HTML, CSS, and JavaScript -- no build tools or server required.

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
│   └── style.css       # All styles (responsive, animations, themes)
├── js/
│   └── main.js         # Interactions (scroll animations, navigation, counters)
├── assets/
│   ├── images/
│   │   └── profile.jpg # Professional headshot (circular crop in hero)
│   └── docs/
│       └── scholarship.pdf  # MFU scholarship certificate
└── README.md           # This file
```

## External Dependencies (via CDN)

- **Google Fonts**: Inter (body) and Source Serif 4 (headings)
- **Font Awesome 6.5**: Icons throughout the page

Both gracefully degrade if CDN is unavailable -- the page remains fully functional with system fonts and without icons.

## Customization

### Profile Photo
The profile photo (`assets/images/profile.jpg`) is displayed as a circular crop in the hero section. To replace it, swap the image file while keeping the same filename, or update the `src` attribute on the `<img class="avatar-photo">` tag in `index.html`.

### Color Scheme
Edit the CSS custom properties at the top of `css/style.css` under `:root` to change the color palette.

### Content Updates
All content is directly in `index.html` -- edit the text in each section as needed. The Projects section uses card components that can be duplicated or removed.

## Browser Support

Tested and compatible with all modern browsers:
- Chrome / Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome for Android)

## Design Features

- Responsive design (mobile-first)
- Smooth scroll animations
- Active navigation tracking
- Animated counters for highlight metrics
- Credential badges with links to verifiable documents (scholarship PDF, official team listing)
- Print-friendly styles (badges show URLs when printed)
- Keyboard accessible (Escape closes mobile menu)
- Semantic HTML5 structure
