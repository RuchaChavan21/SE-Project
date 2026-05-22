import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Brain, User, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const DesktopSidebar = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/lesson/quantum-superposition', icon: BookOpen, label: 'Learn' },
    { to: '/quiz/quantum-superposition', icon: Brain, label: 'Quiz' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];
  
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden xl:flex flex-col w-20 fixed inset-y-0 left-0 bg-[#050a18]/70 backdrop-blur-2xl border-r border-cyan-200/10 z-40">
      <div className="p-4 flex items-center justify-center">
        <div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-200/30 flex items-center justify-center shadow-[0_0_26px_rgba(34,211,238,.35)]">
          <Sparkles className="w-5 h-5 text-cyan-200" />
        </div>
        <h1 className="sr-only">
          EduPulse AI
        </h1>
      </div>
      
      <nav className="flex-1 px-3 py-6 space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "group relative flex items-center justify-center h-12 rounded-2xl transition-all font-medium",
                isActive 
                  ? "bg-cyan-300/15 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,.28)] border border-cyan-200/30" 
                  : "text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={clsx("w-5 h-5", isActive && "drop-shadow-[0_0_8px_rgba(103,232,249,.9)]")} />
                <span className="pointer-events-none absolute left-16 rounded-lg border border-cyan-200/20 bg-[#07101f]/95 px-3 py-1 text-xs text-cyan-50 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-cyan-200/10">
        <button 
          onClick={toggleTheme} 
          className="flex items-center justify-center w-full h-12 rounded-2xl text-slate-300 hover:bg-white/10 transition-colors font-medium"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
