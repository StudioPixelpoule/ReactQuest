import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface ReactBotProps {
  message?: string;
  isFloating?: boolean;
}

export function ReactBot({ message, isFloating = true }: ReactBotProps) {
  return (
    <motion.div
      className={`flex items-center gap-4 ${
        isFloating ? 'fixed bottom-4 right-4' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message && (
        <motion.div
          className="max-w-xs rounded-lg bg-card p-4 text-card-foreground shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.div>
      )}
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="h-6 w-6" />
      </motion.div>
    </motion.div>
  );
}