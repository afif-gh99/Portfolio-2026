export const sectionKeys = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
];

const navbarOffset = 96;
const sectionRegistry = new Map();

let smoothScroller = null;

export function setSmoothScroller(scroller) {
  smoothScroller = scroller;
}

export function getSmoothScroller() {
  return smoothScroller;
}

export function registerSection(sectionKey, element) {
  if (!sectionKeys.includes(sectionKey)) {
    return;
  }

  if (element) {
    sectionRegistry.set(sectionKey, element);
    return;
  }

  sectionRegistry.delete(sectionKey);
}

export function scrollToSection(sectionKey) {
  const sectionElement =
    sectionRegistry.get(sectionKey) ||
    document.querySelector(`[data-section="${sectionKey}"]`);

  if (!sectionElement) {
    return;
  }

  if (smoothScroller?.scrollTo) {
    smoothScroller.scrollTo(sectionElement, {
      offset: -navbarOffset,
    });
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    top:
      sectionElement.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}
