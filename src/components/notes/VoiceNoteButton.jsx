import React, { useState, useEffect, useCallback } from 'react';
import { Mic, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudent } from '../../context/StudentContext';

const VoiceNoteButton = ({ onNoteCaptured }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const { student } = useStudent();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = student.language === 'en' ? 'en-US' : student.language;

      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, [student.language]);

  const toggleRecording = useCallback(() => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      if (transcript.trim()) {
        onNoteCaptured({ type: 'voice', text: transcript.trim() });
      }
      setTranscript('');
    } else {
      setTranscript('');
      recognition.start();
      setIsRecording(true);
    }
  }, [isRecording, recognition, transcript, onNoteCaptured]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <button
        onClick={toggleRecording}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
          isRecording 
            ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-110' 
            : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:scale-105'
        }`}
        aria-label={isRecording ? "Stop recording voice note" : "Start voice note"}
      >
        {isRecording ? <Square size={24} className="fill-current" /> : <Mic size={28} />}
      </button>
      
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center w-full px-4"
          >
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: [8, Math.random() * 24 + 12, 8] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1.5 bg-red-500 rounded-full"
                />
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 min-h-[2.5rem]">
              {transcript || "Listening..."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceNoteButton;
