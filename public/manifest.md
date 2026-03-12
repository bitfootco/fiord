# Fiord — Component Manifest

Fiord is an AI-native design library that ships as static HTML with Tailwind classes. Components are self-contained, copy-paste ready, and organized into named aesthetics. There is no package to install — agents and developers fetch the markup they need directly.

**Base URL:** `https://fiord.design`
**Machine-readable manifest:** [`/manifest.json`](https://fiord.design/manifest.json)

---

## Table of Contents

- [Layout](#layout)
- [Typography](#typography)
- [Actions](#actions)
- [Forms](#forms)
- [Data Display](#data-display)
- [Navigation](#navigation)
- [Overlays](#overlays)
- [Page Sections](#page-sections)
- [Aesthetics](#aesthetics)
- [Agent Usage](#agent-usage)

---

## Layout

Max-width wrappers, grids, and structural primitives for organizing page content.

| Component | Description | Link |
|-----------|-------------|------|
| Container | Max-width wrapper with responsive horizontal padding for centering page content. | [View component](https://fiord.design/base/components/container.html) |
| Grid | Responsive column grid with 2, 3, and 4 column variants and configurable gap. | [View component](https://fiord.design/base/components/grid.html) |
| Section | Full-width content section with consistent vertical rhythm and optional background. | [View component](https://fiord.design/base/components/section.html) |
| Divider | Horizontal rule and visual separator with optional label text. | [View component](https://fiord.design/base/components/divider.html) |

---

## Typography

Headings, body text, and content containers that establish the textual hierarchy of a page.

| Component | Description | Link |
|-----------|-------------|------|
| Heading | h1–h6 headings with aesthetic-appropriate sizing, weight, and line height. | [View component](https://fiord.design/base/components/heading.html) |
| Paragraph | Body text with proper line height, measure, and muted secondary variant. | [View component](https://fiord.design/base/components/paragraph.html) |
| Prose | Long-form content container for articles and blog posts with full typographic rhythm. | [View component](https://fiord.design/base/components/prose.html) |
| Code Block | Monospaced code display with syntax-highlighted appearance and copy affordance. | [View component](https://fiord.design/base/components/code-block.html) |

---

## Actions

Interactive controls that trigger user-initiated operations.

| Component | Description | JS Required | Link |
|-----------|-------------|:-----------:|------|
| Button | Primary, secondary, ghost, and destructive button variants with hover and focus states. | | [View component](https://fiord.design/base/components/button.html) |
| Button Group | Horizontally grouped action buttons with joined borders and shared context. | | [View component](https://fiord.design/base/components/button-group.html) |
| Link | Styled anchor with underline, hover, and focus states for inline and standalone use. | | [View component](https://fiord.design/base/components/link.html) |
| Dropdown | Click-triggered action menu with keyboard navigation and outside-click dismissal. | Yes | [View component](https://fiord.design/base/components/dropdown.html) |

---

## Forms

Input controls and composed layouts for collecting user data.

| Component | Description | Link |
|-----------|-------------|------|
| Input | Text input with label, placeholder, helper text, and error state. | [View component](https://fiord.design/base/components/input.html) |
| Textarea | Multiline text input with label, auto-resize affordance, and error state. | [View component](https://fiord.design/base/components/textarea.html) |
| Select | Native select element with custom styled wrapper, label, and error state. | [View component](https://fiord.design/base/components/select.html) |
| Checkbox | Styled checkbox with label, checked state, and indeterminate support. | [View component](https://fiord.design/base/components/checkbox.html) |
| Radio | Styled radio button group with label and selected state. | [View component](https://fiord.design/base/components/radio.html) |
| Toggle | On/off switch with animated thumb and accessible checked state. | [View component](https://fiord.design/base/components/toggle.html) |
| Form Group | Composed form layout combining label, input, helper text, and validation error. | [View component](https://fiord.design/base/components/form-group.html) |

---

## Data Display

Components for presenting structured information, metrics, and content collections.

| Component | Description | Link |
|-----------|-------------|------|
| Card | Content container in basic, elevated, and interactive variants with consistent padding. | [View component](https://fiord.design/base/components/card.html) |
| Table | Data table with header row, striped rows, and horizontal scroll on small viewports. | [View component](https://fiord.design/base/components/table.html) |
| Stat | Key metric display showing a headline number, label, and optional trend indicator. | [View component](https://fiord.design/base/components/stat.html) |
| Badge | Compact status indicator and label tag in multiple semantic color variants. | [View component](https://fiord.design/base/components/badge.html) |
| Avatar | User image in circle with fallback initials and size variants. | [View component](https://fiord.design/base/components/avatar.html) |
| List | Structured list in simple, icon-prefixed, and description variants. | [View component](https://fiord.design/base/components/list.html) |

---

## Navigation

Wayfinding components that help users move through an application or site.

| Component | Description | JS Required | Link |
|-----------|-------------|:-----------:|------|
| Navbar | Top navigation bar with logo, link list, and action slot. | | [View component](https://fiord.design/base/components/navbar.html) |
| Sidebar | Vertical navigation panel with grouped links, icons, and active state. | | [View component](https://fiord.design/base/components/sidebar.html) |
| Breadcrumb | Hierarchical path indicator with separator glyphs and truncation on long paths. | | [View component](https://fiord.design/base/components/breadcrumb.html) |
| Tabs | Tabbed content switcher with active underline and keyboard arrow-key navigation. | Yes | [View component](https://fiord.design/base/components/tabs.html) |
| Pagination | Page navigation controls with previous, next, and numbered page buttons. | | [View component](https://fiord.design/base/components/pagination.html) |
| Footer | Site footer with multi-column link groups, logo, and copyright line. | | [View component](https://fiord.design/base/components/footer.html) |

---

## Overlays

Floating layers that display content or interactions above the page.

All overlay components include a `FIORD:JS_START` / `FIORD:JS_END` block with self-contained vanilla JS for behavior.

| Component | Description | Link |
|-----------|-------------|------|
| Modal | Dialog overlay with backdrop, close button, focus trap, and Escape key dismissal. | [View component](https://fiord.design/base/components/modal.html) |
| Drawer | Slide-in panel from screen edge with backdrop and animated entrance. | [View component](https://fiord.design/base/components/drawer.html) |
| Tooltip | Hover-triggered short text label anchored to a target element. | [View component](https://fiord.design/base/components/tooltip.html) |
| Popover | Click-triggered rich content popup with arrow and outside-click dismissal. | [View component](https://fiord.design/base/components/popover.html) |
| Toast | Transient notification message that auto-dismisses with success, warning, and error variants. | [View component](https://fiord.design/base/components/toast.html) |

---

## Page Sections

Full-page marketing and content sections ready to drop into landing pages.

| Component | Description | JS Required | Link |
|-----------|-------------|:-----------:|------|
| Hero | Full-width intro section with headline, subheading, and primary call-to-action. | | [View component](https://fiord.design/base/components/hero.html) |
| CTA | Call-to-action banner with headline, supporting text, and one or two action buttons. | | [View component](https://fiord.design/base/components/cta.html) |
| Feature Grid | Multi-feature showcase grid with icon, title, and short description per feature. | | [View component](https://fiord.design/base/components/feature-grid.html) |
| Testimonial | Pull quote with attribution name, title, and optional avatar. | | [View component](https://fiord.design/base/components/testimonial.html) |
| Pricing Table | Tier comparison layout with feature lists, price display, and highlighted recommended plan. | | [View component](https://fiord.design/base/components/pricing-table.html) |
| FAQ | Collapsible question-and-answer list with accordion expand and collapse behavior. | Yes | [View component](https://fiord.design/base/components/faq.html) |

---

## Base Components

Neutral structural templates — unstyled, accessible, gray-scale. The unbranded foundation used as a fallback when no aesthetic is specified, and as a reference implementation for building new aesthetics.

- [Component reference](https://fiord.design/base/index.html)
- [Component directory](https://fiord.design/base/components/)

---

## Aesthetics

Aesthetics are complete visual identities applied across the entire component set. Each aesthetic is a fully realized design opinion — not a theme toggle, but a coherent system of color, typography, spacing, and surface treatment.

### Slate

**Layered, decisive, geological.** Cool blue-gray tones with sharp cleaved edges, matte surfaces, and indigo accents. Stratified shadows suggest metamorphic rock strata. Suited for developer tools, SaaS platforms, and technical products.

- [Full preview](https://fiord.design/aesthetics/slate/index.html)
- [Component catalog](https://fiord.design/aesthetics/slate/catalog.html)
- [Design metadata](https://fiord.design/aesthetics/slate/meta.json)
- [Component directory](https://fiord.design/aesthetics/slate/components/)

To use a Slate component instead of a base component, replace `/base/components/` with `/aesthetics/slate/components/` in any path. For example:

```
Base button:  https://fiord.design/base/components/button.html
Slate button: https://fiord.design/aesthetics/slate/components/button.html
```

---

### Pumice

**Warm, human, startup-confident.** Cream backgrounds and rounded forms with humanist sans-serif type and a tomato-coral accent that radiates energy without aggression. Suited for consumer products, SaaS with a personality, and any product that wants to feel like it was built by people who give a damn.

- [Full preview](https://fiord.design/aesthetics/pumice/index.html)
- [Design metadata](https://fiord.design/aesthetics/pumice/meta.json)
- [Component directory](https://fiord.design/aesthetics/pumice/components/)

To use a Pumice component instead of a base component, replace `/base/components/` with `/aesthetics/pumice/components/` in any path. For example:

```
Base button:   https://fiord.design/base/components/button.html
Pumice button: https://fiord.design/aesthetics/pumice/components/button.html
```

---

### Quartz

**Crystalline, precise, prismatic.** A bright white foundation with cyan-teal accents and crisp geometry. Suited for fintech, analytics platforms, and enterprise products that refuse to look boring.

- [Full preview](https://fiord.design/aesthetics/quartz/index.html)
- [Design metadata](https://fiord.design/aesthetics/quartz/meta.json)
- [Component directory](https://fiord.design/aesthetics/quartz/components/)

To use a Quartz component instead of a base component, replace `/base/components/` with `/aesthetics/quartz/components/` in any path. For example:

```
Base button:   https://fiord.design/base/components/button.html
Quartz button: https://fiord.design/aesthetics/quartz/components/button.html
```

---

### Chalk

**Warm, considered, editorial.** A chalk-white surface with Lora serif headings and deep forest green accents. The thinking-tool aesthetic — for note-taking apps, reading apps, writing tools, and personal knowledge management. Notion, Bear, Readwise, Superhuman territory.

**Suited for:** Note-taking and PKM (Notion, Obsidian, Bear, Craft), reading apps (Readwise, Matter), writing tools (Ghost, iA Writer), serious email (Superhuman, Mimestream), task management for power users (Things 3, OmniFocus), personal finance (Lunch Money, Actual Budget).

**Design language highlights:**
- Palette: chalk-white `#FAFAF7` surface, deep forest green `#1A5C45` accent, warm charcoal `#1C1B18` text
- Headings: Lora (variable-weight serif) — the aesthetic's most distinctive feature
- Body: DM Sans (humanist, clean)
- Mono: Source Code Pro (editorial-quality)
- Dark mode: warm charcoal-brown `#1E1B17` — not blue-shifted, feels like a reading app's night light
- Shadows: warm brown-tinted multi-stop

- [Full preview](https://fiord.design/aesthetics/chalk/index.html)
- [Design metadata](https://fiord.design/aesthetics/chalk/meta.json)
- [Component directory](https://fiord.design/aesthetics/chalk/components/)

To use a Chalk component instead of a base component, replace `/base/components/` with `/aesthetics/chalk/components/` in any path. For example:

```
Base button:   https://fiord.design/base/components/button.html
Chalk button:  https://fiord.design/aesthetics/chalk/components/button.html
```

---

## Agent Usage

This section describes the protocol AI agents use to discover and consume Fiord components.

### Step 1: Read the Manifest

Fetch `manifest.json` to get the full list of components, their paths, and available aesthetics:

```
GET https://fiord.design/manifest.json
```

### Step 2: Select an Aesthetic

Read the `aesthetics` array in the manifest. Each entry includes a `description` that characterizes the visual identity and the products it suits. If the project domain or the user's instructions suggest a specific aesthetic, use it. Otherwise, default to Slate.

For deeper design language context — palette, typography, spacing — fetch the aesthetic's `meta.json`:

```
GET https://fiord.design/aesthetics/slate/meta.json
```

### Step 3: Fetch the Component

Construct the component URL from the `components_path` of the chosen aesthetic and the component's `name`:

```
GET https://fiord.design/aesthetics/slate/components/button.html
```

Or use the base (unstyled) version:

```
GET https://fiord.design/base/components/button.html
```

### Step 4: Extract the Markup

Each component page contains sentinel comments marking the extractable block:

```html
<!-- FIORD:COMPONENT_START aesthetic="slate" component="button" -->
...component markup...
<!-- FIORD:COMPONENT_END -->
```

Copy everything between the sentinels. For interactive components, also extract the optional JS block:

```html
<!-- FIORD:JS_START -->
<script>...</script>
<!-- FIORD:JS_END -->
```

### Step 5: Integrate

Paste the extracted markup into the target codebase. Components use only Tailwind utility classes and require no additional CSS. You may need to:

- Convert `class` to `className` when targeting React/JSX
- Replace the inline `<script>` block with framework-appropriate state management (React `useState`, Vue `ref`, etc.)
- Ensure Tailwind is configured in the target project (the CDN `<script>` tag in the component page is for preview only)
