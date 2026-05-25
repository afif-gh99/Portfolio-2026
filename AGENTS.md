# AGENTS.md

## Project

This project is called Afif Portfolio.

It is a personal portfolio website for Afif Ghaziri. The website should present Afif as a Creative Front-End Developer with a business mindset, combining strong UI/UX sense, animation, performance, and a modern technical identity.

The project is no longer a strict Figma-to-code implementation. Figma files and reference images may be used as inspiration and visual guidance, but the approved direction is a custom cinematic command-interface portfolio.

Preserve the current approved implemented style unless the user explicitly requests a redesign or visual change.

---

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Framer Motion
- React Router

Do not use TypeScript in this project.

Do not add extra libraries or dependencies unless they are clearly needed and approved first.

---

## Design Rules

The current design source of truth is the approved implemented style, the design system documentation, and the user's direct feedback.

Figma and reference images are inspiration only. Do not copy references directly, and do not force the project back into the original Figma design if the current approved direction is different.

Do not apply visual improvements without approval unless the user directly requests the change.

The visual direction should be:

- Dark navy / near-black
- Premium
- Modern
- Clean
- Cinematic
- Futuristic
- Technical / command-interface inspired
- Custom-built, not template-like

Current approved design language includes:

- Global dark navy grid background
- Cyan/electric-blue glow accents
- Thin frames and corner marks
- Command Gate intro experience
- Fullscreen split navigation menu
- Floating navbar elements without a large enclosing pill frame
- Custom cursor with premium hover states
- Controlled cinematic motion

Avoid:

- Pre-made design feel
- Childish animations
- Excessive color gradients
- Random colors
- Overly complex user interface
- AI-generated purple tones
- AI-generated fonts
- Copying reference images directly
- Reverting to strict Figma matching unless explicitly requested

Typography should follow the approved current style. If a font is unavailable or unclear, ask before choosing a replacement.

Navbar/Menu typography should follow these rules:

- `AFIF.GH` wordmark uses Audiowide only.
- Large menu links use Bruno Ace SC.
- Section numbers use `"Osiris", system-ui, sans-serif`.
- Body text and descriptions use the existing clean sans-serif.
- Do not use Audiowide for menu links or descriptions.
- Do not use Osiris for the wordmark, large menu links, descriptions, body text, MENU, or CLOSE labels.

Cursor rules:

- Clickable and interactive elements should use the interactive cursor state.
- Display-only text may use the text/caret cursor state when explicitly marked.
- Do not apply text cursor behavior to clickable menu or navbar links.

Animations should feel premium, smooth, and controlled without exaggeration.

Use cinematic motion only when it serves the experience and is specifically requested or clearly appropriate for the current approved feature.

---

## Workflow Rules

Build the website section by section.

Do not implement the entire website at once.

The preferred workflow is:

1. Plan the current section or feature when it affects structure, motion, or user flow.
2. Implement the current section or feature.
3. Review it against the approved current design direction and user feedback.
4. Fix spacing, responsiveness, interaction states, and visual details.
5. Run the required checks.
6. Wait for approval before moving to the next major section.

Do not move to a new major section unless the current section or feature is approved or explicitly marked as done.

For small style fixes, do not over-plan. Keep changes focused and report them briefly.

---

## Project Structure

Use a simple one-file-per-component structure.

Do not create a separate folder for every section unless the section becomes too large and needs to be split.

Preferred structure:

- `components/layout/` for layout components such as Navbar, Footer, SiteBackground, CustomCursor, and PageWrapper.
- `components/intro/` for intro or entry-experience components such as IntroGate.
- `components/sections/` for homepage sections such as Hero, About, Experience, Projects, Skills, and Contact.
- `components/ui/` for reusable UI components such as Button, SectionHeading, ProjectCard, ExperienceCard, and SkillBadge.
- `data/` for editable content such as projects, experience, skills, and navigation links.
- `pages/` for route-level pages such as Home, ProjectDetails, and NotFound.
- `hooks/` for reusable React hooks.
- `lib/` for utilities, constants, and animation helpers.
- `assets/` for images, icons, and visual assets.

The portfolio should use React Router.

Required routes:

- `/` for the main portfolio homepage.
- `/projects/:slug` for individual project detail pages.
- `*` for the NotFound page.

Project data should be stored in `data/projects.js` and reused by both the Projects section and the ProjectDetails page.

Avoid duplicating project content inside multiple components.

---

## Coding Rules

Use Tailwind CSS as the main styling approach.

Regular CSS is allowed only when needed for:

- Global styles
- CSS variables
- Font definitions
- Complex visual effects
- Reusable animation helpers that are hard to manage with Tailwind alone

Do not add new libraries or dependencies without approval.

Use Framer Motion for animations.

Do not use GSAP or other animation libraries unless explicitly requested later.

Keep components readable and focused.

Prefer reusable UI components when the same pattern appears more than once.

Avoid duplicating project data inside components. Use files inside `data/` when content is reused across sections or pages.

Avoid over-engineering small UI components. Use simple state and clear handlers whenever possible.

---

## Verification

After finishing each major section or feature, run:

- `npm run build`

If a lint script exists, also run:

- `npm run lint`

Report:

- What files were changed
- Whether the build passed
- Whether lint passed, if applicable
- Any issues, warnings, or limitations

Do not move to the next major section until the current section is reviewed and approved.

---

## Browser Verification Rules

Use browser-based verification when it is useful for visual or interaction-heavy work, or when the user explicitly asks for it.

Browser verification may be used to check:

- The page loads correctly.
- There are no obvious console errors.
- The section or feature appears correctly in the browser.
- Navigation links work as expected.
- Responsive layouts work on desktop, tablet, and mobile viewports.
- Important hover or interaction states behave correctly.

Use screenshots when useful to review visual accuracy.

Do not treat browser verification as a replacement for user review. The approved current design direction and user feedback are the source of truth.

If Playwright is not installed, ask for approval before adding it as a development dependency.

Do not run browser verification for every small change unless needed.

---

## Routing Rules

Use React Router for routing.

Required routes:

- `/` for the main portfolio homepage.
- `/projects/:slug` for individual project detail pages.
- `*` for the NotFound page.

Project detail pages should be generated from the project `slug`.

If a project slug does not exist, show the NotFound page or a clear project-not-found state with a button back to the Projects section or homepage.

Each project detail page should include:

- Project title
- Project description
- Project image or screenshots
- Technologies used
- Live demo link, if available
- GitHub link, if available
- My role
- Features
- Back to projects button

For homepage section navigation, avoid URL hash changes unless explicitly requested. Prefer clean scroll handlers or refs when section navigation is implemented.

---

## Data Rules

Store project data in `data/projects.js`.

`data/projects.js` should be the single source of truth for project content.

Use the same project data for:

- The Projects section on the homepage.
- The ProjectDetails page.

Do not duplicate project content manually inside multiple components.

Each project object should include fields such as:

- `title`
- `slug`
- `description`
- `image`
- `screenshots`
- `technologies`
- `liveUrl`
- `githubUrl`
- `role`
- `features`

If `liveUrl` is missing, do not render the Live Demo button.

If `githubUrl` is missing, do not render the GitHub button.

---

## Content Rules

The website content should be in English.

Codex may suggest improvements to text, wording, headlines, descriptions, and calls to action, but must wait for approval before applying them.

Do not rewrite important personal or professional content without approval.

Keep the tone professional, modern, confident, and clear.

Avoid exaggerated claims, generic buzzwords, or overly marketing-style language.

---

## Assets Rules

Store public visual assets inside:

- `public/assets/`

Use clear and organized asset names.

Examples:

- `public/assets/images/`
- `public/assets/icons/`
- `public/assets/projects/`
- `public/assets/fonts/`

Placeholder images are allowed when final assets are not ready.

If placeholder images are used, clearly report them and mention where they should be replaced later.

Do not use random external image URLs unless explicitly requested.

---

## Performance Rules

Consider performance from the beginning of the project.

Keep components lightweight and avoid unnecessary complexity.

Avoid heavy animations that may hurt performance.

Use optimized image formats when possible, preferably WebP or AVIF.

Avoid loading large images directly if smaller optimized versions can be used.

Do not add unnecessary libraries.

Keep background, cursor, and intro effects controlled and performant.

SEO optimization can be handled later, but still use semantic HTML from the beginning where possible.

---

## Communication Rules

After each task, provide a short report that includes:

- Files changed
- What was implemented
- Build result
- Lint result, if a lint script exists
- Browser verification result, if browser verification was requested or used
- Any notes, issues, or limitations

Keep reports clear and concise.

Do not move to the next major section without approval.

---

## Coding Style Preferences

Prefer simple, readable React code.

Use clear component structure and straightforward state names.

Avoid over-engineering small components.

Avoid unnecessary abstractions, helper functions, or complex naming unless the component truly needs them.

Keep JSX easy to scan and understand.

Use direct `.map()` rendering for simple lists.

Use Framer Motion only where it adds clear visual value.

Do not make the code harder to understand just to make it look more advanced.

When possible, match the user's existing coding style:

- simple state handling
- clear event handlers
- readable Tailwind classes
- direct component logic

---

## Skill Usage

Use project skills when they directly support the current task.

Available skills:

- `ui-ux-pro-max`
- `frontend-design-skill`
- `fixing-motion-performance`
- `fixing-accessibility`

### `ui-ux-pro-max`

Use `ui-ux-pro-max` for UI/UX-sensitive tasks such as:

- Visual hierarchy review
- Spacing and alignment review
- Premium visual polish
- Responsive UI review
- Hover states and interaction quality
- Section-level polish for IntroGate, Navbar/Menu, Hero, Projects, Cards, and Contact

This skill should support the approved current design direction and existing design system, not replace them or redesign the project freely.

### `frontend-design-skill`

Use `frontend-design-skill` for front-end visual implementation tasks such as:

- Translating approved visual direction into React/Tailwind components
- Component layout and composition
- Responsive implementation
- Tailwind class organization for visual components
- Building or refining UI sections such as IntroGate, Navbar/Menu, Hero, About, Projects, Skills, and Contact

This skill should help implement the approved design cleanly, not introduce unrelated visual ideas.

### `fixing-motion-performance`

Use `fixing-motion-performance` for motion-heavy or performance-sensitive tasks such as:

- Framer Motion animations
- IntroGate entrance/exit animations
- Navbar/Menu open and close transitions
- Custom cursor motion
- Hover and click interactions
- Scroll-related motion
- Reducing jank, excessive re-renders, heavy effects, or distracting animation behavior

Motion should remain premium, smooth, controlled, and performance-friendly.

### `fixing-accessibility`

Use `fixing-accessibility` for accessibility-sensitive UI tasks such as:

- Buttons, links, and interactive controls
- Keyboard interaction basics
- Focus-visible states
- ARIA labels
- Color contrast
- Reduced-motion behavior
- Sound toggle accessibility
- Custom cursor accessibility concerns
- IntroGate CTA accessibility
- Navbar/Menu open and close controls

Do not over-engineer accessibility, but do not ignore important basics.

### Skill Usage Rules

- Use skills as task-specific support, not as permission to redesign freely.
- For UI-heavy tasks, use `ui-ux-pro-max` and/or `frontend-design-skill`.
- For motion-heavy tasks, use `fixing-motion-performance`.
- For accessibility-sensitive tasks, use `fixing-accessibility`.
- If a task touches UI, motion, and accessibility together, use the relevant skills together.
- Before applying unrequested UI improvements, suggest them and wait for approval unless the user directly requested refinement.
- When relevant, mention in the final report which skill or skills were used.
- Keep code simple, readable, and aligned with the user's coding style.
- Do not add libraries unless explicitly approved.
---

## Done Criteria

A task is considered done only when:

- The requested section or feature is implemented.
- The implementation follows the approved current design direction and user request.
- The section or feature is responsive when relevant.
- The code is clean and readable.
- No unapproved libraries were added.
- `npm run build` passes after major section work.
- `npm run lint` passes if a lint script exists.
- Browser verification is completed only if requested, clearly needed, or already part of the approved task.
- Changed files and any important notes are reported.
- The user approves moving to the next major section.
