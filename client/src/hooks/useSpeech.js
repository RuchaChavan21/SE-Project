import { useState, useEffect, useCallback } from 'react';

const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const speak = useCallback((text, lang = 'en-US') => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to set a language-specific voice
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find(v => v.lang.startsWith(lang)) || 
                voices.find(v => v.lang.startsWith(lang.split('-')[0])) || 
                voices[0];
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for better comprehension

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
};

export default useSpeech;
