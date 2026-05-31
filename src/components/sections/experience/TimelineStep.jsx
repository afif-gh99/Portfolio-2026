import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const easing = [0.16, 1, 0.3, 1];

const desktopPanelVariants = {
  hidden: (side) => ({
    opacity: 0.18,
    x: side === "left" ? -28 : 28,
    y: 18,
    scale: 0.98,
    filter: "blur(5px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: easing,
    },
  },
};

const mobilePanelVariants = {
  hidden: {
    opacity: 0.22,
    y: 22,
    scale: 0.98,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.68,
      ease: easing,
    },
  },
};

function TimelineContent({ entry, index, isActive, layout }) {
  const isDesktop = layout === "desktop";
  const rowAlignment = "justify-start";
  const footerLineDirection = "bg-linear-to-r from-cyan-100/38 to-transparent";
  const headlineWidth = isDesktop ? "lg:max-w-[20.5ch]" : "max-w-[13ch]";
  const descriptionWidth = isDesktop ? "lg:max-w-[34rem]" : "max-w-md";

  return (
    <>
      <div
        className={`font-osiris flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-100/54 sm:text-xs ${rowAlignment}`}
      >
        <span className="font-oxanium text-base tracking-[0.2em] text-cyan-50/86 sm:text-lg">
          {entry.context}
        </span>
        <span className=" h-px w-8 bg-cyan-100/22" aria-hidden="true" />
        <span>{entry.year}</span>
      </div>

      <h3
        data-cursor="text"
        className={`font-bruno mt-5 ${headlineWidth} text-left text-[clamp(1.55rem,2.7vw,2.7rem)] leading-[1.03] text-slate-50 drop-shadow-[0_0_22px_rgba(34,211,238,0.12)] ${
          isDesktop ? "lg:text-[clamp(2.05rem,2.45vw,3.25rem)]" : ""
        }`}
      >
        {entry.headline.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
      </h3>

      <p
        data-cursor="text"
        className={`font-oxanium mt-5 ${descriptionWidth} text-left text-sm leading-7 text-slate-200/76 sm:text-base sm:leading-8`}
      >
        {entry.description}
      </p>

      <div
        aria-hidden="true"
        className={`font-oxanium mt-7 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-100/34 ${rowAlignment}`}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className={`h-px w-12 ${footerLineDirection}`} />
        <span>{isActive ? "ACTIVE PATH NODE" : "PATH NODE"}</span>
      </div>
    </>
  );
}

function TimelineStep({ entry, index, isActive, onActive }) {
  const stepRef = useRef(null);
  const isStepInView = useInView(stepRef, {
    amount: 0.55,
    margin: "-10% 0px -10% 0px",
  });
  const isLeft = entry.side === "left";

  useEffect(() => {
    if (isStepInView) {
      onActive(index);
    }
  }, [index, isStepInView, onActive]);

  return (
    <section
      ref={stepRef}
      className="relative min-h-[60dvh] overflow-hidden px-5 py-16 sm:px-8 lg:min-h-[60dvh] lg:px-16 lg:py-0 xl:px-24 2xl:px-32"
    >
      <div className="mx-auto grid min-h-[60dvh] w-full max-w-7xl items-center lg:min-h-[60dvh] lg:max-w-368 lg:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] lg:gap-10 xl:gap-12">
        <div className="relative lg:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px bg-cyan-100/14"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-4 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-100/36 bg-[#06101f] shadow-[0_0_18px_rgba(34,211,238,0.18)]"
            animate={{
              scale: isActive ? 1 : 0.82,
              opacity: isActive ? 1 : 0.42,
            }}
            transition={{ duration: 0.34, ease: easing }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-100" />
          </motion.div>

          <motion.article
            className="ml-10 max-w-full border-l border-cyan-100/14 pl-5"
            variants={mobilePanelVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
          >
            <TimelineContent
              entry={entry}
              index={index}
              isActive={isActive}
              layout="mobile"
            />
          </motion.article>
        </div>
        <motion.article
          className={`hidden w-full max-w-152 text-left lg:block ${
            isLeft
              ? "col-start-1 justify-self-start"
              : "col-start-3 justify-self-end"
          }`}
          custom={entry.side}
          variants={desktopPanelVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          <div className="w-full">
            <TimelineContent
              entry={entry}
              index={index}
              isActive={isActive}
              layout="desktop"
            />
          </div>
        </motion.article>
        <div aria-hidden="true" className="hidden lg:col-start-2 lg:block" />
      </div>
    </section>
  );
}

export default TimelineStep;
