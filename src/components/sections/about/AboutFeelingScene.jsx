import { motion } from "framer-motion";
import AboutScene from "./AboutScene.jsx";

const feelsLetters = ["F", "E", "E", "L", "S", "."];

function AboutFeelingScene() {
  const feelsGlowAnimation = {
    textShadow: [
      "0 0 14px rgba(34, 211, 238, 0.35), 0 0 34px rgba(14, 165, 233, 0.22), 0 0 70px rgba(14, 165, 233, 0.12)",
      "0 0 28px rgba(103, 232, 249, 0.85), 0 0 72px rgba(34, 211, 238, 0.55), 0 0 140px rgba(14, 165, 233, 0.34)",
      "0 0 14px rgba(34, 211, 238, 0.35), 0 0 34px rgba(14, 165, 233, 0.22), 0 0 70px rgba(14, 165, 233, 0.12)",
    ],
  };
  const feelsAuraAnimation = {
    opacity: [0.18, 0.34, 0.18],
    scaleX: [0.94, 1.04, 0.94],
  };
  const letterHover = {
    scale: 1.05,
    color: "#ecfeff",
    textShadow:
      "0 0 18px rgba(103, 232, 249, 0.72), 0 0 34px rgba(34, 211, 238, 0.32)",
  };

  return (
    <AboutScene
      topLabel="SENSORY_LAYER / 01"
      bottomLabel="MOTION / CLARITY / RHYTHM"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-cyan-100/24" aria-hidden="true" />
          <p className="font-osiris text-xs tracking-[0.32em] text-cyan-100/72 sm:text-sm">
            02 / ABOUT
          </p>
          <span className="h-px w-12 bg-cyan-100/24" aria-hidden="true" />
        </div>
        <h2
          data-cursor="text"
          className="font-bruno mx-auto max-w-[13ch] text-[clamp(2rem,8vw,5.9rem)] leading-[0.96] text-slate-50 drop-shadow-[0_0_26px_rgba(34,211,238,0.14)]"
        >
          <span className="block">NOT JUST CODE.</span>
          <span className="block">IT&apos;S HOW THE INTERFACE</span>
          <motion.span
            aria-label="FEELS."
            className="group/feels relative mt-3 inline-block text-cyan-50"
            animate={feelsGlowAnimation}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute -inset-x-8 -inset-y-4 -z-10 rounded-full bg-cyan-300/14 blur-2xl"
              animate={feelsAuraAnimation}
              transition={{
                duration: 4.6,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
            <span className="sr-only">FEELS.</span>
            <span aria-hidden="true" className="relative z-10 inline-flex">
              {feelsLetters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="inline-block transition-colors duration-300 ease-out"
                  whileHover={letterHover}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-3 left-1/2 h-px w-[92%] origin-center -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-100/80 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.34)]"
              animate={{
                scaleX: [0.72, 1, 0.72],
                opacity: [0.45, 0.95, 0.45],
              }}
              transition={{
                duration: 3.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />{" "}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-1/2 h-px w-[58%] -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-200/32 to-transparent"
            />
          </motion.span>
        </h2>
        <p
          data-cursor="text"
          className="font-oxanium mx-auto mt-9 max-w-176 text-base leading-8 text-slate-100/82 sm:text-lg sm:leading-9"
        >
          I care about the{" "}
          <span className="relative inline-block text-cyan-50/90 drop-shadow-[0_0_14px_rgba(34,211,238,0.22)]">
            moments between the clicks
          </span>{" "}
          &mdash; the motion, the clarity, the rhythm, and the first impression
          that makes a digital experience feel intentional.
        </p>{" "}
      </div>
    </AboutScene>
  );
}

export default AboutFeelingScene;
