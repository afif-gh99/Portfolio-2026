import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SkillGroupCard from "./SkillGroupCard.jsx";

const headingLines = ["THE STACK BEHIND", "THE INTERFACE."];

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const copyVariants = {
  hidden: {
    opacity: 0,
    x: -24,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function getCardClassName(index) {
  if (index === 3 || index === 4) {
    return "lg:col-span-3";
  }

  return "lg:col-span-2";
}

function SkillGroupsGrid({ groups }) {
  const sceneRef = useRef(null);
  const isInView = useInView(sceneRef, {
    amount: 0.2,
    margin: "-8% 0px -12% 0px",
  });

  return (
    <motion.div
      ref={sceneRef}
      className="relative z-10 mx-auto mt-0 w-full max-w-352 sm:mt-26 lg:mt-30"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[12%] h-48 w-48 rounded-full bg-cyan-300/6 blur-3xl"
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(22rem,0.76fr)_minmax(18rem,0.42fr)] lg:items-end lg:gap-8">
        <div>
          <motion.p
            className="font-osiris text-xs uppercase tracking-[0.32em] text-cyan-100/52"
            variants={copyVariants}
          >
            04.2 / STACK LAYERS
          </motion.p>
          <h2 className="font-bruno my-5  max-w-[14ch] text-[clamp(2rem,9vw,3.8rem)] leading-[1.05] text-slate-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.14)] lg:text-[clamp(2.7rem,3.4vw,4.6rem)]">
            {headingLines.map((line) => (
              <motion.span className="block" key={line} variants={copyVariants}>
                {line}
              </motion.span>
            ))}
          </h2>
        </div>

        <motion.p
          className="font-oxanium max-w-108 border-l border-cyan-100/16 pl-4 text-sm leading-7 text-slate-200/70 sm:text-base sm:leading-8 lg:ml-auto lg:mb-2"
          variants={copyVariants}
        >
          Different layers. One direction: clear, fast, alive.
        </motion.p>
      </div>

      <motion.div
        className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-6 lg:gap-4"
        variants={sectionVariants}
      >
        {groups.map((group, index) => (
          <SkillGroupCard
            className={getCardClassName(index)}
            group={group}
            index={index}
            key={group.id}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default SkillGroupsGrid;
