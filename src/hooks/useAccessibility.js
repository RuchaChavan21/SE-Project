import { useEffect } from 'react';
import { useStudent } from '../context/StudentContext';

const fontScaleClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  xl: 'text-xl md:text-2xl'
};

const useAccessibility = () => {
  const { student, updateStudent } = useStudent();

  useEffect(() => {
    // High Contrast Mode
    if (student.highContrast || student.blindMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Font Scaling applied to body
    const baseClass = fontScaleClasses[student.fontSize] || fontScaleClasses.medium;
    document.body.className = `antialiased ${baseClass}`;

    // Blind Mode global adjustments
    if (student.blindMode) {
      document.documentElement.classList.add('blind-mode-active');
      // Set aria-live for important global announcements if necessary
    } else {
      document.documentElement.classList.remove('blind-mode-active');
    }
  }, [student.highContrast, student.fontSize, student.blindMode]);

  const toggleBlindMode = () => {
    const isNowBlind = !student.blindMode;
    updateStudent({
      blindMode: isNowBlind,
      highContrast: isNowBlind ? true : student.highContrast,
      autoTTS: isNowBlind ? true : student.autoTTS,
      voiceNav: isNowBlind ? true : student.voiceNav,
      fontSize: isNowBlind ? 'xl' : student.fontSize,
    });
  };

  const setFontSize = (size) => updateStudent({ fontSize: size });
  const toggleHighContrast = () => updateStudent({ highContrast: !student.highContrast });
  const toggleAutoTTS = () => updateStudent({ autoTTS: !student.autoTTS });
  const toggleVoiceNav = () => updateStudent({ voiceNav: !student.voiceNav });

  return {
    isBlindMode: student.blindMode,
    isHighContrast: student.highContrast,
    isAutoTTS: student.autoTTS,
    isVoiceNav: student.voiceNav,
    fontSize: student.fontSize,
    toggleBlindMode,
    setFontSize,
    toggleHighContrast,
    toggleAutoTTS,
    toggleVoiceNav
  };
};

export default useAccessibility;
