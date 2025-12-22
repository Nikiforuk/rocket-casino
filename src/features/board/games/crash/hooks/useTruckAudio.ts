import { useRef } from 'react';

import truckEngineMp3 from '../../../../../assets/audio/truck-engine.mp3';

export const useTruckAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    const audio = audioRef.current || new Audio(truckEngineMp3);
    audioRef.current = audio;
    audio.currentTime = 0;
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  const stop = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
      } catch {}
      audioRef.current = null;
    }
  };

  return { play, stop };
};
