declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export const createAudio = (): AudioContext => {
  const Ctx = window.AudioContext || window.webkitAudioContext!;
  return new Ctx();
};

export const startTick = (ac: AudioContext, duration = 3.6) => {
  let timeoutId: number | null = null;
  const startTime = ac.currentTime;

  const tick = () => {
    const elapsed = ac.currentTime - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);

    if (rawProgress >= 1) return;

    // ease-out: дуже швидко на старті, повільно до кінця
    const progress = 1 - Math.pow(1 - rawProgress, 2);

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

    const startInterval = 70;
    const endInterval = 320;
    const nextDelay = startInterval + (endInterval - startInterval) * progress;

    timeoutId = window.setTimeout(tick, nextDelay);
  };

  tick();

  return {
    stop: () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    },
  };
};

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
