declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export const createAudio = (): AudioContext => {
  const Ctx = window.AudioContext || window.webkitAudioContext!;
  return new Ctx();
};

export const startTick = (ac: AudioContext) =>
  window.setInterval(() => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'square';
    o.frequency.value = 900;
    g.gain.setValueAtTime(0.0001, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ac.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.08);
    o.connect(g);
    g.connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + 0.09);
  }, 120);

export const stopTick = (id: number | null) => {
  if (id) window.clearInterval(id);
};

export const playChime = (ac: AudioContext) => {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = 'sine';
  o.frequency.value = 1200;
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.25);
  o.connect(g);
  g.connect(ac.destination);
  o.start();
  o.stop(ac.currentTime + 0.26);
};
