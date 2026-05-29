import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { navigationLinks } from "../../data/navigation.js";
import {
  getCurrentSectionKey,
  getSectionElement,
  scrollToSection,
} from "../../lib/sectionNavigation.js";

const railHeight = 288;
const endpointSize = 16;

function getAvailableSectionKeys() {
  return navigationLinks
    .filter((link) => getSectionElement(link.sectionKey))
    .map((link) => link.sectionKey);
}

function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });
  const endpointY = useTransform(
    smoothProgress,
    [0, 1],
    [-endpointSize / 2, railHeight - endpointSize / 2],
  );

  const [activeSectionKey, setActiveSectionKey] = useState(() =>
    getCurrentSectionKey(),
  );
  const [availableSectionKeys, setAvailableSectionKeys] = useState(() =>
    getAvailableSectionKeys(),
  );

  useEffect(() => {
    let animationFrameId = null;

    const updateIndicatorState = () => {
      animationFrameId = null;
      const nextActiveSectionKey = getCurrentSectionKey();
      const nextAvailableSectionKeys = getAvailableSectionKeys();

      setActiveSectionKey((currentSectionKey) =>
        currentSectionKey === nextActiveSectionKey
          ? currentSectionKey
          : nextActiveSectionKey,
      );
      setAvailableSectionKeys((currentSectionKeys) => {
        const currentKeyList = currentSectionKeys.join("|");
        const nextKeyList = nextAvailableSectionKeys.join("|");

        return currentKeyList === nextKeyList
          ? currentSectionKeys
          : nextAvailableSectionKeys;
      });
    };

    const queueIndicatorUpdate = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = requestAnimationFrame(updateIndicatorState);
    };

    queueIndicatorUpdate();
    window.addEventListener("scroll", queueIndicatorUpdate, { passive: true });
    window.addEventListener("resize", queueIndicatorUpdate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", queueIndicatorUpdate);
      window.removeEventListener("resize", queueIndicatorUpdate);
    };
  }, []);

  return (
    <nav
      aria-label="Section scroll progress"
      className="pointer-events-none fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 items-center lg:flex xl:-right-8"
    >
      <div className="relative h-72 w-24">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-5 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-100/38 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.14)]"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-cyan-100/24"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-px w-5 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.1)]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-cyan-100/18"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-100/12 shadow-[0_0_18px_rgba(34,211,238,0.08)]"
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-cyan-100/80 shadow-[0_0_12px_rgba(34,211,238,0.32),0_0_28px_rgba(14,165,233,0.16)]"
          style={{ scaleY: smoothProgress }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-0 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-100/55 bg-cyan-200/10 shadow-[0_0_16px_rgba(34,211,238,0.42),0_0_28px_rgba(14,165,233,0.18)] will-change-transform"
          style={{ x: "-50%", y: endpointY }}
        >
          <span className="absolute h-6 w-px rounded-full bg-cyan-50/35 shadow-[0_0_10px_rgba(34,211,238,0.32)]" />
          <span className="absolute h-2.5 w-2.5 rounded-full border border-cyan-100/35 bg-[#06101f]/85" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-50 shadow-[0_0_12px_rgba(207,250,254,0.9),0_0_20px_rgba(34,211,238,0.42)]" />
        </motion.div>

        {navigationLinks.map((link, index) => {
          const isActive = activeSectionKey === link.sectionKey;
          const isAvailable = availableSectionKeys.includes(link.sectionKey);
          const markerPosition =
            navigationLinks.length === 1
              ? 0
              : (index / (navigationLinks.length - 1)) * 100;

          return (
            <button
              aria-current={isActive ? "location" : undefined}
              aria-disabled={!isAvailable}
              aria-label={
                isAvailable
                  ? `Scroll to ${link.label}`
                  : `${link.label} section unavailable`
              }
              className={`group absolute left-1/2 flex h-10 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] ${
                isAvailable
                  ? "pointer-events-auto"
                  : "pointer-events-none cursor-default"
              }`}
              data-cursor={isAvailable ? "interactive" : undefined}
              disabled={!isAvailable}
              key={link.sectionKey}
              onClick={() => scrollToSection(link.sectionKey)}
              style={{ top: `${markerPosition}%` }}
              type="button"
            >
              <span
                aria-hidden="true"
                className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border transition duration-300 ${
                  isActive
                    ? "border-cyan-50/62 bg-cyan-200/5 shadow-[0_0_7px_rgba(34,211,238,0.16),inset_0_0_5px_rgba(34,211,238,0.08)] after:h-1 after:w-1 after:rounded-full after:bg-cyan-100/70 after:shadow-[0_0_5px_rgba(207,250,254,0.28)]"
                    : isAvailable
                      ? "border-cyan-100/28 bg-[#06101f]/80 shadow-[0_0_10px_rgba(34,211,238,0.05)] after:h-1 after:w-1 after:rounded-full after:bg-cyan-100/18 group-hover:border-cyan-100/68 group-hover:bg-cyan-200/8 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.24)] group-hover:after:bg-cyan-50/70"
                      : "border-cyan-100/12 bg-[#06101f]/30 after:h-1 after:w-1 after:rounded-full after:bg-cyan-100/8"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute right-[2.45rem] h-px w-5 bg-gradient-to-r from-cyan-100/45 to-transparent transition duration-300 ${
                  isActive
                    ? "opacity-55"
                    : "opacity-0 group-hover:opacity-55 group-focus-visible:opacity-55"
                }`}
              />
              <span
                className={`font-oxanium absolute right-[3.75rem] flex min-w-[4.5rem] items-center justify-center whitespace-nowrap rounded-md border border-cyan-100/18 bg-[#04101f]/82 px-2.5 py-1.5 text-[10px] font-medium uppercase leading-none text-cyan-50/86 shadow-[0_8px_22px_rgba(0,0,0,0.3),0_0_15px_rgba(34,211,238,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition duration-300 ${
                  isActive
                    ? "translate-x-0 opacity-100 ring-1 ring-cyan-100/10"
                    : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                }`}
              >
                {link.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default ScrollIndicator;
