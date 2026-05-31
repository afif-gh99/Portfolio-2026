import { motion } from "framer-motion";

const nodeRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 0.58,
    filter: "blur(5px)",
  },
  visible: (delay) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.52,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function SkillOrbitNode({
  group,
  isHovered,
  onHoverEnd,
  onHoverStart,
  revealDelay,
  shouldReveal,
  skill,
}) {
  const Icon = skill.icon;
  const iconClassName =
    "relative z-10 h-[1em] w-[1em] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.12)] transition duration-300 group-hover/node:scale-110";

  const handlePointerEnter = (event) => {
    if (event.pointerType !== "touch") {
      onHoverStart();
    }
  };

  const handlePointerLeave = (event) => {
    if (event.pointerType !== "touch") {
      onHoverEnd();
    }
  };

  return (
    <div
      className={`skill-orbit-node-position absolute left-1/2 top-1/2 flex h-0 w-0 items-center justify-center ${
        isHovered ? "z-999" : "z-20"
      }`}
      style={{
        "--node-angle": `${skill.angle}deg`,
        "--node-angle-inverse": `${skill.angle * -1}deg`,
        "--node-radius": group.radius,
      }}
    >
      <div className="skill-orbit-counter relative">
        <motion.div
          animate={shouldReveal ? "visible" : "hidden"}
          custom={revealDelay}
          initial="hidden"
          variants={nodeRevealVariants}
        >
          <button
            type="button"
            aria-label={`${skill.name} skill in ${group.label}`}
            className={`group/node pointer-events-auto relative flex h-8 w-8 items-center justify-center rounded-full border bg-[#06101f]/88 text-sm shadow-[0_10px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] outline-none backdrop-blur-md transition duration-300 hover:scale-[1.08] hover:brightness-110 focus-visible:scale-[1.08] focus-visible:ring-2 focus-visible:ring-cyan-200/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] sm:h-10 sm:w-10 sm:text-lg lg:h-11 lg:w-11 lg:text-xl xl:h-12 xl:w-12 xl:text-2xl ${
              isHovered
                ? "border-cyan-100/52 bg-cyan-100/9 shadow-[0_12px_34px_rgba(0,0,0,0.34),0_0_22px_rgba(34,211,238,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                : "border-cyan-100/18 hover:border-cyan-100/45 hover:bg-cyan-100/8 hover:shadow-[0_12px_34px_rgba(0,0,0,0.34),0_0_20px_rgba(34,211,238,0.14)]"
            }`}
            data-cursor="interactive"
            onBlur={onHoverEnd}
            onClick={onHoverStart}
            onFocus={onHoverStart}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            <span
              aria-hidden="true"
              className="absolute inset-1 rounded-full border border-cyan-100/8"
            />
            {skill.iconSrc ? (
              <img
                src={skill.iconSrc}
                alt=""
                aria-hidden="true"
                className={iconClassName}
                draggable="false"
              />
            ) : (
              <Icon
                aria-hidden="true"
                className={iconClassName}
                style={{ color: skill.color }}
              />
            )}
            <span
              className={`font-oxanium pointer-events-none absolute left-1/2 top-0 z-50 whitespace-nowrap rounded-md border border-cyan-100/22 bg-[#04101f]/94 px-2.5 py-1.5 text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-cyan-50  shadow-[0_10px_24px_rgba(0,0,0,0.34),0_0_14px_rgba(34,211,238,0.12)] backdrop-blur-md transition duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: isHovered
                  ? "translate(-50%, calc(-100% - 0.55rem))"
                  : "translate(-50%, calc(-100% - 0.25rem))",
              }}
            >
              {skill.name}
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default SkillOrbitNode;
