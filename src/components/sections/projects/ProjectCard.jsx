import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const cardVariants = {
  hidden: () => ({
    opacity: 0,
    filter: "blur(7px)",
  }),
  visible: ({ isLarge, index }) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: isLarge ? 0.78 : 0.66,
      delay: isLarge ? 0.18 : 0.32 + index * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const imageVariants = {
  hidden: () => ({
    opacity: 0,
    filter: "blur(6px)",
  }),
  visible: ({ isLarge, index }) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: isLarge ? 0.72 : 0.58,
      delay: isLarge ? 0.34 : 0.46 + index * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function ProjectCard({ project, variant = "small", index = 0 }) {
  const isLarge = variant === "large";
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, {
    stiffness: 150,
    damping: 22,
    mass: 0.45,
  });
  const smoothPointerY = useSpring(pointerY, {
    stiffness: 150,
    damping: 22,
    mass: 0.45,
  });
  const depthRotateX = useTransform(smoothPointerY, [-1, 1], [8, -8]);
  const depthRotateY = useTransform(smoothPointerX, [-1, 1], [-8, 8]);
  const depthX = useTransform(smoothPointerX, [-1, 1], [-8, 8]);
  const depthY = useTransform(smoothPointerY, [-1, 1], [-8, 8]);
  const cardClassName = isLarge
    ? "flex flex-col p-4 sm:p-5 lg:grid lg:min-h-118 lg:grid-cols-[minmax(19rem,0.64fr)_minmax(0,1.36fr)] lg:items-center lg:gap-5 lg:p-5 xl:min-h-124 xl:gap-6 xl:p-6"
    : "flex flex-col p-4 sm:p-5";
  const imageFrameClassName = isLarge
    ? "mt-7 aspect-[1672/941] p-3 sm:p-4 lg:mt-0 lg:self-center lg:p-5"
    : "aspect-[16/10]";
  const imageShellClassName = isLarge
    ? "shadow-[0_24px_58px_rgba(0,0,0,0.38),0_0_42px_rgba(34,211,238,0.09),inset_0_0_0_1px_rgba(255,255,255,0.045)]"
    : "shadow-[0_18px_42px_rgba(0,0,0,0.32),0_0_28px_rgba(34,211,238,0.065),inset_0_0_0_1px_rgba(255,255,255,0.04)]";
  const contentClassName = isLarge
    ? "justify-between p-2 sm:p-3 lg:p-4 xl:p-5"
    : "pt-5";
  const titleClassName = isLarge
    ? "text-[clamp(2rem,7vw,3.8rem)] lg:text-[clamp(2.35rem,3vw,3.8rem)] xl:text-[clamp(2.5rem,2.75vw,4rem)]"
    : "text-[clamp(1.55rem,7vw,2.25rem)]";
  const descriptionClassName = isLarge
    ? "max-w-124 sm:text-base sm:leading-8"
    : "max-w-2xl";
  const depthStyle = {
    rotateX: depthRotateX,
    rotateY: depthRotateY,
    x: depthX,
    y: depthY,
    transformStyle: "preserve-3d",
  };

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    pointerX.set(Math.max(-1, Math.min(1, nextX)));
    pointerY.set(Math.max(-1, Math.min(1, nextY)));
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const cardContent = (
    <div className={`relative z-10 flex flex-col ${contentClassName}`}>
      <div>
        <p className="font-osiris text-xs uppercase tracking-[0.32em] text-cyan-100/54">
          {project.year}
        </p>

        <h3
          data-cursor="text"
          className={`font-bruno mt-5 max-w-[10.5ch] sm:max-w-[12ch] xl:max-w-[13ch] leading-[1.04] text-slate-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.12)] ${titleClassName}`}
        >
          {project.title}
        </h3>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <span
              className="font-oxanium rounded-full border border-cyan-100/14 bg-[#020817]/54 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-200/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>

        <p
          data-cursor="text"
          className={`font-oxanium mt-5 text-sm leading-7 text-slate-200/70 ${descriptionClassName}`}
        >
          {project.description}
        </p>
      </div>

      {project.projectUrl ? (
        <a
          aria-label={`Visit ${project.title}`}
          className="font-oxanium mt-7 inline-flex min-h-11 w-fit items-center justify-center border border-cyan-100/24 bg-cyan-100/7 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,0.08),inset_0_1px_0_rgba(255,255,255,0.07)] transition duration-300 hover:border-cyan-100/46 hover:bg-cyan-100/12 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817]"
          data-cursor="interactive"
          data-sound-hover="hover"
          href={project.projectUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          VISIT PROJECT
        </a>
      ) : null}
    </div>
  );

  const imageFrame = (
    <motion.div
      className={`relative z-10 overflow-hidden rounded-[7px] border border-cyan-100/16 bg-[#020817]/74 shadow-[0_18px_42px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.05)] ${isLarge ? "" : "p-2 sm:p-3"} ${imageFrameClassName}`}
      custom={{ isLarge, index }}
      variants={imageVariants}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-8 top-1/2 z-0 h-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-2xl ${
          isLarge ? "opacity-80" : "opacity-55"
        }`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-linear-to-br from-cyan-100/9 via-transparent to-[#020817]/38 opacity-80"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(2,8,23,0.44)_100%)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-30 h-px bg-linear-to-r from-transparent via-cyan-100/34 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-2 z-30 h-5 w-5 rounded-bl-[5px] border-b border-l border-cyan-100/22"
      />
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 z-30 h-5 w-5 rounded-tr-[5px] border-r border-t border-cyan-100/28"
      />
      <motion.div
        className={`relative z-10 h-full w-full overflow-hidden rounded-[5px] bg-[#010712]/70 ${imageShellClassName}`}
        style={depthStyle}
      >
        <img
          alt={`${project.title} project screenshot`}
          className="relative z-0 h-full w-full object-contain object-center"
          draggable="false"
          loading="lazy"
          src={project.image}
        />{" "}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_38px_rgba(2,8,23,0.42),inset_0_0_0_1px_rgba(34,211,238,0.08)]"
        />
      </motion.div>
    </motion.div>
  );

  return (
    <motion.article
      className={`group relative overflow-hidden border border-cyan-100/14 bg-[#061426]/52 shadow-[0_24px_70px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition duration-300 hover:border-cyan-100/30 hover:bg-[#07182d]/64 hover:shadow-[0_26px_78px_rgba(0,0,0,0.38),0_0_34px_rgba(34,211,238,0.09),inset_0_1px_0_rgba(255,255,255,0.07)] ${cardClassName}`}
      custom={{ isLarge, index }}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={{ perspective: isLarge ? 1200 : 950 }}
      variants={cardVariants}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-8 w-8 border-l border-t border-cyan-100/36"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-cyan-100/24"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-cyan-100/28 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/8 blur-3xl transition duration-300 group-hover:bg-cyan-300/12"
      />
      {isLarge ? (
        <>
          {cardContent}
          {imageFrame}
        </>
      ) : (
        <>
          {imageFrame}
          {cardContent}
        </>
      )}
    </motion.article>
  );
}

export default ProjectCard;
