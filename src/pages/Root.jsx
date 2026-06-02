import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import SiteBackground from "../components/layout/SiteBackground.jsx";
import CustomCursor from "../components/ui/CustomCursor.jsx";
import IntroGate from "../components/intro/IntroGate.jsx";
import SessionRevealGate from "../components/intro/SessionRevealGate.jsx";
import PageTransitionOverlay from "../components/layout/PageTransitionOverlay.jsx";
import useBackgroundAudio from "../hooks/useBackgroundAudio.js";
import useSoundEffects from "../hooks/useSoundEffects.js";
import useSmoothScroll from "../hooks/useSmoothScroll.js";
import { getSmoothScroller } from "../lib/sectionNavigation.js";

const BACKGROUND_SOUND_SRC = "/assets/sounds/background_sound.mp3";
const INTRO_SEEN_KEY = "intro-seen";
const PAGE_TRANSITION_CLOSE_DURATION = 2000;
const PAGE_TRANSITION_OPEN_DURATION = 1000;

function forceInstantScrollTop() {
  const smoothScroller = getSmoothScroller();

  smoothScroller?.scrollTo?.(0, {
    immediate: true,
    force: true,
  });

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function getIntroWasSeen() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

function markIntroAsSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "true");
  } catch {
    // Session storage can be unavailable in restricted browser modes.
  }
}

function Root() {
  const [introWasSeen] = useState(() => getIntroWasSeen());
  const [canAnimateHero, setCanAnimateHero] = useState(false);
  const [pageTransitionPhase, setPageTransitionPhase] = useState("idle");
  const [projectsArchiveFocusKey, setProjectsArchiveFocusKey] = useState(0);

  const isPageTransitioningRef = useRef(false);
  const isOpeningTransitionRef = useRef(false);
  const shouldFocusArchiveRef = useRef(false);
  const isWaitingForHomeSectionRef = useRef(false);
  const closeTimeoutRef = useRef(null);
  const openTimeoutRef = useRef(null);
  const homeSectionTimeoutRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundAudioRef = useBackgroundAudio();

  useSoundEffects();
  useSmoothScroll();

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }

      if (openTimeoutRef.current) {
        window.clearTimeout(openTimeoutRef.current);
      }

      if (homeSectionTimeoutRef.current) {
        window.clearTimeout(homeSectionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return undefined;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (pageTransitionPhase === "idle") {
      return undefined;
    }

    const rootElement = document.documentElement;
    const bodyElement = document.body;
    const smoothScroller = getSmoothScroller();
    const previousRootOverflow = rootElement.style.overflow;
    const previousBodyOverflow = bodyElement.style.overflow;

    rootElement.style.overflow = "hidden";
    bodyElement.style.overflow = "hidden";
    smoothScroller?.stop?.();

    return () => {
      rootElement.style.overflow = previousRootOverflow;
      bodyElement.style.overflow = previousBodyOverflow;
      smoothScroller?.start?.();
    };
  }, [pageTransitionPhase]);

  const openPageTransition = useCallback(() => {
    if (isOpeningTransitionRef.current) {
      return;
    }

    isWaitingForHomeSectionRef.current = false;
    isOpeningTransitionRef.current = true;
    setPageTransitionPhase("opening");

    openTimeoutRef.current = window.setTimeout(() => {
      setPageTransitionPhase("idle");

      if (shouldFocusArchiveRef.current) {
        setProjectsArchiveFocusKey((currentKey) => currentKey + 1);
      }

      shouldFocusArchiveRef.current = false;
      isOpeningTransitionRef.current = false;
      isPageTransitioningRef.current = false;
    }, PAGE_TRANSITION_OPEN_DURATION);
  }, []);

  const startPageTransition = useCallback(
    ({
      pathname,
      state = null,
      resetScrollTop = false,
      focusArchive = false,
      waitForHomeSection = false,
    }) => {
      if (isPageTransitioningRef.current) {
        return;
      }

      if (location.pathname === pathname && !state?.scrollToSection) {
        return;
      }

      isPageTransitioningRef.current = true;
      shouldFocusArchiveRef.current = focusArchive;
      setPageTransitionPhase("closing");

      closeTimeoutRef.current = window.setTimeout(() => {
        if (resetScrollTop) {
          forceInstantScrollTop();
        }

        navigate(pathname, state ? { state } : undefined);

        if (resetScrollTop) {
          forceInstantScrollTop();
          window.requestAnimationFrame(forceInstantScrollTop);
        }

        if (waitForHomeSection) {
          isWaitingForHomeSectionRef.current = true;
          homeSectionTimeoutRef.current = window.setTimeout(() => {
            openPageTransition();
          }, 1500);
          return;
        }

        openPageTransition();
      }, PAGE_TRANSITION_CLOSE_DURATION);
    },
    [location.pathname, navigate, openPageTransition],
  );

  const startProjectsArchiveTransition = useCallback(() => {
    if (location.pathname === "/projects") {
      return;
    }

    startPageTransition({
      pathname: "/projects",
      resetScrollTop: true,
      focusArchive: true,
    });
  }, [location.pathname, startPageTransition]);

  const startHomeSectionTransition = useCallback(
    (sectionKey = "home") => {
      if (location.pathname !== "/projects") {
        return;
      }

      startPageTransition({
        pathname: "/",
        state: {
          scrollToSection: sectionKey,
          instantScroll: true,
          transitionScrollHandoff: true,
        },
        waitForHomeSection: true,
      });
    },
    [location.pathname, startPageTransition],
  );

  const startRouteTransition = useCallback(
    (pathname = "/") => {
      startPageTransition({
        pathname,
        resetScrollTop: true,
      });
    },
    [startPageTransition],
  );

  const completeHomeSectionTransition = useCallback(() => {
    if (!isWaitingForHomeSectionRef.current) {
      return;
    }

    if (homeSectionTimeoutRef.current) {
      window.clearTimeout(homeSectionTimeoutRef.current);
      homeSectionTimeoutRef.current = null;
    }

    openPageTransition();
  }, [openPageTransition]);

  const routedContent = (
    <div className="relative z-10">
      <Outlet
        context={{
          canAnimateHero,
          startRouteTransition,
          isPageTransitioning: pageTransitionPhase !== "idle",
          isProjectsArchiveTransitionOpening:
            pageTransitionPhase === "opening" &&
            location.pathname === "/projects",
          projectsArchiveFocusKey,
          completeHomeSectionTransition,
          startHomeSectionTransition,
          startProjectsArchiveTransition,
        }}
      />
    </div>
  );

  return (
    <>
      <audio
        ref={backgroundAudioRef}
        src={BACKGROUND_SOUND_SRC}
        loop
        autoPlay
        preload="auto"
        hidden
      />
      <SiteBackground />
      <CustomCursor />
      {introWasSeen ? (
        <SessionRevealGate onComplete={() => setCanAnimateHero(true)}>
          {routedContent}
        </SessionRevealGate>
      ) : (
        <IntroGate
          onHeroAnimationReady={() => setCanAnimateHero(true)}
          onIntroComplete={markIntroAsSeen}
        >
          {routedContent}
        </IntroGate>
      )}
      <PageTransitionOverlay phase={pageTransitionPhase} />
    </>
  );
}

export default Root;
