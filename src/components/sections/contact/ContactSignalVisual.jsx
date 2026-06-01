import { motion } from "framer-motion";

const terminalLines = ["STATUS: OPEN", "READY FOR NEXT BUILD"];

const headerDots = [0, 1, 2];

const orbitNodes = [
  { left: "18%", top: "24%", sizeClass: "h-2 w-2" },
  { left: "48%", top: "14%", sizeClass: "h-1.5 w-1.5" },
  { left: "78%", top: "30%", sizeClass: "h-2 w-2" },
  { left: "82%", top: "66%", sizeClass: "h-1.5 w-1.5" },
  { left: "48%", top: "84%", sizeClass: "h-2 w-2" },
  { left: "24%", top: "68%", sizeClass: "h-1.5 w-1.5" },
];

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      delay: 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    x: -14,
  },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.42,
      delay: 0.72 + index * 0.16,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const loadingDotOpacity = [
  [1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0],
];

const loadingDotVariants = {
  active: (index) => ({
    opacity: loadingDotOpacity[index],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  }),
};

const headerDotVariants = {
  active: (index) => ({
    opacity: [0.2, 0.82, 0.2],
    transition: {
      duration: 2.1,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.26,
    },
  }),
};

const orbitNodeTimes = [
  0, 0.0625, 0.1667, 0.2292, 0.3333, 0.3958, 0.5, 0.5625, 0.6667, 0.7292,
  0.8333, 0.8958, 1,
];

const orbitNodeOpacityTracks = [
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
];

const orbitNodeVariants = {
  active: (index) => ({
    opacity: orbitNodeOpacityTracks[index],
    transition: {
      duration: 9.6,
      repeat: Infinity,
      ease: "easeInOut",
      times: orbitNodeTimes,
    },
  }),
};

function ContactSignalVisual({ isVisible }) {
  return (
    <motion.div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-148"
      variants={panelVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div className="relative min-h-104 overflow-hidden border border-cyan-100/14 bg-[#06101f]/48 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42),0_0_55px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl sm:min-h-120 sm:p-7">
        <div className="pointer-events-none absolute inset-5 border border-cyan-100/8" />
        <div className="pointer-events-none absolute left-5 top-5 h-12 w-12 border-l border-t border-cyan-200/34 sm:left-7 sm:top-7" />
        <div className="pointer-events-none absolute bottom-5 right-5 h-12 w-12 border-b border-r border-cyan-200/34 sm:bottom-7 sm:right-7" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:32px_32px] opacity-45" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/8 blur-3xl" />

        <div className="relative flex min-h-64 items-center justify-center pt-8 sm:min-h-76">
          <motion.span
            className="absolute h-52 w-52 rounded-full border border-cyan-100/10 sm:h-64 sm:w-64"
            animate={
              isVisible
                ? {
                    opacity: [0.25, 0.55, 0.25],
                    scale: [0.94, 1.02, 0.94],
                  }
                : { opacity: 0.2, scale: 0.94 }
            }
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.span
            className="absolute h-36 w-36 rounded-full border border-cyan-100/16 sm:h-44 sm:w-44"
            animate={
              isVisible
                ? {
                    opacity: [0.38, 0.72, 0.38],
                    scale: [0.96, 1.04, 0.96],
                  }
                : { opacity: 0.24, scale: 0.96 }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="absolute h-px w-[78%] bg-linear-to-r from-transparent via-cyan-100/35 to-transparent" />
          <div className="absolute h-[74%] w-px bg-linear-to-b from-transparent via-cyan-100/28 to-transparent" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-100/28 bg-cyan-100/[0.035] shadow-[0_0_32px_rgba(34,211,238,0.18),inset_0_0_28px_rgba(34,211,238,0.06)] sm:h-34 sm:w-34">
            <motion.span
              className="absolute h-16 w-16 rounded-full border border-cyan-100/24"
              animate={
                isVisible
                  ? {
                      rotate: 360,
                    }
                  : { rotate: 0 }
              }
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="h-3 w-3 rounded-full bg-cyan-50 shadow-[0_0_18px_rgba(207,250,254,0.9),0_0_34px_rgba(34,211,238,0.45)]" />
          </div>

          {orbitNodes.map((node, index) => (
            <motion.span
              key={`${node.left}-${node.top}`}
              aria-hidden="true"
              custom={index}
              variants={orbitNodeVariants}
              animate={isVisible ? "active" : false}
              className={`absolute rounded-full bg-cyan-100 shadow-[0_0_14px_rgba(34,211,238,0.42)] ${node.sizeClass}`}
              style={{ left: node.left, top: node.top }}
            />
          ))}
        </div>

        <div className="relative mt-4 border border-cyan-100/12 bg-[#020817]/52 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            {headerDots.map((dotIndex) => (
              <motion.span
                key={dotIndex}
                aria-hidden="true"
                custom={dotIndex}
                variants={headerDotVariants}
                animate={isVisible ? "active" : false}
                className="h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_9px_rgba(34,211,238,0.32)]"
              />
            ))}
          </div>
          <div className="font-oxanium space-y-2 text-[11px] font-medium uppercase tracking-[0.17em] text-cyan-50/78 sm:text-xs">
            <motion.p
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              INITIALIZING CONTACT CHANNEL
              <span className="inline-flex w-[1.35em] justify-start">
                {[0, 1, 2].map((dotIndex) => (
                  <motion.span
                    key={dotIndex}
                    custom={dotIndex}
                    variants={loadingDotVariants}
                    animate={isVisible ? "active" : false}
                  >
                    .
                  </motion.span>
                ))}
              </span>
            </motion.p>
            {terminalLines.map((line, index) => (
              <motion.p
                key={line}
                custom={index + 1}
                variants={lineVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactSignalVisual;
