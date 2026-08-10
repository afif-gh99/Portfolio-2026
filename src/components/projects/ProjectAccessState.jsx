function ProjectAccessState({ project, className = "", linkClassName = "" }) {
  const isLive = project.status === "live" && Boolean(project.projectUrl);
  const isPrivate = project.status === "private";
  const isInProgress = project.status === "in-progress";

  if (isInProgress || isPrivate) {
    const message = isInProgress
      ? "BUILD IN PROGRESS — LINK COMING SOON"
      : "ACCESS RESTRICTED — PRIVATE PROJECT";
    const toneClassName = isInProgress
      ? "text-cyan-100/65"
      : "text-slate-300/58";
    const dotClassName = isInProgress
      ? "bg-cyan-200/70 shadow-[0_0_10px_rgba(165,243,252,0.3)]"
      : "bg-slate-400/55";

    return (
      <div
        className={`font-oxanium inline-flex w-fit max-w-full items-start gap-2 text-[10px] font-medium uppercase leading-5 tracking-[0.16em] ${toneClassName} ${className}`}
      >
        <span
          aria-hidden="true"
          className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${dotClassName}`}
        />
        <span className="min-w-0 break-words">{message}</span>
      </div>
    );
  }

  if (isLive) {
    return (
      <a
        aria-label={`Visit ${project.title}, opens in a new tab`}
        className={linkClassName}
        data-cursor="interactive"
        data-sound-hover="hover"
        href={project.projectUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        VISIT PROJECT
      </a>
    );
  }

  return null;
}

export default ProjectAccessState;
