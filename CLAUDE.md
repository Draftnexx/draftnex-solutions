# CLAUDE.md - Draftnex Solutions Website

> Comprehensive guide for AI assistants working with the Draftnex Solutions website codebase

## Project Overview

**Draftnex Solutions** is a German-language business website for a digital solutions company specializing in custom app development, digital systems, and automation services. The site is a modern, responsive static website built with vanilla HTML, CSS, and minimal JavaScript.

### Key Information
- **Project Type**: Static business website
- **Language**: German (de)
- **Target Audience**: Self-employed professionals, small businesses, and private clients
- **Purpose**: Showcase services, attract clients, and provide contact information

---

## Codebase Structure

```
draftnex-solutions/
├── index.html              # Homepage with hero, features, showcase, process sections
├── services.html           # Services/offerings page
├── about.html             # About page (company/founder info)
├── contact.html           # Contact form page
├── impressum.html         # Legal imprint (required in Germany)
├── datenschutz.html       # Privacy policy (GDPR compliance)
├── nav.html               # Shared navigation component
├── nav.css                # Navigation-specific styles
├── draftnex-logo.png      # Company logo (119KB)
├── buiswebsite.png        # Screenshot/preview image (1.3MB)
└── README.md              # Basic project description
```

### File Organization
- **Pages**: Each HTML file is self-contained with inline `<style>` blocks
- **Shared Components**: Navigation is extracted to `nav.html` and loaded dynamically
- **Assets**: Images stored in root directory
- **No Build Process**: Direct HTML/CSS/JS (no bundlers, transpilers, or preprocessors)

---

## Technology Stack

### Core Technologies
- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Custom properties (CSS variables), Grid, Flexbox, animations
- **Vanilla JavaScript**: Minimal JS for navigation and dynamic loading

### External Dependencies
1. **Google Fonts**
   - `Space Grotesk` (400, 500, 600, 700) - Primary font
   - `JetBrains Mono` (400, 600) - Monospace font for technical elements

2. **Font Awesome 6.5.1**
   - Icon library loaded from CDN
   - Used throughout for UI icons

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design with breakpoints at 960px, 720px, 480px

---

## Design System

### Color Palette
Defined in CSS custom properties (`:root`):

```css
--bg: #050712;              /* Primary background - dark blue-black */
--bg-alt: #070a18;          /* Alternative background */
--fg: #f5f7ff;              /* Foreground text - off-white */
--muted: #9da3c6;           /* Muted text - light purple-gray */
--accent: #29e0ff;          /* Primary accent - cyan/turquoise */
--accent-soft: rgba(41, 224, 255, 0.16);  /* Translucent accent */
--accent-2: #c357ff;        /* Secondary accent - purple */
--border-subtle: rgba(255, 255, 255, 0.06);  /* Subtle borders */
--card-bg: rgba(10, 13, 30, 0.9);  /* Card backgrounds */
```

### Typography
- **Primary Font**: Space Grotesk - modern, geometric sans-serif
- **Monospace Font**: JetBrains Mono - for code-like elements, technical info
- **Text Sizes**: Responsive using `clamp()` and relative units
- **Letter Spacing**: Uppercase elements use `0.06em` to `0.18em`

### Spacing & Layout
```css
--radius-xl: 22px;          /* Extra large border radius */
--radius-lg: 18px;          /* Large border radius */
--radius-pill: 999px;       /* Pill-shaped elements */
--shadow-soft: 0 22px 60px rgba(0, 0, 0, 0.65);
--transition-fast: 180ms ease-out;
--transition-med: 260ms ease-out;
```

### Visual Style
- **Theme**: Dark mode with neon accents (cyberpunk/tech aesthetic)
- **Effects**:
  - Animated gradient backgrounds using `@keyframes`
  - Glassmorphism with `backdrop-filter: blur()`
  - Glow effects on hover: `box-shadow: 0 0 40px rgba(41, 224, 255, 0.4)`
  - 3D transforms and perspective effects
  - Smooth scroll reveal animations

---

## Component Patterns

### Navigation Component (`nav.html` + `nav.css`)

The navigation is a reusable component loaded dynamically on all pages:

**Structure:**
- Desktop navigation: Horizontal menu with links and CTA buttons
- Mobile navigation: Slide-in panel triggered by burger button
- Responsive breakpoint: `@media (max-width: 860px)`

**JavaScript Integration:**
```javascript
fetch("nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("site-header").innerHTML = html;
    // Initialize burger menu toggle
    // Handle mobile panel link clicks
  });
```

**Key Features:**
- Toggle between burger (☰) and close (✕) icons
- Slide-in animation with `cubic-bezier(.23,1,.32,1)`
- Auto-close menu when clicking internal links
- Desktop nav hidden on mobile, burger shown

### Button Styles

Two primary button variants used throughout:

```css
.btn-primary {
  /* Bright accent background, used for primary CTAs */
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 30px rgba(41, 224, 255, 0.5);
}

.btn-ghost {
  /* Outlined style, secondary actions */
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(8, 12, 30, 0.95);
}
```

### Common Patterns
1. **Reveal Animations**: `.reveal` class with intersection observer
2. **Parallax Elements**: `[data-parallax]` attribute for depth effects
3. **Card Layouts**: Grid-based with hover effects
4. **Gradient Overlays**: Radial gradients for depth and visual interest

---

## Page Structure

### index.html (Homepage)
**Sections:**
1. **Hero Section** (`#hero`)
   - Main headline with gradient text
   - CTA buttons (Projekt starten, App-Showcase ansehen)
   - 3D animated app card showcase
   - Service chips/badges

2. **Features Section** (`#features`)
   - 3-column grid (responsive to 1-column)
   - Icon + title + description + tags
   - Cards with hover effects

3. **App Showcase** (`#showcase`)
   - Example app use cases (Mini-CRM, Automation Hub, Productivity Suite)
   - Grid layout with descriptive cards
   - Badges for target audiences

4. **Process Section** (`#process`)
   - 3-step workflow (Kennenlernen, Konzept & Prototyp, Umsetzung)
   - Numbered process steps
   - CTA section at bottom

5. **Footer**
   - Copyright notice with dynamic year
   - Links to Impressum, Datenschutz, Über mich

### Other Pages
- **services.html**: Detailed service offerings
- **about.html**: Company/founder story
- **contact.html**: Contact form
- **impressum.html**: Legal information (German requirement)
- **datenschutz.html**: Privacy policy (GDPR compliance)

---

## Development Workflows

### Making Changes

#### Adding New Pages
1. Copy an existing page (e.g., `index.html`) as template
2. Update `<title>` and meta description
3. Include nav.html loading script in `<body>`
4. Maintain consistent CSS variable usage
5. Update navigation links in `nav.html` if needed

#### Modifying Styles
- **Global changes**: Update CSS custom properties in `:root`
- **Component-specific**: Modify inline `<style>` blocks in each page
- **Navigation**: Edit `nav.css` for nav-specific styles
- **Consistency**: Use existing color/spacing variables

#### Updating Navigation
1. Edit `nav.html` for structure changes
2. Edit `nav.css` for styling changes
3. Changes automatically apply to all pages (dynamically loaded)

### Testing
- Test on multiple screen sizes (desktop, tablet, mobile)
- Verify navigation slide panel works on mobile
- Check all internal links
- Validate German language content
- Test in Chrome, Firefox, Safari

---

## Git Workflow

### Branch Naming Convention
- Feature branches follow pattern: `claude/[description]-[session-id]`
- Example: `claude/claude-md-mixj5jjr6lwcjtzq-01PjT8xJ45p7GiHFD1qAytks`

### Commit Guidelines
- **Clear messages**: Describe what changed, not why
- **Conventional format**: `[Action] [Component/File]`
  - Examples: "Update nav.css", "Refactor navigation structure"
- **Atomic commits**: One logical change per commit
- **German content**: Commits in English, content in German

### Git Operations
```bash
# Always develop on designated branch
git checkout claude/[branch-name]

# Commit changes
git add .
git commit -m "$(cat <<'EOF'
  Clear, descriptive commit message here
EOF
)"

# Push to remote (with session ID validation)
git push -u origin claude/[branch-name]
```

**Important**: Branch names must start with `claude/` and match session ID, or push will fail with 403.

---

## Key Conventions for AI Assistants

### Content Guidelines
1. **Language**: All user-facing content MUST be in German
2. **Tone**: Professional but approachable, avoiding jargon
3. **Target Audience**: Self-employed professionals, small businesses
4. **Brand Voice**: Direct, honest, solution-focused

### Code Style
1. **Formatting**:
   - 2-space indentation for HTML/CSS
   - Consistent spacing in CSS properties
   - Comments in German for content, English for technical

2. **CSS Organization**:
   - Custom properties first in `:root`
   - Mobile-first or desktop-first consistently
   - Group related styles together
   - Use existing variables instead of hardcoding values

3. **HTML Semantics**:
   - Use semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
   - Include ARIA labels where appropriate
   - Maintain heading hierarchy (h1 → h2 → h3)

### Accessibility
- Maintain color contrast ratios (dark bg + light text)
- Include alt text for images
- Ensure keyboard navigation works
- Test with screen readers if adding interactive elements

### Performance
- Images should be optimized (consider WebP format)
- Minimize external dependencies
- Use `loading="lazy"` for below-fold images
- Keep inline styles organized and minimal

### Responsive Design
**Breakpoints:**
```css
@media (max-width: 960px) { /* Tablet */ }
@media (max-width: 720px) { /* Mobile landscape */ }
@media (max-width: 480px) { /* Mobile portrait */ }
```

**Approach:**
- Test all layouts at breakpoints
- Use flexible units (rem, em, %, vw/vh)
- Grid/Flexbox for layout (no floats)
- Mobile navigation pattern must work

---

## Common Tasks & How-To

### Add a New Section to Homepage
1. Define section in `<main>` with unique `id`
2. Use `.wrapper` class for max-width constraint
3. Add `.section-header` with title and description
4. Use `.reveal` class for scroll animations
5. Follow grid patterns (`.feature-grid`, `.process-grid`, etc.)
6. Update navigation if section needs anchor link

### Update Color Scheme
1. Modify CSS custom properties in `:root`
2. Test contrast ratios for accessibility
3. Update across all pages (each has own `<style>` block)
4. Consider `nav.css` separately

### Add Icons
1. Find icon on Font Awesome 6.5.1
2. Use `<i class="fa-solid fa-[icon-name]"></i>`
3. Style with existing color variables
4. Maintain consistent icon sizing

### Update Navigation Links
1. Edit `nav.html` (both desktop and mobile sections)
2. Ensure URLs are correct relative paths
3. Test navigation on all pages
4. Verify mobile slide panel includes all links

### Optimize Images
```bash
# Check current image sizes
ls -lh *.png *.jpg

# Consider converting to WebP for better compression
# Update <img> tags with WebP + fallback
```

---

## Important Notes

### German Legal Requirements
- **Impressum**: Legally required in Germany for commercial websites
- **Datenschutz**: GDPR-compliant privacy policy required
- Keep these pages updated with accurate business information

### External Dependencies
- **CDN reliability**: Google Fonts and Font Awesome loaded from CDN
- **Fallback fonts**: Consider adding system font fallbacks
- **Offline considerations**: Site won't work offline due to CDN dependencies

### Limitations
- **No Backend**: Static site, no server-side processing
- **No Build Step**: Changes require manual updates to each page
- **Contact Form**: Needs backend integration or third-party service

### Future Improvements to Consider
1. Implement a static site generator (11ty, Hugo) to reduce repetition
2. Move shared styles to external CSS file
3. Add build process for CSS minification
4. Implement proper image optimization pipeline
5. Add analytics (privacy-focused, GDPR-compliant)
6. Consider progressive enhancement for JavaScript

---

## Troubleshooting

### Navigation Not Loading
- Check `fetch("nav.html")` path is correct
- Verify `#site-header` element exists
- Check browser console for errors
- Ensure nav.html is accessible (same directory)

### Mobile Menu Not Working
- Verify JavaScript executes after nav.html loads
- Check `.nav-toggle` and `.mobile-panel` elements exist
- Test `navContainer.classList.toggle("open")` functionality
- Inspect CSS for `.nav.open .mobile-panel` rule

### Styles Not Applying
- Check CSS custom property names match
- Verify `:root` selector is present
- Inspect browser DevTools for CSS conflicts
- Ensure styles are in `<style>` block within `<head>`

### Responsive Layout Issues
- Test at exact breakpoint widths (960px, 720px, 480px)
- Check media query syntax
- Verify mobile-first or desktop-first consistency
- Inspect grid/flexbox properties

---

## Quick Reference

### Common CSS Variables
```css
var(--bg)           /* Dark background */
var(--fg)           /* Light text */
var(--accent)       /* Cyan accent */
var(--accent-2)     /* Purple accent */
var(--muted)        /* Muted text */
var(--radius-lg)    /* Border radius */
var(--transition-med) /* Animation timing */
```

### Common Classes
```css
.wrapper            /* Max-width container (1120px) */
.reveal             /* Scroll reveal animation */
.btn-primary        /* Primary CTA button */
.btn-ghost          /* Secondary button */
.feature-grid       /* 3-column feature grid */
.section-header     /* Section title + description */
.chip / .pill       /* Small badge elements */
```

### File Checklist for New Pages
- [ ] HTML5 doctype and lang="de"
- [ ] Meta charset UTF-8 and viewport
- [ ] Descriptive `<title>` tag
- [ ] Google Fonts link (Space Grotesk + JetBrains Mono)
- [ ] Font Awesome CDN link
- [ ] Navigation include script
- [ ] `<header id="site-header"></header>`
- [ ] Footer with links to legal pages
- [ ] Consistent color variables in `:root`
- [ ] Responsive media queries

---

## Questions to Ask Before Making Changes

1. **Does this change affect all pages?**
   - If yes: Update each HTML file or consider extracting to shared file
   - Navigation changes: Update `nav.html` and/or `nav.css`

2. **Is this content user-facing?**
   - If yes: Must be in German
   - Maintain consistent brand voice

3. **Does this introduce new dependencies?**
   - Avoid when possible
   - Document if necessary
   - Consider offline/privacy implications

4. **Is this accessible?**
   - Color contrast sufficient?
   - Keyboard navigable?
   - Screen reader friendly?

5. **Is this responsive?**
   - Test at all breakpoints
   - Mobile-first considerations
   - Touch-friendly interactive elements

6. **Does this align with the brand?**
   - Dark theme with neon accents
   - Modern, tech-forward aesthetic
   - Clean, minimal design language

---

## Contact & Support

For questions about business requirements, design decisions, or content updates:
- Review the existing page content for brand voice examples
- Check similar sections on other pages for consistency
- Maintain the professional but approachable tone
- Focus on solutions and benefits for target audience

---

**Last Updated**: 2025-12-08
**Document Version**: 1.0
**Maintained By**: AI Assistants working with Draftnex Solutions codebase
