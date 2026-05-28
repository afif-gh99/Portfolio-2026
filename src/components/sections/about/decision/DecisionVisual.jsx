import { motion } from "framer-motion";

function DecisionVisual({ type, isAnimated, isCompact = false }) {
  if (type === "motion") {
    return (
      <div
        className="relative h-6 w-14 sm:h-8 sm:w-[5.35rem]"
        aria-hidden="true"
      >
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-linear-to-r from-cyan-100/16 via-cyan-100/50 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-0 top-[calc(50%+5px)] h-px w-9 bg-linear-to-r from-cyan-100/7 via-cyan-100/20 to-transparent" />
        <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-cyan-100/54 transition-colors duration-300 group-hover:border-cyan-50/72" />
        <motion.span
          className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-cyan-50/82 shadow-[0_0_16px_rgba(34,211,238,0.46)] transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.66)]"
          animate={
            isAnimated
              ? {
                  x: [0, isCompact ? 46 : 66, 0],
                  opacity: [0.45, 1, 0.45],
                }
              : undefined
          }
          transition={{ duration: 2.05, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.span
          className="absolute left-1 top-1/2 h-px w-8 -translate-y-1/2 bg-cyan-100/50 shadow-[0_0_14px_rgba(34,211,238,0.32)] transition-opacity duration-300 group-hover:opacity-100"
          animate={
            isAnimated
              ? {
                  x: [0, isCompact ? 20 : 44, 0],
                  opacity: [0.22, 0.9, 0.22],
                }
              : undefined
          }
          transition={{ duration: 2.05, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    );
  }

  if (type === "clarity") {
    return (
      <div
        className="relative h-7 w-14 sm:h-9 sm:w-[5.35rem]"
        aria-hidden="true"
      >
        <span className="absolute left-1 top-1 h-px w-5  bg-cyan-100/12" />
        <span className="absolute left-3 top-3 h-px w-4  bg-cyan-100/10" />
        <span className="absolute left-1 top-7 h-px w-6  bg-cyan-100/10" />
        <span className="absolute right-0 top-0 h-full w-px bg-linear-to-b from-transparent via-cyan-100/18 to-transparent" />
        <motion.span
          className="absolute left-0 top-2 h-px w-17 bg-cyan-100/52 shadow-[0_0_14px_rgba(34,211,238,0.22)] transition-colors duration-300 group-hover:bg-cyan-50/70"
          animate={
            isAnimated ? { opacity: [0.42, 1, 0.42], x: [4, 0, 4] } : undefined
          }
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.span
          className="absolute left-0 top-4 h-px w-14 bg-cyan-100/42 transition-colors duration-300 group-hover:bg-cyan-100/62"
          animate={
            isAnimated
              ? { opacity: [0.26, 0.86, 0.26], x: [7, 0, 7] }
              : undefined
          }
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.18,
          }}
        />
        <motion.span
          className="absolute left-0 top-6 h-px w-16 bg-cyan-100/34 transition-colors duration-300 group-hover:bg-cyan-100/54"
          animate={
            isAnimated
              ? { opacity: [0.2, 0.76, 0.2], x: [10, 0, 10] }
              : undefined
          }
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.32,
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-7 w-7 sm:h-10 sm:w-10" aria-hidden="true">
      <span className="absolute inset-1.5 border border-cyan-100/22 transition-colors duration-300 group-hover:border-cyan-50/36" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan-100/30 to-transparent" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-linear-to-r from-transparent via-cyan-100/30 to-transparent" />
      <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 border border-cyan-100/12" />
      <motion.span
        className="absolute inset-2 border border-cyan-100/24 shadow-[0_0_18px_rgba(34,300,238,0.5)] transition-colors duration-300 group-hover:border-cyan-100/42"
        animate={
          isAnimated
            ? { opacity: [0.22, 0.66, 0.22], scale: [0.9, 1.5, 0.9] }
            : undefined
        }
        transition={{ duration: 2.45, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-cyan-50/84 shadow-[0_0_16px_rgba(34,211,238,0.46)] transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.7)]"
        animate={
          isAnimated
            ? { opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }
            : undefined
        }
        transition={{ duration: 2.45, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}

export default DecisionVisual;
