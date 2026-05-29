import { useEffect, useRef } from "react";
import { registerSection } from "../../lib/sectionNavigation.js";
import ExperienceOpening from "./experience/ExperienceOpening.jsx";
import ExperienceTimeline from "./experience/ExperienceTimeline.jsx";

function Experience() {
  const experienceSectionRef = useRef(null);

  useEffect(() => {
    registerSection("experience", experienceSectionRef.current);

    return () => {
      registerSection("experience", null);
    };
  }, []);

  return (
    <section
      ref={experienceSectionRef}
      data-section="experience"
      aria-labelledby="experience-title"
      className="relative overflow-hidden"
    >
      <ExperienceOpening />
      <ExperienceTimeline />
    </section>
  );
}

export default Experience;
