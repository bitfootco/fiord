<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="public/assets/logo-light.svg">
  <img alt="Fiord" src="public/assets/logo-light.svg" width="280">
</picture>

### AI-native design library. Convention over configuration.

Fiord is a Tailwind-based design library built to be consumed by AI agents, not imported by bundlers. It ships as static HTML/CSS hosted on GitHub Pages. AI agents discover components through a manifest, fetch production-ready markup, and paste it directly into any Tailwind project. No packages, no props, no build step.

Design coherence is the hard problem — consistent spacing, harmonious colors, intentional typography. AI agents solve this badly on their own. Fiord provides fully realized design aesthetics as complete, copy-paste-ready component sets, so agents can focus on logic and structure while Fiord handles the visual identity.

---

## Setup

Fiord works by giving your AI coding agent a small instruction file that teaches it how to discover and use the component library. Pick your tool below and follow the one-step install.

### Claude Code

Copy the skill file into your project:

```bash
mkdir -p .claude/skills && curl -sL https://fiord.design/skills/claude/SKILL.md -o .claude/skills/fiord.md
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- [Fiord design library](.claude/skills/fiord.md) — Use for all UI/frontend work
```

### Cursor

Copy the rules file to your project root:

```bash
curl -sL https://fiord.design/skills/cursor/cursorrules.txt -o .cursorrules
```

If you already have a `.cursorrules` file, append Fiord's rules:

```bash
echo "" >> .cursorrules && curl -sL https://fiord.design/skills/cursor/cursorrules.txt >> .cursorrules
```

### Windsurf

Add Fiord's rules to your `.windsurfrules` file:

```bash
curl -sL https://fiord.design/skills/generic/AGENT.md >> .windsurfrules
```

### Cline / Roo Code

Add the instruction file to your Cline custom instructions. Copy the contents of the generic agent file:

```bash
curl -sL https://fiord.design/skills/generic/AGENT.md
```

Paste into **Cline Settings > Custom Instructions** (or `.clinerules` in your project root).

### GitHub Copilot

Add Fiord instructions to your Copilot custom instructions:

```bash
mkdir -p .github && curl -sL https://fiord.design/skills/generic/AGENT.md -o .github/copilot-instructions.md
```

### Aider

Add the instruction file as a read-only context file:

```bash
curl -sL https://fiord.design/skills/generic/AGENT.md -o FIORD.md
```

Then include it in your Aider sessions:

```bash
aider --read FIORD.md
```

Or add to `.aider.conf.yml`:

```yaml
read: FIORD.md
```

### Any Other Agent

Fiord works with any AI agent that can fetch URLs. Point it at the manifest:

```
https://fiord.design/manifest.json
```

Or include the generic instruction file (`skills/generic/AGENT.md`) in whatever system prompt or instruction mechanism your tool supports.

---

## How It Works

1. **Discover** — Agent reads [`manifest.json`](https://fiord.design/manifest.json) to learn what's available
2. **Select** — Agent chooses an aesthetic based on project context
3. **Fetch** — Agent grabs component markup from the aesthetic's directory
4. **Integrate** — Agent pastes self-contained HTML/Tailwind into the target codebase

Components are extracted via sentinel comments (`FIORD:COMPONENT_START` / `FIORD:COMPONENT_END`). The agent reads `meta.json` for each aesthetic to understand the design system — palette, typography, spacing, shadows — and can extrapolate for components the library doesn't cover.

---

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

**Slate** — Layered, decisive, geological. Cool blue-gray tones with sharp cleaved edges, matte surfaces, and indigo accents. Suited for developer tools, SaaS platforms, and technical products. Includes both light and dark mode via Tailwind `dark:` classes.

Additional aesthetics will be added over time, each named after a natural material with its own complete visual identity.

---

## For Humans

Browse the component library at [fiord.design](https://fiord.design). View source on any component page and copy the markup you need. Every component is standalone HTML with Tailwind — open it in a browser to preview, then grab the markup between the sentinel comments.

## Project Status

Fiord is in active development. See [ROADMAP.md](ROADMAP.md) for milestone tracking.

## License

MIT
