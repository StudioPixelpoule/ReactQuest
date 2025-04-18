import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestEditor } from '@/components/QuestEditor';
import { QuestContent } from '@/components/QuestContent';
import { usePlayerStore } from '@/lib/store';
import { quests } from '@/lib/quests';
import { loadQuestContent } from '@/lib/quests';
import { ChevronLeft, Trophy, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { QuestStep } from '@/types/quest';

export default function Quest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [steps, setSteps] = useState<QuestStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [code, setCode] = useState('');
  const [step, setStep] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  
  const { 
    addXP, 
    completeQuest, 
    setBadge,
    getQuestProgress,
    updateQuestProgress,
    isQuestUnlocked
  } = usePlayerStore();

  // Load quest content
  useEffect(() => {
    async function loadContent() {
      if (!id) return;
      try {
        const content = await loadQuestContent(id);
        setSteps(content);
        const progress = getQuestProgress(id);
        setStep(progress.currentStep);
      } catch (error) {
        console.error('Failed to load quest content:', error);
        toast.error('Failed to load quest content');
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [id, getQuestProgress]);

  const quest = quests.find(q => q.id === id);

  // Update code when step changes
  useEffect(() => {
    if (steps[step]) {
      setCode(steps[step].initialCode);
      setShowHint(false);
      setIsSuccess(false);
      setAttempts(0);
      setShowSolution(false);
    }
  }, [step, steps]);

  if (!quest || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isQuestUnlocked(quest.id)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Lock className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Quête Verrouillée</h2>
        <p className="text-muted-foreground">
          Termine les quêtes précédentes pour débloquer celle-ci.
        </p>
        <Button onClick={() => navigate('/hub')}>
          Retour au Hub
        </Button>
      </div>
    );
  }

  const currentStep = steps[step];
  const progressPercent = ((step + 1) / steps.length) * 100;

  const handleVerify = () => {
    const isValid = currentStep.validate(code);
    
    if (isValid) {
      setIsSuccess(true);
      setShowHint(false);
      toast.success("Bravo ! Tu as réussi cette étape !");
      
      if (step < steps.length - 1) {
        setTimeout(() => {
          const nextStep = step + 1;
          setStep(nextStep);
          updateQuestProgress(quest.id, nextStep);
          addXP(50);
          toast.success("+50 XP gagnés !");
        }, 1500);
      } else {
        completeQuest(quest.id);
        if (quest.badge) {
          setBadge(quest.badge);
          toast.success(`Badge obtenu : ${quest.badge} !`);
        }
        addXP(quest.xpReward);
        toast.success(`Quête terminée ! +${quest.xpReward} XP`);
        setTimeout(() => navigate('/hub'), 2000);
      }
    } else {
      setAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts === 5) {
          setShowSolution(true);
          toast.info("La solution est maintenant disponible !");
        }
        return newAttempts;
      });
      setShowHint(true);
      toast.error("Pas tout à fait ! Essaie encore.");
    }
  };

  const handleHintClose = () => {
    setShowHint(false);
  };

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
              <h1 className="text-2xl font-bold">{quest.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span>{quest.xpReward} XP</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Progress value={progressPercent} className="h-2" />
          <span>Étape {step + 1}/{steps.length}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 h-[calc(100vh-12rem)]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40}>
            <QuestContent
              title={currentStep.title}
              content={currentStep.content}
            />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={60}>
            <QuestEditor
              code={code}
              onCodeChange={setCode}
              onVerify={handleVerify}
              showHint={showHint}
              isSuccess={isSuccess}
              hint={currentStep.hint}
              successMessage={currentStep.successMessage}
              onHintClose={handleHintClose}
              showSolution={showSolution}
              solution={currentStep.solution}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </motion.div>
  );
}