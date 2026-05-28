import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AboutScene from "./AboutScene.jsx";
import OutcomeRadar from "./OutcomeRadar.jsx";

const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.08,
    },
  },
};

const textItemVariants = {
  hidden: {
    opacity: 0,
    x: -22,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function AboutOutcomeScene() {
  const sceneContentRef = useRef(null);
  const isOutcomeInView = useInView(sceneContentRef, {
    amount: 0.5,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <AboutScene
      className="items-start pt-20 pb-24 sm:items-center sm:py-4 "
      contentClassName="max-w-7xl"
      topLabel="BUSINESS_CONTEXT / 04"
      bottomLabel={"ATTENTION \u2192 CLARITY \u2192 ACTION"}
    >
      <div
        ref={sceneContentRef}
        className="relative mx-auto flex w-full flex-col items-center justify-center gap-10 text-center lg:flex-row lg:gap-16 lg:text-left xl:gap-28 2xl:gap-50"
      >
        <motion.div
          className="mx-auto max-w-2xl lg:mx-0 lg:min-w-[32rem]"
          variants={textContainerVariants}
          initial="hidden"
          animate={isOutcomeInView ? "visible" : "hidden"}
        >
          <motion.h2
            data-cursor="text"
            className="font-bruno mx-auto max-w-[13ch] text-[clamp(1.55rem,7vw,2.15rem)] leading-[1.05] text-slate-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.12)] sm:text-[clamp(2rem,4vw,4.75rem)] sm:leading-[0.98] lg:mx-0"
            variants={textItemVariants}
          >
            <span className="block">I DON&apos;T ONLY SEE SCREENS.</span>
            <span className="block">I SEE OUTCOMES.</span>
          </motion.h2>

          <motion.p
            data-cursor="text"
            className="font-oxanium mx-auto mt-5 max-w-[20rem] text-sm leading-7 text-slate-200/76 sm:max-w-2xl sm:text-lg sm:leading-9 lg:mx-0 lg:max-w-[36rem]"
            variants={textItemVariants}
          >
            My business background helps me think beyond the interface &mdash;
            toward clarity, user behavior, and the goal behind every digital
            experience.
          </motion.p>
        </motion.div>

        <div className="flex shrink-0 justify-center lg:justify-end">
          <OutcomeRadar isActive={isOutcomeInView} />
        </div>
      </div>
    </AboutScene>
  );
}

export default AboutOutcomeScene;
