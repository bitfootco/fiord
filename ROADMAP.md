# Fiord Roadmap

> Milestone tracking for the Fiord design library. Slate-focused MVP.

---

## Phase 1 — Foundation

- [x] 1.1 — Project scaffold
      Directories, .gitignore, GitHub Pages workflow stub
      Files: public/, skills/, .github/workflows/

      _Note: After 1.1, the project migrated from raw HTML (`site/`) to Astro (`src/pages/` for human-readable pages, `public/` for agent-scraped component files). All subsequent paths reflect the post-migration structure._

- [x] 1.2 — Manifest schema
      manifest.json + manifest.md with all component/aesthetic entries
      Files: public/manifest.json, public/manifest.md

- [x] 1.3 — Base: Layout
      container, grid, section, divider (4 components)
      Files: public/base/components/{container,grid,section,divider}.html

- [x] 1.4 — Base: Typography
      heading, paragraph, prose, code-block (4 components)
      Files: public/base/components/{heading,paragraph,prose,code-block}.html

- [x] 1.5 — Base: Actions
      button, button-group, link, dropdown (4 components, dropdown has JS)
      Files: public/base/components/{button,button-group,link,dropdown}.html

- [x] 1.6 — Base: Forms
      input, textarea, select, checkbox, radio, toggle, form-group (7 components)
      Files: public/base/components/{input,textarea,select,checkbox,radio,toggle,form-group}.html

- [x] 1.7 — Base: Data Display
      card, table, stat, badge, avatar, list (6 components)
      Files: public/base/components/{card,table,stat,badge,avatar,list}.html

- [x] 1.8 — Base: Navigation
      navbar, sidebar, breadcrumb, tabs, pagination, footer (6 components, tabs has JS)
      Files: public/base/components/{navbar,sidebar,breadcrumb,tabs,pagination,footer}.html

- [x] 1.9 — Base: Overlays
      modal, drawer, tooltip, popover, toast (5 components, all have JS)
      Files: public/base/components/{modal,drawer,tooltip,popover,toast}.html

- [x] 1.10 — Base: Page Sections
      hero, cta, feature-grid, testimonial, pricing-table, faq (6 components, faq has JS)
      Files: public/base/components/{hero,cta,feature-grid,testimonial,pricing-table,faq}.html

- [x] 1.11 — Base index page + category pages
      Category index at src/pages/base/index.astro with 8 category sub-pages
      Files: src/pages/base/{index,layout,typography,actions,forms,data,navigation,overlays,sections}.astro

- [x] 1.12 — Slate: Design system
      meta.json defining palette, typography, spacing, borders, shadows, motion
      Sharp, decisive, professional. Vercel-inspired precision with 3-color accent system.
      Files: public/aesthetics/slate/meta.json

- [x] 1.13 — Slate: Layout + Typography (8 components)
      Files: public/aesthetics/slate/components/{container,grid,section,divider,heading,paragraph,prose,code-block}.html

- [x] 1.14 — Slate: Actions + Forms (11 components)
      Files: public/aesthetics/slate/components/{button,button-group,link,dropdown,input,textarea,select,checkbox,radio,toggle,form-group}.html

- [x] 1.15 — Slate: Data Display + Navigation (12 components)
      Files: public/aesthetics/slate/components/{card,table,stat,badge,avatar,list,navbar,sidebar,breadcrumb,tabs,pagination,footer}.html

- [x] 1.16 — Slate: Overlays + Page Sections (11 components)
      Files: public/aesthetics/slate/components/{modal,drawer,tooltip,popover,toast,hero,cta,feature-grid,testimonial,pricing-table,faq}.html

- [x] 1.17 — Slate index page + category pages
      Category index at src/pages/aesthetics/slate/index.astro with 8 category sub-pages
      Files: src/pages/aesthetics/slate/{index,layout,typography,actions,forms,data,navigation,overlays,sections}.astro

- [x] 1.17b — Slate demo page
      Polished, realistic page showcasing Slate as a cohesive product (e.g., SaaS dashboard or developer tool)
      Files: src/pages/aesthetics/slate/demo.astro

- [x] 1.18 — Claude skill file
      Discovery protocol instructions for Claude agents
      Files: skills/claude/SKILL.md

- [ ] 1.19 — Manifest finalization
      Update manifests with all actual paths, verify internal consistency
      Files: public/manifest.json, public/manifest.md

- [x] 1.20 — GitHub Pages deployment
      GitHub Actions workflow for autodeploy on push to main
      Files: .github/workflows/pages.yml

- [ ] 1.21 — End-to-end validation
      Test full agent discovery protocol: manifest → aesthetic selection → component fetch → extraction

---

## Future Work (not yet scheduled)

- Additional aesthetics (Basalt, Cedar, Linen, others) — to be co-designed
- Cursor .cursorrules skill file
- Generic AGENT.md skill file
- CONTRIBUTING.md and community guidelines
