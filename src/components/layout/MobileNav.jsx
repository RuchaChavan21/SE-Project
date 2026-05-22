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
    <nav className="fixed bottom-3 left-3 right-3 z-50 rounded-3xl border border-cyan-200/15 bg-[#061020]/85 shadow-[0_0_34px_rgba(34,211,238,.18)] backdrop-blur-xl pb-safe md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all rounded-xl",
                isActive ? "text-cyan-100" : "text-slate-400 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={clsx(
                  "p-1.5 rounded-xl transition-all duration-300", 
                  isActive ? "bg-cyan-300/15 shadow-[0_0_18px_rgba(34,211,238,.24)]" : "bg-transparent"
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
