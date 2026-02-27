# Dicom Vision - Site Modernization Plan

This document outlines a strategy to modernize the **Dicom Vision** website, focusing on visual improvements, technical optimization, and SEO enhancement.

## 1. Visual & User Experience (UX) Modernization

The current site uses the "Snowlake" theme, which relies on older technologies. Verification of the current "look and feel" suggests it is professional but valid modernization steps can make it feel more "premium" and "tech-forward".

### Recommendations:
*   **Typography:** Switch to a more modern, geometric sans-serif font pair (e.g., *Inter*, *Plus Jakarta Sans*, or *Outfit*) to align with the "medical tech" brand. The current *Jost* is good, but can be fine-tuned.
*   **Hero Section:** Replace the heavy "Revolution Slider" with a lightweight, CSS-driven hero section. This improves load times and mobile performance significantly.
*   **Micro-interactions:** Add subtle entry animations (using `AOS` - Animate On Scroll, which is already present but can be refined) and hover effects on cards to make the UI feel "alive".
*   **Color Palette:** Refine the color scheme to use a primary "Medical Blue" with higher contrast accents. Ensure dark mode compatibility if desired.
*   **Images:** Replace GIFs with optimized video loops (WebM/MP4) or Lottie animations for smoother performance and higher quality.

## 2. Technical Stack Improvements

The site currently relies on **Bootstrap (legacy)** and **jQuery**, along with a massive `style.css` (~7000 lines).

### Recommendations:
*   **Remove jQuery:** Migrating interactive elements (navbar, modals) to Vanilla JavaScript will significantly reduce bundle size and improve browser parsing speed.
*   **CSS Refactor:**
    *   The `style.css` is monolithic. We should split it into SCSS modules (e.g., `_hero.scss`, `_navbar.scss`, `_footer.scss`) and let Jekyll compile it.
    *   Remove unused CSS from the purchased theme to lower file size.
*   **Bootstrap Upgrade:** Upgrade to **Bootstrap 5**, which drops jQuery dependency and offers modern utility classes (Flexbox/Grid).
*   **Image Optimization:**
    *   Convert PNG/JPG assets to **WebP** or **AVIF**.
    *   Implement native lazy loading (`loading="lazy"`) on all non-hero images.

## 3. SEO & Analytics (Critical)

The current setup lacks essential metadata and uses outdated tracking.

### Issues Identified:
*   **Analytics:** usage of `analytics.js` (Universal Analytics) which is **deprecated**.
*   **Meta Tags:** Missing dynamic Open Graph (OG) tags for social media sharing (Facebook, LinkedIn, etc.) and Twitter Cards.
*   **Sitemap:** No explicit sitemap configuration found.

### Action Plan:
1.  **Migrate to Google Analytics 4 (GA4):**
    *   Replace `_includes/analytics.html` with the new `gtag.js` snippet.
    *   Update `_config.yml` to accept a standard GA4 Measurement ID (e.g., `G-XXXXXXXXXX`).
2.  **Enhance `_includes/head.html`:**
    *   Add a dedicated SEO block including:
        *   `<meta name="description" content="...">` (Dynamic from page front matter).
        *   `<meta property="og:image" content="...">`.
        *   `<meta property="og:title" content="...">`.
        *   Canonical URLs.
3.  **Sitemap:**
    *   Add `gem 'jekyll-sitemap'` to the `Gemfile` to auto-generate a `sitemap.xml`.
    *   Create a `robots.txt` file.

## 4. Suggested Roadmap

### Phase 1: Foundation (Quick Wins)
- [x] Migrate Google Analytics to GA4.
- [x] Add `jekyll-seo-tag` or custom SEO meta tags includes.
- [x] Generate `sitemap.xml` and `robots.txt`.
- [ ] Optimize images (WebP conversion) - *Deferred to polishing phase*.

### Phase 2: Refactoring
- [x] Split `style.css` into maintainable SCSS partials.
- [x] Remove unused theme JavaScript plugins.
- [x] Replace Revolution Slider with a simple HTML/CSS Banner.

### Phase 3: Redesign (Next Step)
- [ ] **Bootstrap Upgrade:** UI Migration to Bootstrap 5.
- [ ] **Styles:** Implement "Medical Blue" palette in `_sass/_variables.scss` but keep the current green color as accent color.
- [ ] **Typography:** Integrate *Inter* or *Plus Jakarta Sans*.
- [ ] **Components:** Modernize Navbar and Footer styling.
- [ ] **Dark Mode:** Implement CSS variables for easy theme switching.

## 5. How to Proceed
I recommend starting with **Phase 1 (SEO & Analytics)** as it touches the codebase the least while providing immediate value. Then we can tackle the **CSS Refactoring** to make the site easier to customize.
