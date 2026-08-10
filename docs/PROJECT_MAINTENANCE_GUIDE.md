# A.GH Portfolio — Maintenance Guide

This guide describes the repository as it exists now. It is a maintenance map, not a redesign or refactor proposal. When older documentation conflicts with the live implementation, treat the source files named here as the current behavior.

Two current-state notes matter before any edit:

- The live router exposes `/`, `/projects`, and the `*` fallback. There is no active `/projects/:slug` route. `src/pages/ProjectDetails.jsx` exists but is not registered and only redirects to `/projects` if it is ever mounted.
- `src/data/projects.js` currently produces four Home project cards, not three: one `large` card and three `small` cards. The Home component does not enforce a fixed project count.

## 1. Project Overview

The site is a client-rendered React 19 portfolio built by Vite 8. It uses JavaScript, Tailwind CSS 4 through `@tailwindcss/vite`, Framer Motion for animation, React Router for routes, Lenis for smooth scrolling, React Icons for selected icons, and Vercel Analytics. The production target is Vercel at [https://afif-gh.vercel.app/](https://afif-gh.vercel.app/).

Styling is primarily Tailwind utility classes inside JSX. `src/index.css` contains the Tailwind import, the local Osiris font face, four font utility classes, global body/selection/cursor rules, and the CSS keyframes used by the skills orbit.

High-level runtime map:

```text
src/main.jsx
└── RouterProvider
    └── src/pages/Root.jsx
        ├── global background audio
        ├── SiteBackground
        ├── CustomCursor
        ├── IntroGate OR SessionRevealGate
        ├── Outlet
        │   ├── /          → Home
        │   │   ├── Navbar + ScrollIndicator
        │   │   ├── Hero
        │   │   ├── About
        │   │   ├── Experience
        │   │   ├── Skills
        │   │   ├── Projects
        │   │   └── Contact + SiteFooter
        │   ├── /projects  → ProjectsArchive + Navbar
        │   └── *          → NotFound
        └── PageTransitionOverlay
```

The main editable data is organized as follows:

- Projects: `src/data/projects.js`
- Skills and orbit configuration: `src/data/skillsOrbit.js`
- Experience timeline: `src/data/experienceTimeline.js`
- Home/menu navigation: `src/data/navigation.js`
- About decision-card content only: `src/components/sections/about/decision/decisionCards.js`

Most other copy is component-local. Project archive membership is also component-local rather than derived from project flags.

For project intent and working constraints, read `AGENTS.md`, `docs/PROJECT_BRIEF.md`, and `docs/DESIGN_SYSTEM.md`. `README.md` is still the generic React/Vite template and does not describe this portfolio's live architecture. When a documented older route expectation conflicts with `src/main.jsx`, follow the live router unless a new feature explicitly changes it.

Current maintenance classification:

| Area | Current source style | Shared/route scope |
| --- | --- | --- |
| Projects | Data-driven, but archive groups are hardcoded slug arrays | Data shared by Home and `/projects` |
| Skills | Data-driven, including layout/motion parameters | Shared by orbit and stack-layer cards on Home |
| Experience | Data-driven entries; component-driven opening copy/motion | Home only |
| Navigation | Data-driven labels/order plus shared registry logic | Home menu, archive menu, and Home scroll indicator |
| Hero | Component-local copy and assets | Home only |
| About | Mostly component-local; Decision cards have a small local data file | Home only |
| Contact/Footer | Component-local contact array and copy | Home only |
| Gates, cursor, background, audio, page transitions | Component/hook-driven global systems | Every route through Root |

## 2. Important Files Map

| File | Purpose | How often it should be edited | Risk |
| --- | --- | --- | --- |
| `AGENTS.md` | Project constraints, approved direction, workflow, and verification rules | Only when project policy changes | Avoid unless necessary |
| `docs/PROJECT_BRIEF.md`, `docs/DESIGN_SYSTEM.md` | Product positioning and approved visual language | Rarely | Moderate |
| `README.md` | Generic Vite template text; not a current architecture reference | Replace only as a separate documentation task | Safe but currently stale |
| `src/main.jsx` | Creates the browser router and registers `/`, `/projects`, and `*`; mounts Vercel Analytics | Rarely | Avoid unless necessary |
| `src/pages/Root.jsx` | Global layout, audio element, intro/session gate selection, page-transition orchestration, route handoff context | Very rarely | Avoid unless necessary |
| `src/pages/Home.jsx` | Defines Home section composition and order; handles route-state scrolling back from `/projects` | Only when adding/removing/reordering sections | Moderate to high |
| `src/pages/ProjectsArchive.jsx` | `/projects` page, archive headings, hardcoded featured/foundation slug lists, Back to Home transition | When archive membership/copy changes | Moderate |
| `src/pages/NotFound.jsx` | `*` fallback page and transition-aware Back to Home action | Occasionally | Moderate |
| `src/data/projects.js` | Single source of project titles, slugs, dates, tags, descriptions, URLs, images, and Home feature flags | Common | Safe, with archive caveat |
| `src/data/skillsOrbit.js` | Skill categories, icons, colors, orbit radii/speeds, positions, and ordering | Common | Safe for content; moderate for orbit values |
| `src/data/experienceTimeline.js` | Experience entries and timeline order | Common | Safe |
| `src/data/navigation.js` | Menu labels, numbers, section keys, descriptions, and scroll-indicator order | Occasionally | Moderate |
| `src/lib/sectionNavigation.js` | Section registry, 96px scroll offset, active-section detection, Lenis integration | Very rarely | High |
| `src/components/layout/Navbar.jsx` | Brand, sound toggle, menu state, route/section navigation, navbar hide-on-scroll behavior | Rarely | High |
| `src/components/layout/navbar/MenuOverlay.jsx` | Fullscreen menu, focus trap, overlay shell | Very rarely | High |
| `src/components/layout/navbar/MenuLinks.jsx` | Renders navigation data | Occasionally | Moderate |
| `src/components/layout/navbar/MenuPreview.jsx` | Desktop menu preview and Projects Archive CTA | Occasionally | Moderate to high |
| `src/components/layout/PageTransitionOverlay.jsx` | Visual closing/opening panels | Very rarely | High |
| `src/components/intro/IntroGate.jsx` | First-session loading gate, unlock action, opening panels, Hero handoff | Very rarely | High |
| `src/components/intro/SessionRevealGate.jsx` | Returning-session resume gate | Very rarely | High |
| `src/hooks/useSmoothScroll.js` | Creates/destroys Lenis and registers it with section navigation | Very rarely | High |
| `src/hooks/useBackgroundAudio.js` | Background track lifecycle, mute events, focus/visibility ducking | Very rarely | High |
| `src/hooks/useSoundEffects.js` | Delegated click and hover UI sounds | Very rarely | High |
| `src/components/ui/CustomCursor.jsx` | Desktop/fine-pointer cursor states, springs, and trail | Very rarely | High |
| `src/components/sections/Projects.jsx` | Home project filtering and large/small layout | When changing selection rules or heading copy | Moderate |
| `src/components/sections/projects/ProjectCard.jsx` | Shared Home project card rendering and depth effect | Rarely | High |
| `src/components/sections/Skills.jsx` | Skills section composition | Occasionally | Moderate |
| `src/components/sections/Experience.jsx` | Experience section composition | Rarely | Moderate |
| `src/components/sections/About.jsx` | About scene order | Occasionally | Moderate |
| `src/components/sections/Contact.jsx` | Contact copy and local email/WhatsApp/LinkedIn data | Common | Safe for data/copy |
| `src/components/sections/contact/SiteFooter.jsx` | Footer year, message, and Back to Top | Occasionally | Safe |
| `src/index.css` | Tailwind entry, global colors, fonts, cursor CSS, skills-orbit keyframes | Rarely | High |
| `index.html` | Title, SEO, Open Graph/Twitter metadata, favicons, and Google font loading | Occasionally | Moderate |
| `public/assets/` | Runtime images, project screenshots, SVGs, sounds, font, PDF, and OG image | Common | Safe if references stay valid |
| `vercel.json` | SPA fallback rewrite to `index.html` | Very rarely | High |

## 3. HOW TO UPDATE PROJECTS

### Current project data model

Projects live in `src/data/projects.js` as one exported array:

```js
export const projects = [
  {
    title: "Example Interface",
    slug: "example-interface",
    year: "2027",
    status: "live",
    stack: ["React.js", "Tailwind CSS"],
    description: "FAKE example description for maintenance documentation.",
    projectUrl: "https://example.com/",
    image: "/assets/projects/example-interface.png",
    featured: true,
    featuredLayout: "small",
  },
];
```

The snippet is fake example data. Do not copy it over the real list without replacing every value.

| Field | What it controls | Required/expected value | Where it appears |
| --- | --- | --- | --- |
| `title` | Visible project heading and image/link accessible labels | Required string | Home cards and archive cards |
| `slug` | React key and lookup identifier for archive slug lists | Required, unique, URL-style lowercase string recommended | Home keys; `ProjectsArchive.jsx` lookups |
| `year` | Small technical date label | Required string | Home and archive cards |
| `status` | Project availability state | Optional field with one of: `"live"`, `"private"`, or `"in-progress"`; set it explicitly for every maintained project | Home and archive card access state |
| `stack` | Technology pills | Required array of strings; an empty array is allowed by rendering but gives no tags | Home and archive cards |
| `description` | Project summary | Required string | Home and archive cards |
| `projectUrl` | Visit Project destination | Use a public URL only with `status: "live"`; use `null` for private or in-progress projects | Home and archive cards |
| `image` | Public screenshot URL | Required for a complete card; use `/assets/projects/...` | Home and archive card images |
| `featured` | Includes the project in the Home selection | Use `true` or `false` | `src/components/sections/Projects.jsx` only |
| `featuredLayout` | Home card size | Exact value `"large"` selects the large slot; any other/missing value is treated as small when `featured` is true | Home only |

There is no runtime schema validation. A typo can silently remove a project from an archive list, create a broken image, or produce a missing link.

### Add a new project

1. Export an optimized screenshot to `public/assets/projects/`.
2. Prefer a lowercase, hyphenated name matching the slug, such as `inventory-dashboard.png` or `inventory-dashboard.webp`.
3. Match the current screenshot convention where practical: all current files in `public/assets/projects/` are 1672×941, approximately 16:9.
4. Add a new object to `src/data/projects.js` using the exact field shape above.
5. Choose a unique `slug`. Archive membership uses the slug as an exact string lookup.
6. Set `status` explicitly to `"live"`, `"private"`, or `"in-progress"`. Add a public `projectUrl` only for a live project.
7. Set `featured: true` only if it should appear on Home; otherwise use `false`.
8. Set exactly one featured project to `featuredLayout: "large"`. Use `"small"` or omit the property for other featured projects.
9. Add the slug to `featuredProjectSlugs` or `foundationProjectSlugs` in `src/pages/ProjectsArchive.jsx` if it should appear in the archive. Merely adding the data object does not add it to the archive.
10. Verify Home: correct count, one large card, desired small-card order, image, tags, and availability state.
11. Verify `/projects`: correct group, order, alternating featured layout, image, and availability state.
12. Run `npm run build` and `npm run lint`, then check desktop and mobile.

### Change the projects shown on Home

`src/components/sections/Projects.jsx` performs this logic:

1. `projects.filter((project) => project.featured)` collects every featured project in source-array order.
2. `.find((project) => project.featuredLayout === "large")` selects the first large project.
3. All featured projects whose `featuredLayout` is not `"large"` become small cards, in source-array order.

Important consequences:

- Home does not enforce three projects. The current data renders three: `Digital Art Exhibition` as the large card, followed by `Trippy` and `MyDash Dashboard` as small cards.
- If no featured item is `large`, Home renders no large card.
- If more than one featured item is `large`, only the first is rendered; later `large` items are excluded from both the large and small lists.
- To choose a different large card, give that project `featuredLayout: "large"` and change the former large project to `"small"` or `featured: false`.

There are six project objects in the current data file. Three are featured for Home.

### Change project order

- Home large project: the first featured object marked `"large"` wins.
- Home small projects: their order is the order of matching objects in `src/data/projects.js`.
- Archive featured projects: their order comes only from `featuredProjectSlugs` in `src/pages/ProjectsArchive.jsx`.
- Archive foundation projects: their order comes only from `foundationProjectSlugs` in the same file.
- The archive ignores `featured` and `featuredLayout` completely.

There are no automatic year groupings and no separate generated archive grouping.

### Replace a project image

Put the replacement in `public/assets/projects/` and update the object's `image` field. The Home large card and featured archive use a 1672:941 frame. Small Home cards and foundation archive cards use a 16:10 frame. Every project image uses `object-contain object-center`, so the image should not be cropped; a different aspect ratio can create empty bands inside the frame.

Current consumers are:

- `src/components/sections/projects/ProjectCard.jsx`
- `src/components/projects/ProjectArchiveFeaturedCard.jsx`
- `src/components/projects/ProjectArchiveFoundationCard.jsx`

Do not replace the similarly named files under `public/assets/images/` and expect project cards to change. Current project data points to `public/assets/projects/`.

### Change tags, description, year, status, or link

- Technology tags: edit the `stack` array.
- Description: edit `description`.
- Year/date label: edit `year`; it is intentionally a display-only string and does not control project availability.
- Availability: edit `status` using one of the three supported values below.
- Link: edit `projectUrl`; only `status: "live"` with a truthy URL renders Visit Project.

### Project availability behavior

`status` is the source of truth for project availability. `year` is display content only. Never derive application logic from values such as `year: "IN PROGRESS"`; a future project may use `year: "2026"` together with `status: "in-progress"`.

#### Public project

```js
status: "live",
projectUrl: "https://...",
```

Result: `VISIT PROJECT`. The link opens in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.

#### Confidential or company project

```js
status: "private",
projectUrl: null,
```

Result: `ACCESS RESTRICTED — PRIVATE PROJECT` as non-interactive informational text.

#### Project still being developed

```js
status: "in-progress",
projectUrl: null,
```

Result: `BUILD IN PROGRESS — LINK COMING SOON` as non-interactive informational text.

Status precedence is `in-progress`, then `private`, then `live`. Private and in-progress projects never render the external link, even if a URL is accidentally left in `projectUrl`. The same status behavior applies on Home and in both archive card types.

### Projects Archive

`src/pages/ProjectsArchive.jsx` currently defines:

```js
const featuredProjectSlugs = [
  "dashstack-dashboard",
  "trippy",
  "mydash-dashboard",
];

const foundationProjectSlugs = ["fingo", "kasper", "leon"];
```

`getProjectsBySlug()` maps those lists to `projects`, then removes missing results with `.filter(Boolean)`. A misspelled slug therefore disappears silently. Featured archive cards alternate their desktop image/text direction according to index. Foundation cards use the compact row layout.

### Project pages

Individual project detail pages do not exist in the live route tree. `src/main.jsx` has no `/projects/:slug` route. `src/pages/ProjectDetails.jsx` is an unused seven-line redirect to `/projects`. Project cards go directly to `projectUrl`; they do not navigate to local details. Do not document or maintain the older detail-page architecture as current unless a future feature explicitly adds and registers it.

## 4. HOW TO UPDATE SKILLS

### Current skills source and shape

All skills live in `src/data/skillsOrbit.js`. Each group drives both the animated orbit and the lower stack-layer cards:

```js
{
  id: "group-id",
  label: "GROUP LABEL",
  description: "Group description.",
  duration: 50,
  radius: "clamp(7.1rem, 15vw, 12.1rem)",
  skills: [
    {
      id: "tool-id",
      name: "Tool Name",
      icon: SomeReactIcon,       // or iconSrc: "/assets/svg/tool.svg"
      color: "#ffffff",
      angle: 120,
    },
  ],
}
```

Current categories, in inner-to-outer orbit order, are:

| Group `id` | Visible label | Current role |
| --- | --- | --- |
| `core-frontend` | `CORE FRONTEND` | React, Next.js, TypeScript, JavaScript |
| `language-base` | `LANGUAGE BASE` | HTML, CSS, Python, C# |
| `ui-motion-systems` | `UI & MOTION SYSTEMS` | Bootstrap, Tailwind, Sass, shadcn/ui, MUI, Framer Motion |
| `product-delivery` | `PRODUCT & DELIVERY` | Figma, Postman, Vercel, Netlify, Supabase |
| `workflow-build-tools` | `WORKFLOW & BUILD TOOLS` | Git, GitHub, npm, Vite, Webpack |

Group fields have layout consequences:

- `duration` is the orbit period in seconds.
- `radius` is used to calculate the ring size and node distance.
- Group array order controls ring order, alternating rotation direction, numbered layer labels, lower-card order, and overall icon reveal order.
- `angle` positions a node around its ring in degrees. Skill array order does not determine the physical angle, but it does determine reveal order and tag order in the lower card.
- `color` is applied to React Icon components. SVG files normally provide their own internal colors; `color` does not recolor the `<img>`.

### Add a new skill

1. Decide whether an existing `react-icons/si` icon is available or a local SVG is needed.
2. For a React Icon, add the named import at the top of `src/data/skillsOrbit.js` and set `icon: ImportedIcon`.
3. For a local SVG, add an optimized file to `public/assets/svg/` and set `iconSrc: "/assets/svg/file-name.svg"`.
4. Add a unique skill object to the correct group's `skills` array.
5. Set a distinct `angle` that does not collide with nearby nodes on that orbit.
6. Place the object where it should appear in the lower category card and entrance sequence.
7. Check the animated orbit at mobile and desktop widths, including hover/focus labels.
8. Check the lower group card on mobile, `sm`, and `lg` layouts.

No new dependency is needed for icons already exported by the installed `react-icons` package. Verify the export name before importing it.

### Remove, rename, recategorize, or re-icon a skill

- Remove: delete its object from the group's `skills` array and remove an unused React Icon import if applicable.
- Rename: edit `name`; keep `id` stable unless there is a reason to change the React key.
- Change category: move the complete skill object between group `skills` arrays, then choose a suitable `angle` for the destination ring.
- Change a React Icon: update both the import and `icon` property.
- Change an SVG: replace the file at the same path or update `iconSrc`.

### Orbit, ordering, and layout safety

Safe data changes:

- Skill `name`, `color`, or icon reference
- Skill order inside a group
- A small `angle` adjustment after checking collisions
- Group copy

Moderate changes:

- `duration`, `radius`, group order, or adding/removing an entire group
- `src/components/sections/skills/SkillGroupsGrid.jsx`, whose `getCardClassName()` assumes the current five-card pattern: indexes 0–2 span two of six desktop columns, and indexes 3–4 span three

High-risk visual/motion files:

- `src/components/sections/skills/SkillOrbit.jsx`
- `src/components/sections/skills/SkillOrbitNode.jsx`
- Orbit keyframes and transform utilities in `src/index.css`

On small screens the orbit remains enabled; node buttons shrink and the outer container is constrained to roughly the viewport width. The category cards are one column by default, two columns at `sm`, and a six-column spanning layout at `lg`. The tiny orbit-number labels are hidden below `md`.

## 5. HOW TO UPDATE EXPERIENCE

Experience is data-driven through `src/data/experienceTimeline.js`. The shape is:

```js
{
  year: "2027-Present",
  context: "Example Role",
  headline: ["FIRST DISPLAY LINE", "SECOND DISPLAY LINE"],
  description: "Role or milestone description.",
  side: "left",
}
```

- `year` and `context` appear in the timeline panel and the central active-node label.
- `headline` is an array rendered with one block per item; two lines match the present design.
- `description` is the body copy.
- `side` must be `"left"` or `"right"` for the intended desktop side and central label direction. Mobile uses one left-rail layout regardless of this field.
- Array order is chronological/display order and controls the numbered path node.

To add a role, add a complete object in the desired array position. Alternate `side` values unless a deliberate pattern is wanted, keep the `year` + `context` pair unique because it is used as a React key, then verify the central desktop callout and mobile rail.

To edit dates, company/role, headline, or description, edit only the corresponding object. To reorder entries, move the entire object, not individual fields.

Safe:

- `src/data/experienceTimeline.js` content and ordering
- Opening copy in `src/components/sections/experience/ExperienceOpening.jsx`, if the text length still fits its `whitespace-nowrap` headline lines

Risky:

- `src/components/sections/experience/ExperienceTimeline.jsx` active-index logic and fixed desktop center signal
- `src/components/sections/experience/TimelineStep.jsx` `useInView` activation, side layouts, and motion variants
- Large headline changes that can overflow because each Experience opening line is non-wrapping

## 6. HOW TO UPDATE ABOUT

About is component-driven rather than one shared data file. `src/components/sections/About.jsx` registers the `about` section and renders four scenes in this order:

1. `src/components/sections/about/AboutFeelingScene.jsx` — About label, “NOT JUST CODE” headline, FEELS interaction, and supporting paragraph.
2. `src/components/sections/about/AboutSecondsScene.jsx` — 10-second headline, description, attention/trust/flow/action labels, countdown state and timers.
3. `src/components/sections/about/AboutDecisionScene.jsx` — decision headline/copy and three cards.
4. `src/components/sections/about/AboutOutcomeScene.jsx` — business/outcomes copy and radar.

`src/components/sections/about/decision/decisionCards.js` is the only About content array. Its `node`, `title`, and `text` fields feed `DecisionCard`. Be careful when renaming `title`: `DecisionVisual` receives `card.title.toLowerCase()` and has special visuals for exactly `motion` and `clarity`; all other values use the default purpose-style visual.

Normally safe:

- Paragraph and heading copy inside each scene, after checking line length
- `decisionCards.js` `node` and `text`
- Top/bottom frame labels passed to `AboutScene`

Moderate:

- Scene order in `About.jsx`
- Countdown speed (`countdownDuration`) or copy layout in `AboutSecondsScene.jsx`
- Radar concept labels/positions in the local `radarConcepts` array inside `OutcomeRadar.jsx`

Avoid casual changes to:

- `src/components/sections/about/AboutScene.jsx`, shared by all four scenes for framing and in-view animation
- `DecisionCard.jsx` pointer depth and entrance choreography
- `DecisionVisual.jsx` title-to-visual coupling
- `OutcomeRadar.jsx` sweep/reveal timing

## 7. HOW TO UPDATE CONTACT INFORMATION

Contact data is a local `contactLinks` array at the top of `src/components/sections/Contact.jsx`.

Current values:

- Email: `mailto:afif.ghaziri2004@gmail.com`
- WhatsApp: `https://wa.me/963964302160`
- LinkedIn: `https://linkedin.com/in/afif-ghaziri2004`

Use `mailto:address@example.com` with no spaces. Use `https://wa.me/<country-code-and-number>` with digits only—no `+`, spaces, parentheses, or dashes. WhatsApp and LinkedIn set `isExternal: true`; `ContactLink.jsx` then adds `target="_blank"` and `rel="noreferrer"`. Email opens in the current context through the mail client.

The LinkedIn URL is duplicated in `src/components/sections/Hero/HeroContent.jsx`. If LinkedIn changes, update both the Contact array and Hero CTA, then search the repository for the old URL.

Safe:

- `contactLinks` values, labels, and accessible labels
- Contact headline and paragraph in `Contact.jsx`
- Terminal strings `STATUS: OPEN` and `READY FOR NEXT BUILD` in `ContactSignalVisual.jsx`

Risky:

- Loading-dot opacity tracks, orbit-node arrays/times, and visibility-driven Framer Motion variants in `src/components/sections/contact/ContactSignalVisual.jsx`
- `useInView` timing in `Contact.jsx`, which starts both copy and signal animation

The terminal visual is decorative (`aria-hidden`). It contains three pulsing header dots, a three-dot loading sequence, six positioned signal nodes, two pulsing rings, and an 18-second center-ring rotation.

## 8. HOW TO UPDATE FOOTER

The footer is `src/components/sections/contact/SiteFooter.jsx` and is rendered at the bottom of Contact.

- The fixed year lives directly in the first paragraph: `© 2026 AFIF.GH`.
- The center message is directly in the second paragraph: `INTERFACE CLOSED — UNTIL THE NEXT BUILD.`
- Back to Top is a button that calls `scrollToSection("home")`; it does not change the URL or reload the page.

Changing the year or message is safe. Preserve the button handler and its `data-cursor`/sound attributes unless intentionally changing navigation behavior.

## 9. HOME SECTION ORDER

The actual order in `src/pages/Home.jsx` is:

1. Hero (`home` is registered on the surrounding `<main>`, not on Hero itself)
2. About
3. Experience
4. Skills
5. Projects
6. Contact, which contains the Footer

`Navbar` and `ScrollIndicator` are mounted before these sections but are fixed navigation UI, not content sections.

### Smooth scrolling and active-section detection

Root calls `src/hooks/useSmoothScroll.js` once. The hook creates Lenis with `lerp: 0.08`, `wheelMultiplier: 1`, and `touchMultiplier: 1.2`, advances it through `requestAnimationFrame`, and registers the instance with `sectionNavigation.js`. It destroys Lenis and clears the shared reference on unmount.

`scrollToSection()` prefers the registered Lenis instance, applies a `-96`px navbar offset, and uses immediate/forced scrolling for route handoffs. It falls back to native `window.scrollTo()` if Lenis is unavailable. `getCurrentSectionKey()` measures sections at 52% of the viewport height, with special handling that keeps `home` as the fallback. `ScrollIndicator.jsx` recalculates its active key and continuous rail progress on scroll and resize.

### Move an existing section

Update all of these in the same change:

1. Move the component in `src/pages/Home.jsx`.
2. Move its key in `sectionKeys` inside `src/lib/sectionNavigation.js`.
3. Move the matching object in `src/data/navigation.js`.
4. Renumber every `number` after it and update visible section-number copy inside the moved section if needed.
5. Test menu selection, the desktop scroll indicator, Back to Top, and Projects → Home section transitions.

### Add a section

The new section must:

1. Be imported and placed in `Home.jsx`.
2. Have a unique key added to `sectionKeys` in `sectionNavigation.js`.
3. Have a matching `navigationLinks` object with `number`, `label`, `sectionKey`, and `description`.
4. Render an element with `data-section="the-key"`.
5. Register its element with `registerSection("the-key", ref.current)` in an effect and unregister it on cleanup.
6. Update the hardcoded `/ 06` total in `src/components/layout/navbar/MenuPreview.jsx` if the visible menu total changes.
7. Update decorative NotFound values such as `routeNodes` and `KNOWN NODES: 06` only if the new section should be represented there.
8. Check `ScrollIndicator.jsx`; it positions markers from `navigationLinks.length` and only enables registered elements.

### Remove a section

Reverse the same list: remove it from Home, `sectionKeys`, and navigation data; remove or update route/state callers; renumber visible labels; update menu/404 totals; then test all remaining sections.

### Navigation integrity checklist

- The same exact `sectionKey` exists in `sectionKeys`, `navigationLinks`, `data-section`, and `registerSection`.
- `Home.jsx` order, `sectionKeys` order, and `navigationLinks` order match.
- Menu numbers and in-section technical numbers match the new order.
- `navbarOffset` remains appropriate for the fixed navbar (currently 96px).
- Active detection still feels correct at `activeSectionViewportRatio = 0.52`.
- Desktop scroll indicator labels and marker order match.
- Navigation from `/projects` lands on the requested section before the transition opens.

## 10. NAVBAR & MENU

`src/components/layout/Navbar.jsx` is rendered on Home and Projects Archive. NotFound does not render it.

Architecture:

- `Navbar.jsx` owns open/close state, active preview item, sound mute state, hide-on-scroll state, section callbacks, route callbacks, and focus return to the MENU button.
- `MenuOverlay.jsx` renders the fullscreen dialog, traps Tab focus, initially focuses CLOSE, and provides the desktop split shell.
- `CloseMenuButton.jsx` closes the overlay; Escape is also handled by Navbar.
- `MenuLinks.jsx` maps `navigationLinks`; hover/focus updates the preview, click navigates.
- `MenuPreview.jsx` is hidden below `lg`. It displays the active section number/label/description and shows an OPEN ARCHIVE action only for Projects.
- On `/projects`, Navbar treats Projects as the active menu item. Section selection calls the Root-provided Home-section transition.

While the menu is open, document/body overflow is locked and Lenis is stopped. Closing restores scroll and focus. Navbar also hides after downward scroll and reappears when scrolling up, near the top, or while the menu is open.

Safe changes:

- `label` and `description` in `src/data/navigation.js`
- Visible preview copy that does not change behavior
- Wordmark text only if the brand itself changes

Moderate/high-risk changes:

- `sectionKey`, numbering, and array order
- Focus trap selector/logic in `MenuOverlay.jsx`
- `handleSectionClick`, `handleArchiveClick`, or `handleBrandClick`
- Scroll locking and Lenis stop/start
- `startHomeSectionTransition` and `startProjectsArchiveTransition` handoffs
- Active-section calculation

## 11. PAGE TRANSITION SYSTEM

`src/pages/Root.jsx` owns transition state and route timing. `src/components/layout/PageTransitionOverlay.jsx` renders the panels.

Current phases:

- `idle`: overlay unmounted; normal interaction.
- `closing`: top and bottom panels move inward. Root blocks another transition and stops scrolling.
- `opening`: route has changed; panels move out. When opening ends, Root returns to `idle` and may focus the archive `<main>`.

Current Root constants:

```js
const PAGE_TRANSITION_CLOSE_DURATION = 2000;
const PAGE_TRANSITION_OPEN_DURATION = 1000;
```

The overlay's actual panel durations are 0.62 seconds while closing and 0.94 seconds while opening. Root intentionally waits 2 seconds before navigation and 1 second before declaring the opening complete.

Flows:

- Home → Projects: Projects calls `startProjectsArchiveTransition`; Root closes, forces scroll to top, navigates to `/projects`, opens, then increments `projectsArchiveFocusKey` so the archive `<main>` receives focus.
- Projects → Home/section: Root closes, navigates to `/` with `location.state.scrollToSection`, and waits. `Home.jsx` waits for the target position/document height to stabilize, scrolls instantly with Lenis/native fallback, clears route state, then calls `completeHomeSectionTransition` so Root opens the panels. Root has a 1500ms safety timeout; Home has 1200/1300ms stability/fallback limits for this handoff.
- NotFound → Home: NotFound calls `startRouteTransition("/")`; Root closes, resets scroll, navigates, then opens.
- Projects Archive Back to Home calls `startHomeSectionTransition("home")` and uses the same section handoff.

To change transition speed safely:

1. Change the two Root millisecond constants.
2. Review the corresponding 0.62/0.94-second panel transitions in `PageTransitionOverlay.jsx`.
3. Keep Root timeouts at least as long as the visual animation; otherwise content can navigate or re-enable before panels finish.
4. If changing the Projects → Home timing, re-evaluate Root's 1500ms fallback and Home's 1200/1300ms settling/fallback values.
5. Test all four flows above, not only direct route loading.

## 12. INTRO & RELOAD GATES

`Root.jsx` reads `sessionStorage` key `intro-seen` once during initialization.

First visit in a browser tab/session:

- `IntroGate` renders the site behind a fixed gate and locks body scrolling.
- Loading begins after `LOADING_START_DELAY = 800`ms.
- Ten progress steps end at 100% 2600ms after mount (800ms start delay + final 1800ms step delay).
- The user must click UNLOCK THE EXPERIENCE.
- `OPENING_DURATION = 850`ms opens/removes the gate and marks `intro-seen` as `true`.
- `HERO_ANIMATION_DELAY = 900`ms enables the Hero entrance just after the gate opens.

Reload or another full app mount in the same tab session:

- `SessionRevealGate` appears instead of the full loader.
- The user must click RESUME THE INTERFACE.
- `OPEN_DURATION = 680`ms opens the panels, removes the gate, and enables Hero animation.

Normal client-side navigation between Home and `/projects` does not remount Root and therefore does not show the Session gate again. `sessionStorage` is tab-session scoped: a new tab or a new browser session can show the full Intro again. The Intro key helpers fail safely if storage is unavailable. The routed content exists behind both gates from the beginning; the gate controls visibility/interaction rather than delaying route creation.

Safe edits:

- Brand/tagline/status/CTA text in the two gate components
- Small visual copy such as `PORTFOLIO_GATE / 2026`

High-risk edits:

- Progress timers and `isReady` state
- `onHeroAnimationReady`/`canAnimateHero` timing
- When `onIntroComplete` writes session state
- Body overflow locking
- Panel duration versus completion timeout

## 13. MOTION SYSTEM

Framer Motion is used directly in components; there is no central motion library. The most common cinematic ease is:

```js
[0.16, 1, 0.3, 1]
```

Fast exits often use `[0.7, 0, 0.84, 0]`. Common patterns are opacity + small translation + `filter: blur(...)`, staggered child entrances, directional `x` reveals, and subtle hover border/glow changes.

Current conventions:

- `useInView` starts most section/scene animations and often allows them to replay when leaving/re-entering.
- `ProjectArchiveFeaturedCard` is an exception with `once: true`.
- Hero waits for both `canAnimateHero` from the gate and 50% in-view state.
- Project cards use `useMotionValue`, `useSpring`, and `useTransform` for ±8px/±8° mouse depth.
- Custom cursor and ScrollIndicator also use motion values/springs.
- About Decision depth is enabled only for a fine mouse pointer; normal decorative motion still runs on touch/mobile.
- Contact signal, Outcome radar, Skills orbit, and Experience center signal contain repeating animations.
- The project intentionally does not use `useReducedMotion`; do not add reduced-motion branches unless project direction changes explicitly.

### Safe motion edits

- A small duration/delay adjustment inside an isolated reveal variant
- A small hover scale/glow change after desktop and touch checks
- Minor project depth intensity adjustment in `ProjectCard.jsx`
- Small `useInView` threshold adjustment when a reveal visibly starts too early/late

### Risky motion edits

- Root route-transition phases and timers
- Home's route-state scroll stabilization
- Intro/Session gate timing and Hero handoff
- Lenis lifecycle or section registry math
- Custom cursor spring/event internals
- Experience active-index selection and fixed center signal
- Skills orbit rotation/counter-rotation transforms
- Contact dot/node opacity tracks and timing arrays

## 14. CUSTOM CURSOR

`src/components/ui/CustomCursor.jsx` is mounted globally by Root. It is enabled only when `(hover: hover) and (pointer: fine)` matches, so touch/mobile devices use the native cursor behavior and render no custom cursor.

States:

- Default: cyan dot plus four spring-delayed trail dots.
- Interactive: 35×35 ring/glow.
- Text: 3×45 caret.
- Pressed: scaled, brighter feedback.

Automatic interactive selectors are `a`, `button`, `input`, `textarea`, `select`, `[role="button"]`, and `[data-cursor="interactive"]`.

To mark a new element:

```jsx
<div data-cursor="interactive">Custom interactive surface</div>
<h2 data-cursor="text">Display-only heading</h2>
<div>Cursor-neutral display content</div>
```

- Use `data-cursor="interactive"` for a custom clickable element not covered by semantic selectors.
- Use `data-cursor="text"` only for display text that should show the caret.
- For cursor-neutral display content, omit the attribute.
- Links and buttons are always treated as interactive by the selector; removing `data-cursor` does not neutralize them.

Sound is independent: add `data-sound="click"` and/or `data-sound-hover="hover"` only when audio feedback is desired.

## 15. AUDIO & SOUND

### Background audio

- File: `public/assets/sounds/background_sound.mp3`
- `<audio>` owner and source constant: `src/pages/Root.jsx`
- Lifecycle hook: `src/hooks/useBackgroundAudio.js`
- Shared playback state: `src/lib/backgroundAudio.js`
- Effective current volume: `0.4` (`BACKGROUND_VOLUME` in the hook)
- Behavior: looped, `autoPlay`, preloaded, hidden

The browser may block autoplay. Failures are intentionally swallowed and marked pending. A later permitted click/hover playback calls `ensureBackgroundAudioPlaying()` so the background track can start after user interaction. When the document is hidden or the window loses focus, output is muted/ducked; it is restored on focus/visibility return.

### UI sounds

- Click: `public/assets/sounds/click.mp3`, volume `0.18`
- Hover: `public/assets/sounds/hover.mp3`, volume `0.06`
- Hover cooldown: 150ms
- Hook: `src/hooks/useSoundEffects.js`

The hook uses delegated document listeners. `data-sound="click"` enables click audio. `data-sound-hover="hover"` enables hover audio only for a fine hover pointer.

### Mute preference

`src/lib/soundPreferences.js` stores `sound-muted` in `sessionStorage` and emits `sound-muted-change`. Navbar owns the visible toggle. Muting stops and rewinds the background track; unmuting restarts from the beginning and attempts playback. The preference resets with the browser tab/session.

### Replace audio safely

The lowest-risk method is to replace an MP3 with an optimized file at the same path/name. If the name changes, update the relevant source constant in Root or `useSoundEffects.js`. Keep files in `public/assets/sounds/`, test muted/unmuted states, focus switching, first-load autoplay blocking, and click/hover feedback. Do not delete the audio hooks merely because autoplay is blocked in one browser.

## 16. ASSET MANAGEMENT

Current asset map:

| Folder/file | Current use |
| --- | --- |
| `public/assets/projects/` | All project screenshots referenced by `src/data/projects.js`; current images are 1672×941 |
| `public/assets/images/profile.webp` | Hero portrait |
| `public/assets/images/` other PNGs | Duplicate/legacy project images; not referenced by current source |
| `public/assets/svg/` | Local SVG skill icons referenced by `skillsOrbit.js`; `framer-motion.svg` is currently not referenced |
| `public/assets/sounds/` | Background, click, and hover MP3s |
| `public/assets/fonts/Osiris.woff2` | Local Osiris font |
| `public/assets/pdf/Afif_Ghaziri_Frontend_React_Developer.pdf` | Hero Download CV link |
| `public/assets/og-image.png` | Open Graph/Twitter preview image |
| `public/favicon-a-gh.svg`, `public/favicon.ico`, `public/apple-touch-icon.png` | Favicons linked by `index.html` |
| `public/icon-192.png`, `public/icon-512.png` | Present at root but not referenced by `index.html`; there is no web manifest |
| `public/a-gh-favicon-package/` | Duplicate source favicon package; not referenced at runtime |

Use lowercase hyphenated names for new assets, avoid spaces, optimize large images/audio, and keep public URLs rooted at `/assets/...`. After adding an asset, verify its exact case; local Windows development is less strict than a Linux deployment.

## 17. SEO / SOCIAL PREVIEW

All metadata is static and global in `index.html`; there is no route-specific metadata system.

Current values:

- `<title>`: `A.GH | Frontend Dev`
- Meta description: `A.GH — Frontend developer portfolio by Afif Ghaziri, featuring interactive interfaces, motion-driven UI, React projects, and polished frontend work.`
- Canonical URL: `https://afif-gh.vercel.app/`
- Open Graph type/site/title: `website`, `A.GH`, `A.GH | Frontend Dev`
- Open Graph description: `Interactive frontend portfolio by Afif Ghaziri`
- Open Graph URL: `https://afif-gh.vercel.app/`
- Open Graph image: `https://afif-gh.vercel.app/assets/og-image.png`
- Twitter card: `summary_large_image`, with matching title/description/image
- Theme color: `#020817`
- Favicons: `/favicon-a-gh.svg`, `/favicon.ico`, `/apple-touch-icon.png`

The metadata declares the OG image as 1200×630, which is the expected social-preview size. The current `public/assets/og-image.png` is actually 1731×909, so the declared dimensions and file dimensions do not match. For the next replacement, export an actual 1200×630 image and keep the same path, or update both the file and every absolute metadata URL.

If the domain changes, update at minimum:

1. Canonical `href`
2. `og:url`
3. `og:image` and `og:image:secure_url`
4. `twitter:image`

Then redeploy and use social-platform debugger/cache-refresh tools. WhatsApp, Telegram, LinkedIn, and other crawlers can continue showing a cached preview after the site is correct.

## 18. NOT FOUND PAGE

`src/main.jsx` registers `path: "*"` under Root, so any unmatched path renders `src/pages/NotFound.jsx` inside the global background/gate/audio/transition environment.

NotFound contains no Navbar. Its Back to Home button first tries the Root-provided `startRouteTransition("/")`; a direct `navigate("/")` is only the fallback. The decorative route map uses a local `routeNodes` array and static `KNOWN NODES: 06` text.

Copy, route-node labels/positions, and decorative visuals can be edited locally. Preserve `handleBackHome`, the transition disabled state, and the outlet-context fallback unless intentionally changing navigation. Test an unknown path entered directly and the transition button afterward.

## 19. RESPONSIVE DESIGN

There is no `tailwind.config.*` file. Tailwind 4 is loaded through the Vite plugin and `@import "tailwindcss"`. The implementation primarily uses the default breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, and `2xl` 1536px, plus `min-[1024px]` in Hero. Do not rely on the lone `xs:flex-nowrap` class in `HeroContent.jsx` as a defined custom breakpoint; no `xs` theme is declared in this repository.

Important layout changes:

| Area | Mobile/small | Desktop/large |
| --- | --- | --- |
| Hero | Single column; portrait appears before copy because HeroContent has `order-2`; smaller portrait and typography | `lg` two-column copy/portrait; portrait uses negative right margins at larger widths; scroll cue appears at 1024px+ |
| About | Scenes stack vertically; Decision cards are one column; radar is smaller and centered | Decision cards become a row at `sm`; Outcome copy/radar split at `lg` |
| Experience | One-sided vertical rail and cards; central fixed signal hidden | `lg` alternating left/right timeline around a fixed center signal |
| Skills | Copy and orbit stack; orbit constrained to viewport; smaller nodes | `lg` copy/orbit two-column layout; lower cards use six-column spans |
| Home Projects | Cards stack; large card puts content before image, small cards image before content | Large card splits text/image at `lg`; small cards form two columns |
| Projects Archive | Featured cards stack; foundation cards stack at the narrowest width | Featured cards alternate text/image at `lg`; foundation cards use image/content at `sm` and add a separate CTA column at `lg` |
| Contact | Heading, signal visual, then link buttons; links full width at the narrowest size | Copy/links left and signal visual right at `lg` |
| Footer | Two-row grid keeps Back to Top at top right and center message below | `lg` horizontal flex layout |
| Menu | Links-only presentation; preview is hidden | `lg` split links + 640px-tall preview card |
| ScrollIndicator | Hidden | Visible at `lg`; shifted farther right at `xl` |
| NotFound | Single-column copy then route map | `lg` two-column layout |

Common regression risks:

- Hero and Experience opening lines use `whitespace-nowrap`; longer copy can overflow.
- Bruno headings use tight `max-w`/`clamp()` sizing; long project titles can collide with images or exceed their designed line count.
- Project frames hide overflow, but screenshots use `object-contain`; unexpected ratios create letterboxing rather than crop.
- Skills outer rings and labels can touch viewport edges after radius/skill-count changes.
- Hero portrait negative margins and oversized glows should be checked for horizontal overflow.

Always test at approximately 320/375px, 768px, 1024px, 1280px, and a large desktop width after layout-sensitive edits.

## 20. FONTS

Fonts are loaded in `index.html` and exposed by utility classes in `src/index.css`.

| Font | Source | Actual semantic use |
| --- | --- | --- |
| Audiowide | Google Fonts preload + stylesheet | `AFIF.GH` in Navbar and IntroGate brand wordmark |
| Bruno Ace SC | Google Fonts preload + stylesheet | Large cinematic headings, menu links, major CTA labels |
| Oxanium 400/500 | Google Fonts preload + stylesheet | Body copy, buttons, tags, status/UI text, most descriptions |
| Osiris | `public/assets/fonts/Osiris.woff2` via `@font-face` | Section numbers, technical labels, layer/node numbering, selected interface labels |
| Tailwind `font-mono` fallback | System/default Tailwind monospace stack | Small Intro gate system/loading text and MenuPreview code fragment |

The helpers are `.font-audiowide`, `.font-bruno`, `.font-oxanium`, and `.font-osiris`. Osiris uses `font-display: block`; the Google stylesheet uses `display=block`. If a font name/path changes, update both loading and the helper class. Do not introduce another display font casually—the identity relies on the current role separation.

## 21. COLORS / VISUAL SYSTEM

The current palette is implemented directly in classes rather than a token file:

- Base body/background: `#04162c`
- Deep canvas: `#020817`
- Background gradient endpoints: `#031225`, `#020817`, `#041226`
- Common panels: `#06101f`, `#061426`, with hover surfaces around `#07172a`/`#07182d`
- Accent: Tailwind cyan 100/200/300 and occasional sky/blue glows
- Primary text: `slate-50`; body text: `slate-200`/`slate-300` at reduced opacity
- Borders: usually cyan-100 at roughly 8–18% opacity, increasing to roughly 24–55% on hover/focus
- Glow language: soft cyan/sky box shadows and blurred low-opacity circular fields

The global background is `SiteBackground.jsx`: a dark gradient, 42px grid, and vignette. The system favors transparent navy panels, fine cyan lines/corners, and controlled glows. Preserve these recurring values unless a redesign is explicitly approved.

## 22. BUILD & VALIDATION CHECKLIST

Run from the repository root:

```powershell
npm run build
npm run lint
```

At this guide's verification point, both commands pass. Vite currently emits a non-fatal chunk-size warning because the production JavaScript chunk is about 612.46kB minified (180.83kB gzip), above the default 500kB warning threshold. For a content-only edit, the warning can be accepted when the build still passes and bundle size has not materially grown. Investigate code splitting if the bundle grows substantially or real performance suffers; do not raise the warning limit merely to hide it.

Browser validation:

Desktop:

- `/`
- `/projects`
- An invalid route such as `/does-not-exist`

Mobile:

- `/`
- `/projects`

Check:

- No console errors
- No horizontal overflow
- Intro/Session gate behavior
- Menu open/close, Escape, Tab containment, and section navigation
- Scroll indicator and active section on desktop
- Project images, tags, and external links
- Contact links
- Footer Back to Top
- Background audio/mute and UI sounds
- Home ↔ Projects transitions
- NotFound → Home transition

## 23. DEPLOYMENT

Production domain: [https://afif-gh.vercel.app/](https://afif-gh.vercel.app/)

`vercel.json` contains one SPA rewrite:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This lets Vercel return `index.html` for direct browser requests such as `/projects`; React Router then selects the correct client route. Without an equivalent fallback, a hard refresh on `/projects` would commonly return a platform 404.

`vite.config.js` only registers React and Tailwind plugins. Vercel can detect the Vite build. `@vercel/analytics/react` is mounted beside `RouterProvider` in `src/main.jsx`.

Safe deployment workflow:

1. Confirm only intended files changed with `git diff`/`git status`.
2. Run build and lint.
3. Perform the browser checklist, including a hard refresh on `/projects` and an unknown route.
4. Commit through the project's established Git workflow.
5. Deploy through the already connected Vercel project/workflow.
6. Smoke-test the production domain, metadata, links, and audio.

No repository CI workflow or explicit GitHub Actions configuration is present, and the repository does not reveal whether production deploys are triggered by Vercel Git integration or a manual dashboard/CLI step. Do not invent a CI/CD process; follow the Vercel project settings currently in use.

## 24. COMMON TASKS — QUICK REFERENCE

| I want to... | Edit this file | What to change |
| --- | --- | --- |
| Add project | `src/data/projects.js`; optionally `src/pages/ProjectsArchive.jsx` | Add object; add slug to an archive list if desired |
| Replace project image | `public/assets/projects/`; `src/data/projects.js` | Add/replace screenshot and update `image` |
| Feature project on Home | `src/data/projects.js` | Set `featured: true`; choose `featuredLayout` |
| Change Home project order | `src/data/projects.js` | Reorder objects; first `large` wins and smalls keep array order |
| Change archive project order/group | `src/pages/ProjectsArchive.jsx` | Reorder/move slugs in the two local arrays |
| Add skill | `src/data/skillsOrbit.js`; optionally `public/assets/svg/` | Add icon import/file and skill object |
| Remove skill | `src/data/skillsOrbit.js` | Delete object and unused icon import |
| Change skill category | `src/data/skillsOrbit.js` | Move full object and update destination `angle` |
| Add experience | `src/data/experienceTimeline.js` | Add complete timeline object in desired order |
| Edit About text | Relevant file under `src/components/sections/about/` | Change local heading/paragraph; check scene fit |
| Change email | `src/components/sections/Contact.jsx` | Update `mailto:` href and accessible label if needed |
| Change WhatsApp | `src/components/sections/Contact.jsx` | Update digits-only `wa.me` URL |
| Change LinkedIn | `src/components/sections/Contact.jsx` and `src/components/sections/Hero/HeroContent.jsx` | Update both duplicated URLs |
| Change footer year | `src/components/sections/contact/SiteFooter.jsx` | Replace fixed `2026` |
| Change section title | The relevant section/scene component | Edit component-local heading and check responsive wrapping |
| Change section order | `src/pages/Home.jsx`, `src/lib/sectionNavigation.js`, `src/data/navigation.js` | Keep composition, registry order, and menu order synchronized |
| Change intro text | `src/components/intro/IntroGate.jsx`; optionally `SessionRevealGate.jsx` | Edit local copy only |
| Change route transition speed | `src/pages/Root.jsx` and `src/components/layout/PageTransitionOverlay.jsx` | Keep state timeouts and visual durations aligned |
| Replace background audio | `public/assets/sounds/background_sound.mp3` | Replace same-path optimized MP3, then test autoplay/mute |
| Replace UI sounds | `public/assets/sounds/click.mp3`, `hover.mp3` | Replace same-path optimized MP3s |
| Change favicon | `public/favicon-a-gh.svg`, `favicon.ico`, `apple-touch-icon.png`; `index.html` if paths change | Replace linked files or update links |
| Change OG image | `public/assets/og-image.png`; `index.html` if path/domain changes | Use actual 1200×630 image and keep metadata aligned |
| Change SEO description | `index.html` | Update meta, OG, and Twitter descriptions as appropriate |
| Change production domain | `index.html` and Vercel project settings | Update canonical, OG URL, and absolute image URLs |
| Replace CV | `public/assets/pdf/Afif_Ghaziri_Frontend_React_Developer.pdf`; `HeroContent.jsx` if filename changes | Replace file or update download path |

## 25. SAFE VS RISKY EDITS

### Safe

- Project text/tags/URLs/images in `src/data/projects.js` and `public/assets/projects/`
- Skill names/icons/category membership in `src/data/skillsOrbit.js`, with collision checks
- Experience content/order in `src/data/experienceTimeline.js`
- Navigation labels/descriptions when keys/order do not change
- Contact values in `Contact.jsx`
- Footer year/message
- Same-path asset replacements
- SEO copy and correctly sized OG image

### Moderate

- Featured project selection/count/layout flags
- Archive slug lists and ordering
- Adding/removing a skill group
- Reordering Home sections
- Changing About scene order/content length
- Changing responsive classes or heading lengths
- Changing isolated in-view thresholds, durations, or hover strength
- Metadata domain/path changes

### High Risk

- `src/pages/Root.jsx`
- `src/pages/Home.jsx` route-state handoff effect
- `src/lib/sectionNavigation.js`
- `src/components/layout/PageTransitionOverlay.jsx`
- `src/components/intro/IntroGate.jsx` and `SessionRevealGate.jsx` timing/state
- `src/components/layout/Navbar.jsx` and `MenuOverlay.jsx` navigation/focus/scroll logic
- Audio state across `useBackgroundAudio.js`, `backgroundAudio.js`, and `soundPreferences.js`
- `src/components/ui/CustomCursor.jsx`
- `src/components/sections/experience/ExperienceTimeline.jsx`
- Skills orbit transform/keyframe internals
- Contact signal timing tracks

## 26. DO NOT TOUCH WITHOUT A REASON

- `src/pages/Root.jsx`: coordinates gates, audio, routing, transition locks, timeouts, focus, and Outlet callbacks. “Cleanup” can break several flows at once.
- `src/pages/Home.jsx` transition-scroll effect: it intentionally waits for layout stability before revealing the requested section from `/projects`.
- `src/lib/sectionNavigation.js`: shared by Navbar, ScrollIndicator, Footer, Home handoff, and Lenis. Its 96px offset and 52% active threshold are coupled to the fixed layout.
- `src/components/layout/PageTransitionOverlay.jsx`: visual timings must remain synchronized with Root.
- `IntroGate.jsx` / `SessionRevealGate.jsx`: completion, session state, body locking, and Hero timing are coupled.
- `Navbar.jsx` / `MenuOverlay.jsx`: scroll locking, Lenis lifecycle, focus trap, Escape behavior, and focus restoration are already stabilized.
- `src/hooks/useBackgroundAudio.js` and `src/lib/backgroundAudio.js`: browser autoplay, mute events, and visibility handling are intentionally defensive.
- `src/components/ui/CustomCursor.jsx` and cursor CSS in `src/index.css`: global selectors and motion listeners affect every interactive element.
- `src/components/sections/skills/SkillOrbit.jsx` plus orbit CSS: the parent rotates while each node counter-rotates; simplifying one side makes icons spin.
- `src/components/sections/experience/ExperienceTimeline.jsx`: active steps drive a fixed viewport-level signal and callout.
- `src/components/sections/contact/ContactSignalVisual.jsx`: animation arrays have matching node indexes and timing tracks.
- `src/pages/ProjectDetails.jsx`: do not wire it into routing merely because older project instructions mention detail pages; the current product uses external links and `/projects` only.

## 27. TROUBLESHOOTING

### Project image is cropped or has empty bands

Inspect `project.image` in `src/data/projects.js`, then the frame classes in `ProjectCard.jsx` or the relevant archive card. Current images use `object-contain`, so true cropping usually means that class was changed; empty bands mean the file ratio differs from the 1672:941 or 16:10 frame.

### Project title overlaps the image

Check title length, `max-w`/`clamp()` classes, and the large card grid in `src/components/sections/projects/ProjectCard.jsx`. Also check the archive card if the issue occurs only on `/projects`. Shorten copy before changing stabilized layout.

### Project is missing from Home or archive

- Home: check `featured`, `featuredLayout`, and whether multiple projects are marked `large`.
- Archive: check the exact `slug` against the two arrays in `ProjectsArchive.jsx`; missing slugs are silently filtered.

### Section navigation goes to the wrong section

Compare `Home.jsx` order, `sectionKeys`, `navigationLinks`, every `data-section`, and every `registerSection` call. Then check the 96px `navbarOffset` and duplicate section keys.

### Page transition opens too early

Compare Root's close/open constants with the overlay's 0.62/0.94-second durations. For Projects → Home, also inspect Root's 1500ms fallback and Home's 1200/1300ms settling limits.

### Gate stays closed too long

- Full Intro: inspect `LOADING_START_DELAY`, `progressSteps`, `isReady`, and the required unlock click.
- Session gate: confirm the Resume button is usable and inspect `OPEN_DURATION`.
- Check the console for a runtime error behind the overlay before changing timers.

### Animation fires before visible

Find the nearest `useInView` options. Adjust `amount`/`margin` narrowly and test re-entry. Remember some parent/child components each have their own in-view observer.

### Mobile horizontal overflow

Inspect non-wrapping Bruno lines, Hero CTA widths, the Skills orbit viewport-width container, Hero portrait negative margins, and large absolute glow elements. Test at 320px before changing global body overflow.

### External project link does not open

Confirm `status` is exactly `"live"`, then check `projectUrl`, whether it is truthy, browser popup/security behavior, and rendered `target="_blank"`. Private and in-progress projects intentionally do not render a link. Test live URLs directly. The local `slug` does not control external navigation.

### Contact link is incorrect

Edit `contactLinks` in `Contact.jsx`. WhatsApp must use digits only after `wa.me/`. If LinkedIn changes, update Hero's duplicated URL too.

### OG image does not update on WhatsApp/Telegram

Confirm production serves `/assets/og-image.png`, confirm `index.html` absolute URLs/domain, deploy, then refresh the platform's cached preview. The current file-dimension mismatch should be corrected with a real 1200×630 replacement.

### `/projects` refresh fails

Confirm the deployment includes `vercel.json` and its catch-all rewrite to `/index.html`. Also confirm the deployed platform is Vercel or has an equivalent SPA fallback.

### Unknown route shows the wrong page

Check the `*` child route in `src/main.jsx`. Route order/current paths should remain `/`, `/projects`, then `*`.

### Background audio does not autoplay

This can be normal browser policy. Confirm sound is not muted in session storage, click an enabled sound-marked control, and check `useBackgroundAudio.js`/`backgroundAudio.js`. Do not remove the `play()` error handling.

### Cursor effect behaves incorrectly

Check whether the device matches a fine hover pointer, whether `body.custom-cursor-active` is present, and whether the element is automatically interactive or has the correct `data-cursor` value. Inspect `CustomCursor.jsx` before changing global CSS selectors.

## 28. FINAL MAINTENANCE CHECKLIST

- [ ] Project data valid
- [ ] Project archive slug lists valid
- [ ] Skills data valid
- [ ] Experience data valid
- [ ] Assets exist with exact deployed filename case
- [ ] URLs correct
- [ ] Email/WhatsApp/LinkedIn correct in all locations
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Home checked on desktop
- [ ] Home checked on mobile
- [ ] `/projects` checked
- [ ] `/projects` hard refresh checked
- [ ] Invalid route checked
- [ ] Menu checked with mouse and keyboard
- [ ] Section navigation and active indicator checked
- [ ] Intro/session gates checked
- [ ] Page transitions checked in both directions
- [ ] Contact links checked
- [ ] Project links checked
- [ ] Audio/mute checked
- [ ] No console errors
- [ ] No horizontal overflow
- [ ] Metadata/domain/OG image correct
