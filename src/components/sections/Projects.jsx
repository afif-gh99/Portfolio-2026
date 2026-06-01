import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../../data/projects.js";
import { registerSection } from "../../lib/sectionNavigation.js";
import ProjectCard from "./projects/ProjectCard.jsx";

const headlineLines = ["SELECTED WORK", "BUILT UNDER", "REAL CONSTRAINTS."];

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const copyVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.76,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const headlineLineVariants = {
  hidden: {
    opacity: 0,
    x: -34,
    filter: "blur(5px)",
  },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.74,
      delay: 0.12 + index * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function Projects({ onViewAllProjects, isPageTransitioning = false }) {
  const projectsSectionRef = useRef(null);
  const sectionContentRef = useRef(null);
  const featuredProjects = projects.filter((project) => project.featured);
  const largeProject = featuredProjects.find(
    (project) => project.featuredLayout === "large",
  );
  const smallProjects = featuredProjects.filter(
    (project) => project.featuredLayout !== "large",
  );
  const isSectionInView = useInView(sectionContentRef, {
    amount: 0.18,
    margin: "-8% 0px -12% 0px",
  });

  useEffect(() => {
    registerSection("projects", projectsSectionRef.current);

    return () => {
      registerSection("projects", null);
    };
  }, []);

  return (
    <section
      ref={projectsSectionRef}
      data-section="projects"
      aria-labelledby="projects-title"
      className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28 xl:px-24 xl:py-10 2xl:px-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-20 h-80 w-80 rounded-full bg-cyan-300/7 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 right-[10%] h-96 w-96 rounded-full bg-blue-400/7 blur-3xl"
      />

      <motion.div
        ref={sectionContentRef}
        className="relative z-10 mx-auto w-full max-w-352"
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="grid gap-7 lg:grid-cols-[minmax(24rem,0.88fr)_minmax(18rem,0.48fr)] lg:items-end lg:gap-12">
          <div>
            <motion.div
              className="mb-5 flex items-center gap-4 lg:mb-6"
              variants={copyVariants}
            >
              <span
                aria-hidden="true"
                className="h-px w-10 bg-linear-to-r from-cyan-100/36 to-transparent"
              />
              <p className="font-osiris text-xs uppercase tracking-[0.34em] text-cyan-100/66 sm:text-sm">
                05 / PROJECTS
              </p>
            </motion.div>

            <h2
              id="projects-title"
              data-cursor="text"
              className="font-bruno max-w-[15ch] text-[clamp(2.05rem,8.6vw,4.35rem)] leading-[1.04] text-slate-50 drop-shadow-[0_0_28px_rgba(34,211,238,0.16)] lg:text-[clamp(2.75rem,3.55vw,4.8rem)]"
            >
              {headlineLines.map((line, index) => (
                <motion.span
                  className="block"
                  custom={index}
                  key={line}
                  variants={headlineLineVariants}
                >
                  {line}
                </motion.span>
              ))}
            </h2>
          </div>

          <motion.p
            data-cursor="text"
            className="font-oxanium max-w-118 border-l border-cyan-100/16 pl-4 text-sm leading-7 text-slate-200/74 sm:text-base sm:leading-8 lg:ml-auto lg:mb-2"
            variants={copyVariants}
          >
            A focused selection of builds shaped by structure, motion,
            usability, and real-world constraints.
          </motion.p>
        </div>

        <motion.div
          className="mt-10 grid gap-4 sm:mt-12 lg:gap-5"
          variants={sectionVariants}
        >
          {largeProject ? (
            <ProjectCard project={largeProject} variant="large" />
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            {smallProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="small"
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center lg:mt-10"
          variants={copyVariants}
        >
          <button
            aria-label="View all projects"
            className="font-oxanium group relative min-h-12 overflow-hidden border border-cyan-100/24 bg-cyan-100/7 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,0.08),inset_0_1px_0_rgba(255,255,255,0.07)] transition duration-300 hover:border-cyan-100/46 hover:bg-cyan-100/12 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] disabled:pointer-events-none disabled:opacity-55"
            data-cursor="interactive"
            data-sound="click"
            data-sound-hover="hover"
            disabled={isPageTransitioning || !onViewAllProjects}
            onClick={onViewAllProjects}
            type="button"
          >
            <span className="pointer-events-none absolute inset-px border border-cyan-50/0 transition duration-300 group-hover:border-cyan-50/10" />
            <span className="pointer-events-none absolute inset-y-0 -left-16 w-14 -skew-x-12 bg-linear-to-r from-transparent via-cyan-100/18 to-transparent opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:left-[115%] group-hover:opacity-100" />
            <span className="relative z-10">VIEW ALL PROJECTS</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;
