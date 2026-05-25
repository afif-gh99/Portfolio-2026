import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const heroLines = ["YOU\u2019RE NOT HERE", "FOR ANOTHER BASIC", "PORTFOLIO."];

const heroMeta = [
  "Frontend Developer",
  "Software Engineer",
  "Business Mindset",
];

const easing = [0.16, 1, 0.3, 1];

const contentVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.08,
    },
  },
};

const contentItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
    transition: { duration: 0.4, ease: easing },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easing },
  },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

const headlineVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const headlineLineVariants = {
  hidden: {
    opacity: 0,
    x: -34,
    filter: "blur(6px)",
    transition: { duration: 0.55, ease: easing },
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: easing },
  },
};

const reducedHeadlineLineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

const portraitVariants = {
  hidden: {
    opacity: 0,
    x: 52,
    scale: 1.07,
    filter: "blur(8px)",
    transition: { duration: 0.75, ease: easing },
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, delay: 0.4, ease: easing },
  },
};

const reducedPortraitVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

const scrollCueVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: easing },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: 2.15, ease: easing },
  },
};

const reducedScrollCueVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, delay: 1.8, ease: "easeOut" },
  },
};

function Hero({ canAnimateHero = true }) {
  const shouldReduceMotion = useReducedMotion();
  const heroSectionRef = useRef(null);
  const portraitFrameRef = useRef(null);
  const isHeroInView = useInView(heroSectionRef, { amount: 0.5 });
  const itemMotion = shouldReduceMotion
    ? reducedItemVariants
    : contentItemVariants;
  const headlineLineMotion = shouldReduceMotion
    ? reducedHeadlineLineVariants
    : headlineLineVariants;
  const portraitMotion = shouldReduceMotion
    ? reducedPortraitVariants
    : portraitVariants;
  const scrollCueMotion = shouldReduceMotion
    ? reducedScrollCueVariants
    : scrollCueVariants;
  const animationState = canAnimateHero && isHeroInView ? "visible" : "hidden";

  const handlePortraitPointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    const frame = portraitFrameRef.current;
    if (!frame) return;

    const bounds = frame.getBoundingClientRect();
    const mouseX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const mouseY = ((event.clientY - bounds.top) / bounds.height) * 100;
    const pressX = (50 - mouseX) * 0.045;
    const pressY = (50 - mouseY) * 0.045;

    frame.style.setProperty("--mouse-x", `${mouseX}%`);
    frame.style.setProperty("--mouse-y", `${mouseY}%`);
    frame.style.setProperty("--press-x", `${pressX}px`);
    frame.style.setProperty("--press-y", `${pressY}px`);
  };

  const handlePortraitPointerLeave = () => {
    const frame = portraitFrameRef.current;
    if (!frame) return;

    frame.style.setProperty("--mouse-x", "50%");
    frame.style.setProperty("--mouse-y", "50%");
    frame.style.setProperty("--press-x", "0px");
    frame.style.setProperty("--press-y", "0px");
  };

  return (
    <section
      ref={heroSectionRef}
      className="relative flex min-h-dvh items-center overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32 lg:h-dvh lg:min-h-[42rem] lg:pb-10 lg:pt-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.82fr)] lg:gap-10 xl:max-w-7xl xl:gap-14">
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
            className="font-bruno max-w-[14ch] text-[clamp(1.1rem,6vw,6rem)]  md:text-[clamp(2.1rem,3.8vw,4.1rem)] leading-[0.96] text-slate-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.14)] sm:max-w-[18ch] lg:max-w-[18ch]  xl:text-[clamp(3.1rem,3.2vw,4.35rem)]"
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
            className="font-oxanium mt-4 flex flex-wrap justify-center sm:justify-start items-center gap-2 text-[10px] md:text-base font-medium uppercase tracking-[0.16em] text-cyan-100/68 sm:gap-3"
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

        <motion.div
          className="relative mx-auto w-[min(72vw,20rem)] justify-self-center sm:w-[min(58vw,23rem)] lg:mr-[-2vw] lg:w-[clamp(20rem,31vw,26rem)] lg:justify-self-end xl:mr-[-3vw] xl:w-[clamp(22rem,32vw,28rem)] 2xl:mr-[-4vw]"
          variants={portraitMotion}
          initial="hidden"
          animate={animationState}
        >
          <div
            ref={portraitFrameRef}
            className="group/portrait relative aspect-square w-full [--mouse-x:50%] [--mouse-y:50%] [--press-scale:1] [--press-x:0px] [--press-y:0px] [@media_(hover:hover)_and_(pointer:fine)]:group-hover/portrait:[--press-scale:0.700]"
            onPointerMove={handlePortraitPointerMove}
            onPointerLeave={handlePortraitPointerLeave}
          >
            <div className="pointer-events-none absolute -inset-[7%] bg-cyan-300/8 blur-3xl" />

            <div
              className="absolute inset-0 overflow-hidden border border-cyan-200/38 bg-[#06101f]/68 shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_42px_rgba(34,211,238,0.14)]"
              style={{
                clipPath:
                  "polygon(14% 0, 100% 0, 100% 86%, 86% 100%, 0 100%, 0 14%)",
              }}
            >
              <img
                src="/assets/images/profile.webp"
                alt="Portrait of Afif Ghaziri"
                className="h-full w-full transform-gpu object-cover object-center opacity-92 saturate-[0.92] transition duration-500 ease-out [@media_(hover:hover)_and_(pointer:fine)]:group-hover/portrait:brightness-[0.84] [@media_(hover:hover)_and_(pointer:fine)]:group-hover/portrait:saturate-[0.98]"
                style={{
                  transform:
                    "translate3d(var(--press-x), var(--press-y), 0) scale(var(--press-scale))",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0)_58%,rgba(2,8,23,0.58)_100%)]" />
              <div className="pointer-events-none absolute inset-[4.5%] border border-cyan-100/12" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 ease-out [@media_(hover:hover)_and_(pointer:fine)]:group-hover/portrait:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(34,211,238,0.28), rgba(56,189,248,0.13) 16%, transparent 34%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out [@media_(hover:hover)_and_(pointer:fine)]:group-hover/portrait:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(2,8,23,0.26), rgba(2,8,23,0.18) 14%, rgba(34,211,238,0.08) 26%, transparent 45%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-[3%] opacity-0 shadow-[inset_0_0_42px_rgba(2,8,23,0.62),inset_0_0_18px_rgba(34,211,238,0.08)] transition-opacity duration-300 ease-out [@media_(hover:hover)_and_(pointer:fine)]:group-hover/portrait:opacity-100"
                style={{
                  clipPath:
                    "polygon(12% 0, 100% 0, 100% 86%, 86% 100%, 0 100%, 0 12%)",
                }}
              />
            </div>

            <span className="pointer-events-none absolute right-0 top-0 h-[13%] w-[13%] border-r-3 border-t-3 border-cyan-100/40" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-[13%] w-[13%] border-b-3 border-l-3 border-cyan-100/35" />
            <span
              className="pointer-events-none absolute left-[0.1%] top-[13.7%] h-px w-[19.4%] origin-left -rotate-45 bg-cyan-100/55 shadow-[0_0_14px_rgba(34,211,238,0.28)]"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute right-[0.1%] bottom-[13.7%] h-px w-[19.4%] origin-right -rotate-45 bg-cyan-100/55 shadow-[0_0_14px_rgba(34,211,238,0.28)]"
              aria-hidden="true"
            />
            <div className="font-oxanium pointer-events-none absolute bottom-[5%] left-[5%] max-w-[82%] border border-cyan-100/18 bg-[#020817]/58 px-[3.5%] py-[2.5%] text-[clamp(0.5rem,1.35vw,0.625rem)] uppercase tracking-[0.18em] text-cyan-100/62 backdrop-blur-md">
              AFIF Ghaziri / VISUAL ID
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-center min-[420px]:flex sm:bottom-3 "
        variants={scrollCueMotion}
        initial="hidden"
        animate={animationState}
        aria-hidden="true"
      >
        <span className="font-oxanium text-[0.58rem] font-medium uppercase tracking-[0.32em] text-cyan-100/42 sm:text-[0.62rem]">
          SCROLL TO EXPLORE
        </span>
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-cyan-100/55 via-cyan-100/28 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.18)] sm:h-10"
          animate={
            shouldReduceMotion || animationState !== "visible"
              ? undefined
              : { scaleY: [0.55, 1, 0.55], opacity: [0.34, 0.76, 0.34] }
          }
          transition={
            shouldReduceMotion || animationState !== "visible"
              ? undefined
              : { duration: 2.3, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}

export default Hero;
