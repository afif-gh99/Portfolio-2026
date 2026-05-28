import { useRef } from "react";
import { motion } from "framer-motion";
import DecisionVisual from "./DecisionVisual.jsx";

const desktopEntranceOffsets = [
  { x: -88, y: 72 },
  { x: 0, y: 86 },
  { x: 88, y: 72 },
];

function DecisionCard({ card, index, isLast, canUseDepthMotion, isActive }) {
  const rectRef = useRef(null);
  const desktopOffset = desktopEntranceOffsets[index] ?? desktopEntranceOffsets[1];

  const entranceVariants = {
    hidden: {
      opacity: 0,
      x: canUseDepthMotion ? desktopOffset.x : 0,
      y: canUseDepthMotion ? desktopOffset.y : 28,
      scale: canUseDepthMotion ? 1.18 : 1.025,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: canUseDepthMotion ? 0.78 : 0.5,
        delay: 0.42 + index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  function handlePointerEnter(event) {
    if (event.pointerType !== "mouse") {
      return;
    }

    rectRef.current = event.currentTarget.getBoundingClientRect();
  }

  function handlePointerMove(event) {
    if (event.pointerType !== "mouse" || !rectRef.current) {
      return;
    }

    const { left, top } = rectRef.current;
    event.currentTarget.style.setProperty(
      "--card-x",
      `${event.clientX - left}px`,
    );
    event.currentTarget.style.setProperty(
      "--card-y",
      `${event.clientY - top}px`,
    );
  }

  function handlePointerLeave(event) {
    rectRef.current = null;
    event.currentTarget.style.setProperty("--card-x", "50%");
    event.currentTarget.style.setProperty("--card-y", "42%");
  }

  return (
    <motion.article
      className="group relative flex min-h-[6.75rem] overflow-hidden border border-cyan-100/12 bg-[#061426]/62 px-4 py-3 text-left shadow-[0_22px_64px_rgba(0,0,0,0.24),0_0_34px_rgba(34,211,238,0.035),inset_0_1px_0_rgba(255,255,255,0.065),inset_0_0_32px_rgba(34,211,238,0.026)] backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ease-out hover:border-cyan-100/28 hover:bg-[#07172a]/76 hover:shadow-[0_26px_72px_rgba(0,0,0,0.28),0_0_42px_rgba(34,211,238,0.055),inset_0_1px_0_rgba(255,255,255,0.09),inset_0_0_38px_rgba(34,211,238,0.04)] sm:min-h-[10rem] sm:px-4 sm:py-4"
      style={{ "--card-x": "50%", "--card-y": "42%" }}
      variants={entranceVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      whileHover={canUseDepthMotion ? { scale: 1.006 } : undefined}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--card-x) var(--card-y), rgba(34, 211, 238, 0.16), rgba(34, 211, 238, 0.055) 24%, transparent 52%)",
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-px bg-linear-to-b from-white/[0.055] via-transparent to-cyan-200/[0.025]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-cyan-100/38 to-transparent"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-200/[0.04] blur-2xl transition-opacity duration-300 group-hover:opacity-90"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l border-t border-cyan-200/34 transition-colors duration-300 group-hover:border-cyan-100/48"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b border-r border-cyan-200/24 transition-colors duration-300 group-hover:border-cyan-100/42"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <span className="font-osiris text-[8px] uppercase tracking-[0.16em] text-cyan-100/34 transition-colors duration-300 group-hover:text-cyan-100/52 sm:text-[9px] sm:tracking-[0.22em]">
            {card.node}
          </span>
          <span className="h-px flex-1 bg-linear-to-r from-cyan-100/12 to-transparent" />
        </div>

        <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4 sm:gap-4">
          <div>
            <h3 className="font-oxanium text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-100/76 transition-colors duration-300 group-hover:text-cyan-50/92 sm:text-xs sm:tracking-[0.22em]">
              {card.title}
            </h3>
            <p className="font-oxanium mt-2 max-w-[14rem] text-xs leading-5 text-slate-200/74 sm:mt-3 sm:max-w-[13rem] sm:text-sm sm:leading-7">
              {card.text}
            </p>
          </div>
          <div className="mt-0.5 shrink-0 opacity-80 sm:mt-1 sm:opacity-100">
            <DecisionVisual
              type={card.title.toLowerCase()}
              isAnimated={true}
              isCompact={!canUseDepthMotion}
            />
          </div>
        </div>

        <div className="mt-auto pt-2.5 sm:pt-4">
          <span className="block h-px w-full bg-linear-to-r from-cyan-100/18 via-cyan-100/7 to-transparent" />
        </div>
      </div>

      {!isLast && (
        <span
          className="pointer-events-none absolute -bottom-1 left-1/2 h-5 w-px bg-cyan-100/12 sm:hidden"
          aria-hidden="true"
        />
      )}
    </motion.article>
  );
}

export default DecisionCard;
