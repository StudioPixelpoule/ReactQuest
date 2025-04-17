import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BuildingCard } from '@/components/BuildingCard';
import { PlayerStats } from '@/components/PlayerStats';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { IntroModal } from '@/components/IntroModal';
import { quests, districts } from '@/lib/quests';
import { usePlayerStore } from '@/lib/store';
import { AudioToggle } from '@/components/AudioToggle';
import { Settings, User, Zap, Layout, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const TOTAL_XP = 12950;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const districtVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const districtIcons: Record<string, LucideIcon> = {
  'foundations': Layout,
  'effects': Zap
};

export default function Hub() {
  const navigate = useNavigate();
  const { completedQuests, isQuestUnlocked, xp } = usePlayerStore();
  const [showIntro, setShowIntro] = useState(false);
  
  useEffect(() => {
    if (xp === 0) {
      setShowIntro(true);
    }
  }, [xp]);
  
  const progressPercent = (xp / TOTAL_XP) * 100;
  
  const currentDistrict = districts.findIndex(district => {
    const districtQuests = quests.filter(q => q.district === district.id);
    return districtQuests.some(q => !completedQuests.includes(q.id));
  }) + 1;
  
  const handleQuestClick = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;

    if (!isQuestUnlocked(questId)) {
      toast.error("Termine les quêtes précédentes pour débloquer celle-ci !");
      return;
    }

    navigate(`/quest/${questId}`);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <IntroModal 
          open={showIntro} 
          onOpenChange={setShowIntro} 
        />

        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <img 
                src="/assets/images/logo/logo_color.png" 
                alt="Logo" 
                className="h-8 w-auto"
              />
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
                  <User className="h-5 w-5" />
                </Button>
                <AudioToggle />
                <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Progress value={progressPercent} className="h-2" />
            <span>District {currentDistrict}/{districts.length}</span>
          </div>
        </div>

        <main className="container mx-auto px-4 py-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-16"
            >
              {districts.map(district => {
                const districtQuests = quests.filter(q => q.district === district.id);
                const Icon = districtIcons[district.id] || Layout;
                const completedCount = districtQuests.filter(q => completedQuests.includes(q.id)).length;
                const progress = (completedCount / districtQuests.length) * 100;
                const districtXP = districtQuests.reduce((total, quest) => total + quest.xpReward, 0);
                const earnedXP = districtQuests
                  .filter(q => completedQuests.includes(q.id))
                  .reduce((total, quest) => total + quest.xpReward, 0);
                
                return (
                  <motion.div 
                    key={district.id} 
                    variants={districtVariants}
                    className="relative"
                  >
                    <div className="relative z-10 mb-8">
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-6 group"
                      >
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold">{district.name}</h2>
                            <div className="px-2 py-1 rounded-full bg-primary/10 text-xs font-medium">
                              {district.level}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{district.description}</p>
                          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all duration-500" 
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span>{completedCount}/{districtQuests.length} quêtes</span>
                            </div>
                            <span>{earnedXP}/{districtXP} XP</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10 rounded-3xl" />
                      <div className="absolute inset-0 bg-grid-white/5 -z-10 rounded-3xl" 
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
                        }}
                      />

                      <div className="grid gap-6 sm:grid-cols-2 p-6">
                        {districtQuests.map((quest) => (
                          <BuildingCard
                            key={quest.id}
                            quest={quest}
                            isCompleted={completedQuests.includes(quest.id)}
                            isUnlocked={isQuestUnlocked(quest.id)}
                            onClick={() => handleQuestClick(quest.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="space-y-6">
              <PlayerStats totalXP={TOTAL_XP} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}