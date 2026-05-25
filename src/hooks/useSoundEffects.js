import { useEffect, useRef } from "react";
import { ensureBackgroundAudioPlaying } from "../lib/backgroundAudio.js";
import { isSoundMuted } from "../lib/soundPreferences.js";

const CLICK_SOUND_SRC = "/assets/sounds/click.mp3";
const CLICK_VOLUME = 0.18;
const HOVER_SOUND_SRC = "/assets/sounds/hover.mp3";
const HOVER_VOLUME = 0.06;
const HOVER_COOLDOWN = 150;
function useSoundEffects() {
  const clickSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const lastHoverSoundTimeRef = useRef(0);
  useEffect(() => {
    const clickSound = new Audio(CLICK_SOUND_SRC);
    clickSound.volume = CLICK_VOLUME;
    clickSoundRef.current = clickSound;
    const hoverSound = new Audio(HOVER_SOUND_SRC);
    hoverSound.volume = HOVER_VOLUME;
    hoverSoundRef.current = hoverSound;
    const handleClick = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const soundTarget = event.target.closest('[data-sound="click"]');

      if (!soundTarget) {
        return;
      }

      if (isSoundMuted()) {
        return;
      }

      const sound = clickSoundRef.current;

      if (!sound) {
        return;
      }

      try {
        sound.currentTime = 0;
        const playPromise = sound.play();

        if (playPromise) {
          playPromise
            .then(() => {
              ensureBackgroundAudioPlaying();
            })
            .catch(() => {});
        } else {
          ensureBackgroundAudioPlaying();
        }
      } catch {
        // Playback can be blocked by the browser; ignore it.
      }
    };
    const handleMouseOver = (event) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
      }
      if (!(event.target instanceof Element)) {
        return;
      }

      const soundTarget = event.target.closest('[data-sound-hover="hover"]');

      if (!soundTarget) {
        return;
      }

      if (isSoundMuted()) {
        return;
      }

      if (
        event.relatedTarget instanceof Element &&
        soundTarget.contains(event.relatedTarget)
      ) {
        return;
      }
      const now = Date.now();

      if (now - lastHoverSoundTimeRef.current < HOVER_COOLDOWN) {
        return;
      }

      lastHoverSoundTimeRef.current = now;
      const sound = hoverSoundRef.current;

      if (!sound) {
        return;
      }

      try {
        sound.currentTime = 0;
        const playPromise = sound.play();

        if (playPromise) {
          playPromise
            .then(() => {
              ensureBackgroundAudioPlaying();
            })
            .catch(() => {});
        } else {
          ensureBackgroundAudioPlaying();
        }
      } catch {
        // Playback can be blocked by the browser; ignore it.
      }
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleMouseOver);

      clickSoundRef.current = null;
      hoverSoundRef.current = null;
    };
  }, []);
}

export default useSoundEffects;
