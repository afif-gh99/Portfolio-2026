import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AboutScene from "./AboutScene.jsx";
import DecisionCard from "./decision/DecisionCard.jsx";
import decisionCards from "./decision/decisionCards.js";

function AboutDecisionScene() {
  const sceneContentRef = useRef(null);
  const isDecisionInView = useInView(sceneContentRef, {
    amount: 0.45,
  });
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    function updatePointerState() {
      setIsFinePointer(pointerQuery.matches);
    }

    updatePointerState();
    pointerQuery.addEventListener("change", updatePointerState);

    return () => {
      pointerQuery.removeEventListener("change", updatePointerState);
    };
  }, []);

  const canUseDepthMotion = isFinePointer;

  return (
    <AboutScene
      className=" items-start py-18 sm:min-h-[80vh] sm:items-center sm:py-4 lg:min-h-[90vh]"
      topLabel="INTERFACE_LOGIC / 03"
      bottomLabel="MOTION / CLARITY / RHYTHM "
    >
      <div
        ref={sceneContentRef}
        className="relative mx-auto w-full max-w-88 sm:max-w-5xl"
      >
        <h2
          data-cursor="text"
          className="font-bruno mx-auto max-w-[14ch] text-[clamp(1.35rem,7vw,2.25rem)] leading-[1.1] text-slate-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.12)] sm:text-[clamp(1.75rem,4vw,5rem)] sm:leading-none"
        >
          <span className="block">BEHIND EVERY INTERFACE,</span>
          <span className="block">THERE&apos;S A</span>
          <span className="relative mt-2 inline-flex items-center justify-center px-4 text-cyan-50 sm:px-7">
            <motion.span
              className="absolute -bottom-2 left-1/2 h-px w-[82%] -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-100/48 to-transparent"
              aria-hidden="true"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
            <span className="relative drop-shadow-[0_0_18px_rgba(34,211,238,0.18)]">
              DECISION.
            </span>
          </span>
        </h2>
        <div className="relative">
          <p
            className="font-oxanium mt-3 text-[9px] font-medium uppercase tracking-[0.18em] text-cyan-100/42 sm:mt-5 sm:text-xs sm:tracking-[0.24em]"
            aria-hidden="true"
          >
            DECISION.LOGIC()
          </p>
          <div
            className="font-oxanium w-full  pointer-events-none absolute left-1/2 top-4 -z-10  -translate-x-1/2  sm:text-[10px] text-[6px] font-medium uppercase tracking-[0.28em] text-cyan-100/20 block"
            aria-hidden="true"
          >
            INPUT -&gt; INTENT -&gt; DECISION -&gt; OUTPUT
          </div>
        </div>

        <p
          data-cursor="text"
          className="font-oxanium mx-auto mt-4 max-w-[20rem] text-sm leading-7 text-slate-200/76 sm:mt-7 sm:max-w-xl sm:text-lg sm:leading-9"
        >
          Every layout, animation, and interaction should serve a reason — not
          just decoration.
        </p>

        <div className="relative mt-4 sm:mt-6">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 hidden h-px -translate-y-1/2 bg-linear-to-r from-transparent via-cyan-100/18 to-transparent sm:block"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inset-y-0 left-0 w-1/3 origin-left bg-linear-to-r from-transparent via-cyan-100/52 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.2)]"
              animate={{ x: ["-35%", "235%"], opacity: [0, 1, 0] }}
              transition={{
                duration: 3.4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </div>

          <div className="flex w-75 justify-center  mx-auto flex-col gap-2.5 sm:flex-row sm:gap-4 sm:w-full">
            {decisionCards.map((card, index) => (
              <DecisionCard
                key={card.title}
                card={card}
                index={index}
                isLast={index === decisionCards.length - 1}
                canUseDepthMotion={canUseDepthMotion}
                isActive={isDecisionInView}
              />
            ))}
          </div>
        </div>
      </div>
    </AboutScene>
  );
}

export default AboutDecisionScene;
