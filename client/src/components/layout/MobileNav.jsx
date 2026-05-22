import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Brain, User } from 'lucide-react';
import clsx from 'clsx';

const MobileNav = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/lesson/quantum-superposition', icon: BookOpen, label: 'Learn' },
    { to: '/quiz/quantum-superposition', icon: Brain, label: 'Quiz' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 pb-safe md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all rounded-xl",
                isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={clsx(
                  "p-1.5 rounded-xl transition-all duration-300", 
                  isActive ? "bg-indigo-100 dark:bg-indigo-900/50" : "bg-transparent"
                )}>
                  <item.icon className={clsx("w-5 h-5", isActive && "fill-current opacity-20")} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
