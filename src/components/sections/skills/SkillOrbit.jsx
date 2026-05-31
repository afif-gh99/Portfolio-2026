import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import SkillOrbitNode from "./SkillOrbitNode.jsx";

const iconRevealStartDelay = 1.15;
const iconRevealStep = 0.075;

function SkillOrbit({ groups, shouldRevealIcons }) {
  const orbitRef = useRef(null);
  const isOrbitInView = useInView(orbitRef, {
    amount: 0.18,
    margin: "-12% 0px -12% 0px",
  });
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [hoveredGroupId, setHoveredGroupId] = useState(null);

  const handleHoverStart = (groupId, skillId) => {
    setHoveredGroupId(groupId);
    setHoveredSkillId(skillId);
  };

  const handleHoverEnd = () => {
    setHoveredGroupId(null);
    setHoveredSkillId(null);
  };

  return (
    <div
      ref={orbitRef}
      aria-describedby="skills-orbit-summary"
      className="relative mx-auto flex aspect-square w-full max-w-176 items-center justify-center overflow-visible"
    >
      <p id="skills-orbit-summary" className="sr-only">
        Animated skills orbit showing frontend, language, UI, product, and
        workflow tools around one stack core.
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-cyan-300/6 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[18%] rounded-full border border-cyan-100/10 bg-[#061426]/18 shadow-[0_0_70px_rgba(34,211,238,0.08),inset_0_0_60px_rgba(34,211,238,0.035)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-px -translate-x-1/2 -translate-y-1/2 bg-linear-to-b from-transparent via-cyan-100/18 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[86%] -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-transparent via-cyan-100/18 to-transparent"
      />
      {groups.map((group, groupIndex) => {
        const isCounterClockwise = groupIndex % 2 === 1;
        const previousSkillCount = groups
          .slice(0, groupIndex)
          .reduce((count, orbitGroup) => count + orbitGroup.skills.length, 0);

        return (
          <div
            key={group.id}
            className={`pointer-events-none absolute left-1/2 top-1/2 overflow-visible rounded-full border border-cyan-100/14 bg-cyan-100/1 shadow-[inset_0_0_18px_rgba(34,211,238,0.018)] ${
              hoveredGroupId === group.id ? "z-50" : "z-10"
            }`}
            style={{
              "--orbit-counter-direction": isCounterClockwise
                ? "normal"
                : "reverse",
              "--orbit-direction": isCounterClockwise ? "reverse" : "normal",
              "--orbit-duration": `${group.duration}s`,
              "--orbit-radius": group.radius,
              "--orbit-opacity": isOrbitInView ? 1 : 0.74,
              height: "calc(var(--orbit-radius) * 2)",
              transform: "translate(-50%, -50%)",
              width: "calc(var(--orbit-radius) * 2)",
            }}
          >
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/32"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-100/22"
            />
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 h-px w-3 -translate-x-1/2 bg-linear-to-r from-transparent to-cyan-100/34"
            />
            <span
              aria-hidden="true"
              className="absolute right-0 top-1/2 h-px w-3 translate-x-1/2 bg-linear-to-l from-transparent to-cyan-100/34"
            />

            <div className="skill-orbit-rotation absolute inset-0 overflow-visible">
              {group.skills.map((skill, skillIndex) => (
                <SkillOrbitNode
                  key={skill.id}
                  group={group}
                  isHovered={hoveredSkillId === skill.id}
                  onHoverEnd={handleHoverEnd}
                  onHoverStart={() => handleHoverStart(group.id, skill.id)}
                  revealDelay={
                    iconRevealStartDelay +
                    (previousSkillCount + skillIndex) * iconRevealStep
                  }
                  shouldReveal={shouldRevealIcons}
                  skill={skill}
                />
              ))}
            </div>

            <span
              aria-hidden="true"
              className="font-osiris pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 translate-y-[calc(var(--orbit-radius)-0.55rem)] whitespace-nowrap text-[8px] uppercase tracking-[0.18em] text-cyan-100/20 md:block"
            >
              {String(groupIndex + 1).padStart(2, "0")}
            </span>
          </div>
        );
      })}
      <div className="font-oxanium pointer-events-none absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-100/28 bg-[#061426]/86 text-center text-[9px] font-semibold uppercase leading-4 tracking-[0.18em] text-cyan-50 shadow-[0_0_34px_rgba(34,211,238,0.16),inset_0_0_28px_rgba(34,211,238,0.055)] backdrop-blur-md sm:h-28 sm:w-28 sm:text-[11px] sm:tracking-[0.2em]">
        <span className="relative z-10">
          STACK
          <br />
          CORE
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-2 rounded-full border border-cyan-100/10"
        />
      </div>
    </div>
  );
}

export default SkillOrbit;
