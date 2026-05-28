import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import { registerSection } from "../lib/sectionNavigation.js";

function Home() {
  const homeSectionRef = useRef(null);
  const { canAnimateHero = true } = useOutletContext() ?? {};

  useEffect(() => {
    registerSection("home", homeSectionRef.current);

    return () => {
      registerSection("home", null);
    };
  }, []);

  return (
    <main ref={homeSectionRef} data-section="home" className="min-h-screen">
      <Navbar />
      <Hero canAnimateHero={canAnimateHero} />
      <About />
    </main>
  );
}

export default Home;
