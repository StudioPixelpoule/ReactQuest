import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAudio } from '@/components/AudioProvider';

const pages = [
  {
    title: "L'Histoire de TechTopia",
    content: `Il y a bien longtemps, dans une cité numérique oubliée, un projet s'est endormi.

Son nom : TechTopia.
Une ville d'un autre temps, construite ligne par ligne, par les pionniers du web.
Chaque bâtiment, chaque place, chaque mur... était un morceau de savoir codé.

Mais les développeurs ont disparu. Le code s'est effacé.
Aujourd'hui, la ville est figée. Vide.

Jusqu'à toi.`
  },
  {
    title: "Ta Mission",
    content: `Car toi, nouvel·le apprenti·e, tu as été choisi·e.
Pour réveiller TechTopia. Pour réapprendre les fondations du code.
Pour reconstruire une cité pensée en React et TypeScript.

Tu n'es pas seul·e dans cette aventure.
Moi, React-Bot, je serai ton guide.`
  },
  {
    title: "Les Quartiers",
    content: `TechTopia est divisée en quartiers.
Chacun d'eux renferme un pouvoir oublié du développement moderne.

Le Quartier des Fondations, pour apprendre les composants et les états.
Le Quartier des Effets, où vivent les hooks et les cycles de vie.
Le Quartier de la Structure, pour organiser ton application intelligemment.
Le Quartier des Routes, pour connecter tes pages et gérer la navigation.
Le Quartier de la Gestion d'État, pour synchroniser les données globales.
Le Quartier des Données, pour interagir avec les API.
Le Quartier des Formulaires, pour valider les entrées des utilisateurs.
Et enfin, le Quartier de l'Optimisation, pour booster les performances.`
  },
  {
    title: "Le Voyage",
    content: `Chaque bâtiment est une quête.
Chaque quête te rapproche de ton but : réactiver le cœur de TechTopia.

À chaque ligne de code, la ville reprendra vie.
À chaque bug corrigé, une lumière s'allumera.
À chaque projet terminé, un nouveau bâtiment apparaîtra.`
  },
  {
    title: "La Quête Finale",
    content: `Et quand tous les quartiers auront été restaurés...
tu accéderas à la mission finale : construire le Hub central de TechTopia, une application complète, moderne, et vivante.

Prends ton clavier. Prépare ton éditeur. Respire profondément.

Tu es l'avenir de TechTopia.

Bienvenue dans ReactQuest.
Que la quête commence.`
  }
];

interface IntroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IntroModal({ open, onOpenChange }: IntroModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [audio] = useState(() => {
    console.log('[Modal] Creating modal audio instance');
    const audio = new Audio('/assets/audio/audio2.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.addEventListener('play', () => {
      console.log('[Modal] Modal audio started playing');
    });
    audio.addEventListener('pause', () => {
      console.log('[Modal] Modal audio paused');
    });
    audio.addEventListener('error', (e) => {
      console.error('[Modal] Modal audio error:', e);
    });
    return audio;
  });
  const { pauseBackgroundMusic, resumeBackgroundMusic } = useAudio();

  useEffect(() => {
    if (open) {
      console.log('[Modal] Opening modal, pausing background and starting modal audio');
      pauseBackgroundMusic();
      audio.play().catch(error => {
        console.error('[Modal] Failed to play modal audio:', error);
      });
    }
    return () => {
      console.log('[Modal] Closing modal, stopping modal audio');
      audio.pause();
      if (open) {
        resumeBackgroundMusic();
      }
    };
  }, [open, audio, pauseBackgroundMusic, resumeBackgroundMusic]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onOpenChange(false);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-2xl backdrop-blur-xl bg-background/80 border-2 border-primary/20"
        aria-describedby="modal-description"
      >
        <DialogTitle className="sr-only">Introduction à ReactQuest</DialogTitle>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 py-8"
            id="modal-description"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
            >
              {pages[currentPage].title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose dark:prose-invert max-w-none whitespace-pre-line"
            >
              {pages[currentPage].content}
            </motion.div>

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="ghost"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>

              <div className="flex gap-1">
                {pages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      index === currentPage ? 'bg-primary' : 'bg-primary/20'
                    }`}
                  />
                ))}
              </div>

              <Button onClick={nextPage} className="gap-2">
                {currentPage === pages.length - 1 ? (
                  "Commencer"
                ) : (
                  <>
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}