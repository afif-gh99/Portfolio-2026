import { useEffect, useRef } from "react";
import {
  SOUND_MUTED_CHANGE_EVENT,
  isSoundMuted,
} from "../lib/soundPreferences.js";
import {
  ensureBackgroundAudioPlaying,
  setBackgroundAudioElement,
  setBackgroundAudioVisibilityDucked,
  stopBackgroundAudio,
} from "../lib/backgroundAudio.js";

const BACKGROUND_VOLUME = 0.23;

function useBackgroundAudio() {
  const backgroundAudioRef = useRef(null);

  useEffect(() => {
    const backgroundAudio = backgroundAudioRef.current;

    if (!backgroundAudio) {
      return undefined;
    }

    const updateVisibilityDucking = () => {
      setBackgroundAudioVisibilityDucked(
        document.hidden || !document.hasFocus(),
      );
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setBackgroundAudioVisibilityDucked(true);
        return;
      }

      updateVisibilityDucking();
    };

    const handleWindowBlur = () => {
      setBackgroundAudioVisibilityDucked(true);
    };

    const handleWindowFocus = () => {
      updateVisibilityDucking();
    };

    const handlePageHide = () => {
      setBackgroundAudioVisibilityDucked(true);
    };

    const handlePageShow = () => {
      updateVisibilityDucking();
    };

    backgroundAudio.volume = BACKGROUND_VOLUME;
    backgroundAudio.loop = true;
    backgroundAudio.preload = "auto";
    backgroundAudio.currentTime = 0;
    setBackgroundAudioElement(backgroundAudio, BACKGROUND_VOLUME);
    updateVisibilityDucking();

    const handleSoundMutedChange = (event) => {
      if (event.detail?.isMuted) {
        stopBackgroundAudio();
        return;
      }

      backgroundAudio.currentTime = 0;
      updateVisibilityDucking();
      ensureBackgroundAudioPlaying();
    };

    if (isSoundMuted()) {
      stopBackgroundAudio();
    } else {
      ensureBackgroundAudioPlaying();
    }

    window.addEventListener(SOUND_MUTED_CHANGE_EVENT, handleSoundMutedChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener(
        SOUND_MUTED_CHANGE_EVENT,
        handleSoundMutedChange,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
      stopBackgroundAudio();
      setBackgroundAudioElement(null);
    };
  }, []);

  return backgroundAudioRef;
}

export default useBackgroundAudio;
