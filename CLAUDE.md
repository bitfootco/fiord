# CLAUDE.md — Fiord

> Next-generation AI-native design library. Convention over configuration. The design is the product.

Fiord is a Tailwind-based motif library built to be consumed by AI agents, not imported by bundlers. It ships as static HTML/CSS with optional inline vanilla JS, hosted on GitHub Pages. AI agents discover Fiord through a root manifest, crawl component and aesthetic pages on demand, and copy-paste production-ready markup directly into the codebase they're building. No packages, no props, no build step.

The name follows the Nordic geography of its origin concept. Individual aesthetics are named after natural materials: Basalt, Cedar, Linen, Slate, and so on. Each aesthetic is a complete visual expression — not a theme toggle, not a CSS variable swap, but a fully realized design identity that can override structure, layout, and markup when the design demands it.

**License:** MIT

---

## Philosophy

### AI-Native, Not AI-Adjacent

Traditional design systems are built for human developers who read docs, install packages, import components, and pass props. Fiord inverts this. The primary consumer is an AI agent that needs to:

1. Understand what's available (discovery via manifest)
2. Choose an appropriate aesthetic for the project (selection via descriptions and previews)
3. Grab the exact markup it needs (consumption via static HTML pages)
4. Paste it into a codebase and have it work immediately (zero dependencies)

Every architectural decision flows from this. If a choice makes things easier for a bundler but harder for an AI agent to scrape, we choose the agent. If a convention is elegant for a human API but opaque to an LLM reading HTML, we choose clarity.

### Convention Over Configuration

Fiord is opinionated. It does not offer 47 button variants behind a prop matrix. It offers a Button, rendered in each aesthetic, and the agent grabs the one that fits. If the agent needs a variation, it has the aesthetic's complete design language to work from — color palette, typography scale, spacing rhythm, border treatment — and can extrapolate intelligently. The library provides *completed designs*, not *design primitives*.

### Copy Over Import

Distribution is through scraping, not packaging. Components are self-contained HTML with Tailwind classes and optional inline `<script>` blocks. An agent (or a human) can view source on any component page, copy the markup, and drop it into a project that includes Tailwind. There is no `npm install fiord`. There is no `<FiordCard variant="elevated" theme="cedar">`. There is:

```html
<!-- Copied from fiord: Cedar / Card / Elevated -->
<div class="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-6 shadow-sm ...">
  ...
</div>
```

### The Design Is the Hard Part

AI agents are excellent at writing 5 lines of toggle logic for a dropdown. They are *terrible* at choosing a coherent visual aesthetic — consistent spacing, harmonious colors, appropriate typography pairings, intentional use of whitespace. Fiord focuses its energy entirely on the hard problem (design coherence) and stays out of the way on the easy problem (interactivity). This is why components ship as HTML/CSS first, with JS as a documented convenience, not a requirement.

---

## Architecture

### Overview

```
fiord/
├── CLAUDE.md                    ← You are here
├── site/                        ← Static site (GitHub Pages root)
│   ├── manifest.md              ← Human-readable discovery document
│   ├── manifest.json            ← Machine-readable discovery document
│   ├── base/                    ← Base structural templates
│   │   ├── index.html           ← All base components on one page
│   │   └── components/
│   │       ├── button.html
│   │       ├── card.html
│   │       ├── modal.html
│   │       └── ...
│   ├── aesthetics/
│   │   ├── basalt/
│   │   │   ├── index.html       ← Full preview of all Basalt components
│   │   │   ├── meta.json        ← Aesthetic metadata (palette, description, tokens)
│   │   │   └── components/
│   │   │       ├── button.html
│   │   │       ├── card.html
│   │   │       └── ...
│   │   ├── cedar/
│   │   ├── linen/
│   │   └── slate/
│   └── assets/                  ← Shared static assets (if any)
├── skills/                      ← AI agent instruction sets
│   ├── claude/
│   │   └── SKILL.md
│   ├── cursor/
│   │   └── .cursorrules
│   └── generic/
│       └── AGENT.md
└── README.md
```

### The Static Site

The entire library is a static site, deployable to GitHub Pages with zero build step. Each component page is a standalone HTML file that:

- Includes Tailwind via CDN (`<script src="https://cdn.tailwindcss.com">`)
- Renders the component in isolation with realistic example content
- Contains a clearly marked `<!-- FIORD:COMPONENT_START -->` / `<!-- FIORD:COMPONENT_END -->` block that agents can extract programmatically
- Optionally includes a `<!-- FIORD:JS_START -->` / `<!-- FIORD:JS_END -->` block for interactive behavior
- Is fully self-contained — no shared layouts, no partials, no SSR

This means any component page can be fetched, parsed, and the component markup extracted by reading between the sentinel comments. The surrounding page chrome (Tailwind CDN, preview styling, navigation) is ignored by agents.

### The Dual Manifest

Two files live at the site root and serve as the entry point for all discovery:

**`manifest.md`** — Human-readable. A structured document listing every aesthetic and every component, with descriptions, preview links, and design notes. This is what a developer browses to understand what Fiord offers. It is also readable by AI agents as a fallback.

**`manifest.json`** — Machine-readable. The canonical discovery document for AI agents. Structure:

```json
{
  "version": "1.0.0",
  "base_url": "https://<org>.github.io/fiord",
  "components": [
    {
      "name": "button",
      "category": "actions",
      "description": "Primary, secondary, and ghost button styles",
      "path": "/base/components/button.html",
      "has_js": false
    },
    {
      "name": "modal",
      "category": "overlays",
      "description": "Dialog overlay with backdrop, close behavior, and focus trap",
      "path": "/base/components/modal.html",
      "has_js": true
    }
  ],
  "aesthetics": [
    {
      "name": "basalt",
      "display_name": "Basalt",
      "description": "Dark, volcanic, high-contrast. Monochromatic grays with sharp edges and bold typography. Suited for developer tools, dashboards, and technical products.",
      "preview": "/aesthetics/basalt/index.html",
      "meta": "/aesthetics/basalt/meta.json",
      "components_path": "/aesthetics/basalt/components/"
    }
  ],
  "categories": [
    { "id": "layout", "label": "Layout", "components": ["container", "grid", "section", "divider"] },
    { "id": "typography", "label": "Typography", "components": ["heading", "paragraph", "prose", "code-block"] },
    { "id": "actions", "label": "Actions", "components": ["button", "button-group", "link", "dropdown"] },
    { "id": "forms", "label": "Forms", "components": ["input", "textarea", "select", "checkbox", "radio", "toggle", "form-group"] },
    { "id": "data", "label": "Data Display", "components": ["card", "table", "stat", "badge", "avatar", "list"] },
    { "id": "navigation", "label": "Navigation", "components": ["navbar", "sidebar", "breadcrumb", "tabs", "pagination", "footer"] },
    { "id": "overlays", "label": "Overlays", "components": ["modal", "drawer", "tooltip", "popover", "toast"] },
    { "id": "sections", "label": "Page Sections", "components": ["hero", "cta", "feature-grid", "testimonial", "pricing-table", "faq"] }
  ]
}
```

### Aesthetic Metadata

Each aesthetic includes a `meta.json` that defines its design language. This is what an agent reads to understand the *system* behind the aesthetic — not just individual components, but the rules that generated them. This allows agents to extrapolate when building components that Fiord doesn't provide.

```json
{
  "name": "cedar",
  "display_name": "Cedar",
  "description": "Warm, organic, approachable. Earthy tones with generous whitespace and soft edges. Suited for wellness, lifestyle, and consumer brands.",
  "palette": {
    "primary": "#8B5E3C",
    "primary_light": "#D4A574",
    "secondary": "#4A6741",
    "background": "#FDFAF6",
    "surface": "#F5EDE3",
    "text": "#2C1810",
    "text_muted": "#7A6B5E",
    "border": "#E2D5C5",
    "accent": "#C17F4E"
  },
  "typography": {
    "heading_font": "DM Serif Display",
    "body_font": "Inter",
    "mono_font": "JetBrains Mono",
    "scale": [12, 14, 16, 18, 20, 24, 30, 36, 48, 60],
    "heading_weight": "400",
    "body_weight": "400",
    "line_height_body": "1.65",
    "line_height_heading": "1.2"
  },
  "spacing": {
    "unit": 4,
    "rhythm": "relaxed",
    "section_gap": "5rem",
    "component_padding": "1.5rem"
  },
  "borders": {
    "radius": "0.75rem",
    "radius_lg": "1rem",
    "width": "1px",
    "style": "soft"
  },
  "shadows": {
    "sm": "0 1px 3px rgba(44, 24, 16, 0.06)",
    "md": "0 4px 12px rgba(44, 24, 16, 0.08)",
    "lg": "0 12px 32px rgba(44, 24, 16, 0.12)"
  },
  "motion": {
    "duration_fast": "150ms",
    "duration_normal": "250ms",
    "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
  }
}
```

---

## Component Specification

### Structural Templates (Base)

Base components define the *concept* — the semantic structure, accessibility attributes, and behavioral expectations of each component type. They use neutral, unstyled Tailwind (grays, default sans-serif, standard spacing) and serve as:

1. A fallback when no aesthetic is specified
2. A reference implementation that aesthetics can diverge from
3. Documentation of the expected HTML structure and ARIA patterns

Base components are functional and accessible but deliberately plain. They are the "unbranded" version.

### Aesthetic Components

Each aesthetic provides its own version of every component. An aesthetic component:

- **May share** the base HTML structure with different Tailwind classes (common case)
- **May alter** the HTML structure when the design demands it (e.g., Cedar's Card might wrap content in an extra `<div>` for a decorative border effect that Basalt doesn't need)
- **Must remain self-contained** — no dependencies on other Fiord components, no shared CSS files, no imports
- **Must include** the sentinel comments (`FIORD:COMPONENT_START` / `FIORD:COMPONENT_END`) for agent extraction
- **Must use** only Tailwind utility classes (via CDN) and inline styles where Tailwind doesn't reach (custom fonts, complex gradients)
- **Should include** realistic example content, not "Lorem ipsum"

### Component HTML Contract

Every component page follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fiord — Cedar / Card</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Aesthetic-specific font imports if needed -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-100 p-8">

  <!-- Preview wrapper (ignored by agents) -->
  <div class="max-w-2xl mx-auto">

    <!-- FIORD:COMPONENT_START aesthetic="cedar" component="card" variant="elevated" -->
    <div class="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-6 shadow-sm font-['Inter']">
      <h3 class="font-['DM_Serif_Display'] text-xl text-amber-950 mb-2">Monthly Report</h3>
      <p class="text-amber-900/70 text-sm leading-relaxed">
        Revenue grew 12% quarter-over-quarter, driven primarily by expansion in the enterprise segment.
      </p>
    </div>
    <!-- FIORD:COMPONENT_END -->

  </div>

</body>
</html>
```

### Dark Mode

Components include Tailwind `dark:` prefixed classes for automatic dark mode support.
A single component file works in both light and dark contexts — no separate dark variants.
Agents copy one component and get both modes. This works with Tailwind's `class` or `media`
dark mode strategy in the consuming project.

### Interactive Components

Components requiring JS behavior (modals, dropdowns, tabs, tooltips, etc.) include an optional JS block:

```html
<!-- FIORD:JS_START -->
<script>
  // Self-contained, no dependencies, uses data attributes for binding
  document.querySelectorAll('[data-fiord-toggle]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = document.getElementById(trigger.dataset.fiordToggle);
      if (target) target.classList.toggle('hidden');
    });
  });
</script>
<!-- FIORD:JS_END -->
```

JS conventions:
- Vanilla JS only, no dependencies, no imports
- Uses `data-fiord-*` attributes for binding (namespaced to avoid collisions)
- Self-executing, no initialization calls needed
- Agents may use the JS as-is or replace it with framework-appropriate logic
- The JS block is always *outside* the component block — it's optional supplementary code, not part of the component markup

---

## Aesthetic System

### What an Aesthetic Is

An aesthetic is a named, complete visual identity. It is not a "theme" in the traditional sense — it doesn't swap CSS variables on a shared structure. It is a fully realized *design opinion* that can (and often will) diverge from the base structure when the design calls for it.

Think of it like this: if Fiord's base component set is a architectural blueprint, each aesthetic is a *finished building*. They share the same program (rooms, doors, windows) but the finished result — materials, proportions, ornamentation, light — can be completely different.

### Aesthetic Naming

Aesthetics are named after natural materials. The name should evoke the visual and tactile qualities of the design.

**Slate** is the initial aesthetic — professional, measured, neutral. Cool grays with clean lines, Stripe-inspired polish. Suited for enterprise, SaaS, and B2B products. Additional aesthetics will be added over time, each co-designed with the user.

New aesthetics should:
- Have a name drawn from natural materials, formations, or textures
- Carry a distinct visual identity that is immediately recognizable
- Include a one-sentence character description and a "suited for" note
- Cover the full component set

### Creating a New Aesthetic

To add an aesthetic:

1. Create the directory: `site/aesthetics/<name>/`
2. Write `meta.json` defining the full design language (see Aesthetic Metadata above)
3. Build every component in the component catalog, following the HTML contract
4. Create `index.html` as a full-page preview showcasing all components
5. Add the aesthetic to both `manifest.md` and `manifest.json`

---

## Agent Discovery Protocol

This is the core interaction model — how an AI agent finds, selects, and consumes Fiord components.

### Step 1: Read the Manifest

The skill instructs the agent to fetch `manifest.json` from the configured Fiord URL. This gives the agent:
- The full list of available components and their categories
- The full list of available aesthetics with descriptions
- URL paths to every component page and aesthetic preview

### Step 2: Select an Aesthetic

Based on the project context (what the user has asked for, what already exists in the codebase, the product domain), the agent selects an appropriate aesthetic. The `meta.json` for each aesthetic provides enough design language detail for the agent to make an informed choice. If the user has specified an aesthetic by name, the agent uses that directly.

### Step 3: Fetch Components

The agent fetches the specific component pages it needs from the selected aesthetic's directory. It extracts the markup between `FIORD:COMPONENT_START` and `FIORD:COMPONENT_END` sentinel comments, plus any `FIORD:JS_START` / `FIORD:JS_END` blocks if the component requires interactivity.

### Step 4: Integrate

The agent pastes the extracted markup into the target codebase. Because components are pure HTML with Tailwind classes, they work in any environment that includes Tailwind — static HTML, React (via JSX conversion), Vue templates, Svelte, Astro, etc. The agent may need to:
- Convert HTML attributes to JSX syntax (class → className, etc.) if targeting React
- Replace the inline JS with framework-appropriate state management
- Adjust the Tailwind CDN reference to match the project's Tailwind setup (PostCSS, CLI, etc.)

### Decoupling Principle

The skills *never* embed component markup or aesthetic definitions. They only contain:
- The Fiord site URL
- Instructions for reading the manifest
- Instructions for extracting and integrating components

This means the library can be updated — new components, new aesthetics, revised designs — without touching any skill files. The skills are stable pointers; the library is the living system.

---

## Skill Distribution

Fiord ships skill files for multiple AI agent platforms. Each skill file encodes the same discovery protocol but in the format native to that platform.

### Claude — `skills/claude/SKILL.md`

A standard Claude skill file. Instructs the agent to:
- Fetch and parse `manifest.json` when a design/UI task is detected
- Present available aesthetics to the user if none is specified
- Fetch the relevant `meta.json` to understand the design language
- Extract components via sentinel comments
- Apply framework-appropriate transformations to the extracted markup

### Cursor — `skills/cursor/.cursorrules`

A Cursor rules file placed at the project root. Same protocol, formatted for Cursor's rule system.

### Generic — `skills/generic/AGENT.md`

A platform-agnostic instruction document that any LLM agent can follow. Written in plain English with structured steps, suitable for embedding in any system prompt or instruction set.

### Skill Maintenance

All three skill files should be kept in sync. When the discovery protocol changes (new sentinel comment format, manifest schema update, etc.), all skill files must be updated together. The skill files should be versioned alongside the main project.

---

## Component Catalog

The full set of components Fiord provides, organized by category. Every component listed here must exist in the base template set and in every aesthetic.

### Layout
- **Container** — max-width wrapper with responsive padding
- **Grid** — responsive column grid (2, 3, 4 col variants)
- **Section** — full-width content section with vertical rhythm
- **Divider** — horizontal rule / visual separator

### Typography
- **Heading** — h1–h6 with aesthetic-appropriate sizing and weight
- **Paragraph** — body text with proper line-height and measure
- **Prose** — long-form content container (article body, blog post)
- **Code Block** — syntax-highlighted (via Tailwind) code display

### Actions
- **Button** — primary, secondary, ghost, destructive variants
- **Button Group** — horizontally grouped actions
- **Link** — styled anchor with hover/focus states
- **Dropdown** — click-triggered action menu (has JS)

### Forms
- **Input** — text input with label, placeholder, error state
- **Textarea** — multiline input
- **Select** — native select with styled wrapper
- **Checkbox** — styled checkbox with label
- **Radio** — styled radio group
- **Toggle** — on/off switch
- **Form Group** — composed form layout (label + input + help text + error)

### Data Display
- **Card** — content container (basic, elevated, interactive variants)
- **Table** — data table with header, striped rows, responsive behavior
- **Stat** — key metric display (number + label + trend)
- **Badge** — status indicator / tag
- **Avatar** — user image (circle, with fallback initials)
- **List** — structured list (simple, with icons, with descriptions)

### Navigation
- **Navbar** — top navigation bar with logo, links, actions
- **Sidebar** — vertical navigation panel
- **Breadcrumb** — hierarchical path indicator
- **Tabs** — tabbed content switcher (has JS)
- **Pagination** — page navigation controls
- **Footer** — site footer with columns and links

### Overlays
- **Modal** — dialog overlay with backdrop (has JS)
- **Drawer** — slide-in panel from edge (has JS)
- **Tooltip** — hover-triggered info popup (has JS)
- **Popover** — click-triggered rich content popup (has JS)
- **Toast** — transient notification message (has JS)

### Page Sections
- **Hero** — full-width intro section with headline and CTA
- **CTA** — call-to-action banner
- **Feature Grid** — multi-feature showcase (icon + title + description)
- **Testimonial** — quote with attribution
- **Pricing Table** — tier comparison layout
- **FAQ** — collapsible question/answer list (has JS)

---

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the development roadmap and milestone tracking.

---

## Working Notes for Claude

### Context efficiency — follow these rules strictly

This project contains 42+ HTML component files that are large. Loading them all into the main context window will exhaust the token budget fast. To avoid this:

**Use subagents for bulk file work.**
Any task that touches more than ~3 files — reading, creating, or editing — should be delegated to an `Agent` tool call (subagent_type omitted = general-purpose). The subagent does the heavy lifting in its own context; only the result comes back.

**Use Grep to extract, not Read.**
When you need the markup from inside a component file, use `Grep` with `output_mode: "content"` to pull just the lines between sentinel comments. Do not Read the whole file to get 10 lines of markup.

**Use Read with offset + limit.**
If you must read a component file, use `offset` and `limit` to target only the section you need — never load a full 150-line HTML file to read 20 lines.

**Never read multiple component files sequentially in the main context.**
If a task requires reading several component files (e.g., building a category page), delegate it to a subagent. Do not loop through files in the main conversation.

**Confirm the approach before starting large tasks.**
If a task will require reading or writing more than 3 files, briefly describe the plan and confirm before executing. This prevents wasted context on a wrong approach.

### Scaffold-first pattern — use this for all multi-component pages

When building a page that will contain multiple components (category pages, demo pages, index pages):

1. **Scaffold first.** Write the complete page structure using concept placeholders — semantic `<div>` blocks with a comment like `<!-- COMPONENT: button -->` marking where each component will go. No real component markup yet. Commit this skeleton before touching any component files.

2. **Fill one at a time.** Read a single component file, extract its markup with Grep, insert it into the placeholder, done. Repeat per component. Each fill step touches exactly one file.

3. **Never pull all components first.** Do not read 6 files then write the page. Read one, write it in, move to the next.

### Subagent scope — keep it tiny

Subagents that are given too much work (read 10 files, create 8 pages) will time out or produce incomplete output. Scope each subagent to a single, well-defined deliverable:
- One page created or updated
- One file read and summarised
- One component extracted and returned

If a task has multiple deliverables, run multiple sequential subagent calls rather than one large one. Prefer doing work directly in the main context (with targeted Grep/Read) over spawning an agent, unless the file count would genuinely flood context.
