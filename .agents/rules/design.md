# Design System: GATE Audition Dashboard
**Project ID:** local/audition-dashboard

## 1. Visual Theme & Atmosphere
The GATE Audition Dashboard features a **Professional, Bright, and Clean** aesthetic. It uses a "Utility-First" philosophy that prioritizes information density while maintaining a "WOW" premium feel. 
**Important Note on Colors & Brand:** The design MUST use a **White background with Red as the accent color**. Do NOT use a Black and Gold color scheme. 

## 2. Brand Logo
* **Logo File Path:** `C:\Users\togawa_takayuki\.gemini\antigravity\Gate_llc_logo.png`
* **Rule:** Always use this exact image file for the logo in any UI components, sidebars, or headers.

## 3. Color Palette & Roles
* **Pure White (#FFFFFF):** Primary background for all main content, page body, and card bodies.
* **Soft Neutral Gray (#F7F7F8):** Alternate background used sparingly for subtle contrast.
* **GATE Signature Red (#E60012):** The primary accent color, used for call-to-action buttons, active indicators, hover states, and critical statuses.
* **Text Dark (#111111):** Used for main typography to ensure readability on white backgrounds.
* **Subtle Border Gray (#E8E8E8):** Used for standard borders to define hierarchy.
* **Shadow Black (rgba(0,0,0, 0.06)):** Used for depth and elevation on white cards.

## 4. Typography Rules
* **Font Family:** Inter combined with Noto Sans JP for a modern, global look.
* **Headers:** Bold (700-900 weight) with clean letter-spacing to convey authority.
* **Body Text:** Medium (500 weight) for readability, utilizing a base size of 14px to increase information density.

## 5. Component Stylings
* **Buttons:** 
    * **Primary:** Pill-shaped (20px radius) with GATE Red background and white text.
    * **Secondary/Filter:** Rounded (16px radius) with soft neutral backgrounds and thin borders.
* **Cards & Containers:** 
    * **Standard:** 12px corner roundness (--radius-lg) with thin borders and soft diffused shadows.
    * **Stat Cards:** Feature a left-side accent bar (3px width) in GATE Red to indicate focus.

## 6. Layout Principles
* **Structure:** A fixed sidebar (260px) for navigation and a sticky top-bar (64px) with backdrop-blur.
* **Whitespace:** Generous padding (28px-32px) in main content sections to allow data to "breathe."
* **Alignment:** Grid-based layout with standard gaps (16px, 20px, 24px) ensuring consistent spatial relationships.
