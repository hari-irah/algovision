// src/hooks/useSpeechSynthesis.js
import { useRef, useEffect } from 'react';

export const useSpeechSynthesis = () => {
  const synth = useRef(window.speechSynthesis);

  // Simplified function that just takes text
  const speak = (text) => {
    if (!text || !synth.current) return;
    
    // Always cancel any previous speech to prevent overlap or queueing issues
    synth.current.cancel();

    // Use a tiny timeout to give the cancel command a moment to process before speaking again
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.current.speak(utterance);
    }, 50); // 50ms delay
  };

  useEffect(() => {
    // Ensure speech is cancelled when the component unmounts
    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);

  return speak;
};