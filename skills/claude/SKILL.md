# Fiord Design Library — Claude Skill

## What This Is

Fiord is an AI-native Tailwind component library hosted at **https://bitfootco.github.io/fiord**. Components are self-contained HTML files with Tailwind CDN classes, organized by aesthetic (visual identity). You fetch markup directly from the library and integrate it into the codebase — there is no package to install.

---

## When to Activate

Activate this skill whenever the user asks for:
- UI components or page sections
- Frontend markup or HTML structure
- Tailwind-based design or styling
- Page layouts, landing pages, or application screens
- Any design/visual/frontend work where components from a library would help

---

## Discovery Protocol

Follow these steps in order.

### Step 1: Fetch the Manifest

Fetch the manifest to understand what's available:

```
GET https://bitfootco.github.io/fiord/manifest.json
```

This returns the full list of components (with paths and categories), available aesthetics (with descriptions), and the base URL. Read it fully before proceeding.

### Step 2: Select an Aesthetic

An aesthetic is a complete visual identity — not a theme toggle, but a fully realized design language. Each component is rendered differently per aesthetic.

**If the user specified an aesthetic by name**, use it directly.

**If no aesthetic is specified**, make a reasoned recommendation based on project context (product domain, tone, existing codebase), then confirm with the user or proceed if context makes the choice obvious. Present the options with their descriptions from the manifest so the user can choose.

Available aesthetics are listed in `manifest.json` under `"aesthetics"`. Each has a `description` and `preview` URL.

### Step 3: Fetch the Aesthetic's Design Language

Fetch the aesthetic's `meta.json` to understand the full design system before building:

```
GET https://bitfootco.github.io/fiord/aesthetics/{name}/meta.json
```

Read the palette, typography, spacing, borders, and shadows. Use this to extrapolate when building components not covered by the library, or when the user needs custom markup that should match the aesthetic.

### Step 4: Identify Needed Components

Based on the user's task, identify which components from the catalog are required. Reference the `"categories"` array in the manifest for the full component list.

Use the **aesthetic's component directory** when available:
```
https://bitfootco.github.io/fiord/aesthetics/{name}/components/{component}.html
```

Fall back to **base components** for any component not yet implemented in the aesthetic:
```
https://bitfootco.github.io/fiord/base/components/{component}.html
```

### Step 5: Fetch Each Component Page

Fetch each component HTML page you need. The full page includes a preview wrapper and CDN scripts — these are for humans browsing the library. You only need the content between the sentinel comments.

### Step 6: Extract Component Markup

Extract the markup between the sentinel comments:

```html
<!-- FIORD:COMPONENT_START aesthetic="..." component="..." -->
...this is what you copy...
<!-- FIORD:COMPONENT_END -->
```

For interactive components, also extract the JS block if the interactivity is needed:

```html
<!-- FIORD:JS_START -->
<script>...</script>
<!-- FIORD:JS_END -->
```

The JS block is always outside the component block. It's optional supplementary behavior — include it when the component requires interactivity (modals, drawers, tabs, tooltips, popovers, toasts, FAQs, dropdowns).

### Step 7: Integrate into the Codebase

Paste the extracted markup into the appropriate location. Apply framework adaptations as needed (see below).

---

## Framework Adaptation Notes

### Static HTML
No changes needed. Remove the `<script src="https://cdn.tailwindcss.com">` tag from the component page header (it belongs in your project's `<head>`, not per-component).

### React / JSX
- `class` → `className`
- `for` → `htmlFor`
- Self-close void elements: `<input>` → `<input />`, `<br>` → `<br />`, etc.
- Inline `onclick` handlers → React event handlers (`onClick`)
- Replace `<!-- FIORD:JS_START -->` inline scripts with `useEffect`, `useState`, or appropriate hooks
- `aria-*` and `data-*` attributes are compatible as-is

### Vue / Svelte / Astro
HTML is largely compatible. Minimal changes needed:
- `class` stays as `class` (not className)
- Inline scripts can be moved to `<script>` blocks or replaced with framework reactivity
- Slot content can be wrapped in the framework's slot syntax if componentizing

### Tailwind Setup
If the project uses PostCSS, Vite, or the Tailwind CLI instead of the CDN:
- Remove `<script src="https://cdn.tailwindcss.com">` from any extracted markup
- All Tailwind utility classes remain identical — no changes needed
- Custom font imports (Google Fonts `<link>` tags) should move to the project's root `<head>`

### Inline Styles
Some components use inline `style` attributes for values Tailwind can't express (custom font stacks, specific gradients). These are intentional and safe to keep as-is.

---

## Important Rules

**Never embed component markup in this skill file.** Always fetch fresh from the library. The library is updated independently — stale embedded markup defeats the purpose.

**Never hardcode an aesthetic choice without basis.** Always select based on project context (domain, tone, existing design language, user preference). If uncertain, ask.

**Use the aesthetic's meta.json to extrapolate.** When a user needs a component or pattern not in the library, use the aesthetic's design tokens (palette, typography, spacing, borders) to create matching markup from scratch.

**Dark mode is included.** All components include `dark:` prefixed Tailwind classes. One component file handles both light and dark. No separate files needed.

**Components are self-contained.** No shared CSS, no shared layouts, no imports between components. Each extracted block works independently.
