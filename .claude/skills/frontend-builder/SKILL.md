---
name: frontend-page-components
description: Build responsive frontend pages and reusable components with clean layouts and modern styling.
---

# Frontend Page & Component Development

## Instructions

1. **Page structure**
   - Semantic HTML layout
   - Clear sectioning (header, main, footer)
   - Reusable components

2. **Component design**
   - Modular and reusable components
   - Props-based customization
   - Consistent spacing and typography

3. **Layout & styling**
   - Responsive grid or flexbox layouts
   - Mobile-first design
   - Scalable CSS (CSS Modules, Tailwind, or BEM)

4. **Responsiveness**
   - Breakpoints for mobile, tablet, desktop
   - Fluid typography and spacing
   - Touch-friendly interactions

## Best Practices
- Use semantic HTML elements
- Keep components small and focused
- Maintain consistent spacing system
- Prioritize accessibility (ARIA, contrast, keyboard support)
- Avoid inline styles for large components

## Example Structure
```html
<main class="page-container">
  <header class="page-header">
    <h1 class="page-title">Page Title</h1>
  </header>

  <section class="content-grid">
    <article class="card">
      <h2>Card Title</h2>
      <p>Card description text</p>
      <button class="primary-button">Action</button>
    </article>
  </section>
</main>
