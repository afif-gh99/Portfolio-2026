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

  window.scrollTo({
    top:
      sectionElement.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset,
    behavior: "smooth",
  });
}

export function getCurrentSectionKey() {
  const registeredSections = Array.from(sectionRegistry.entries());
  const dataSections = sectionKeys
    .map((sectionKey) => [
      sectionKey,
      document.querySelector(`[data-section="${sectionKey}"]`),
    ])
    .filter(([, element]) => element);
  const sectionEntries = [...registeredSections, ...dataSections];

  if (sectionEntries.length === 0) {
    return sectionKeys[0];
  }

  const measuredSections = sectionEntries.map(([sectionKey, element]) => {
    const rect = element.getBoundingClientRect();

    return {
      sectionKey,
      distance: Math.abs(rect.top - navbarOffset),
      isVisible: rect.bottom > navbarOffset && rect.top < window.innerHeight,
    };
  });

  const visibleSections = measuredSections.filter((section) => section.isVisible);
  const closestSection = (visibleSections.length > 0
    ? visibleSections
    : measuredSections
  ).sort((firstSection, secondSection) => {
    return firstSection.distance - secondSection.distance;
  })[0];

  return closestSection?.sectionKey || sectionKeys[0];
}
