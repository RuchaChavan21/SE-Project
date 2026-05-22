import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, EyeOff, Type, Contrast, Mic, Volume2, X } from 'lucide-react';
import useAccessibility from '../../hooks/useAccessibility';

const AccessibilityPanel = ({ isOpen, onClose }) => {
  const {
    isBlindMode, toggleBlindMode,
    isHighContrast, toggleHighContrast,
    isAutoTTS, toggleAutoTTS,
    isVoiceNav, toggleVoiceNav,
    fontSize, setFontSize
  } = useAccessibility();

  // Handle global keyboard shortcut (Alt + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Global Shortcut Alt+A
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        isOpen ? onClose() : window.dispatchEvent(new CustomEvent('voice_command_open_accessibility'));
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const fontSizes = [
    { id: 'small', label: 'Small', textClass: 'text-sm' },
    { id: 'medium', label: 'Medium', textClass: 'text-base' },
    { id: 'large', label: 'Large', textClass: 'text-lg' },
    { id: 'xl', label: 'Extra Large', textClass: 'text-xl' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[101] md:left-1/2 md:-translate-x-1/2 md:w-[500px] bg-white dark:bg-slate-900 shadow-2xl rounded-t-3xl border-t border-x border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility Settings"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <Settings size={24} aria-hidden="true" />
                <h2 className="font-bold text-xl">Accessibility Settings</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:ring-2 focus:ring-indigo-500"
                aria-label="Close accessibility panel"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 space-y-6">
              
              {/* Blind Mode Toggle */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isBlindMode ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                      <EyeOff size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">Blind Mode</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Optimizes UI for screen readers</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleBlindMode}
                    role="switch"
                    aria-checked={isBlindMode}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${isBlindMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isBlindMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                {isBlindMode && (
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 font-medium bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
                    TTS, Voice Navigation, and High Contrast automatically enabled.
                  </p>
                )}
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Display & Audio</h3>
                
                <ToggleRow 
                  icon={Contrast} 
                  label="High Contrast Mode" 
                  checked={isHighContrast} 
                  onChange={toggleHighContrast} 
                  disabled={isBlindMode}
                />
                
                <ToggleRow 
                  icon={Volume2} 
                  label="Auto-read Lessons (TTS)" 
                  checked={isAutoTTS} 
                  onChange={toggleAutoTTS} 
                  disabled={isBlindMode}
                />
                
                <ToggleRow 
                  icon={Mic} 
                  label="Voice Navigation" 
                  checked={isVoiceNav} 
                  onChange={toggleVoiceNav} 
                  disabled={isBlindMode}
                />
              </div>

              {/* Font Size */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Type className="text-slate-500" size={20} aria-hidden="true" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Text Size</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {fontSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setFontSize(size.id)}
                      disabled={isBlindMode}
                      className={`py-3 rounded-xl border font-medium transition-colors focus:ring-2 focus:ring-indigo-500 ${
                        fontSize === size.id 
                          ? 'bg-indigo-100 border-indigo-600 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-500' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                      } ${isBlindMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                      aria-pressed={fontSize === size.id}
                    >
                      <span className={size.textClass}>Aa</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ToggleRow = ({ icon: Icon, label, checked, onChange, disabled }) => (
  <div className={`flex items-center justify-between p-3 rounded-xl border ${disabled ? 'opacity-60 border-slate-200 dark:border-slate-700' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300`}>
        <Icon size={18} aria-hidden="true" />
      </div>
      <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
    </div>
    <button 
      onClick={onChange}
      disabled={disabled}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${checked ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

export default AccessibilityPanel;
