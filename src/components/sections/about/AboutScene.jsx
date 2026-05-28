import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easing = [0.16, 1, 0.3, 1];

const sceneVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(7px)",
    transition: { duration: 0.38, ease: [0.7, 0, 0.84, 0] },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: easing },
  },
};

const frameVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.24, ease: [0.7, 0, 0.84, 0] },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.62, ease: easing },
  },
};

const lineXVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.68, ease: easing },
  },
};

const lineYVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.68, ease: easing },
  },
};

const labelVariants = {
  hidden: {
    opacity: 0,
    x: -8,
    y: 8,
    filter: "blur(4px)",
    transition: { duration: 0.24, ease: [0.7, 0, 0.84, 0] },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: easing },
  },
};

const bottomLabelVariants = {
  hidden: {
    opacity: 0,
    x: 8,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: 0.24, ease: [0.7, 0, 0.84, 0] },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: easing },
  },
};

function AboutFrame({ isActive, topLabel, bottomLabel }) {
  const activeState = isActive ? "visible" : "hidden";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute  inset-x-5 bottom-6 top-6 z-0 sm:inset-8 lg:inset-x-5 lg:inset-y-0"
      variants={frameVariants}
      initial="hidden"
      animate={activeState}
    >
      <motion.span
        className="absolute left-0 top-0 h-px w-10 origin-left bg-cyan-100/18 sm:w-16 lg:w-28"
        variants={lineXVariants}
      />
      <motion.span
        className="absolute left-0 top-0 h-10 w-px origin-top bg-cyan-100/18 sm:h-16 lg:h-28"
        variants={lineYVariants}
      />
      <motion.span
        className="absolute right-0 top-0 h-px w-10 origin-right bg-cyan-100/18 sm:w-16 lg:w-28"
        variants={lineXVariants}
      />
      <motion.span
        className="absolute right-0 top-0 h-10 w-px origin-top bg-cyan-100/18 sm:h-16 lg:h-28"
        variants={lineYVariants}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-px w-10 origin-left bg-cyan-100/14 sm:w-16 lg:w-28"
        variants={lineXVariants}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-10 w-px origin-bottom bg-cyan-100/14 sm:h-16 lg:h-28"
        variants={lineYVariants}
      />
      <motion.span
        className="absolute bottom-0 right-0 h-px w-10 origin-right bg-cyan-100/14 sm:w-16 lg:w-28"
        variants={lineXVariants}
      />
      <motion.span
        className="absolute bottom-0 right-0 h-10 w-px origin-bottom bg-cyan-100/14 sm:h-16 lg:h-28"
        variants={lineYVariants}
      />

      {topLabel && (
        <motion.p
          className="font-oxanium absolute left-3 top-3 max-w-44 text-left text-[9px] font-medium uppercase leading-4 tracking-[0.16em] text-cyan-100/46 sm:left-5 sm:top-5 sm:max-w-none sm:text-xs sm:tracking-[0.22em] lg:top-3"
          variants={labelVariants}
        >
          {topLabel}
        </motion.p>
      )}

      {bottomLabel && (
        <motion.p
          className="font-oxanium  absolute bottom-3 right-3 max-w-fit text-right text-[9px] font-medium uppercase leading-4 tracking-[0.14em] text-cyan-100/42 sm:bottom-5 sm:right-5 sm:max-w-60 sm:text-xs sm:tracking-[0.2em] lg:bottom-3 lg:max-w-none"
          variants={bottomLabelVariants}
        >
          {bottomLabel}
        </motion.p>
      )}
    </motion.div>
  );
}

function AboutScene({
  children,
  className = "",
  contentClassName = "max-w-5xl",
  topLabel,
  bottomLabel,
}) {
  const sceneRef = useRef(null);
  const isSceneInView = useInView(sceneRef, {
    amount: 0.55,
    margin: "-8% 0px -8% 0px",
  });

  return (
    <section
      ref={sceneRef}
      className={`relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-4 text-center sm:px-8 lg:min-h-[85vh] ${className}`}
    >
      <AboutFrame
        isActive={isSceneInView}
        topLabel={topLabel}
        bottomLabel={bottomLabel}
      />

      <motion.div
        className={`relative z-10 mx-auto w-full ${contentClassName}`}
        variants={sceneVariants}
        initial="hidden"
        animate={isSceneInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default AboutScene;
