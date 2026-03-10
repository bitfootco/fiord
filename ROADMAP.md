# Fiord Roadmap

> Milestone tracking for the Fiord design library. Slate-focused MVP.

---

## Phase 1 — Foundation

- [x] 1.1 — Project scaffold
      Directories, .gitignore, GitHub Pages workflow stub
      Files: site/, skills/, .github/workflows/

- [ ] 1.2 — Manifest schema
      manifest.json + manifest.md with all component/aesthetic entries
      Files: site/manifest.json, site/manifest.md

- [ ] 1.3 — Base: Layout
      container, grid, section, divider (4 components)
      Files: site/base/components/{container,grid,section,divider}.html

- [ ] 1.4 — Base: Typography
      heading, paragraph, prose, code-block (4 components)
      Files: site/base/components/{heading,paragraph,prose,code-block}.html

- [ ] 1.5 — Base: Actions
      button, button-group, link, dropdown (4 components, dropdown has JS)
      Files: site/base/components/{button,button-group,link,dropdown}.html

- [ ] 1.6 — Base: Forms
      input, textarea, select, checkbox, radio, toggle, form-group (7 components)
      Files: site/base/components/{input,textarea,select,checkbox,radio,toggle,form-group}.html

- [ ] 1.7 — Base: Data Display
      card, table, stat, badge, avatar, list (6 components)
      Files: site/base/components/{card,table,stat,badge,avatar,list}.html

- [ ] 1.8 — Base: Navigation
      navbar, sidebar, breadcrumb, tabs, pagination, footer (6 components, tabs has JS)
      Files: site/base/components/{navbar,sidebar,breadcrumb,tabs,pagination,footer}.html

- [ ] 1.9 — Base: Overlays
      modal, drawer, tooltip, popover, toast (5 components, all have JS)
      Files: site/base/components/{modal,drawer,tooltip,popover,toast}.html

- [ ] 1.10 — Base: Page Sections
      hero, cta, feature-grid, testimonial, pricing-table, faq (6 components, faq has JS)
      Files: site/base/components/{hero,cta,feature-grid,testimonial,pricing-table,faq}.html

- [ ] 1.11 — Base index page
      All base components on one preview page
      Files: site/base/index.html

- [ ] 1.12 — Slate: Design system
      meta.json defining palette, typography, spacing, borders, shadows, motion
      Stripe-inspired: clean, professional, cool neutrals, subtle gradients
      Files: site/aesthetics/slate/meta.json

- [ ] 1.13 — Slate: Layout + Typography (8 components)
      Files: site/aesthetics/slate/components/{container,grid,section,divider,heading,paragraph,prose,code-block}.html

- [ ] 1.14 — Slate: Actions + Forms (11 components)
      Files: site/aesthetics/slate/components/{button,button-group,link,dropdown,input,textarea,select,checkbox,radio,toggle,form-group}.html

- [ ] 1.15 — Slate: Data Display + Navigation (12 components)
      Files: site/aesthetics/slate/components/{card,table,stat,badge,avatar,list,navbar,sidebar,breadcrumb,tabs,pagination,footer}.html

- [ ] 1.16 — Slate: Overlays + Page Sections (11 components)
      Files: site/aesthetics/slate/components/{modal,drawer,tooltip,popover,toast,hero,cta,feature-grid,testimonial,pricing-table,faq}.html

- [ ] 1.17 — Slate index page
      Full preview of all Slate components on one page
      Files: site/aesthetics/slate/index.html

- [ ] 1.18 — Claude skill file
      Discovery protocol instructions for Claude agents
      Files: skills/claude/SKILL.md

- [ ] 1.19 — Manifest finalization
      Update manifests with all actual paths, verify internal consistency
      Files: site/manifest.json, site/manifest.md

- [ ] 1.20 — GitHub Pages deployment
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
