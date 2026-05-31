export const sectionKeys = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
];

const navbarOffset = 96;
export const activeSectionViewportRatio = 0.52;
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

export function getSectionElement(sectionKey) {
  if (!sectionKeys.includes(sectionKey)) {
    return null;
  }

  return (
    sectionRegistry.get(sectionKey) ||
    document.querySelector(`[data-section="${sectionKey}"]`)
  );
}

export function scrollToSection(sectionKey) {
  const sectionElement = getSectionElement(sectionKey);

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
  if (typeof window === "undefined") {
    return sectionKeys[0];
  }

  const sectionEntries = sectionKeys
    .map((sectionKey) => [sectionKey, getSectionElement(sectionKey)])
    .filter(([, element]) => element);

  if (sectionEntries.length === 0) {
    return sectionKeys[0];
  }

  const measurementY = window.innerHeight * activeSectionViewportRatio;
  const measuredSections = sectionEntries.map(([sectionKey, element]) => {
    const rect = element.getBoundingClientRect();

    return {
      sectionKey,
      top: rect.top,
      hasMeasurementPoint:
        sectionKey !== "home" && rect.top <= measurementY && rect.bottom > measurementY,
      hasEntered:
        sectionKey !== "home" && rect.top <= measurementY && rect.bottom > 0,
    };
  });

  const currentSection = measuredSections.find(
    (section) => section.hasMeasurementPoint,
  );

  if (currentSection) {
    return currentSection.sectionKey;
  }

  const enteredSections = measuredSections.filter((section) => section.hasEntered);
  const closestSection = enteredSections.sort((firstSection, secondSection) => {
    return secondSection.top - firstSection.top;
  })[0];

  return closestSection?.sectionKey || sectionKeys[0];
}
