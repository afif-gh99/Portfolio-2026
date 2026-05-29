import { motion } from "framer-motion";
import { heroLines, heroMeta } from "./heroMotion.js";

function HeroContent({
  animationState,
  contentVariants,
  itemMotion,
  headlineVariants,
  headlineLineMotion,
}) {
  return (
    <motion.div
      className="max-w-5xl order-2 lg:order-0"
      variants={contentVariants}
      initial="hidden"
      animate={animationState}
    >
      <motion.div
        className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-5"
        variants={itemMotion}
      >
        <p className="font-osiris text-xs tracking-[0.28em] text-cyan-100/70 sm:text-sm">
          01 / HOME
        </p>
        <span className="hidden h-px w-14 bg-cyan-100/30 sm:block" />
        <p className="font-oxanium text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300/70 sm:text-xs">
          STATUS: AVAILABLE FOR SELECTED PROJECTS
        </p>
      </motion.div>

      <motion.h1
        data-cursor="text"
        className="font-bruno max-w-[14ch] text-[clamp(1.1rem,6vw,6rem)] leading-[0.96] text-slate-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.14)] sm:max-w-[16ch] md:text-[clamp(2.1rem,3.6vw,3.95rem)] lg:max-w-[15.5ch] xl:text-[clamp(2.8rem,2.9vw,4rem)]"
        variants={headlineVariants}
      >
        {heroLines.map((line) => (
          <motion.span
            key={line}
            className="block whitespace-nowrap"
            variants={headlineLineMotion}
          >
            {line}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        data-cursor="text"
        className="font-oxanium mt-5 max-w-md text-base leading-7 text-slate-200/78 sm:mt-6 sm:text-[1.3rem]"
        variants={itemMotion}
      >
        I design and build front-end experiences with motion, precision, and
        purpose.
      </motion.p>

      <motion.div
        className="font-oxanium mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-100/68 sm:justify-start sm:gap-3 md:text-sm xs:flex-nowrap lg:gap-3 lg:text-[0.9rem] lg:tracking-[0.14em]"
        variants={itemMotion}
      >
        {heroMeta.map((item, index) => (
          <span key={item} className="flex items-center gap-2 sm:gap-3">
            <span>{item}</span>
            {index < heroMeta.length - 1 && (
              <span className="text-cyan-100/35" aria-hidden="true">
                {"\u2022"}
              </span>
            )}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="mt-7 flex gap-3 items-center"
        variants={itemMotion}
      >
        <a
          href="https://linkedin.com/in/afif-ghaziri2004"
          target="_blank"
          rel="noreferrer"
          data-sound="click"
          data-sound-hover="hover"
          className="font-oxanium inline-flex min-h-12 items-center justify-center gap-2.5 border border-cyan-200/55 bg-cyan-100/10 px-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.13)] outline-none transition duration-300 hover:border-cyan-100 hover:bg-cyan-100/16 hover:shadow-[0_0_34px_rgba(34,211,238,0.24)] focus-visible:ring-2 focus-visible:ring-cyan-200/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#04162c]"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="currentColor"
          >
            <path d="M6.94 8.96H3.76V20h3.18V8.96ZM5.35 4a1.84 1.84 0 1 0 0 3.68A1.84 1.84 0 0 0 5.35 4ZM20.25 13.66c0-3.14-1.67-4.95-4.36-4.95-1.56 0-2.55.86-2.96 1.47h-.05V8.96H9.84V20h3.17v-5.46c0-1.44.27-2.83 2.05-2.83 1.76 0 1.78 1.65 1.78 2.92V20H20v-6.34h.25Z" />
          </svg>
          LINKEDIN
        </a>
        <a
          href="/assets/pdf/Afif_Ghaziri_Frontend_React_Developer.pdf"
          download
          data-sound="click"
          data-sound-hover="hover"
          className="font-oxanium inline-flex min-h-12 items-center justify-center gap-2.5 border border-cyan-100/18 bg-[#06101f]/50 px-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100 outline-none backdrop-blur-md transition duration-300 hover:border-cyan-200/45 hover:bg-cyan-100/8 hover:text-cyan-50 focus-visible:ring-2 focus-visible:ring-cyan-200/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#04162c]"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 3.75h6.1L18 8.65v11.6H7V3.75Z" />
            <path d="M13 4v5h5" />
            <path d="M9.75 13h4.5" />
            <path d="M9.75 16h3.25" />
          </svg>
          DOWNLOAD CV
        </a>
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
