import { AnimatePresence, motion } from "framer-motion";
import CloseMenuButton from "./CloseMenuButton.jsx";
import MenuLinks from "./MenuLinks.jsx";
import MenuPreview from "./MenuPreview.jsx";

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

function MenuOverlay({
  isMenuOpen,
  closeMenu,
  navigationLinks,
  activeItem,
  setActiveItem,
  activeDigit,
  handleSectionClick,
  handleArchiveClick,
  isArchiveOpen,
  isPageTransitioning,
}) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-60 overflow-hidden bg-[#020817]/78 backdrop-blur-[6px]"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-18%] top-[-20%] h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="absolute bottom-[-18%] right-[-12%] h-112 w-md rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.035)_1px,transparent_1px)] bg-size-[42px_42px]" />
          </div>

          <div className="relative flex min-h-dvh flex-col px-5 py-5 sm:px-8 sm:py-7">
            <div className="flex items-center justify-end">
              <CloseMenuButton closeMenu={closeMenu} />
            </div>

            <div className="grid flex-1 items-top gap-10 py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:gap-14 lg:pt-6">
              <MenuLinks
                navigationLinks={navigationLinks}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                handleSectionClick={handleSectionClick}
              />
              <MenuPreview
                activeItem={activeItem}
                activeDigit={activeDigit}
                handleArchiveClick={handleArchiveClick}
                isArchiveOpen={isArchiveOpen}
                isPageTransitioning={isPageTransitioning}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MenuOverlay;
