import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const featuredCardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "reverse" ? 34 : -34,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.86,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const imageVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "reverse" ? -18 : 18,
    filter: "blur(6px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.14,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ProjectArchiveFeaturedCard({ project, index = 0 }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    amount: 0.34,
    once: true,
    margin: "-8% 0px -12% 0px",
  });
  const isReversed = index % 2 === 1;
  const direction = isReversed ? "reverse" : "normal";

  return (
    <motion.article
      ref={cardRef}
      className={`group relative grid overflow-hidden border border-cyan-100/15 bg-[#061426]/56 p-4 shadow-[0_24px_76px_rgba(0,0,0,0.34),0_0_34px_rgba(34,211,238,0.055),inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-md transition duration-300 hover:border-cyan-100/30 hover:bg-[#07182d]/66 hover:shadow-[0_26px_82px_rgba(0,0,0,0.38),0_0_40px_rgba(34,211,238,0.09),inset_0_1px_0_rgba(255,255,255,0.075)] sm:p-5 lg:items-center lg:gap-5 lg:p-6 xl:gap-7 ${
        isReversed
          ? "lg:grid-cols-[minmax(0,1.42fr)_minmax(18rem,0.58fr)]"
          : "lg:grid-cols-[minmax(18rem,0.58fr)_minmax(0,1.42fr)]"
      }`}
      custom={direction}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={featuredCardVariants}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-8 w-8 border-l border-t border-cyan-100/34"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-cyan-100/24"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-cyan-100/26 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute -right-18 -top-18 h-48 w-48 rounded-full bg-cyan-300/8 blur-3xl transition duration-300 group-hover:bg-cyan-300/12"
      />

      <div
        className={`relative z-10 flex flex-col justify-between p-1 sm:p-2 lg:p-3 ${
          isReversed ? "lg:order-last" : ""
        }`}
      >
        <div>
          <p className="font-osiris text-xs uppercase tracking-[0.32em] text-cyan-100/56">
            {project.year}
          </p>
          <h3
            className="font-bruno mt-5 max-w-[13ch] text-[clamp(2rem,8vw,4rem)] leading-[1.04] text-slate-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.12)] lg:text-[clamp(2.35rem,3.1vw,4rem)]"
            data-cursor="text"
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
          <p className="font-oxanium mt-5 max-w-2xl text-sm leading-7 text-slate-200/72 sm:text-base sm:leading-8">
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

      <motion.div
        className={`relative z-10 order-first mt-7 aspect-1672/941 overflow-hidden rounded-[7px] border border-cyan-100/16 bg-[#020817]/74 p-3 shadow-[0_18px_42px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-4 lg:mt-0 lg:p-5 ${
          isReversed ? "lg:order-first" : "lg:order-last"
        }`}
        custom={direction}
        variants={imageVariants}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-8 top-1/2 z-0 h-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 opacity-80 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 z-20 bg-linear-to-br from-cyan-100/8 via-transparent to-[#020817]/36"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-30 h-px bg-linear-to-r from-transparent via-cyan-100/34 to-transparent"
        />
        <div className="relative z-10 h-full w-full overflow-hidden rounded-[5px] bg-[#010712]/70 shadow-[0_20px_50px_rgba(0,0,0,0.34),0_0_34px_rgba(34,211,238,0.07),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <img
            alt={`${project.title} project screenshot`}
            className="h-full w-full object-contain object-center"
            draggable="false"
            loading={index === 0 ? "eager" : "lazy"}
            src={project.image}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_34px_rgba(2,8,23,0.42),inset_0_0_0_1px_rgba(34,211,238,0.08)]"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

export default ProjectArchiveFeaturedCard;
