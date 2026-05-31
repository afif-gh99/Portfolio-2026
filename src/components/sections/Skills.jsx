import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillsOrbitGroups } from "../../data/skillsOrbit.js";
import { registerSection } from "../../lib/sectionNavigation.js";
import SkillGroupsGrid from "./skills/SkillGroupsGrid.jsx";
import SkillOrbit from "./skills/SkillOrbit.jsx";

const easing = [0.16, 1, 0.3, 1];

const copyVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: easing,
    },
  },
};

const labelVariants = {
  ...copyVariants,
  visible: {
    ...copyVariants.visible,
    transition: {
      ...copyVariants.visible.transition,
      delay: 0.04,
    },
  },
};

const headlineLineVariants = {
  hidden: {
    opacity: 0,
    x: -40,
    filter: "blur(5px)",
  },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.74,
      delay: 0.18 + index * 0.13,
      ease: easing,
    },
  }),
};

const subtitleVariants = {
  ...copyVariants,
  visible: {
    ...copyVariants.visible,
    transition: {
      ...copyVariants.visible.transition,
      delay: 0.84,
    },
  },
};

const orbitFrameVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.86,
      delay: 0.6,
      ease: easing,
    },
  },
};

const headlineLines = [
  "SKILLS DON\u2019T",
  "STAND ALONE.",
  "THEY ORBIT",
  "ONE SYSTEM.",
];

function Skills() {
  const skillsSectionRef = useRef(null);
  const copyRef = useRef(null);
  const isCopyInView = useInView(copyRef, {
    amount: 0.34,
    margin: "-10% 0px -10% 0px",
  });

  useEffect(() => {
    registerSection("skills", skillsSectionRef.current);

    return () => {
      registerSection("skills", null);
    };
  }, []);

  return (
    <section
      ref={skillsSectionRef}
      data-section="skills"
      aria-labelledby="skills-title"
      className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:min-h-screen lg:px-16 lg:py-20 xl:px-24 xl:py-50 2xl:px-32"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[20%] h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-300/7 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isCopyInView ? 1 : 0 }}
        transition={{
          duration: 1.1,
          delay: 0.18,
          ease: "easeOut",
        }}
      />{" "}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-[8%] h-80 w-80 rounded-full bg-blue-400/7 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 w-20 mx-auto top-0 h-px bg-linear-to-r from-transparent via-cyan-100/18 to-transparent"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-368 items-center gap-12 lg:grid-cols-[minmax(27rem,0.95fr)_minmax(34rem,1.05fr)] lg:gap-14 xl:grid-cols-[minmax(31rem,0.95fr)_minmax(39rem,1.05fr)] xl:gap-16">
        <motion.div
          ref={copyRef}
          className="max-w-184 lg:pr-2 xl:pr-4"
          initial="hidden"
          animate={isCopyInView ? "visible" : "hidden"}
        >
          <motion.div
            className="mb-5 flex items-center gap-4 lg:mb-6"
            variants={labelVariants}
          >
            <span
              aria-hidden="true"
              className="h-px w-10 bg-linear-to-r from-cyan-100/36 to-transparent"
            />
            <p className="font-osiris text-xs uppercase tracking-[0.34em] text-cyan-100/66 sm:text-sm">
              04 / SKILLS
            </p>
          </motion.div>

          <motion.h2
            id="skills-title"
            data-cursor="text"
            className="font-bruno max-w-[13ch] text-[clamp(2.2rem,7.4vw,4.55rem)] leading-[1.04] text-slate-50 drop-shadow-[0_0_28px_rgba(34,211,238,0.16)] lg:text-[clamp(2.9rem,3.75vw,4.75rem)] xl:text-[clamp(3.15rem,3.65vw,5rem)]"
          >
            {headlineLines.map((line, index) => (
              <motion.span
                className="block"
                custom={index}
                key={line}
                variants={headlineLineVariants}
              >
                {line}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            data-cursor="text"
            className="font-oxanium mt-7 max-w-160 text-sm leading-7 text-slate-200/76 sm:text-base sm:leading-8 lg:mt-8"
            variants={subtitleVariants}
          >
            A focused stack shaped around clarity, motion, speed, and interfaces
            that feel alive.
          </motion.p>
        </motion.div>

        <div className="relative left-1/2  mx-auto w-[calc(100vw-2rem)] max-w-[24rem] -translate-x-1/2 sm:left-auto sm:w-full sm:max-w-2xl sm:translate-x-0 lg:max-w-[min(46vw,40rem)] xl:max-w-[min(47vw,42rem)] 2xl:max-w-172">
          <motion.div
            aria-hidden="true"
            initial="hidden"
            animate={isCopyInView ? "visible" : "hidden"}
            variants={orbitFrameVariants}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/7"
          />
          <motion.div
            initial="hidden"
            animate={isCopyInView ? "visible" : "hidden"}
            variants={orbitFrameVariants}
          >
            <SkillOrbit
              groups={skillsOrbitGroups}
              shouldRevealIcons={isCopyInView}
            />
          </motion.div>
        </div>
      </div>
      <SkillGroupsGrid groups={skillsOrbitGroups} />
    </section>
  );
}

export default Skills;
