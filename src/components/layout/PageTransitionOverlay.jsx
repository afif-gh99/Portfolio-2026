import { AnimatePresence, motion } from "framer-motion";

const cinematicEase = [0.16, 1, 0.3, 1];

function TransitionPanelDetails({ position }) {
  const glowPosition =
    position === "top"
      ? "bg-[radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.14),transparent_42%)]"
      : "bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_42%)]";

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#031225_0%,#020817_52%,#041226_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.04)_1px,transparent_1px)] bg-size-[44px_44px]" />
      <div className={`absolute inset-0 ${glowPosition}`} />
      <div className="absolute inset-5 border border-cyan-100/9" />
      <div className="absolute left-6 top-6 h-10 w-10 border-l border-t border-cyan-200/28" />
      <div className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-cyan-200/28" />
    </>
  );
}

function PageTransitionOverlay({ phase }) {
  const isActive = phase !== "idle";
  const isClosing = phase === "closing";

  return (
    <AnimatePresence>
      {isActive ? (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-997 overflow-hidden bg-[#020817] text-slate-100"
          exit={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.16, ease: cinematicEase }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#020817]"
            initial={{ y: "-104%" }}
            animate={{ y: isClosing ? "0%" : "-104%" }}
            transition={{
              duration: isClosing ? 0.62 : 0.94,
              ease: cinematicEase,
            }}
          >
            <TransitionPanelDetails position="top" />
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#020817]"
            initial={{ y: "104%" }}
            animate={{ y: isClosing ? "0%" : "104%" }}
            transition={{
              duration: isClosing ? 0.62 : 0.94,
              ease: cinematicEase,
            }}
          >
            <TransitionPanelDetails position="bottom" />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-200/60 shadow-[0_0_22px_rgba(34,211,238,0.78),0_0_70px_rgba(56,189,248,0.32)]"
            initial={{ opacity: 0, scaleX: 0.42 }}
            animate={{
              opacity: isClosing ? [0, 1, 0.7] : [0.7, 1, 0],
              scaleX: isClosing ? [0.42, 1, 1] : [1, 1, 0.5],
            }}
            transition={{
              duration: isClosing ? 0.62 : 0.94,
              ease: cinematicEase,
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default PageTransitionOverlay;
