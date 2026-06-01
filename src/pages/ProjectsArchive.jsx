import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import ProjectArchiveFeaturedCard from "../components/projects/ProjectArchiveFeaturedCard.jsx";
import ProjectArchiveFoundationCard from "../components/projects/ProjectArchiveFoundationCard.jsx";
import { projects } from "../data/projects.js";

const featuredProjectSlugs = [
  "dashstack-dashboard",
  "trippy",
  "mydash-dashboard",
];
const foundationProjectSlugs = ["fingo", "kasper", "leon"];

const copyVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const archiveHeaderVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.22,
    },
  },
};

const archiveHeaderItemVariants = {
  hidden: {
    opacity: 0,
    x: -72,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.92,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
function getProjectsBySlug(slugs) {
  return slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);
}

function ProjectsArchive() {
  const mainRef = useRef(null);
  const {
    isPageTransitioning = false,
    projectsArchiveFocusKey = 0,
    startHomeSectionTransition,
  } = useOutletContext() ?? {};
  const featuredProjects = getProjectsBySlug(featuredProjectSlugs);
  const foundationProjects = getProjectsBySlug(foundationProjectSlugs);
  const isBackHomeDisabled = isPageTransitioning || !startHomeSectionTransition;
  const archiveHeaderAnimationState = isPageTransitioning
    ? "hidden"
    : "visible";
  const handleBackHomeClick = () => {
    if (isBackHomeDisabled) {
      return;
    }

    startHomeSectionTransition("home");
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!projectsArchiveFocusKey) {
      return;
    }

    mainRef.current?.focus({ preventScroll: true });
  }, [projectsArchiveFocusKey]);

  return (
    <main
      ref={mainRef}
      aria-labelledby="projects-archive-title"
      className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28 outline-none sm:px-8 sm:pb-24 sm:pt-32 lg:px-16 lg:pb-28 lg:pt-36 xl:px-24 2xl:px-32"
      tabIndex="-1"
    >
      <Navbar />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-24 h-88 w-88 rounded-full bg-cyan-300/7 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-[8%] h-96 w-96 rounded-full bg-blue-400/7 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-24 mx-auto h-px max-w-5xl bg-linear-to-r from-transparent via-cyan-100/18 to-transparent"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-352"
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="max-w-6xl"
          initial="hidden"
          animate={archiveHeaderAnimationState}
          variants={archiveHeaderVariants}
        >
          <motion.div
            className="mb-6 flex items-center gap-4 lg:mb-7"
            className="mb-6 flex items-center gap-4 lg:mb-7"
          >
            <span
              aria-hidden="true"
              className="h-px w-10 bg-linear-to-r from-cyan-100/36 to-transparent"
            />
            <p className="font-osiris text-xs uppercase tracking-[0.34em] text-cyan-100/66 sm:text-sm">
              05 / Projects / ARCHIVE
            </p>
          </motion.div>
          <motion.h1
            id="projects-archive-title"
            className="font-bruno max-w-[23ch] text-[clamp(1.55rem,6.2vw,3.1rem)] leading-[1.18] text-slate-50 drop-shadow-[0_0_22px_rgba(34,211,238,0.13)] sm:text-[clamp(2rem,5.6vw,3.55rem)] lg:text-[clamp(2.25rem,2.75vw,3.65rem)]"
            data-cursor="text"
            variants={archiveHeaderItemVariants}
          >
            PROJECT ARCHIVE FROM EARLY BUILDS TO SHIPPED INTERFACES.
          </motion.h1>
          <motion.p
            className="font-oxanium mt-8 max-w-xl border-l border-cyan-100/16 pl-4 text-sm leading-7 text-slate-200/74 sm:mt-9 sm:text-base sm:leading-8 lg:mt-10"
            data-cursor="text"
            variants={archiveHeaderItemVariants}
          >
            Dashboards, landing pages, and interface experiments {"\u2014"}{" "}
            gathered in one structured view.
          </motion.p>
        </motion.header>
        <section
          aria-labelledby="featured-projects-title"
          className="mt-14 sm:mt-16 lg:mt-20"
        >
          <motion.div
            className="mb-5 flex items-center justify-between gap-4"
            variants={copyVariants}
          >
            <h2
              id="featured-projects-title"
              className="font-oxanium text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100/72"
            >
              Featured Interfaces
            </h2>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-linear-to-r from-cyan-100/22 to-transparent"
            />
          </motion.div>

          <div className="grid gap-6 lg:gap-7">
            {featuredProjects.map((project, index) => (
              <ProjectArchiveFeaturedCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="foundation-projects-title"
          className="mt-12 sm:mt-14 lg:mt-16"
        >
          <motion.div
            className="mb-5 flex items-center justify-between gap-4"
            variants={copyVariants}
          >
            <h2
              id="foundation-projects-title"
              className="font-oxanium text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100/72"
            >
              Foundation Builds
            </h2>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-linear-to-r from-cyan-100/18 to-transparent"
            />
          </motion.div>

          <div className="grid gap-4">
            {foundationProjects.map((project, index) => (
              <ProjectArchiveFoundationCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        <motion.div
          className="relative mt-16 flex justify-center pb-2 sm:mt-18 lg:mt-20"
          variants={copyVariants}
        >
          <div className="relative overflow-hidden border border-cyan-100/14 bg-[#06101f]/58 px-5 py-5 shadow-[0_24px_90px_rgba(0,0,0,0.32),0_0_40px_rgba(34,211,238,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:px-7">
            <div
              aria-hidden="true"
              className="absolute left-3 top-3 h-5 w-5 border-l border-t border-cyan-200/36"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-cyan-200/36"
            />
            <button
              type="button"
              data-cursor={isBackHomeDisabled ? undefined : "interactive"}
              data-sound={isBackHomeDisabled ? undefined : "click"}
              data-sound-hover={isBackHomeDisabled ? undefined : "hover"}
              disabled={isBackHomeDisabled}
              onClick={handleBackHomeClick}
              className="group relative inline-flex min-h-12 items-center gap-4 border border-cyan-200/26 bg-cyan-100/[0.035] px-5 py-3 font-bruno text-[10px] uppercase tracking-[0.2em] text-cyan-100/90 outline-none transition duration-300 before:h-px before:w-9 before:bg-cyan-200/70 before:shadow-[0_0_16px_rgba(34,211,238,0.5)] hover:border-cyan-200/58 hover:bg-cyan-100/7.5 hover:text-cyan-50 hover:shadow-[0_0_32px_rgba(34,211,238,0.14)] focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06101f] disabled:cursor-not-allowed disabled:border-cyan-100/12 disabled:bg-slate-100/2.5 disabled:text-slate-400/60 disabled:shadow-none disabled:before:bg-slate-400/35 sm:px-6"
            >
              BACK TO HOME
              <span
                aria-hidden="true"
                className="h-px w-5 bg-cyan-200/44 transition-all duration-300 group-hover:w-8 group-hover:bg-cyan-100/80"
              />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default ProjectsArchive;
