import { motion } from "framer-motion";

function CloseMenuButton({ buttonRef, closeMenu }) {
  return (
    <motion.button
      ref={buttonRef}
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
  );
}

export default CloseMenuButton;
