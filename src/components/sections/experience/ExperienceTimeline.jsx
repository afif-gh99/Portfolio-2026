import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { experienceTimeline } from "../../../data/experienceTimeline.js";
import TimelineStep from "./TimelineStep.jsx";

function ExperienceTimeline() {
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const isTimelineInView = useInView(timelineRef, {
    amount: 0.12,
    margin: "-10% 0px -8% 0px",
  });
  const activeEntry =
    activeIndex === null ? null : experienceTimeline[activeIndex];
  return (
    <section ref={timelineRef} className="relative overflow-visible">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-3 -translate-x-1/2 lg:block"
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cyan-100/12 shadow-[0_0_22px_rgba(34,211,238,0.08)]" />
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan-100/28 to-transparent" />
        <div className="absolute inset-y-0 left-[calc(50%+5px)] w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan-100/28 to-transparent" />
        <div className="absolute inset-y-0 right-[calc(50%+3px)] w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan-100/28 to-transparent" />
        <div className="absolute -top-px left-1/2 h-px w-12 -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-100/30 to-transparent" />
        <div className="absolute -top-1 left-1/2 h-2 w-px -translate-x-1/2 bg-cyan-100/22" />
        <div className="absolute -bottom-px left-1/2 h-px w-12 -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-100/24 to-transparent" />
        <div className="absolute -bottom-1 left-1/2 h-2 w-px -translate-x-1/2 bg-cyan-100/18" />
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-20 hidden h-dvh lg:block"
        initial={false}
        animate={{ opacity: isTimelineInView && activeEntry ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="absolute left-1/2 top-0 h-dvh w-px -translate-x-1/2 overflow-hidden">
          <motion.span
            className="absolute left-0 top-0 h-32 w-px bg-linear-to-b from-transparent via-cyan-100/42 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.14)]"
            animate={{
              opacity: [0, 0.48, 0.28, 0],
              y: ["-20vh", "120vh"],
            }}
            transition={{
              duration: 7.6,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 1.1,
            }}
          />
        </div>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="absolute h-44 w-px bg-linear-to-b from-transparent via-cyan-100/52 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.2)]" />
          <motion.span
            className="absolute h-28 w-28 rounded-full border border-cyan-100/10 bg-cyan-300/5 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
            animate={{
              opacity: [0.26, 0.8, 0.26],
              scale: [0.9, 1.4, 0.9],
            }}
            transition={{
              duration: 3.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <motion.span
            className="absolute h-12 w-12 rounded-full border border-cyan-100/28 bg-[#06101f]/70 shadow-[0_0_28px_rgba(34,211,238,0.2),inset_0_0_18px_rgba(34,211,238,0.05)]"
            animate={{
              opacity: [0.58, 1, 0.58],
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <motion.span
            className="relative h-3.5 w-3.5 rounded-full bg-cyan-50"
            animate={{
              opacity: [0.82, 1, 0.82],
              scale: [0.94, 1.12, 0.94],
              boxShadow: [
                "0 0 12px rgba(207,250,254,0.86), 0 0 30px rgba(34,211,238,0.42)",
                "0 0 20px rgba(207,250,254,1), 0 0 58px rgba(34,211,238,0.68), 0 0 92px rgba(14,165,233,0.28)",
                "0 0 12px rgba(207,250,254,0.86), 0 0 30px rgba(34,211,238,0.42)",
              ],
            }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />{" "}
          {activeEntry && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeEntry.year}-${activeEntry.context}`}
                className={`absolute flex items-center ${
                  activeEntry.side === "left" ? "left-0" : "right-0"
                }`}
                initial={{ opacity: 0, x: -6, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 6, filter: "blur(4px)" }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className={`absolute top-1/2 h-px w-8 -translate-y-1/2 shadow-[0_0_10px_rgba(34,211,238,0.16)] ${
                    activeEntry.side === "left"
                      ? "left-4 bg-linear-to-r from-cyan-100/58 to-transparent"
                      : "right-4 bg-linear-to-l from-cyan-100/58 to-transparent"
                  }`}
                />{" "}
                <div
                  className={`font-oxanium relative min-w-50 overflow-hidden border border-cyan-100/18 bg-[#04101f]/82 px-3.5 py-4.5 text-left text-[20px] font-medium uppercase leading-4 tracking-[0.18em] text-cyan-100/72 shadow-[0_10px_28px_rgba(0,0,0,0.28),0_0_16px_rgba(34,211,238,0.07)] backdrop-blur-md ${
                    activeEntry.side === "left" ? "ml-9" : "mr-9"
                  }`}
                  style={{
                    clipPath:
                      activeEntry.side === "left"
                        ? "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)"
                        : "polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  }}
                >
                  {activeEntry.side === "left" ? (
                    <>
                      <span className="absolute bottom-0 right-4 h-px w-4 bg-cyan-100/30" />
                      <span className="absolute bottom-4 right-0 h-4 w-px bg-cyan-100/24" />
                      <span className="absolute bottom-1.75 -right-0.75 h-px w-6 -rotate-45 bg-cyan-100/36" />
                    </>
                  ) : (
                    <>
                      <span className="absolute bottom-0 left-4 w-4 bg-cyan-100/30" />
                      <span className="absolute bottom-4 left-0 h-4 w-px bg-cyan-100/24" />
                      <span className="absolute bottom-1.75 -left-0.75 h-px w-6 rotate-45 bg-cyan-100/36" />
                    </>
                  )}{" "}
                  <span className="block text-[1.1rem] font-semibold leading-4 tracking-[0.22em] text-cyan-50/90">
                    {activeEntry.context}
                  </span>
                  <span className="font-osiris mt-1.5 block text-[12px] leading-3 tracking-[0.2em] text-cyan-100/48">
                    {activeEntry.year}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      <div className="relative z-10">
        {experienceTimeline.map((entry, index) => (
          <TimelineStep
            key={`${entry.year}-${entry.context}`}
            entry={entry}
            index={index}
            isActive={activeIndex === index && isTimelineInView}
            onActive={setActiveIndex}
          />
        ))}
      </div>
    </section>
  );
}

export default ExperienceTimeline;
