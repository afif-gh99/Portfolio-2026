import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easing = [0.16, 1, 0.3, 1];

const openingLines = [
  "EXCELLENCE STARTS",
  "WITH ONE STEP.",
  "OBSESSION TURNS IT",
  "INTO A PATH.",
];

const openingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const openingLineVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.88,
      ease: easing,
    },
  },
};

function ExperienceOpening() {
  const openingRef = useRef(null);
  const isOpeningInView = useInView(openingRef, {
    amount: 0.58,
    margin: "-8% 0px -8% 0px",
  });

  return (
    <section
      ref={openingRef}
      className="relative flex min-h-[70dvh] items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-8 lg:min-h-[85dvh]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/9 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-linear-to-r from-transparent via-cyan-100/18 to-transparent"
      />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl"
        variants={openingContainerVariants}
        initial="hidden"
        animate={isOpeningInView ? "visible" : "hidden"}
      >
        <motion.div
          className="mb-6 flex items-center justify-center gap-4"
          variants={openingLineVariants}
        >
          <span
            aria-hidden="true"
            className="h-px w-10 bg-linear-to-r from-transparent to-cyan-100/28 sm:w-12"
          />
          <p className="font-osiris text-xs tracking-[0.34em] text-cyan-100/66 sm:text-sm">
            03 / EXPERIENCE
          </p>
          <span
            aria-hidden="true"
            className="h-px w-10 bg-linear-to-l from-transparent to-cyan-100/28 sm:w-12"
          />
        </motion.div>

        <h2
          id="experience-title"
          data-cursor="text"
          className="font-bruno mx-auto max-w-full text-[clamp(1.2rem,3.8vw,4.8rem)] leading-[0.98] text-slate-50 drop-shadow-[0_0_26px_rgba(34,211,238,0.14)]"
        >
          {openingLines.map((line) => (
            <motion.span
              key={line}
              className="block whitespace-nowrap"
              variants={openingLineVariants}
            >
              {line}
            </motion.span>
          ))}
        </h2>

        <motion.p
          data-cursor="text"
          className="font-oxanium mx-auto mt-8 max-w-2xl text-sm leading-7 text-slate-200/78 sm:mt-10 sm:text-lg sm:leading-9"
          variants={openingLineVariants}
        >
          A path shaped by study, pressure, practice, and the need to turn ideas
          into interfaces that feel alive.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default ExperienceOpening;
