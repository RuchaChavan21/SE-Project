import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';
import DesktopSidebar from './DesktopSidebar';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Sparkles, Accessibility } from 'lucide-react';
import useVoiceNavigation from '../../hooks/useVoiceNavigation';
import AccessibilityPanel from '../accessibility/AccessibilityPanel';
import VoiceCommandToast from '../accessibility/VoiceCommandToast';
import useAccessibility from '../../hooks/useAccessibility';

import AchievementToast from '../gamification/AchievementToast';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const { isListening, lastCommand } = useVoiceNavigation();
  const [isAccessPanelOpen, setIsAccessPanelOpen] = useState(false);
  const [activeBadgeToast, setActiveBadgeToast] = useState(null);
  
  // Call useAccessibility so it applies its classes to document.body globally
  useAccessibility();

  // Listen for custom voice command events
  useEffect(() => {
    const handleOpenAccess = () => setIsAccessPanelOpen(true);
    const handleBadgeUnlock = (e) => setActiveBadgeToast(e.detail);
    
    window.addEventListener('voice_command_open_accessibility', handleOpenAccess);
    window.addEventListener('badge_unlocked', handleBadgeUnlock);
    
    return () => {
      window.removeEventListener('voice_command_open_accessibility', handleOpenAccess);
      window.removeEventListener('badge_unlocked', handleBadgeUnlock);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      <DesktopSidebar />

      <div className="flex-1 flex flex-col md:pl-64 min-w-0 relative z-10">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                EduPath AI
              </h1>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5 text-slate-300" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </main>

        <MobileNav />
      </div>

      {/* Accessibility Floating Action Button */}
      <button 
        onClick={() => setIsAccessPanelOpen(true)}
        className="fixed bottom-20 right-6 md:bottom-6 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/40 hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-300"
        aria-label="Open Accessibility Settings (Alt + A)"
      >
        <Accessibility size={24} />
      </button>

      <AccessibilityPanel 
        isOpen={isAccessPanelOpen} 
        onClose={() => setIsAccessPanelOpen(false)} 
      />
      <VoiceCommandToast lastCommand={lastCommand} />
      
      {activeBadgeToast && (
        <AchievementToast badgeId={activeBadgeToast} onClose={() => setActiveBadgeToast(null)} />
      )}
    </div>
  );
};

export default Layout;
