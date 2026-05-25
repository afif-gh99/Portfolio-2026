import { Outlet } from "react-router-dom";
import { useState } from "react";
import SiteBackground from "../components/layout/SiteBackground.jsx";
import CustomCursor from "../components/ui/CustomCursor.jsx";
import IntroGate from "../components/intro/IntroGate.jsx";
import SessionRevealGate from "../components/intro/SessionRevealGate.jsx";
import useBackgroundAudio from "../hooks/useBackgroundAudio.js";
import useSoundEffects from "../hooks/useSoundEffects.js";
import useSmoothScroll from "../hooks/useSmoothScroll.js";

const BACKGROUND_SOUND_SRC = "/assets/sounds/background_sound.mp3";
const INTRO_SEEN_KEY = "intro-seen";

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
  const backgroundAudioRef = useBackgroundAudio();

  useSoundEffects();
  useSmoothScroll();

  const routedContent = (
    <div className="relative z-10">
      <Outlet context={{ canAnimateHero }} />
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
    </>
  );
}

export default Root;
