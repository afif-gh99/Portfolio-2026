# DESIGN_SYSTEM.md

## Visual Identity

Afif Portfolio uses a custom cinematic command-interface visual identity.

The site should feel:

- Premium
- Modern
- Clean
- Cinematic
- Futuristic
- Tech-oriented
- Custom-built
- Interface-like, not template-like

The current design direction is no longer a strict Figma-to-code implementation. Figma frames and visual references may be used as inspiration and guidance, but the approved implemented style and user feedback are the main source of truth.

The visual style should avoid looking like a generic portfolio, pre-made template, or copied reference.

---

## Design Source Rules

Use these sources in this order:

1. The user's latest approved direction and feedback.
2. The currently implemented approved design.
3. This design system.
4. Figma and reference images as inspiration only.

Figma/reference designs should not be copied directly.

When using references:

- Extract the concept, not the exact layout.
- Do not copy colors, proportions, typography, or composition exactly.
- Adapt ideas to the Afif Portfolio identity.
- Preserve the current cinematic command-interface style.

If a design decision conflicts with older Figma-based rules, follow the latest approved direction.

---

## Color Direction

The main color direction is:

- Very dark navy
- Near-black navy
- Deep blue/navy gradients
- Cyan accents
- Electric blue accents
- Soft sky-blue glow when needed

The background should feel deep, premium, and cinematic.

Use cyan and electric blue as controlled accent colors for:

- Important text highlights
- Buttons
- Hover states
- Active navigation states
- Glows
- Small decorative UI details
- Interface lines and corner marks

Avoid:

- AI-generated purple tones
- Random colors
- Excessive gradients
- Strong neon overload
- Yellow/black reference styling unless explicitly requested

Do not introduce new accent colors unless explicitly approved.

---

## Background Style

The background should use a cinematic technical interface style.

Preferred background elements:

- Dark navy / near-black base
- Subtle grid lines
- Soft cyan/blue glow spots
- Controlled gradients
- Atmospheric depth
- Optional slow glow movement
- Noisy or layered texture only if subtle

The background may react to mouse movement or include animated glow spots, but the interaction must stay:

- Smooth
- Premium
- Slow
- Subtle
- Performance-friendly

Avoid flat, lifeless backgrounds, but also avoid excessive visual noise.

---

## Interface Frame Language

The project may use thin interface-style frame details inspired by the current Navbar/Menu preview card and IntroGate direction.

Allowed details:

- Thin borders
- Corner marks
- Subtle inner frames
- Fine divider lines
- Small technical labels
- Minimal code-like fragments
- Low-opacity grid overlays

These details should support the cinematic interface mood without making the UI look cluttered.

Avoid heavy boxes, unnecessary borders, or decorative frames that distract from content.

---

## Glow Rules

Glow effects are allowed at a medium and controlled level.

Use glow to create depth, focus, and atmosphere.

Glow should feel:

- Soft
- Premium
- Smooth
- Intentional
- Cinematic

Use cyan/electric-blue glow only unless a new color is approved.

Avoid:

- Strong neon effects
- Excessive blur
- Multi-color glow combinations
- Childish game-like effects
- Glow that competes with content readability

---

## Typography

Typography should support the current cinematic command-interface identity.

Approved typography direction:

- `AFIF.GH` wordmark uses Audiowide only.
- Large menu links use Bruno Ace SC.
- Section numbers use `"Osiris", system-ui, sans-serif`.
- Body text and descriptions use the existing clean sans-serif.
- MENU / CLOSE labels may use the approved display style already used in the navbar/menu.
- Do not use Audiowide for menu links or descriptions.
- Do not use Osiris for the wordmark, large menu links, body text, descriptions, MENU, or CLOSE labels.

Headings can vary depending on the section:

- Hero / intro headings may be large, cinematic, and expressive.
- Section headings should be clean, balanced, and readable.
- Body text should stay readable and professional.

Avoid:

- AI-generated looking fonts
- Random font mixing
- Decorative fonts that reduce readability
- Overly playful typography
- Using too many display fonts in one area

If a new font is needed, ask for approval before adding it.

---

## Intro / Command Gate Direction

The portfolio may include an IntroGate / Command Gate screen before the main site.

Approved intro direction:

- Command Gate + Loading Experience
- Shows `AFIF.GH`
- Shows `CREATIVE FRONT-END DEVELOPER`
- Shows `Code is not just built. It is crafted.`
- Shows `INITIALIZING INTERFACE...`
- Shows a loading progress experience
- Shows `SYSTEM READY`
- Reveals CTA: `UNLOCK THE EXPERIENCE →`

The intro should feel:

- Cinematic
- Premium
- Technical
- Clean
- Short
- Not annoying

The enter transition may use a vertical screen-opening effect:

- Intro content fades slightly.
- A subtle horizontal glow line appears.
- Top panel slides upward.
- Bottom panel slides downward.
- Main portfolio becomes usable after the transition.

Do not use long loading delays or block the user unnecessarily.

Session-based hiding can be added later only if requested.

---

## Navbar / Menu Direction

The current navbar/menu direction is a custom cinematic navigation experience, not a strict Figma navbar.

Closed navbar:

- Should not use a large pill-shaped outer container.
- Should feel like lightweight floating elements.
- `AFIF.GH` and the MENU button should feel independent.
- No heavy enclosing frame around the whole navbar.
- Small interactive elements may still use blur, border, glow, and rounded shapes when appropriate.
- Keep the layout clean, minimal, and readable.

Open menu:

- Fullscreen cinematic split navigation menu on desktop.
- Left side contains large numbered navigation links.
- Right side contains an interactive preview card.
- Mobile should use a simplified links-only menu when needed.
- Hover/focus may update preview content.
- Animations should be sharp, premium, and controlled.

Avoid:

- Generic hamburger menu feel
- Heavy floating pill navbar
- Random visual experiments that break the approved style
- Overcomplicated interaction logic

---

## Custom Cursor Rules

A custom cursor is allowed as part of the cinematic interface identity.

Cursor direction:

- Default: small cyan/electric-blue glowing dot.
- Interactive elements: subtle ring/glow state.
- Display-only text may use a vertical text-caret cursor if explicitly marked.
- Disable custom cursor on mobile/touch devices.

Cursor behavior rules:

- Clickable/interactive elements must use the interactive cursor style.
- Clickable elements must not use the text caret cursor, even if they contain text.
- Display-only text can use `data-cursor="text"` when manually chosen.
- Do not apply text cursor mode globally to all text.
- Do not apply text cursor mode to navbar/menu links unless explicitly requested.

Avoid:

- Distracting trailing effects
- Particle cursor effects
- Text inside cursor
- Too many cursor modes
- Cursor behavior that hurts usability

---

## Text Selection

Text selection should match the dark navy/cyan theme.

Recommended selection style:

- Cyan/electric-blue selection background with controlled opacity.
- Readable selected text color.
- Premium and not too bright.

Use global `::selection` and `::-moz-selection` styling when needed.

---
## Sound / UI Audio Rules

UI sound effects may be used as part of the cinematic command-interface experience.

Allowed sound types:

- Intro startup sound
- System ready sound
- Unlock / enter sound
- Click feedback
- Hover feedback
- Menu open / close feedback

Sound effects should feel:

- Premium
- Deep when appropriate
- Technical
- Subtle
- Short
- Non-intrusive

Sound rules:

- Keep volumes low by default.
- Avoid loud, harsh, arcade, alarm, or game-like sounds.
- Hover sounds must be very subtle and should use cooldown/throttle to avoid repetition.
- Sounds should never block the interface from loading.
- Audio files should be stored in `public/assets/sounds/`.
- Larger audio files should be optimized and should not be imported into the JavaScript bundle.
- The user should be able to mute/unmute UI sounds.
- Mute preference should use `sessionStorage` unless the user explicitly requests persistent storage.
- If autoplay is blocked by the browser, fail silently without breaking the site.

Do not add background music unless explicitly requested.

---

## Spacing

Use medium and comfortable spacing.

The layout should not feel cramped, but it should also avoid excessive empty space.

Spacing should support:

- Clear visual hierarchy
- Premium feeling
- Easy scanning
- Strong section separation
- Cinematic breathing room

Keep spacing consistent across sections.

---

## Layout Direction

Use a full-width cinematic layout.

Backgrounds and visual effects may extend across the full viewport width.

Content should remain organized and readable.

Use structured grids with cinematic touches.

The layout should feel:

- Organized
- Intentional
- Premium
- Dynamic
- Not random

Avoid layouts that feel too rigid, too generic, or overly chaotic.

---

## Component Style

### Cards

Cards should use dark navy surfaces with subtle borders and controlled glow.

Cards should feel:

- Premium
- Clean
- Modern
- Slightly dimensional
- Not flat, but not overly glowing

Use light borders, soft shadows, thin frame details, and subtle hover states to create depth.

Avoid overly bright glassmorphism or excessive transparency.

---

### Buttons

Buttons should feel premium and interactive.

Use subtle glow and hover effects when appropriate.

Button states should include:

- Default
- Hover
- Focus
- Active / pressed if needed

Primary actions may use cyan or electric-blue accents.

Secondary actions should stay minimal and clean.

Avoid overly large, childish, or aggressively glowing buttons.

---

### Project Cards

Project cards should feel like cinematic preview cards.

They may include:

- Image preview
- Subtle scale or lift on hover
- Border glow on hover
- Smooth transition
- Clear project title and short description
- Tech stack badges
- Interface-style details when appropriate

The hover effect should feel premium, not playful.

---

### Border Radius

Use medium border radius across the interface.

The design should feel modern and soft, but not overly rounded or childish.

Use consistent border radius values across cards, buttons, nav elements, and content blocks.

Large pill shapes should be used carefully and only for small controls where they fit the current direction.

---

## Animation Rules

Animations should feel cinematic, premium, and controlled.

Preferred animation direction:

- Cinematic reveal
- Smooth opacity transitions
- Subtle transform movement
- Soft blur or depth effects when appropriate
- Premium hover interactions
- Smooth card hover depth
- Sharp but elegant interface transitions

Avoid:

- Childish movement
- Bouncy animations
- Excessive motion
- Random floating elements
- Over-animated UI
- Distracting effects that compete with the content

Use Framer Motion as the main animation library.

Do not use GSAP or any other animation library unless explicitly requested later.

Use advanced cinematic motion only when the user requests it for a specific component or section.

Mouse-reactive behavior may be used only for:

- Background glow
- Hero atmospheric lighting
- Card hover depth
- Subtle gradient movement
- Decorative cinematic layers
- Cursor interactions

Mouse-reactive interactions should be subtle, smooth, and performance-friendly.

---

## Responsive Rules

Responsive design should preserve the current premium identity while keeping the experience fast and usable.

Use Figma mobile frames as reference only when they are useful and still match the approved current design direction.

Do not simply shrink desktop layouts.

Mobile implementation should be:

- Clean
- Readable
- Lightweight
- Easy to navigate
- Not overloaded with hover-only effects

It is allowed to reduce or disable heavy visual effects on mobile for performance.

Background glow, large cinematic effects, hover-only interactions, and complex animations may be simplified on mobile.

---

## Scroll Behavior

Use normal scrolling by default unless smooth scrolling is explicitly requested.

Smooth scrolling with Lenis may be added when approved.

When adding smooth scrolling:

- Do not use URL hashes for section navigation if the user requests clean URLs.
- Do not add GSAP or react-scroll for scrolling unless explicitly approved.
- Keep scrolling smooth but not exaggerated.
- Respect reduced-motion preferences when possible.
- Avoid heavy scroll-driven animations unless specifically requested.

Section reveal animations are allowed, but they should not make the page feel heavy or difficult to navigate.

---

## Reference Fidelity Rules

The project no longer follows strict Figma fidelity as the primary rule.

References and Figma should be treated as:

- Inspiration
- Visual guidance
- Layout or interaction ideas
- A source for useful details only when approved

Do not create exact copies of reference screenshots.

Do not revert the current approved custom design to older Figma layouts unless explicitly requested.

When implementing a new feature:

- Preserve the approved current style.
- Follow the user's latest direction.
- Ask before making large design changes.
- Suggest improvements before applying them unless the user directly requests the change.
- Keep code clean, responsive, and performant.

The goal is to build an original custom portfolio with a cinematic command-interface identity.
