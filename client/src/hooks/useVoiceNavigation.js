import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';

const useVoiceNavigation = () => {
  const { student, updateStudent } = useStudent();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  // Initialize Speech Recognition
  useEffect(() => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const handleCommand = useCallback((command) => {
    const text = command.toLowerCase();
    setLastCommand(text);

    if (text.includes('go home') || text.includes('open dashboard')) {
      navigate('/');
    } else if (text.includes('open quiz')) {
      navigate('/quiz/quantum-superposition'); // Simplified fallback
    } else if (text.includes('next topic') || text.includes('open lesson')) {
      navigate('/lesson/react-hooks'); 
    } else if (text.includes('go back')) {
      navigate(-1);
    } else if (text.includes('read again')) {
      // Logic could dispatch a custom event
      window.dispatchEvent(new CustomEvent('voice_command_read_again'));
    } else if (text.includes('open notes')) {
      window.dispatchEvent(new CustomEvent('voice_command_open_notes'));
    } else if (text.includes('open accessibility') || text.includes('accessibility panel')) {
      window.dispatchEvent(new CustomEvent('voice_command_open_accessibility'));
    } else if (text.includes('enable blind mode')) {
      updateStudent({
        blindMode: true,
        highContrast: true,
        autoTTS: true,
        voiceNav: true,
        fontSize: 'xl'
      });
    } else if (text.includes('increase font size')) {
      const sizes = ['small', 'medium', 'large', 'xl'];
      const currentIdx = sizes.indexOf(student.fontSize || 'medium');
      if (currentIdx < sizes.length - 1) {
        updateStudent({ fontSize: sizes[currentIdx + 1] });
      }
    }
    
    // Clear toast after 3s
    setTimeout(() => setLastCommand(null), 3000);
  }, [navigate, student.fontSize, updateStudent]);

  useEffect(() => {
    if (!isSupported || !student.voiceNav) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = student.language === 'en' ? 'en-US' : student.language;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      handleCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // Auto-restart if still enabled
      if (student.voiceNav) {
        try { recognition.start(); } catch(e) {}
      } else {
        setIsListening(false);
      }
    };

    try {
      recognition.start();
    } catch(e) {}

    return () => {
      recognition.stop();
    };
  }, [student.voiceNav, student.language, isSupported, handleCommand]);

  return { isListening, lastCommand, isSupported };
};

export default useVoiceNavigation;
