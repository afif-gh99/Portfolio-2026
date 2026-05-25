import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigationLinks } from "../../data/navigation.js";
import {
  getSmoothScroller,
  scrollToSection,
} from "../../lib/sectionNavigation.js";
import {
  isSoundMuted as getIsSoundMuted,
  setSoundMuted,
} from "../../lib/soundPreferences.js";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] },
  },
};

const navPanelVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
    transition: { duration: 0.18, ease: [0.7, 0, 0.84, 0] },
  },
};

const previewFrameVariants = {
  hidden: { opacity: 0, x: 96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: 48,
    filter: "blur(6px)",
    transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] },
  },
};

const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

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

const previewMotion = {
  number: {
    initial: { opacity: 0, y: -28, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -12, filter: "blur(4px)" },
    transition: { duration: 0.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  title: {
    initial: { opacity: 0, x: -32, filter: "blur(7px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -16, filter: "blur(4px)" },
    transition: { duration: 0.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  description: {
    initial: { opacity: 0, x: -24, filter: "blur(7px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -12, filter: "blur(4px)" },
    transition: { duration: 0.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

function SoundOnIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16 9.5a4 4 0 0 1 0 5" />
      <path d="M18.5 7a7.5 7.5 0 0 1 0 10" />
    </svg>
  );
}

function SoundMutedIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="m17 10 4 4" />
      <path d="m21 10-4 4" />
    </svg>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(navigationLinks[0]);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(() => getIsSoundMuted());
  const activeDigit = activeItem.number.slice(-1);

  const openMenu = () => {
    setActiveItem(navigationLinks[0]);
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] overflow-hidden bg-[#020817]/78 backdrop-blur-[6px]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-[-18%] top-[-20%] h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="absolute bottom-[-18%] right-[-12%] h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />
            </div>

            <div className="relative flex min-h-dvh flex-col px-5 py-5 sm:px-8 sm:py-7">
              <div className="flex items-center justify-end">
                <motion.button
                  type="button"
                  aria-label="Close navigation menu"
                  data-sound="click"
                  data-sound-hover="hover"
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{
                    duration: 0.1,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex min-h-11 items-center gap-3 rounded-[18px] border border-cyan-200/14 bg-cyan-100/4 px-4 text-slate-100 outline-none transition duration-300 hover:border-cyan-200/35 hover:bg-cyan-100/8 focus-visible:ring-2 focus-visible:ring-cyan-200/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817]"
                >
                  <span className="font-bruno text-[11px] leading-none text-slate-200 transition-colors duration-300 group-hover:text-cyan-100">
                    CLOSE
                  </span>
                  <span className="relative h-5 w-5" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-cyan-100/80" />
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-cyan-100/80" />
                  </span>
                </motion.button>
              </div>

              <div className="grid flex-1 items-top gap-10 py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:gap-14 lg:pt-6">
                <motion.nav
                  aria-label="Main navigation"
                  className="relative"
                  variants={navPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.ul
                    className="flex flex-col gap-2 sm:gap-3"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {navigationLinks.map((link) => {
                      const isActive = activeItem.label === link.label;

                      return (
                        <motion.li key={link.label} variants={linkVariants}>
                          <button
                            data-sound="click"
                            data-sound-hover="hover"
                            type="button"
                            onClick={() => handleSectionClick(link.sectionKey)}
                            onFocus={() => setActiveItem(link)}
                            onMouseEnter={() => setActiveItem(link)}
                            className={`group relative flex min-h-16 w-full items-center gap-4 border-0 border-b bg-transparent py-3 text-left outline-none transition duration-300 before:absolute before:bottom-0 before:left-0 before:h-px before:bg-cyan-300 before:shadow-[0_0_18px_rgba(34,211,238,0.6)] before:transition-all before:duration-300 focus-visible:border-cyan-200/60 sm:min-h-20 sm:gap-6 ${
                              isActive
                                ? "border-cyan-300/55 text-cyan-100 before:w-24"
                                : "border-cyan-100/10 text-slate-100 before:w-0 hover:border-cyan-200/38 hover:text-cyan-100 hover:before:w-14"
                            }`}
                          >
                            <span
                              className={`font-osiris w-9 shrink-0 text-xs transition-colors duration-300 sm:w-12 ${
                                isActive
                                  ? "text-cyan-100"
                                  : "text-cyan-200/55 group-hover:text-cyan-100/90"
                              }`}
                            >
                              {link.number}
                            </span>
                            <span
                              className={`font-bruno text-[clamp(2rem,9vw,2.6rem)] leading-none transition duration-300 sm:text-[clamp(2rem,8vw,4rem)] lg:text-[clamp(2.35rem,4.5vw,4.25rem)] ${
                                isActive
                                  ? "drop-shadow-[0_0_26px_rgba(34,211,238,0.28)]"
                                  : "group-hover:drop-shadow-[0_0_18px_rgba(34,211,238,0.18)]"
                              }`}
                            >
                              {link.label}
                            </span>
                          </button>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </motion.nav>

                <motion.aside
                  className="relative hidden h-[40rem] overflow-hidden rounded-[28px] border border-cyan-100/12 bg-[#06101f]/58 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45),0_0_55px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl lg:flex lg:flex-col lg:justify-end"
                  variants={previewFrameVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  aria-live="polite"
                >
                  <div className="pointer-events-none absolute inset-6 border border-cyan-100/10" />
                  <div className="pointer-events-none absolute left-8 top-8 h-12 w-12 border-l border-t border-cyan-200/35" />
                  <div className="pointer-events-none absolute bottom-8 right-8 h-12 w-12 border-b border-r border-cyan-200/35" />
                  <div className="pointer-events-none absolute right-8 top-10 font-mono text-[11px] uppercase leading-6 text-cyan-100/35">
                    <span className="block">const section = active</span>
                    <span className="block">motion.preview()</span>
                  </div>

                  <span className="font-osiris pointer-events-none absolute bottom-25 right-11 z-0 flex h-[1em] items-start text-[13rem] leading-none text-cyan-100/[0.035]">
                    <span className="relative block h-[1em] w-[0.7em] overflow-hidden">
                      <span className="absolute -left-3 top-6 block leading-none">
                        0
                      </span>
                    </span>
                    <span className="relative block h-[1em] w-[0.62em] translate-y-[0.13em] overflow-hidden">
                      <AnimatePresence initial={false}>
                        <motion.span
                          key={activeDigit}
                          className="absolute left-0 top-0 block leading-none"
                          initial={{ opacity: 0, y: -38 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 38 }}
                          transition={{
                            duration: 0.22,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {activeDigit}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.label}
                      className="relative z-10 pl-5 pb-5"
                    >
                      <motion.p
                        className="font-osiris mb-6 text-sm text-cyan-100/65"
                        {...previewMotion.number}
                      >
                        {activeItem.number} / 06
                      </motion.p>
                      <motion.h2
                        data-cursor="text"
                        className="font-osiris max-w-fit text-6xl leading-none text-slate-50"
                        {...previewMotion.title}
                      >
                        {activeItem.label}
                      </motion.h2>
                      <motion.p
                        className="mt-6 font-osiris max-w-md text-sm leading-8 text-slate-300/78"
                        {...previewMotion.description}
                      >
                        {activeItem.description}
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                </motion.aside>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
