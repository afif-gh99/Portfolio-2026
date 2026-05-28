import { motion } from "framer-motion";

const radarConcepts = [
  {
    label: "SCREEN",
    position: "top-[12%] left-[23%]",
    revealDelay: 0,
  },
  {
    label: "ATTENTION",
    position: "right-[7%] top-[25%]",
    revealDelay: 2,
  },
  {
    label: "ACTION",
    position: "bottom-[20%] right-[20%]",
    revealDelay: 4,
  },
  {
    label: "CLARITY",
    position: "left-[1%] bottom-[35%]",
    revealDelay: 6,
  },
];

function RadarConcept({ concept, isActive }) {
  return (
    <motion.span
      className={`font-oxanium pointer-events-none absolute z-20 px-2 text-[8px] font-medium uppercase leading-none tracking-[0.14em] text-cyan-100/40 sm:text-[10px] sm:tracking-[0.2em] ${concept.position}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={
        isActive
          ? {
              opacity: [0.42, 1, 0.46],
              scale: [1, 1.055, 1],
              textShadow: [
                "0 0 0 rgba(34,211,238,0)",
                "0 0 18px rgba(236,254,255,0.5), 0 0 30px rgba(34,211,238,0.42)",
                "0 0 0 rgba(34,211,238,0)",
              ],
            }
          : { opacity: 0, scale: 0.98 }
      }
      transition={{
        opacity: {
          delay: concept.revealDelay,
          duration: 1.1,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 6.9,
        },
        textShadow: {
          delay: concept.revealDelay,
          duration: 1.1,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 6.9,
        },
        scale: {
          delay: concept.revealDelay,
          duration: 1.1,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 6.9,
        },
      }}
    >
      {concept.label}
    </motion.span>
  );
}

function OutcomeRadar({ isActive }) {
  return (
    <motion.div
      className="relative mx-auto h-[15rem] w-[15rem] sm:h-[18rem] sm:w-[18rem] lg:mx-0 lg:h-[22rem] lg:w-[22rem]"
      aria-label="Outcome radar showing screen, attention, clarity, and action connecting to outcomes."
      initial={false}
      animate={
        isActive
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.96, filter: "blur(5px)" }
      }
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-full border border-cyan-100/16 bg-[#061426]/18 shadow-[0_0_46px_rgba(34,211,238,0.055),inset_0_0_52px_rgba(34,211,238,0.025)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-[12%] rounded-full border border-cyan-100/12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-[25%] rounded-full border border-cyan-100/16"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-[39%] rounded-full border border-cyan-100/22"
        aria-hidden="true"
      />

      <span
        className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan-100/40 to-transparent"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-linear-to-r from-transparent via-cyan-100/40 to-transparent"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-0 top-1/2 h-px w-full rotate-45 bg-linear-to-r from-transparent via-cyan-100/20 to-transparent"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-0 top-1/2 h-px w-full -rotate-45 bg-linear-to-r from-transparent via-cyan-100/20 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{
          duration: 0.35,
          delay: isActive ? 0.24 : 0,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <span
            className="absolute inset-[7%] rounded-full opacity-70"
            style={{
              background:
                "conic-gradient(from -7deg at 50% 50%, transparent 0deg, rgba(34,211,238,0.13) 16deg, rgba(34,211,238,0.055) 28deg, transparent 42deg, transparent 360deg)",
            }}
          />
          <span className="absolute left-1/2 top-1/2 h-[43%] w-px origin-bottom -translate-x-1/2 -translate-y-full bg-linear-to-t from-cyan-100/82 via-cyan-100/30 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.38)]" />
          <span className="absolute left-1/2 top-[7%] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-cyan-50/30 bg-cyan-50/86 shadow-[0_0_20px_rgba(34,211,238,0.62)] sm:h-3 sm:w-3" />
        </motion.div>
      </motion.div>

      {radarConcepts.map((concept) => (
        <RadarConcept
          key={concept.label}
          concept={concept}
          isActive={isActive}
        />
      ))}

      <motion.div
        className="font-oxanium pointer-events-none absolute left-1/2 top-1/2 z-30 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-cyan-100/28 bg-[#061426]/78 text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-50 shadow-[0_0_32px_rgba(34,211,238,0.12),inset_0_0_24px_rgba(34,211,238,0.045)] backdrop-blur-sm sm:h-24 sm:w-24 sm:text-[11px] sm:tracking-[0.22em]"
        animate={
          isActive
            ? {
                boxShadow: [
                  "0 0 24px rgba(34,211,238,0.09), inset 0 0 20px rgba(34,211,238,0.035)",
                  "0 0 42px rgba(34,211,238,0.18), inset 0 0 34px rgba(34,211,238,0.07)",
                  "0 0 24px rgba(34,211,238,0.09), inset 0 0 20px rgba(34,211,238,0.035)",
                ],
                scale: [1, 1.035, 1],
              }
            : { scale: 1 }
        }
        transition={{
          duration: 3.2,
          delay: isActive ? 0.75 : 0,
          ease: "easeInOut",
          repeat: isActive ? Infinity : 0,
        }}
      >
        <span className="relative z-10">OUTCOMES</span>
      </motion.div>
    </motion.div>
  );
}

export default OutcomeRadar;
