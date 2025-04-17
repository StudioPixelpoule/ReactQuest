import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { usePlayerStore } from '@/lib/store';
import { useTheme } from '@/components/theme-provider';
import { ChevronLeft, User, Moon, Sun, Volume2, VolumeX, Trash } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { username, setUsername, resetProgress } = usePlayerStore();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleResetProgress = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.')) {
      resetProgress();
      toast.success('Progression réinitialisée');
      navigate('/', { replace: true });
    }
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
              <h1 className="text-2xl font-bold">Paramètres</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Paramètres du Profil
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Entrez votre nom d'utilisateur"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Apparence</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thème</Label>
                  <p className="text-sm text-muted-foreground">
                    Choisissez votre thème préféré
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Son</h2>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Effets Sonores</Label>
                <p className="text-sm text-muted-foreground">
                  Activer ou désactiver les effets sonores
                </p>
              </div>
              <div className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <VolumeX className="h-5 w-5 text-muted-foreground" />
                )}
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
            </div>
          </Card>

          <Separator />

          <Card className="p-6 border-destructive">
            <h2 className="text-xl font-semibold mb-4 text-destructive">Zone Dangereuse</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Réinitialiser la Progression</p>
                  <p className="text-sm text-muted-foreground">
                    Supprimer toute la progression et recommencer à zéro
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleResetProgress}
                  className="gap-2"
                >
                  <Trash className="h-4 w-4" />
                  Réinitialiser
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </motion.div>
  );
}