# Styling Guidelines

This document provides guidelines for maintaining consistent styling, ensuring dark/light mode compatibility, and meeting accessibility standards in the Humans Build Software blog.

## Table of Contents

- [Color System](#color-system)
- [Typography](#typography)
- [Dark/Light Mode](#darklight-mode)
- [Accessibility Standards](#accessibility-standards)
- [Component Styling](#component-styling)
- [Testing Procedures](#testing-procedures)

## Color System

The theme uses a comprehensive color system defined as CSS variables in the `:root` selector. These colors are organized in a structured way with different shades to ensure proper contrast and visual hierarchy.

### Base Colors

The color palette is defined in `src/assets/scss/base/_color.scss` with the following structure:

```scss
$colors: (
  primary: (
    100: hsl(276, 100%, 79%),
    200: hsl(276, 79%, 69%),
    300: hsl(276, 53%, 49%),
    400: hsl(276, 64%, 48%),
    500: hsl(276, 96%, 20%),
  ),
  secondary: (
    100: hsl(173, 81%, 68%),
    200: hsl(173, 80%, 63%),
    300: hsl(173, 72%, 57%),
    400: hsl(173, 75%, 47%),
    500: hsl(173, 90%, 30%),
  ),
  neutral: (
    100: hsl(0 0% 100%),
    200: hsl(200 23% 97%),
    300: hsl(200 12% 95%),
    400: hsl(205 12% 88%),
    500: hsl(209 13% 83%),
    600: hsl(208 6% 55%),
    700: hsl(210 8% 31%),
    800: hsl(212 9% 22%),
    900: hsl(210 10% 14%),
  ),
  dark: (
    100: hsl(240, 4%, 9%),
  ),
);
```

### Theme Variables

Theme variables are defined in `src/layouts/DefaultLayout.astro` and provide semantic meaning to the color values:

```scss
:root {
  --radius-small: 3px;
  --radius-large: 6px;
  --gap-default: 2rem;
  --font-measure: 70ch;
  --font-family-default: 'Open Sans', sans-serif;
  --font-family-special: 'Open Sans', sans-serif;
  // light theme
  --font-color: var(--neutral-900);
  --action-color: var(--primary-300);
  --action-color-state: var(--primary-500);
  --background: var(--neutral-100);
  --primary-background: var(--primary-100);
  --neutral-background: var(--neutral-200);
}
```

### Guidelines for Using Colors

1. **Always use semantic variables** instead of direct color values

   - Use `var(--font-color)` instead of `#333333`
   - Use `var(--action-color)` for interactive elements

2. **Maintain proper contrast ratios**

   - Text should have a minimum contrast ratio of 4.5:1 against its background
   - Large text (18pt or 14pt bold) should have a minimum contrast ratio of 3:1
   - Non-text elements like icons or buttons need a minimum ratio of 3:1

3. **Adding new colors**

   - Add new colors to the `$colors` map in `src/assets/scss/base/_color.scss`
   - Create semantic variables in the `:root` selector for both light and dark themes
   - Ensure new colors have sufficient contrast in both themes

4. **Color usage context**
   - `--font-color`: Regular text
   - `--action-color`: Links, buttons, and interactive elements
   - `--action-color-state`: Hover/focus states for interactive elements
   - `--background`: Page background
   - `--primary-background`: Section backgrounds with primary color theme
   - `--neutral-background`: Secondary/alternate section backgrounds

## Typography

The theme uses a consistent typography system that ensures readability and accessibility.

### Font Families

```css
--font-family-default: 'Open Sans', sans-serif;
--font-family-special: 'Open Sans', sans-serif;
```

### Text Sizes

Text sizes are primarily managed through Tailwind CSS utility classes:

- `text-2xl`: Large paragraph text
- `text-6xl`: Medium headings
- `text-8xl`: Large headings

### Typography Guidelines

1. **Maintain heading hierarchy**

   - Use only one `<h1>` per page
   - Follow proper heading structure (`h1` > `h2` > `h3`, etc.)
   - Avoid skipping heading levels

2. **Line length**

   - Limit line length to `--font-measure: 70ch` for optimal readability
   - Ensure text containers have appropriate max-width constraints

3. **Font size and readability**

   - Minimum font size for body text: 16px
   - Ensure text remains readable when zoomed to 400%

4. **Text contrast**
   - Ensure text meets WCAG AA contrast requirements in both light and dark modes
   - Use tools like the WebAIM Color Contrast Checker to verify

## Dark/Light Mode

The theme includes a built-in dark mode that can be toggled by users. The implementation uses the `.darkmode` class on the HTML element to override theme variables.

### Dark Mode Implementation

Dark mode overrides are defined in `src/layouts/DefaultLayout.astro`:

```scss
// dark color scheme overrides
.darkmode {
  --font-color: var(--neutral-100);
  --action-color: var(--secondary-100);
  --action-color-state: var(--secondary-500);
  --background: var(--dark-100);
  --primary-background: var(--primary-500);
  --neutral-background: var(--neutral-900);
}
```

### Guidelines for Dark Mode Compatibility

1. **Always use theme variables** for colors that need to change between modes

   - Use `var(--font-color)` instead of direct color values
   - Avoid hardcoded colors that won't change with theme

2. **Test components in both modes**

   - Verify components look correct in both light and dark mode
   - Check contrast ratios in both modes

3. **Component-specific overrides**

   - Add component-specific dark mode overrides using this pattern:
     ```scss
     :global(.darkmode .component-class) {
       /* Dark mode specific styles */
     }
     ```

4. **Image adjustments for dark mode**

   - Consider if images need darkmode-specific versions
   - Ensure sufficient contrast between images and backgrounds

5. **Testing dark mode**
   - Test keyboard focus visibility in dark mode
   - Verify all content remains visible and properly contrasted

## Accessibility Standards

The theme is built to comply with WCAG 2.2 AA standards. These guidelines help maintain that compliance.

### General Accessibility Guidelines

1. **Semantic HTML**

   - Use proper HTML elements for their intended purpose
   - Use landmarks (`header`, `main`, `footer`, `nav`, etc.)
   - Ensure each page has one main `<h1>` heading

2. **Keyboard navigation**

   - Ensure all interactive elements are keyboard accessible
   - Maintain visible focus states for all interactive elements
   - Test tab order to ensure it follows logical content flow

3. **Screen reader compatibility**

   - Add appropriate ARIA labels where needed
   - Test with screen readers like VoiceOver or NVDA
   - Ensure dynamic content changes are announced to screen readers

4. **Color and contrast**
   - Don't rely on color alone to convey information
   - Maintain sufficient contrast ratios (4.5:1 for text, 3:1 for large text)
   - Ensure focus indicators are visible in both light and dark modes

### Component-Specific Guidelines

1. **Interactive elements (buttons, links)**

   - Ensure sufficient size (minimum 44x44px touch target)
   - Provide clear hover and focus states
   - Use proper semantic elements (`<button>` for actions, `<a>` for navigation)

2. **Form controls**

   - Associate labels with form controls
   - Provide clear error messages
   - Make required fields clear visually and to screen readers

3. **Images and media**

   - Provide alt text for images
   - Include captions and transcripts for video/audio
   - Ensure decorative images have empty alt attributes

4. **Navigation**
   - Make mobile navigation fully accessible
   - Implement proper ARIA for dropdown menus
   - Ensure skip links are available

## Component Styling

The theme uses a combination of SCSS, Tailwind utility classes, and component-specific styles.

### Styling Approaches

1. **Global styles**

   - Base styles in `src/assets/scss/base/`
   - Theme variables in layout files

2. **Component-specific styles**

   - Component styles are typically scoped within the component files
   - Use consistent patterns for similar components

3. **Utility classes**
   - Tailwind classes for spacing, typography, and layout
   - Custom utility classes for consistent patterns

### Component Style Guidelines

1. **Maintain consistent spacing**

   - Use the theme spacing system (Tailwind spacing utilities or CSS variables)
   - Keep consistent padding/margins for similar components

2. **Border and radius consistency**

   - Use defined border-radius variables (`--radius-small`, `--radius-large`)
   - Maintain consistent border styles across components

3. **Interactive states**

   - Provide hover, focus, and active states for all interactive elements
   - Ensure states are visible in both light and dark modes

4. **Responsive design**
   - Test components at all breakpoints
   - Ensure touch targets are appropriately sized on mobile

## Testing Procedures

Based on the Accessible Astro documentation, regular testing is crucial for maintaining accessibility and styling consistency.

### General Testing Checklist

- Test keyboard navigation through the entire site
- Test with screen readers (VoiceOver, NVDA)
- Test at 400% zoom on 1280×1024 resolution
- Test in both light and dark modes
- Verify color contrast ratios meet WCAG standards

### Tools for Testing

1. **Browser extensions**

   - WAVE Evaluation Tool
   - axe DevTools
   - Lighthouse
   - Color Contrast Analyzer

2. **Screen readers**

   - VoiceOver (macOS)
   - NVDA (Windows)

3. **Online tools**
   - WebAIM Color Contrast Checker
   - Who Can Use (color perception testing)

### Development Workflow

1. **During development**

   - Test new components in both light and dark modes
   - Verify keyboard accessibility
   - Check color contrast

2. **PR review**

   - Include screenshots of components in both modes
   - Verify all interactive states (hover, focus, active)
   - Check responsive behavior

3. **Regular audits**
   - Conduct full accessibility audits quarterly
   - Test with actual assistive technologies
   - Maintain documentation of issues and fixes
