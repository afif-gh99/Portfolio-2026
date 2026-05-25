import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const OPENING_DURATION = 850;
const HERO_ANIMATION_DELAY = 900;
const LOADING_START_DELAY = 800;
const cinematicEase = [0.16, 1, 0.3, 1];
const progressSteps = [
  { value: 8, delay: 300 },
  { value: 19, delay: 490 },
  { value: 34, delay: 580 },
  { value: 46, delay: 600 },
  { value: 53, delay: 760 },
  { value: 68, delay: 900 },
  { value: 76, delay: 1180 },
  { value: 88, delay: 1400 },
  { value: 94, delay: 1680 },
  { value: 100, delay: 1800 },
];

function CommandFrameDetails() {
  return (
    <>
      <div className="pointer-events-none absolute inset-5 border border-cyan-100/10" />
      <div className="pointer-events-none absolute left-6 top-6 h-12 w-12 border-l border-t border-cyan-200/38" />
      <div className="pointer-events-none absolute right-6 top-6 h-12 w-12 border-r border-t border-cyan-200/24" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-12 w-12 border-b border-l border-cyan-200/24" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-12 w-12 border-b border-r border-cyan-200/38" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_35%)]" />
    </>
  );
}

function IntroGate({ children, onHeroAnimationReady, onIntroComplete }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const heroAnimationTimeoutRef = useRef(null);

  useEffect(() => {
    if (hasEntered) {
      return undefined;
    }

    const timeoutIds = progressSteps.map((step) =>
      window.setTimeout(() => {
        setProgress(step.value);

        if (step.value === 100) {
          setIsReady(true);
        }
      }, LOADING_START_DELAY + step.delay),
    );

    return () => {
      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, [hasEntered]);

  useEffect(() => {
    return () => {
      if (heroAnimationTimeoutRef.current) {
        window.clearTimeout(heroAnimationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasEntered) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasEntered]);

  const handleUnlock = () => {
    if (!isReady || isEntering) {
      return;
    }

    setIsEntering(true);

    heroAnimationTimeoutRef.current = window.setTimeout(() => {
      onHeroAnimationReady?.();
    }, HERO_ANIMATION_DELAY);

    window.setTimeout(() => {
      onIntroComplete?.();
      setHasEntered(true);
    }, OPENING_DURATION);
  };

  return (
    <>
      {children}

      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            className="fixed inset-0 z-[999] overflow-hidden bg-[#020817] text-slate-100"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: cinematicEase }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#020817]"
              animate={isEntering ? { y: "-104%" } : { y: "0%" }}
              transition={{ duration: 0.85, ease: cinematicEase }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#031225_0%,#020817_50%,#041226_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.13),transparent_42%)]" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#020817]"
              animate={isEntering ? { y: "104%" } : { y: "0%" }}
              transition={{ duration: 0.85, ease: cinematicEase }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#031225_0%,#020817_50%,#041226_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.13),transparent_42%)]" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-200/60 shadow-[0_0_22px_rgba(34,211,238,0.8),0_0_70px_rgba(56,189,248,0.36)]"
              initial={{ opacity: 0, scaleX: 0.35 }}
              animate={
                isEntering
                  ? { opacity: 1, scaleX: 1 }
                  : { opacity: 0, scaleX: 0.35 }
              }
              transition={{ duration: 0.26, ease: cinematicEase }}
            />

            <motion.div
              className="relative z-10 flex min-h-dvh items-center justify-center px-5 py-10 sm:px-8"
              animate={isEntering ? { y: -4 } : { y: 0 }}
              transition={{ duration: 0.32, ease: cinematicEase }}
            >
              <motion.div
                className="relative w-full max-w-4xl"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.35, ease: cinematicEase }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-[28px]  border border-cyan-100/12 bg-[#06101f]/64 px-5 py-7 shadow-[0_30px_120px_rgba(0,0,0,0.52),0_0_55px_rgba(34,211,238,0.11),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-8 sm:py-9 lg:px-10 lg:py-10"
                  animate={
                    isEntering
                      ? { opacity: 0, y: -8, filter: "blur(4px)" }
                      : { opacity: 1, y: 0, filter: "blur(0px)" }
                  }
                  transition={{
                    duration: isEntering ? 0.18 : 0.32,
                    ease: cinematicEase,
                  }}
                >
                  <CommandFrameDetails />

                  <span
                    data-cursor="text"
                    className="pointer-events-none absolute left-7 top-8 z-10 font-mono text-[8px] uppercase tracking-[0.16em] text-cyan-100/38 sm:left-9 sm:top-10 sm:text-[10px] sm:tracking-[0.22em]"
                  >
                    PORTFOLIO_GATE / 2026
                  </span>

                  <div className="pointer-events-none absolute bottom-8 right-7 z-10 font-mono text-[8px] uppercase tracking-[0.16em] text-cyan-100/38 sm:bottom-10 sm:right-9 sm:text-[10px] sm:tracking-[0.22em]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isReady ? "ready-status" : "loading-status"}
                        data-cursor="text"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.24, ease: cinematicEase }}
                      >
                        {isReady ? "STATUS: READY" : "STATUS: INITIALIZING"}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-7 right-7 top-14 z-[1] h-px bg-gradient-to-r from-transparent via-cyan-200/34 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.2)] sm:left-9 sm:right-9"
                    initial={{ opacity: 0, y: 0 }}
                    animate={
                      !isReady && !isEntering
                        ? { opacity: [0, 0.38, 0], y: [0, 150, 280] }
                        : { opacity: 0, y: 280 }
                    }
                    transition={{
                      duration: 1.55,
                      delay: 0.72,
                      ease: cinematicEase,
                    }}
                  />

                  <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
                    <motion.p
                      data-cursor="text"
                      className="font-audiowide  mt-5 text-[clamp(2.5rem,14vw,7.5rem)] leading-none text-slate-50 drop-shadow-[0_0_28px_rgba(34,211,238,0.24)]"
                      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.34,
                        delay: 0.18,
                        ease: cinematicEase,
                      }}
                    >
                      AFIF.GH
                    </motion.p>

                    <motion.p
                      data-cursor="text"
                      className="font-bruno mt-5 text-xs leading-6 text-cyan-100/88 sm:text-sm"
                      initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.3,
                        delay: 0.32,
                        ease: cinematicEase,
                      }}
                    >
                      CREATIVE FRONT-END DEVELOPER
                    </motion.p>

                    <motion.p
                      data-cursor="text"
                      className="font-oxanium mt-5 max-w-xl text-base leading-7 text-slate-300/82 sm:text-lg"
                      initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.3,
                        delay: 0.46,
                        ease: cinematicEase,
                      }}
                    >
                      Code is not just built. It is crafted.
                    </motion.p>

                    <motion.div
                      className="mt-10 w-full max-w-lg"
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.32,
                        delay: 0.6,
                        ease: cinematicEase,
                      }}
                    >
                      <div className="mb-3 min-h-4 font-mono text-[11px] uppercase text-cyan-100/64 sm:text-xs ">
                        <AnimatePresence mode="wait">
                          {!isReady ? (
                            <motion.div
                              key="loading-row"
                              className="flex items-center justify-between gap-4 text-left px-3 sm:px-0"
                              initial={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{
                                duration: 0.24,
                                ease: cinematicEase,
                              }}
                            >
                              <span data-cursor="text">
                                INITIALIZING INTERFACE...
                              </span>
                              <span data-cursor="text" className="tabular-nums">
                                {progress}%
                              </span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="ready-row"
                              data-cursor="text"
                              className="text-center font-osiris"
                              initial={{ opacity: 0, x: -18, y: -2 }}
                              animate={{ opacity: 1, x: 0, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.08,
                                ease: cinematicEase,
                              }}
                            >
                              SYSTEM READY
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="relative flex min-h-12 items-center justify-center">
                        <AnimatePresence mode="wait">
                          {!isReady ? (
                            <motion.div
                              key="progress"
                              className="sm:w-full w-2xs"
                              initial={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{
                                duration: 0.24,
                                ease: cinematicEase,
                              }}
                            >
                              <div
                                className="h-1.5 overflow-hidden rounded-full border border-cyan-100/16 bg-cyan-950/38"
                                aria-label="Loading progress"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-valuenow={progress}
                                role="progressbar"
                              >
                                <motion.div
                                  className="h-full origin-left bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.68)]"
                                  animate={{ scaleX: progress / 100 }}
                                  transition={{
                                    duration: 0.12,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                            </motion.div>
                          ) : (
                            <motion.button
                              key="unlock"
                              type="button"
                              data-cursor="interactive"
                              data-sound="click"
                              data-sound-hover="hover"
                              onClick={handleUnlock}
                              disabled={isEntering}
                              className="group relative mb-5 min-h-12 overflow-hidden rounded-[18px] border border-cyan-200/34 bg-cyan-100/7 px-5 font-bruno text-[11px] leading-none text-cyan-50 shadow-[0_14px_50px_rgba(0,0,0,0.3),0_0_28px_rgba(34,211,238,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] outline-none transition duration-300 hover:border-cyan-100/68 hover:bg-cyan-100/12 hover:shadow-[0_16px_54px_rgba(0,0,0,0.36),0_0_40px_rgba(34,211,238,0.24),inset_0_1px_0_rgba(255,255,255,0.12)] focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] disabled:pointer-events-none disabled:opacity-60 sm:mb-0 sm:px-6 sm:text-xs"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.14,
                                ease: cinematicEase,
                              }}
                            >
                              <span className="pointer-events-none absolute inset-px rounded-[17px] border border-cyan-50/0 transition duration-300 group-hover:border-cyan-50/12" />
                              <span className="pointer-events-none absolute inset-y-0 -left-16 w-14 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-100/22 to-transparent opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:left-[115%] group-hover:opacity-100" />
                              <span className="relative z-10">
                                UNLOCK THE EXPERIENCE →
                              </span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 right-4 top-1/2 z-20 h-px -translate-y-1/2 bg-cyan-200/70 shadow-[0_0_24px_rgba(34,211,238,0.72)]"
                  initial={{ opacity: 0 }}
                  animate={
                    isEntering ? { opacity: [0, 1, 0.25] } : { opacity: 0 }
                  }
                  transition={{ duration: 0.58, ease: cinematicEase }}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
                >
                  <motion.div
                    className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-[28px]"
                    initial={{ opacity: 0, y: "0%" }}
                    animate={
                      isEntering
                        ? { opacity: [1, 1, 0], y: ["0%", "-112%", "-118%"] }
                        : { opacity: 0, y: "0%" }
                    }
                    transition={{
                      duration: 0.85,
                      ease: cinematicEase,
                      times: [0, 0.72, 1],
                    }}
                  >
                    <div className="absolute inset-x-0 top-0 h-[200%] overflow-hidden rounded-[28px] border border-cyan-100/12 bg-[#06101f]/64 shadow-[0_30px_120px_rgba(0,0,0,0.52),0_0_55px_rgba(34,211,238,0.11),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                      <CommandFrameDetails />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-[28px]"
                    initial={{ opacity: 0, y: "0%" }}
                    animate={
                      isEntering
                        ? { opacity: [1, 1, 0], y: ["0%", "112%", "118%"] }
                        : { opacity: 0, y: "0%" }
                    }
                    transition={{
                      duration: 0.85,
                      ease: cinematicEase,
                      times: [0, 0.72, 1],
                    }}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-[200%] overflow-hidden rounded-[28px] border border-cyan-100/12 bg-[#06101f]/64 shadow-[0_30px_120px_rgba(0,0,0,0.52),0_0_55px_rgba(34,211,238,0.11),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                      <CommandFrameDetails />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default IntroGate;
