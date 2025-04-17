import { motion } from 'framer-motion';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full border-t bg-background/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo et Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              ReactQuest
            </h3>
            <p className="text-sm text-muted-foreground">
              Une aventure interactive pour maîtriser React et TypeScript. Apprenez en construisant des projets réels.
            </p>
          </div>

          {/* Liens Rapides */}
          <div className="space-y-4">
            <h4 className="font-semibold">Liens Rapides</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/hub" className="hover:text-primary transition-colors">
                  Hub
                </a>
              </li>
              <li>
                <a href="/profile" className="hover:text-primary transition-colors">
                  Profil
                </a>
              </li>
              <li>
                <a href="/settings" className="hover:text-primary transition-colors">
                  Paramètres
                </a>
              </li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div className="space-y-4">
            <h4 className="font-semibold">Suivez-nous</h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/pixelpoule" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/pixelpoule" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Pixel Poule. Tous droits réservés.</p>
          <p>ReactQuest 1.0</p>
        </div>
      </div>
    </motion.footer>
  );
}