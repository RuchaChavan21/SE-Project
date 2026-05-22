import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const AnimatedOptionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  selected, 
  onClick,
  className 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={twMerge(
        clsx(
          "relative w-full p-4 md:p-6 rounded-2xl text-left transition-all duration-300",
          "border-2 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/50",
          selected 
            ? "border-indigo-600 bg-indigo-50/80 dark:bg-indigo-900/30 dark:border-indigo-500 shadow-md" 
            : "border-slate-200 bg-white/60 dark:bg-slate-800/60 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-800/80"
        ),
        className
      )}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={clsx(
            "p-3 rounded-xl transition-colors duration-300 shrink-0",
            selected ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          )}>
            <Icon size={24} />
          </div>
        )}
        <div className="flex-1 pr-8">
          <h3 className={clsx(
            "font-semibold text-lg md:text-xl mb-1 transition-colors duration-300",
            selected ? "text-indigo-900 dark:text-indigo-100" : "text-slate-800 dark:text-slate-200"
          )}>
            {title}
          </h3>
          {description && (
            <p className={clsx(
              "text-sm md:text-base transition-colors duration-300",
              selected ? "text-indigo-700 dark:text-indigo-300" : "text-slate-500 dark:text-slate-400"
            )}>
              {description}
            </p>
          )}
        </div>
      </div>
      
      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/2 -translate-y-1/2 right-4 text-indigo-600 dark:text-indigo-400"
        >
          <CheckCircle2 size={24} className="fill-white dark:fill-slate-900" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default AnimatedOptionCard;
