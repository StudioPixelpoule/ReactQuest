import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { usePlayerStore } from '@/lib/store';
import { Trophy, Star, Medal } from 'lucide-react';

interface PlayerStatsProps {
  totalXP: number;
}

export function PlayerStats({ totalXP }: PlayerStatsProps) {
  const { username, xp, level, completedQuests, activeBadge } = usePlayerStore();
  
  // Calculate XP needed for next level (1200 XP per level)
  const xpForNextLevel = level * 1200;
  const xpInCurrentLevel = xp - ((level - 1) * 1200);
  const levelProgress = (xpInCurrentLevel / 1200) * 100;
  const totalProgress = (xp / totalXP) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{username}</h2>
          <p className="text-muted-foreground">Niveau {level}</p>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="font-semibold">{completedQuests.length} Quêtes</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progression Niveau {level}</span>
            <span className="text-sm font-medium">{xpInCurrentLevel} / {xpForNextLevel - ((level - 1) * 1200)} XP</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progression Totale</span>
            <span className="text-sm font-medium">{xp} / {totalXP} XP</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
      </div>

      {activeBadge && (
        <div className="mt-4 flex items-center gap-2">
          <Medal className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">{activeBadge}</span>
        </div>
      )}
    </motion.div>
  );
}