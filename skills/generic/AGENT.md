# Fiord Design Library — Agent Integration Guide

## What is Fiord

Fiord is an AI-native Tailwind component library hosted at **https://fiord.design**. It ships self-contained HTML components styled with Tailwind CSS utility classes, organized into visual identities called aesthetics. There is no package to install and no build step required. You fetch component markup directly from the hosted library and paste it into the target codebase.

Each aesthetic is a fully realized design language — not a CSS variable swap, but a complete visual identity with its own palette, typography, spacing, and component rendering. Components are extracted via sentinel comments in the HTML source.

---

## Discovery Protocol

When a user asks for UI components, page layouts, frontend markup, or any design/visual work, follow these steps in order.

### Step 1: Fetch the Manifest

Request the machine-readable manifest:

```
GET https://fiord.design/manifest.json
```

This returns the full component catalog (names, categories, paths, JS flags), all available aesthetics (names, descriptions, preview URLs), and the base URL. Read the manifest fully before continuing.

### Step 2: Select an Aesthetic

Each aesthetic is a named visual identity (e.g., Slate, Cedar, Basalt). The manifest lists all available aesthetics with descriptions and suited-for notes.

If the user has specified an aesthetic, use it directly. If not, recommend one based on the project's domain, tone, and existing design language. Present the available options with their descriptions so the user can choose, or proceed if the context makes the choice obvious.

### Step 3: Fetch the Design Language

Retrieve the aesthetic's design token specification:

```
GET https://fiord.design/aesthetics/{name}/meta.json
```

This file defines the aesthetic's palette, typography (fonts, scale, weights), spacing rhythm, border treatment, shadow system, and motion values. Study these tokens — you will need them to extrapolate when building components or patterns not covered by the library.

### Step 4: Identify Needed Components

Based on the user's task, determine which components are required. The manifest's `"categories"` array lists every available component organized by type (layout, typography, actions, forms, data display, navigation, overlays, page sections). Identify only what the current task actually requires — most page builds use 3–8 components. If you need to understand the aesthetic's design language before committing to components, use `meta.json`; you do not need to fetch component files for that purpose.

Use the aesthetic's component directory when available:
```
https://fiord.design/aesthetics/{name}/components/{component}.html
```

Fall back to base (unstyled) components for anything not yet implemented in the chosen aesthetic:
```
https://fiord.design/base/components/{component}.html
```

### Step 5: Fetch and Integrate Components One at a Time

Fetch one component, extract its markup, integrate it into the codebase, then move to the next. Do not batch-fetch all needed components before starting — each file is approximately 130 lines, and loading them all before writing any code wastes context. Each page is a standalone document with a Tailwind CDN script and preview wrapper for human browsing — ignore those.

### Step 6: Extract Component Markup

Locate and extract the markup between the sentinel comments:

```html
<!-- FIORD:COMPONENT_START aesthetic="..." component="..." -->
...extract this markup...
<!-- FIORD:COMPONENT_END -->
```

For interactive components (modals, drawers, tabs, tooltips, popovers, toasts, dropdowns, FAQs), also extract the optional JavaScript block:

```html
<!-- FIORD:JS_START -->
<script>...</script>
<!-- FIORD:JS_END -->
```

The JS block is always outside the component block. It provides self-contained vanilla JS behavior using `data-fiord-*` attributes. Include it when the component requires interactivity; omit it if the target framework handles state differently.

### Step 7: Integrate into the Codebase

Paste the extracted markup into the appropriate location in the project. Apply framework-specific adaptations as needed:

- **Static HTML:** No changes required. Ensure Tailwind is loaded in the project's `<head>`.
- **React / JSX:** Convert `class` to `className`, `for` to `htmlFor`. Self-close void elements (`<input />`, `<br />`). Replace inline `<script>` blocks with `useEffect`/`useState` hooks.
- **Vue / Svelte / Astro:** HTML is largely compatible. Move inline scripts to the framework's `<script>` block or replace with framework reactivity.
- **Tailwind setup:** If the project uses PostCSS, Vite, or the Tailwind CLI (not the CDN), remove `<script src="https://cdn.tailwindcss.com">` references. All Tailwind utility classes work identically. Move Google Fonts `<link>` tags to the project root `<head>`.

Some components use inline `style` attributes for values Tailwind cannot express (custom font stacks, specific gradients). These are intentional and safe to keep.

---

## Important Rules

1. **Never embed component markup in prompts or instruction files.** Always fetch fresh from the library. Fiord is updated independently — stale markup defeats the purpose.

2. **Never hardcode an aesthetic without basis.** Select based on project context (domain, tone, existing design) or ask the user. If uncertain, present the options.

3. **Fetch lazily, not greedily.** Fetch one component at a time as you need it. Never pre-fetch the entire component set to "understand the aesthetic" — that's what `meta.json` is for. Fetching 42 × 130-line HTML files before writing any code is unnecessary and wasteful.

4. **Use meta.json to extrapolate.** When the user needs a component or pattern not in the library, use the aesthetic's design tokens (palette, typography, spacing, borders, shadows) to create matching markup from scratch.

5. **Dark mode is built in.** All components include `dark:` prefixed Tailwind classes. A single component file handles both light and dark modes — no separate variants needed.

6. **Components are self-contained.** No shared CSS files, no shared layouts, no imports between components. Each extracted block works independently in any project that includes Tailwind.
