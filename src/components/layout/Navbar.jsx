import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navigationLinks } from "../../data/navigation.js";
import {
  getCurrentSectionKey,
  getSmoothScroller,
  scrollToSection,
} from "../../lib/sectionNavigation.js";
import {
  isSoundMuted as getIsSoundMuted,
  setSoundMuted,
} from "../../lib/soundPreferences.js";
import MenuOverlay from "./navbar/MenuOverlay.jsx";
import { SoundMutedIcon, SoundOnIcon } from "./navbar/SoundIcons.jsx";

const closedNavbarVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
  },
  hidden: {
    opacity: 0,
    y: "-120%",
    transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] },
  },
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(navigationLinks[0]);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(() => getIsSoundMuted());
  const activeDigit = activeItem.number.slice(-1);

  const openMenu = () => {
    const currentSectionKey = getCurrentSectionKey();
    const currentNavigationItem =
      navigationLinks.find((link) => link.sectionKey === currentSectionKey) ||
      navigationLinks[0];

    setActiveItem(currentNavigationItem);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSectionClick = (sectionKey) => {
    closeMenu();
    requestAnimationFrame(() => {
      scrollToSection(sectionKey);
    });
  };

  const handleBrandClick = () => {
    scrollToSection("home");
  };

  const handleSoundToggle = () => {
    const nextMutedState = !isSoundMuted;
    setIsSoundMuted(nextMutedState);
    setSoundMuted(nextMutedState);
  };

  useEffect(() => {
    const rootElement = document.documentElement;
    const bodyElement = document.body;
    const smoothScroller = getSmoothScroller();
    const previousRootOverflow = rootElement.style.overflow;
    const previousBodyOverflow = bodyElement.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      rootElement.classList.add("overflow-y-hidden");
      bodyElement.classList.add("overflow-y-hidden");
      rootElement.style.overflow = "hidden";
      bodyElement.style.overflow = "hidden";
      smoothScroller?.stop?.();
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      rootElement.classList.remove("overflow-y-hidden");
      bodyElement.classList.remove("overflow-y-hidden");
      rootElement.style.overflow = previousRootOverflow;
      bodyElement.style.overflow = previousBodyOverflow;
      smoothScroller?.start?.();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const scrollThreshold = 10;
    const topOffset = 24;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - previousScrollY;

      if (currentScrollY <= topOffset || isMenuOpen) {
        setIsNavbarHidden(false);
        previousScrollY = currentScrollY;
        return;
      }

      if (Math.abs(scrollDifference) < scrollThreshold) {
        return;
      }

      setIsNavbarHidden(scrollDifference > 0);
      previousScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed left-0 top-5 z-50 flex w-full justify-center px-5 sm:top-8 sm:px-8">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-32 bg-[linear-gradient(180deg,rgba(2,8,23,0.88)_0%,rgba(2,8,23,0.45)_48%,rgba(2,8,23,0)_100%)] sm:h-36"
        variants={closedNavbarVariants}
        initial={false}
        animate={isNavbarHidden ? "hidden" : "visible"}
      />
      <motion.nav
        className="relative z-10 flex h-14 w-full max-w-6xl items-center justify-between sm:h-16"
        variants={closedNavbarVariants}
        initial={false}
        animate={isNavbarHidden ? "hidden" : "visible"}
      >
        <button
          type="button"
          onClick={handleBrandClick}
          className="font-audiowide border-0 bg-transparent p-0 text-[14px] text-slate-100 drop-shadow-[0_0_18px_rgba(34,211,238,0.2)] outline-none transition-colors duration-300 hover:text-cyan-100 focus-visible:text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-200/45 focus-visible:ring-offset-4 focus-visible:ring-offset-[#020817] sm:text-[26px]"
        >
          AFIF.GH
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={isSoundMuted ? "Enable sound" : "Mute sound"}
            aria-pressed={isSoundMuted}
            data-sound={isSoundMuted ? undefined : "click"}
            onClick={handleSoundToggle}
            className="group flex h-11 w-11 items-center justify-center rounded-[18px] border border-cyan-200/18 bg-[#06101f]/44 text-slate-200 shadow-[0_12px_44px_rgba(0,0,0,0.28),0_0_24px_rgba(34,211,238,0.08)] outline-none backdrop-blur-md transition duration-300 hover:border-cyan-200/55 hover:bg-cyan-100/9 hover:text-cyan-100 hover:shadow-[0_14px_50px_rgba(0,0,0,0.32),0_0_30px_rgba(34,211,238,0.2)] focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817]"
          >
            {isSoundMuted ? <SoundMutedIcon /> : <SoundOnIcon />}
          </button>

          <button
            type="button"
            aria-controls="site-menu"
            aria-expanded={isMenuOpen}
            aria-label="Open navigation menu"
            data-sound="click"
            data-sound-hover="hover"
            onClick={openMenu}
            className="group flex min-h-11 items-center gap-3 rounded-[18px] border border-cyan-200/18 bg-[#06101f]/44 px-4 text-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.28),0_0_24px_rgba(34,211,238,0.08)] outline-none backdrop-blur-md transition duration-300 hover:border-cyan-200/55 hover:bg-cyan-100/9 hover:shadow-[0_14px_50px_rgba(0,0,0,0.32),0_0_30px_rgba(34,211,238,0.2)] focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817]"
          >
            <span className="font-bruno text-[11px] leading-none text-slate-200 transition-colors duration-300 group-hover:text-cyan-100">
              MENU
            </span>
            <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
              <span className="h-px w-full bg-cyan-100/85 transition-transform duration-300 group-hover:translate-x-0.5" />
              <span className="h-px w-4 bg-cyan-100/65 transition-all duration-300 group-hover:w-full" />
            </span>
          </button>
        </div>
      </motion.nav>

      <MenuOverlay
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        navigationLinks={navigationLinks}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        activeDigit={activeDigit}
        handleSectionClick={handleSectionClick}
      />
    </header>
  );
}

export default Navbar;
