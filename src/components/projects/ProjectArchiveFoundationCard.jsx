import { motion } from "framer-motion";

const foundationCardVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      delay: 0.18 + index * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function ProjectArchiveFoundationCard({ project, index = 0 }) {
  return (
    <motion.article
      className="group relative grid gap-4 overflow-hidden border border-cyan-100/12 bg-[#061426]/42 p-4 shadow-[0_18px_54px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-md transition duration-300 hover:border-cyan-100/24 hover:bg-[#07182d]/54 hover:shadow-[0_20px_60px_rgba(0,0,0,0.32),0_0_28px_rgba(34,211,238,0.065),inset_0_1px_0_rgba(255,255,255,0.06)] sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-center sm:p-5 lg:grid-cols-[15rem_minmax(0,1fr)_auto]"
      custom={index}
      variants={foundationCardVariants}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-6 w-6 border-l border-t border-cyan-100/28"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-cyan-100/18"
      />

      <div className="relative aspect-16/10 overflow-hidden rounded-md border border-cyan-100/13 bg-[#020817]/72 p-2">
        <div className="h-full w-full overflow-hidden rounded-lg bg-[#010712]/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.035)]">
          <img
            alt={`${project.title} project screenshot`}
            className="h-full w-full object-contain object-center"
            draggable="false"
            loading="lazy"
            src={project.image}
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-100/26 to-transparent"
        />
      </div>

      <div className="min-w-0">
        <p className="font-osiris text-[11px] uppercase tracking-[0.32em] text-cyan-100/48">
          {project.year}
        </p>
        <h3
          className="font-bruno mt-3 text-xl leading-tight text-slate-50 sm:text-2xl"
          data-cursor="text"
        >
          {project.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <span
              className="font-oxanium rounded-full border border-cyan-100/12 bg-[#020817]/48 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-200/72"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
        <p className="font-oxanium mt-4 max-w-3xl text-sm leading-7 text-slate-200/68">
          {project.description}
        </p>
      </div>

      {project.projectUrl ? (
        <a
          aria-label={`Visit ${project.title}`}
          className="font-oxanium inline-flex min-h-11 w-fit items-center justify-center border border-cyan-100/22 bg-cyan-100/6 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.07),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-100/42 hover:bg-cyan-100/11 hover:shadow-[0_0_24px_rgba(34,211,238,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] lg:ml-4"
          data-cursor="interactive"
          data-sound-hover="hover"
          href={project.projectUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          VISIT PROJECT
        </a>
      ) : null}
    </motion.article>
  );
}

export default ProjectArchiveFoundationCard;
