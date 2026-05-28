import { AnimatePresence, motion } from "framer-motion";

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

function MenuPreview({ activeItem, activeDigit }) {
  return (
    <motion.aside
      className="relative hidden h-160 overflow-hidden rounded-[28px] border border-cyan-100/12 bg-[#06101f]/58 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45),0_0_55px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl lg:flex lg:flex-col lg:justify-end"
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
          <span className="absolute -left-3 top-6 block leading-none">0</span>
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
        <motion.div key={activeItem.label} className="relative z-10 pl-5 pb-5">
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
  );
}

export default MenuPreview;
