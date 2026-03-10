# Fiord

> AI-native design library. Convention over configuration. The design is the product.

Fiord is a Tailwind-based design library built to be consumed by AI agents, not imported by bundlers. It ships as static HTML/CSS hosted on GitHub Pages. AI agents discover components through a manifest, fetch production-ready markup, and paste it directly into any Tailwind project. No packages, no props, no build step.

Design coherence is the hard problem — consistent spacing, harmonious colors, intentional typography. AI agents solve this badly on their own. Fiord provides fully realized design aesthetics as complete, copy-paste-ready component sets, so agents can focus on logic and structure while Fiord handles the visual identity.

## How It Works

1. **Discover** — Agent reads `manifest.json` to learn what's available
2. **Select** — Agent chooses an aesthetic based on project context
3. **Fetch** — Agent grabs component markup from the aesthetic's directory
4. **Integrate** — Agent pastes self-contained HTML/Tailwind into the target codebase

## For AI Agents

Point your agent at the [manifest.json](site/manifest.json) to discover all components and aesthetics. Skill files are provided for specific platforms:

- **Claude** — `skills/claude/SKILL.md`
- **Cursor** — `skills/cursor/.cursorrules` *(coming soon)*
- **Generic** — `skills/generic/AGENT.md` *(coming soon)*

Components are extracted via sentinel comments (`FIORD:COMPONENT_START` / `FIORD:COMPONENT_END`). See [CLAUDE.md](CLAUDE.md) for the full agent discovery protocol.

## For Humans

Browse the component pages, view source, and copy the markup you need. Every component page is standalone HTML with Tailwind via CDN — open it in a browser to preview, then grab the markup between the sentinel comments.

## Components

42 components across 8 categories:

| Category | Components | Count |
|----------|-----------|-------|
| **Layout** | container, grid, section, divider | 4 |
| **Typography** | heading, paragraph, prose, code-block | 4 |
| **Actions** | button, button-group, link, dropdown | 4 |
| **Forms** | input, textarea, select, checkbox, radio, toggle, form-group | 7 |
| **Data Display** | card, table, stat, badge, avatar, list | 6 |
| **Navigation** | navbar, sidebar, breadcrumb, tabs, pagination, footer | 6 |
| **Overlays** | modal, drawer, tooltip, popover, toast | 5 |
| **Page Sections** | hero, cta, feature-grid, testimonial, pricing-table, faq | 6 |

## Aesthetics

**Slate** — Professional, measured, neutral. Cool grays with clean lines, Stripe-inspired polish. Suited for enterprise, SaaS, and B2B products. Includes both light and dark mode via Tailwind `dark:` classes.

Additional aesthetics will be added over time, each named after a natural material with its own complete visual identity.

## Project Status

Fiord is in active development. See [ROADMAP.md](ROADMAP.md) for milestone tracking.

## License

MIT
