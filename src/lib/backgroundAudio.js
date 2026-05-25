import { isSoundMuted } from "./soundPreferences.js";

let backgroundAudioElement = null;
let isBackgroundAudioPending = false;
let isVisibilityDucked = false;
let backgroundAudioVolume = 0.07;

function applyBackgroundAudioOutputState() {
  if (!backgroundAudioElement) {
    return;
  }

  if (isSoundMuted() || isVisibilityDucked) {
    backgroundAudioElement.muted = true;
    backgroundAudioElement.volume = 0;
    return;
  }

  backgroundAudioElement.muted = false;
  backgroundAudioElement.volume = backgroundAudioVolume;
}

export function setBackgroundAudioElement(audioElement, volume = 0.07) {
  backgroundAudioElement = audioElement;
  backgroundAudioVolume = volume;
  isBackgroundAudioPending = false;
  applyBackgroundAudioOutputState();
}

export function stopBackgroundAudio() {
  if (!backgroundAudioElement) {
    return;
  }

  backgroundAudioElement.pause();
  backgroundAudioElement.currentTime = 0;
  isBackgroundAudioPending = false;
  applyBackgroundAudioOutputState();
}

export function setBackgroundAudioVisibilityDucked(isDucked) {
  isVisibilityDucked = isDucked;
  applyBackgroundAudioOutputState();
}

export function isBackgroundAudioPlaybackPending() {
  return isBackgroundAudioPending;
}

export function ensureBackgroundAudioPlaying() {
  if (!backgroundAudioElement || isSoundMuted()) {
    return;
  }

  if (!backgroundAudioElement.paused) {
    isBackgroundAudioPending = false;
    return;
  }

  try {
    const playPromise = backgroundAudioElement.play();

    if (playPromise) {
      playPromise
        .then(() => {
          isBackgroundAudioPending = false;
        })
        .catch(() => {
          isBackgroundAudioPending = true;
        });
    } else {
      isBackgroundAudioPending = false;
    }
  } catch {
    isBackgroundAudioPending = true;
    // Autoplay can be blocked by the browser; ignore it.
  }
}
