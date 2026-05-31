import { motion } from "framer-motion";

function SkillGroupCard({ group, index, className = "" }) {
  return (
    <motion.article
      variants={{
        hidden: {
          opacity: 0,
          y: 28,
          filter: "blur(5px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.68,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={`group relative flex h-full min-h-68 flex-col overflow-hidden border border-cyan-100/14 bg-[#061426]/42 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition duration-300 hover:border-cyan-100/28 hover:bg-[#07182d]/58 hover:shadow-[0_20px_60px_rgba(0,0,0,0.32),0_0_30px_rgba(34,211,238,0.08)] sm:p-6 lg:min-h-60 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-6 w-6 border-l border-t border-cyan-100/34"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-cyan-100/22"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-cyan-100/28 to-transparent opacity-70"
      />
      <span
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/7 blur-2xl transition duration-300 group-hover:bg-cyan-300/10"
      />

      <div className="relative z-10 flex min-h-18 items-start justify-between gap-5">
        <div>
          <p className="font-osiris text-[10px] uppercase tracking-[0.3em] text-cyan-100/48">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="font-oxanium mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-50 sm:text-base">
            {group.label}
          </h3>
        </div>
        <div
          aria-hidden="true"
          className="mt-1 grid h-9 w-9 shrink-0 place-items-center border border-cyan-100/14 bg-[#020817]/44 text-[10px] text-cyan-100/54"
        >
          L{index + 1}
        </div>
      </div>

      <p className="font-oxanium relative z-10  max-w-lg text-sm leading-7 text-slate-200/68">
        {group.description}
      </p>

      <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-6">
        {group.skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <span
              key={skill.id}
              className="font-oxanium inline-flex items-center gap-2 rounded-full border border-cyan-100/14 bg-[#020817]/52 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-200/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:text-[11px]"
            >
              {skill.iconSrc ? (
                <img
                  src={skill.iconSrc}
                  alt=""
                  aria-hidden="true"
                  className="h-3.5 w-3.5 object-contain sm:h-4 sm:w-4"
                  draggable="false"
                />
              ) : (
                <Icon
                  aria-hidden="true"
                  className="text-sm sm:text-base"
                  style={{ color: skill.color }}
                />
              )}
              {skill.name}
            </span>
          );
        })}
      </div>
    </motion.article>
  );
}

export default SkillGroupCard;
