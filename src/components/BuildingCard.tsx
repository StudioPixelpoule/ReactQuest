import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle } from 'lucide-react';
import { Quest } from '@/lib/quests';
import { cn } from '@/lib/utils';

interface BuildingCardProps {
  quest: Quest;
  isCompleted: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}

export function BuildingCard({ quest, isCompleted, isUnlocked, onClick }: BuildingCardProps) {
  return (
    <motion.div
      whileHover={{ scale: isUnlocked ? 1.02 : 1, translateY: isUnlocked ? -5 : 0 }}
      whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
    >
      <Card
        className={cn(
          "relative p-6 transition-all duration-300",
          isUnlocked ? "cursor-pointer hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50" : "opacity-50 cursor-not-allowed",
          isCompleted && "border-primary bg-primary/5"
        )}
        onClick={onClick}
      >
        {/* Status Icon */}
        <div className="absolute -top-3 -right-3">
          {!isUnlocked ? (
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
              <Lock className="h-3 w-3 text-muted-foreground" />
            </div>
          ) : isCompleted ? (
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-primary-foreground" />
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold leading-tight">{quest.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{quest.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={isCompleted ? "default" : "secondary"} className="transition-colors">
              {quest.level}
            </Badge>
            <Badge variant="outline" className={cn(
              "transition-colors",
              isCompleted && "border-primary text-primary"
            )}>
              {quest.xpReward} XP
            </Badge>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        {isUnlocked && !isCompleted && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        )}
      </Card>
    </motion.div>
  );
}