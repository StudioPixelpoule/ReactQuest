import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactBot } from '@/components/ReactBot';
import { usePlayerStore } from '@/lib/store';
import { useAudio } from '@/components/AudioProvider';
import { toast } from 'sonner';
import { Code2, Rocket, Blocks, Cpu, Volume2, VolumeX } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      staggerChildren: 0.2 
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4 } 
  }
};

const itemVariants = {
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

const floatingIconVariants = {
  initial: { y: 0, rotate: 0 },
  animate: { 
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const { setUsername: setPlayerUsername } = usePlayerStore();
  const { startAudio, isStarted, isMuted, toggleMute } = useAudio();

  const handleStart = () => {
    if (!username.trim()) {
      toast.error("Veuillez entrer votre nom d'utilisateur !");
      return;
    }

    setPlayerUsername(username);
    toast.success("Bienvenue dans ReactQuest ! 🚀");
    navigate('/hub');
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, hsl(var(--primary)) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 70%, hsl(var(--primary)) 0%, transparent 60%)',
              'radial-gradient(circle at 40% 60%, hsl(var(--primary)) 0%, transparent 60%)',
              'radial-gradient(circle at 60% 40%, hsl(var(--primary)) 0%, transparent 60%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          variants={floatingIconVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/4 left-1/4"
        >
          <Code2 className="h-12 w-12 text-primary/20" />
        </motion.div>
        <motion.div
          variants={floatingIconVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-1/3 right-1/4"
        >
          <Blocks className="h-16 w-16 text-primary/20" />
        </motion.div>
        <motion.div
          variants={floatingIconVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-1/4 left-1/3"
        >
          <Cpu className="h-14 w-14 text-primary/20" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-lg mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="p-8 space-y-8 backdrop-blur-xl bg-card/90 border-2 border-primary/20">
            <motion.div variants={itemVariants} className="space-y-4 text-center">
              <div className="inline-block relative">
                <motion.div
                  className="absolute -top-6 -right-6"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Code2 className="h-8 w-8 text-primary" />
                </motion.div>
                <img 
                  src="/assets/images/logo/logo_color.png" 
                  alt="Logo" 
                  className="h-16 w-auto mx-auto"
                />
              </div>
              <p className="text-xl text-muted-foreground">
                Embarquez dans une aventure interactive pour maîtriser React et TypeScript
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-lg">
                  Choisissez votre nom de développeur
                </Label>
                <Input
                  id="username"
                  placeholder="Entrez votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                  className="text-lg h-12"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {!isStarted ? (
                <Button
                  size="lg"
                  className="w-full text-lg h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary gap-2"
                  onClick={startAudio}
                >
                  Activer le Son
                  <Volume2 className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full text-lg h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                  onClick={handleStart}
                >
                  Commencer l'Aventure
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              )}
              
              {isStarted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="w-full gap-2"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="h-4 w-4" />
                      <span>Son désactivé</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      <span>Son activé</span>
                    </>
                  )}
                </Button>
              )}
            </motion.div>
          </Card>
        </motion.div>
      </div>

      <div className="relative z-10 text-center py-4 text-sm text-muted-foreground">
        <p>© 2025 Pixel Poule. Tous droits réservés.</p>
      </div>

      <ReactBot
        message="Bienvenue ! Je suis React-Bot, votre guide dans cette aventure d'apprentissage. Prêt à commencer ?"
        isFloating={true}
      />
    </div>
  );
}