export interface Quest {
  id: string;
  title: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Maîtrise';
  description: string;
  path: string;
  xpReward: number;
  badge?: string;
  prerequisites?: string[];
  district: 'foundations' | 'effects' | 'patterns' | 'routing' | 'state' | 'data' | 'forms' | 'optimization' | 'final';
}

export interface District {
  id: 'foundations' | 'effects' | 'patterns' | 'routing' | 'state' | 'data' | 'forms' | 'optimization' | 'final';
  name: string;
  description: string;
  icon: 'Zap' | 'Layout' | 'Blocks' | 'Route' | 'Database' | 'Ship' | 'ScrollText' | 'Gauge' | 'Trophy';
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Maîtrise';
}

export const districts: District[] = [
  {
    id: 'foundations',
    name: 'Quartier des Fondations',
    description: 'Maîtrise les fondamentaux et les bases de React',
    icon: 'Zap',
    level: 'Débutant'
  },
  {
    id: 'effects',
    name: 'Quartier des Effets',
    description: 'Maîtrise les effets et le cycle de vie des composants React',
    icon: 'Layout',
    level: 'Intermédiaire'
  },
  {
    id: 'patterns',
    name: 'Quartier des Patterns',
    description: 'Apprends à structurer et organiser tes applications React',
    icon: 'Blocks',
    level: 'Intermédiaire'
  },
  {
    id: 'routing',
    name: 'Quartier des Routes',
    description: 'Maîtrise la navigation et les routes dans une application React',
    icon: 'Route',
    level: 'Intermédiaire'
  },
  {
    id: 'state',
    name: 'Quartier de la Gestion d\'État',
    description: 'Apprends à gérer l\'état global de tes applications React',
    icon: 'Database',
    level: 'Avancé'
  },
  {
    id: 'data',
    name: 'Quartier des Données',
    description: 'Apprends à gérer les données et les API dans tes applications React',
    icon: 'Ship',
    level: 'Avancé'
  },
  {
    id: 'forms',
    name: 'Quartier des Formulaires',
    description: 'Maîtrise la création et la validation de formulaires en React',
    icon: 'ScrollText',
    level: 'Intermédiaire'
  },
  {
    id: 'optimization',
    name: 'Quartier de l\'Optimisation',
    description: 'Optimise les performances de tes applications React',
    icon: 'Gauge',
    level: 'Avancé'
  },
  {
    id: 'final',
    name: 'Quête Finale',
    description: 'Construis une application complète qui utilise tout ce que tu as appris',
    icon: 'Trophy',
    level: 'Maîtrise'
  }
];

export const quests: Quest[] = [
  {
    id: 'foundations-components',
    title: 'Académie des Composants',
    level: 'Débutant',
    description: 'Apprends à créer ton premier composant React typé avec TypeScript.',
    path: '/quest/foundations-components',
    xpReward: 300,
    badge: 'component-master',
    district: 'foundations'
  },
  {
    id: 'foundations-state',
    title: 'Tour du State',
    level: 'Débutant',
    description: 'Découvre le hook useState et donne une mémoire à tes composants.',
    path: '/quest/foundations-state',
    xpReward: 400,
    badge: 'state-wizard',
    prerequisites: ['foundations-components'],
    district: 'foundations'
  },
  {
    id: 'foundations-dashboard',
    title: 'Tableau de Bord',
    level: 'Débutant',
    description: 'Crée une interface complète avec des widgets dynamiques et interactifs.',
    path: '/quest/foundations-dashboard',
    xpReward: 500,
    badge: 'foundation-master',
    prerequisites: ['foundations-state'],
    district: 'foundations'
  },
  {
    id: 'effects-lifecycle',
    title: 'Laboratoire des Effets',
    level: 'Intermédiaire',
    description: 'Maîtrise le cycle de vie des composants avec useEffect.',
    path: '/quest/effects-lifecycle',
    xpReward: 500,
    badge: 'effect-sage',
    prerequisites: ['foundations-dashboard'],
    district: 'effects'
  },
  {
    id: 'effects-refs',
    title: 'Bibliothèque des Refs',
    level: 'Intermédiaire',
    description: 'Apprends à manipuler le DOM avec useRef et à créer des références persistantes.',
    path: '/quest/effects-refs',
    xpReward: 500,
    badge: 'dom-master',
    prerequisites: ['effects-lifecycle'],
    district: 'effects'
  },
  {
    id: 'effects-task-tracker',
    title: 'TaskTracker',
    level: 'Intermédiaire',
    description: 'Crée une application complète de suivi de tâches avec persistance locale.',
    path: '/quest/effects-task-tracker',
    xpReward: 600,
    badge: 'persistent-coder',
    prerequisites: ['effects-refs'],
    district: 'effects'
  },
  {
    id: 'patterns-workshop',
    title: 'Atelier des Patterns',
    level: 'Intermédiaire',
    description: 'Apprends à structurer une application React avec des composants clairs et bien organisés.',
    path: '/quest/patterns-workshop',
    xpReward: 600,
    badge: 'structural-thinker',
    prerequisites: ['effects-task-tracker'],
    district: 'patterns'
  },
  {
    id: 'patterns-hooks',
    title: 'Centre de Contrôle des Hooks',
    level: 'Intermédiaire',
    description: 'Crée des hooks personnalisés pour factoriser et réutiliser la logique.',
    path: '/quest/patterns-hooks',
    xpReward: 600,
    badge: 'hook-master',
    prerequisites: ['patterns-workshop'],
    district: 'patterns'
  },
  {
    id: 'routing-station',
    title: 'Gare Centrale des Routes',
    level: 'Intermédiaire',
    description: 'Apprends à gérer la navigation et les routes dans une application React.',
    path: '/quest/routing-station',
    xpReward: 600,
    badge: 'router-explorer',
    prerequisites: ['patterns-hooks'],
    district: 'routing'
  },
  {
    id: 'routing-layouts',
    title: 'Station des Layouts',
    level: 'Intermédiaire',
    description: 'Crée des layouts réutilisables et organise la navigation imbriquée.',
    path: '/quest/routing-layouts',
    xpReward: 600,
    badge: 'layout-architect',
    prerequisites: ['routing-station'],
    district: 'routing'
  },
  {
    id: 'routing-final',
    title: 'Navigation Complète',
    level: 'Intermédiaire',
    description: 'Crée une application React complète avec navigation, layouts et routes protégées.',
    path: '/quest/routing-final',
    xpReward: 700,
    badge: 'routing-commander',
    prerequisites: ['routing-layouts'],
    district: 'routing'
  },
  {
    id: 'state-context',
    title: 'Usine du Context API',
    level: 'Avancé',
    description: 'Apprends à créer et utiliser des contextes React pour partager des données globalement.',
    path: '/quest/state-context',
    xpReward: 700,
    badge: 'context-craftsman',
    prerequisites: ['routing-final'],
    district: 'state'
  },
  {
    id: 'state-redux',
    title: 'Centrale Redux Toolkit',
    level: 'Avancé',
    description: 'Maîtrise la gestion d\'état avancée avec Redux Toolkit et TypeScript.',
    path: '/quest/state-redux',
    xpReward: 700,
    badge: 'redux-master',
    prerequisites: ['state-context'],
    district: 'state'
  },
  {
    id: 'state-final',
    title: 'Refactorisation Redux',
    level: 'Avancé',
    description: 'Transforme une application existante pour utiliser Redux Toolkit et une architecture scalable.',
    path: '/quest/state-final',
    xpReward: 750,
    badge: 'state-refactor-champion',
    prerequisites: ['state-redux'],
    district: 'state'
  },
  {
    id: 'data-api',
    title: 'Port des API',
    level: 'Avancé',
    description: 'Apprends à communiquer avec des API REST de manière typée et robuste.',
    path: '/quest/data-api',
    xpReward: 700,
    badge: 'api-master',
    prerequisites: ['state-final'],
    district: 'data'
  },
  {
    id: 'data-query',
    title: 'Entrepôt de Données',
    level: 'Avancé',
    description: 'Maîtrise React Query pour une gestion optimisée du cache et des requêtes.',
    path: '/quest/data-query',
    xpReward: 700,
    badge: 'query-wizard',
    prerequisites: ['data-api'],
    district: 'data'
  },
  {
    id: 'data-final',
    title: 'Blog Connecté',
    level: 'Avancé',
    description: 'Crée un blog complet avec API, cache optimisé et navigation dynamique.',
    path: '/quest/data-final',
    xpReward: 750,
    badge: 'data-architect',
    prerequisites: ['data-query'],
    district: 'data'
  },
  {
    id: 'forms-academy',
    title: 'Académie des Formulaires',
    level: 'Intermédiaire',
    description: 'Apprends à créer des formulaires contrôlés et à les valider.',
    path: '/quest/forms-academy',
    xpReward: 600,
    badge: 'form-scholar',
    prerequisites: ['data-final'],
    district: 'forms'
  },
  {
    id: 'forms-validation',
    title: 'Centre de Validation',
    level: 'Avancé',
    description: 'Maîtrise React Hook Form et Zod pour des formulaires puissants et typés.',
    path: '/quest/forms-validation',
    xpReward: 600,
    badge: 'form-master',
    prerequisites: ['forms-academy'],
    district: 'forms'
  },
  {
    id: 'forms-final',
    title: 'Formulaire de Contact Pro',
    level: 'Avancé',
    description: 'Crée un formulaire de contact professionnel avec validation avancée et UI soignée.',
    path: '/quest/forms-final',
    xpReward: 700,
    badge: 'form-expert',
    prerequisites: ['forms-validation'],
    district: 'forms'
  },
  {
    id: 'optimization-lab',
    title: 'Laboratoire d\'Optimisation',
    level: 'Avancé',
    description: 'Apprends à optimiser les performances de tes applications React avec useMemo, useCallback, et plus.',
    path: '/quest/optimization-lab',
    xpReward: 700,
    badge: 'speed-architect',
    prerequisites: ['forms-final'],
    district: 'optimization'
  },
  {
    id: 'testing-lab',
    title: 'Centre de Tests',
    level: 'Avancé',
    description: 'Apprends à tester tes composants React avec Jest et Testing Library.',
    path: '/quest/testing-lab',
    xpReward: 700,
    badge: 'test-guardian',
    prerequisites: ['optimization-lab'],
    district: 'optimization'
  },
  {
    id: 'optimization-final',
    title: 'Optimisation Complète',
    level: 'Avancé',
    description: 'Optimise une application React complète en utilisant toutes les techniques d\'optimisation.',
    path: '/quest/optimization-final',
    xpReward: 800,
    badge: 'ultimate-optimizer',
    prerequisites: ['testing-lab'],
    district: 'optimization'
  },
  {
    id: 'final-quest',
    title: 'TechTopia Hub',
    level: 'Maîtrise',
    description: 'Construis une application complète et fonctionnelle qui rassemble tout ce que tu as appris.',
    path: '/quest/final-quest',
    xpReward: 1000,
    badge: 'supreme-architect',
    prerequisites: ['optimization-final'],
    district: 'final'
  }
];