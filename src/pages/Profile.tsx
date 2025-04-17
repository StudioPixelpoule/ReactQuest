import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { usePlayerStore } from '@/lib/store';
import { quests } from '@/lib/quests';
import { ChevronLeft, Trophy, Star, Medal, BookOpen } from 'lucide-react';

const TOTAL_XP = 12950;

const badges = {
  'component-master': {
    name: 'Maître des Composants',
    description: 'A maîtrisé l\'art des composants React',
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
  },
  'state-wizard': {
    name: 'Sorcier du State',
    description: 'A conquis la gestion d\'état React',
    icon: <Star className="h-5 w-5 text-purple-500" />,
  },
  'effect-sage': {
    name: 'Sage des Effets',
    description: 'A maîtrisé les effets et le cycle de vie React',
    icon: <Medal className="h-5 w-5 text-blue-500" />,
  },
};

export default function Profile() {
  const navigate = useNavigate();
  const { username, xp, level, completedQuests, activeBadge } = usePlayerStore();
  
  // Calculate XP needed for next level (1200 XP per level)
  const xpForNextLevel = level * 1200;
  const xpInCurrentLevel = xp - ((level - 1) * 1200);
  const levelProgress = (xpInCurrentLevel / 1200) * 100;
  const totalProgress = (xp / TOTAL_XP) * 100;
  
  const completedQuestDetails = quests.filter(quest => completedQuests.includes(quest.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/hub')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Profil</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-12 w-12 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold">{username}</h2>
                  <p className="text-muted-foreground">Niveau {level}</p>
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progression Niveau {level}</span>
                        <span>{xpInCurrentLevel} / {xpForNextLevel - ((level - 1) * 1200)} XP</span>
                      </div>
                      <Progress value={levelProgress} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progression Totale</span>
                        <span>{xp} / {TOTAL_XP} XP</span>
                      </div>
                      <Progress value={totalProgress} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quêtes Terminées
              </h3>
              <div className="grid gap-4">
                {completedQuestDetails.map((quest) => (
                  <Card key={quest.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{quest.title}</h4>
                        <p className="text-sm text-muted-foreground">{quest.description}</p>
                      </div>
                      <Badge variant="secondary">{quest.xpReward} XP</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {activeBadge && badges[activeBadge as keyof typeof badges] && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Badge Actif</h3>
                <div className="flex items-center gap-4">
                  {badges[activeBadge as keyof typeof badges].icon}
                  <div>
                    <p className="font-medium">{badges[activeBadge as keyof typeof badges].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {badges[activeBadge as keyof typeof badges].description}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Collection de Badges</h3>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {Object.entries(badges).map(([id, badge]) => (
                    <div
                      key={id}
                      className={`p-4 rounded-lg border ${
                        completedQuests.some(questId => quests.find(q => q.id === questId)?.badge === id)
                          ? 'bg-accent'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {badge.icon}
                        <div>
                          <p className="font-medium">{badge.name}</p>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </main>
    </motion.div>
  );
}