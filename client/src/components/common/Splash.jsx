import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Splash = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-secondary text-white z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="relative"
      >
        <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl mb-6">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border border-white/30 rounded-[2rem] border-dashed"
        />
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold tracking-tight"
      >
        EduPath AI
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2 text-primary-foreground/80 font-medium"
      >
        Your personalized learning journey
      </motion.p>
    </div>
  );
};

export default Splash;
