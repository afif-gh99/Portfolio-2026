import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AboutScene from "./AboutScene.jsx";

const timelineSteps = ["ATTENTION", "TRUST", "FLOW", "ACTION"];
const countdownDuration = 300;

function AboutSecondsScene() {
  const countdownRef = useRef(null);
  const isSceneInView = useInView(countdownRef, {
    amount: 0.55,
    margin: "-8% 0px -8% 0px",
  });
  const [countdownValue, setCountdownValue] = useState(10);
  const [isCountdownFaded, setIsCountdownFaded] = useState(false);

  useEffect(() => {
    if (!isSceneInView) {
      const resetTimer = setTimeout(() => {
        setCountdownValue(10);
        setIsCountdownFaded(false);
      }, 0);

      return () => {
        clearTimeout(resetTimer);
      };
    }

    const timers = [];
    const countdownEndTime = 10 * countdownDuration;

    timers.push(
      setTimeout(() => {
        setCountdownValue(10);
        setIsCountdownFaded(false);
      }, 0),
    );

    for (let value = 9; value >= 0; value -= 1) {
      timers.push(
        setTimeout(
          () => {
            setCountdownValue(value);
          },
          (10 - value) * countdownDuration,
        ),
      );
    }

    timers.push(
      setTimeout(() => {
        setIsCountdownFaded(true);
      }, countdownEndTime + 2000),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isSceneInView]);

  const displayCountdown = String(countdownValue).padStart(2, "0");
  return (
    <AboutScene
      topLabel="ATTENTION_WINDOW / 02"
      bottomLabel="TRUST BUILDS FAST"
    >
      <div ref={countdownRef} className="relative isolate">
        <motion.div
          aria-hidden="true"
          className="font-osiris pointer-events-none absolute -right-6 top-1/2 -z-10 w-[2ch] -translate-y-1/2 text-center text-[clamp(8rem,18vw,16rem)] leading-none text-cyan-100/6 drop-shadow-[0_0_34px_rgba(34,211,238,0.10)] sm:right-0 lg:-right-25"
          animate={{
            opacity: isCountdownFaded ? 0 : 1,
            scale: isCountdownFaded ? 5 : 1,
            filter: isCountdownFaded ? "blur(12px)" : "blur(0px)",
          }}
          transition={{
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {displayCountdown}
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-44 w-44 -translate-x-1/2 -translate-y-1/2   border-cyan-100/8  sm:h-64 sm:w-64"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 top-1/2 -z-10 h-px bg-linear-to-r from-transparent via-cyan-100/18 to-transparent"
        />
        <h2
          data-cursor="text"
          className="font-bruno mx-auto max-w-[12ch]  text-[clamp(2rem,8vw,5.8rem)] leading-[0.96] text-slate-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.10)]"
        >
          <span className="block">THE FIRST</span>
          <span className="relative my-2 inline-flex items-center justify-center px-4 text-cyan-50 sm:px-7">
            <span className="drop-shadow-[0_0_18px_rgba(34,211,238,0.62)]">
              10 SECONDS
            </span>
          </span>
          <span className="block">DECIDE EVERYTHING.</span>
        </h2>

        <p
          data-cursor="text"
          className="font-oxanium mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-200/78 sm:text-lg sm:leading-9"
        >
          A portfolio, a product, or a landing page has only a few seconds to
          earn attention. I build interfaces that make those seconds count.
        </p>

        <div className="font-oxanium mx-auto mt-9 max-w-3xl text-cyan-100/60">
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[11px] font-medium uppercase tracking-[0.14em] sm:gap-x-4 sm:text-xs sm:tracking-[0.18em]">
            {timelineSteps.map((step, index) => (
              <span key={step} className="flex items-center gap-3">
                <span className="border-y border-cyan-100/14 px-2 py-1 sm:px-3">
                  {step}
                </span>
                {index < timelineSteps.length - 1 && (
                  <span className="flex items-center gap-2 text-cyan-100/28">
                    <span aria-hidden="true">-&gt;</span>
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AboutScene>
  );
}

export default AboutSecondsScene;
