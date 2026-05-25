import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const cinematicEase = [0.16, 1, 0.3, 1];
const OPEN_DURATION = 680;
const REDUCED_DURATION = 200;

function SessionRevealGate({ children, onComplete }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const finishTimeoutRef = useRef(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (isDone) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDone]);

  useEffect(() => {
    return () => {
      if (finishTimeoutRef.current) {
        window.clearTimeout(finishTimeoutRef.current);
      }
    };
  }, []);

  const handleResume = () => {
    if (isOpening) {
      return;
    }

    setIsOpening(true);

    finishTimeoutRef.current = window.setTimeout(
      () => {
        setIsDone(true);
        onCompleteRef.current?.();
      },
      shouldReduceMotion ? REDUCED_DURATION : OPEN_DURATION,
    );
  };

  const panelTransition = {
    duration: shouldReduceMotion ? 0.16 : 0.68,
    ease: cinematicEase,
  };

  return (
    <>
      {children}

      <AnimatePresence>
        {!isDone && (
          <motion.div
            className="fixed inset-0 z-[998] overflow-hidden bg-[#020817] text-slate-100"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: cinematicEase }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#020817]"
              animate={
                isOpening
                  ? shouldReduceMotion
                    ? { opacity: 0 }
                    : { y: "-104%", opacity: 1 }
                  : { y: "0%", opacity: 1 }
              }
              transition={panelTransition}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#031225_0%,#020817_52%,#041226_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.12),transparent_42%)]" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#020817]"
              animate={
                isOpening
                  ? shouldReduceMotion
                    ? { opacity: 0 }
                    : { y: "104%", opacity: 1 }
                  : { y: "0%", opacity: 1 }
              }
              transition={panelTransition}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#031225_0%,#020817_52%,#041226_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.12),transparent_42%)]" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-200/56 shadow-[0_0_20px_rgba(34,211,238,0.76),0_0_58px_rgba(56,189,248,0.3)]"
              initial={{ opacity: 0 }}
              animate={
                isOpening
                  ? { opacity: shouldReduceMotion ? 0 : 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.22, ease: cinematicEase }}
            />

            <motion.div
              className="relative z-10 flex min-h-dvh items-center justify-center px-5"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isOpening
                  ? { opacity: 0, y: shouldReduceMotion ? 0 : -8 }
                  : { opacity: 1, y: 0 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.14 : 0.28,
                ease: cinematicEase,
              }}
            >
              <div className="relative overflow-hidden rounded-[24px] border border-cyan-100/12 bg-[#06101f]/50 px-8 py-7 text-center shadow-[0_26px_90px_rgba(0,0,0,0.42),0_0_42px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl sm:px-12 sm:py-8">
                <div className="pointer-events-none absolute inset-4 border border-cyan-100/10" />
                <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-cyan-200/32" />
                <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-cyan-200/32" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_42%)]" />

                <div className="relative z-10">
                  <p
                    data-cursor="text"
                    className="font-bruno text-xs leading-6 text-cyan-100/86 sm:text-sm"
                  >
                    INTERFACE RESTORED
                  </p>
                  <p
                    data-cursor="text"
                    className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-100/46"
                  >
                    SESSION ACTIVE
                  </p>
                  <motion.button
                    type="button"
                    data-cursor="interactive"
                    data-sound="click"
                    data-sound-hover="hover"
                    onClick={handleResume}
                    disabled={isOpening}
                    className="group relative mt-6 min-h-10 overflow-hidden rounded-[14px] border border-cyan-200/26 bg-cyan-100/6 px-4 font-bruno text-[10px] leading-none text-cyan-50 shadow-[0_10px_34px_rgba(0,0,0,0.28),0_0_18px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.07)] outline-none transition duration-300 hover:border-cyan-100/55 hover:bg-cyan-100/10 hover:shadow-[0_12px_38px_rgba(0,0,0,0.32),0_0_26px_rgba(34,211,238,0.18),inset_0_1px_0_rgba(255,255,255,0.1)] focus-visible:ring-2 focus-visible:ring-cyan-200/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] disabled:pointer-events-none disabled:opacity-60 sm:px-5 sm:text-[11px]"
                    whileTap={shouldReduceMotion ? undefined : { y: 1 }}
                    transition={{ duration: 0.16, ease: cinematicEase }}
                  >
                    <span className="pointer-events-none absolute inset-px rounded-[13px] border border-cyan-50/0 transition duration-300 group-hover:border-cyan-50/10" />
                    <span className="pointer-events-none absolute inset-y-0 -left-14 w-12 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-100/18 to-transparent opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:left-[115%] group-hover:opacity-100" />
                    <span className="relative z-10">
                      RESUME THE INTERFACE →
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SessionRevealGate;
