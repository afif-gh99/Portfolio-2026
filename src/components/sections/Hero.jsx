import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroContent from "./Hero/HeroContent.jsx";
import HeroPortrait from "./Hero/HeroPortrait.jsx";
import {
  contentItemVariants,
  contentVariants,
  headlineLineVariants,
  headlineVariants,
  portraitVariants,
  scrollCueVariants,
} from "./Hero/heroMotion.js";

function Hero({ canAnimateHero = true }) {
  const heroSectionRef = useRef(null);
  const isHeroInView = useInView(heroSectionRef, { amount: 0.5 });
  const animationState = canAnimateHero && isHeroInView ? "visible" : "hidden";

  return (
    <section
      ref={heroSectionRef}
      className="relative flex min-h-dvh items-center overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32 lg:h-dvh lg:min-h-168 lg:pb-10 lg:pt-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.82fr)] lg:gap-10 xl:max-w-7xl xl:gap-14">
        <HeroContent
          animationState={animationState}
          contentVariants={contentVariants}
          itemMotion={contentItemVariants}
          headlineVariants={headlineVariants}
          headlineLineMotion={headlineLineVariants}
        />
        <HeroPortrait
          animationState={animationState}
          portraitMotion={portraitVariants}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-center min-[1024px]:flex sm:bottom-3 "
        variants={scrollCueVariants}
        initial="hidden"
        animate={animationState}
        aria-hidden="true"
      >
        <span className="font-oxanium text-[0.58rem] font-medium uppercase tracking-[0.32em] text-cyan-100/42 sm:text-[0.62rem]">
          SCROLL TO EXPLORE
        </span>
        <motion.span
          className="h-8 w-px bg-linear-to-b from-cyan-100/55 via-cyan-100/28 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.18)] sm:h-10"
          animate={
            animationState === "visible"
              ? { scaleY: [0.55, 1, 0.55], opacity: [0.34, 0.76, 0.34] }
              : undefined
          }
          transition={
            animationState === "visible"
              ? { duration: 2.3, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}

export default Hero;
