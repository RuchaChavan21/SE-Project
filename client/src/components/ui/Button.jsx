import clsx from 'clsx';
import { motion } from 'framer-motion';

export const Button = ({ className, variant = 'primary', size = 'default', children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    glass: "glass hover:bg-white/20 dark:hover:bg-white/10"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
