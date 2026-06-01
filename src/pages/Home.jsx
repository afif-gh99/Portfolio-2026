import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import ScrollIndicator from "../components/layout/ScrollIndicator.jsx";
import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import Experience from "../components/sections/Experience.jsx";
import Skills from "../components/sections/Skills.jsx";
import Projects from "../components/sections/Projects.jsx";
import Contact from "../components/sections/Contact.jsx";
import {
  getSectionElement,
  registerSection,
  scrollToSection,
} from "../lib/sectionNavigation.js";

function Home() {
  const homeSectionRef = useRef(null);
  const {
    canAnimateHero = true,
    completeHomeSectionTransition,
    isPageTransitioning = false,
    startProjectsArchiveTransition,
  } = useOutletContext() ?? {};
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    registerSection("home", homeSectionRef.current);

    return () => {
      registerSection("home", null);
    };
  }, []);

  useEffect(() => {
    const routeState = location.state;
    const sectionKey = routeState?.scrollToSection;

    if (!sectionKey) {
      return;
    }

    let isCancelled = false;
    let frameId = null;
    let fallbackTimeoutId = null;
    let stableFrameCount = 0;
    let lastTargetTop = null;
    let lastDocumentHeight = null;
    const startedAt = performance.now();
    const isTransitionHandoff = Boolean(routeState?.transitionScrollHandoff);
    const requiredStableFrames = isTransitionHandoff ? 8 : 2;
    const maxWaitDuration = isTransitionHandoff ? 1200 : 240;
    const scrollOptions = {
      behavior: routeState?.instantScroll ? "auto" : "smooth",
      immediate: Boolean(routeState?.instantScroll),
    };

    const completeScrollHandoff = () => {
      window.clearTimeout(fallbackTimeoutId);
      navigate("/", { replace: true, state: null });

      if (isTransitionHandoff) {
        completeHomeSectionTransition?.();
      }
    };

    const scrollAndComplete = () => {
      const didScroll = scrollToSection(sectionKey, scrollOptions);

      frameId = window.requestAnimationFrame(() => {
        if (isCancelled) {
          return;
        }

        if (didScroll) {
          scrollToSection(sectionKey, scrollOptions);
        }

        frameId = window.requestAnimationFrame(() => {
          if (isCancelled) {
            return;
          }

          if (didScroll) {
            scrollToSection(sectionKey, scrollOptions);
          }

          completeScrollHandoff();
        });
      });
    };

    const scrollWhenReady = () => {
      if (isCancelled) {
        return;
      }

      const targetElement = getSectionElement(sectionKey);
      const elapsedTime = performance.now() - startedAt;

      if (targetElement) {
        const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const isTargetStable =
          lastTargetTop !== null && Math.abs(targetTop - lastTargetTop) < 1;
        const isDocumentStable =
          lastDocumentHeight !== null &&
          Math.abs(documentHeight - lastDocumentHeight) < 1;

        stableFrameCount =
          isTargetStable && isDocumentStable ? stableFrameCount + 1 : 0;
        lastTargetTop = targetTop;
        lastDocumentHeight = documentHeight;
      } else {
        stableFrameCount = 0;
        lastTargetTop = null;
        lastDocumentHeight = null;
      }

      if (
        targetElement &&
        (stableFrameCount >= requiredStableFrames || elapsedTime >= maxWaitDuration)
      ) {
        scrollAndComplete();
        return;
      }

      if (!targetElement && elapsedTime >= maxWaitDuration) {
        completeScrollHandoff();
        return;
      }

      frameId = window.requestAnimationFrame(scrollWhenReady);
    };

    fallbackTimeoutId = window.setTimeout(() => {
      if (isCancelled) {
        return;
      }

      scrollToSection(sectionKey, {
        ...scrollOptions,
        behavior: "auto",
        immediate: true,
      });
      completeScrollHandoff();
    }, isTransitionHandoff ? 1300 : 260);

    frameId = window.requestAnimationFrame(scrollWhenReady);

    return () => {
      isCancelled = true;
      window.clearTimeout(fallbackTimeoutId);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [completeHomeSectionTransition, location.state, navigate]);

  return (
    <main ref={homeSectionRef} data-section="home" className="min-h-screen">
      <Navbar />
      <ScrollIndicator />
      <Hero canAnimateHero={canAnimateHero} />
      <About />
      <Experience />
      <Skills />
      <Projects
        isPageTransitioning={isPageTransitioning}
        onViewAllProjects={startProjectsArchiveTransition}
      />
      <Contact />
    </main>
  );
}

export default Home;
