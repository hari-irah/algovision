// src/hooks/useSpeechSynthesis.js
import { useRef, useEffect } from 'react';

export const useSpeechSynthesis = () => {
  const synth = useRef(window.speechSynthesis);

  const speak = (text) => {
    if (!text || !synth.current) return;
    
    synth.current.cancel();

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.current.speak(utterance);
    }, 50);
  };

  useEffect(() => {
    // This is the corrected cleanup function
    const speechSynth = synth.current;
    return () => {
      if (speechSynth) {
        speechSynth.cancel();
      }
    };
  }, []);

  return speak;
};
