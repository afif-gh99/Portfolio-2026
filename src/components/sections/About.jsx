import { useEffect, useRef } from "react";
import { registerSection } from "../../lib/sectionNavigation.js";
import AboutDecisionScene from "./about/AboutDecisionScene.jsx";
import AboutFeelingScene from "./about/AboutFeelingScene.jsx";
import AboutOutcomeScene from "./about/AboutOutcomeScene.jsx";
import AboutSecondsScene from "./about/AboutSecondsScene.jsx";

function About() {
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    registerSection("about", aboutSectionRef.current);

    return () => {
      registerSection("about", null);
    };
  }, []);

  return (
    <section
      ref={aboutSectionRef}
      data-section="about"
      className="relative overflow-hidden"
    >
      <AboutFeelingScene />
      <AboutSecondsScene />
      <AboutDecisionScene />
      <AboutOutcomeScene />
    </section>
  );
}

export default About;
