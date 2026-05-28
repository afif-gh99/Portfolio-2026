import { useRef } from "react";
import { motion } from "framer-motion";

function HeroPortrait({ animationState, portraitMotion }) {
  const portraitFrameRef = useRef(null);

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
        <div className="pointer-events-none absolute inset-[-7%] bg-cyan-300/8 blur-3xl" />

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
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
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
  );
}

export default HeroPortrait;
