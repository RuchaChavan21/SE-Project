import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Brain, User, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const DesktopSidebar = () => {
  const { logout } = useUser();
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/lesson/quantum-superposition', icon: BookOpen, label: 'Learn' },
    { to: '/quiz/quantum-superposition', icon: Brain, label: 'Quiz' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];
  
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
          EduPath AI
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                isActive 
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={clsx("w-5 h-5", isActive && "fill-current opacity-20")} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <button 
          onClick={toggleTheme} 
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors font-medium"
        >
          {theme === 'dark' ? (
            <><Sun className="w-5 h-5" /> Light Mode</>
          ) : (
            <><Moon className="w-5 h-5" /> Dark Mode</>
          )}
        </button>
        <button 
          onClick={logout} 
          className="flex items-center gap-3 w-full px-4 py-3 mt-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
        >
          Switch Role / Logout
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
