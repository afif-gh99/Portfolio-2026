export const SOUND_MUTED_STORAGE_KEY = "sound-muted";
export const SOUND_MUTED_CHANGE_EVENT = "sound-muted-change";

export function isSoundMuted() {
  return sessionStorage.getItem(SOUND_MUTED_STORAGE_KEY) === "true";
}

export function setSoundMuted(isMuted) {
  sessionStorage.setItem(SOUND_MUTED_STORAGE_KEY, String(isMuted));
  window.dispatchEvent(
    new CustomEvent(SOUND_MUTED_CHANGE_EVENT, { detail: { isMuted } }),
  );
}
