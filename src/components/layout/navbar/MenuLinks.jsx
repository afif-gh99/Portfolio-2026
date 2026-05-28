import { motion } from "framer-motion";

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

function MenuLinks({
  navigationLinks,
  activeItem,
  setActiveItem,
  handleSectionClick,
}) {
  return (
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
  );
}

export default MenuLinks;
