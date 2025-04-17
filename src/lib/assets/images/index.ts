import { getAssetPath } from '@/lib/utils/assets';

// Export des images pour une utilisation facile
export const images = {
  logo: {
    dark: getAssetPath('src/assets/images/logo/logo-dark.svg'),
    light: getAssetPath('src/assets/images/logo/logo-light.svg'),
    color: getAssetPath('src/assets/images/logo/logo_color.png')
  },
  backgrounds: {
    grid: getAssetPath('src/assets/images/backgrounds/grid.svg'),
    dots: getAssetPath('src/assets/images/backgrounds/dots.svg'),
  },
  districts: {
    foundations: getAssetPath('src/assets/images/districts/foundations.svg'),
    effects: getAssetPath('src/assets/images/districts/effects.svg'),
    patterns: getAssetPath('src/assets/images/districts/patterns.svg'),
    routing: getAssetPath('src/assets/images/districts/routing.svg'),
    state: getAssetPath('src/assets/images/districts/state.svg'),
    data: getAssetPath('src/assets/images/districts/data.svg'),
    forms: getAssetPath('src/assets/images/districts/forms.svg'),
    optimization: getAssetPath('src/assets/images/districts/optimization.svg'),
    final: getAssetPath('src/assets/images/districts/final.svg'),
  },
  badges: {
    componentMaster: getAssetPath('src/assets/images/badges/component-master.svg'),
    stateWizard: getAssetPath('src/assets/images/badges/state-wizard.svg'),
    effectSage: getAssetPath('src/assets/images/badges/effect-sage.svg'),
    domMaster: getAssetPath('src/assets/images/badges/dom-master.svg'),
    persistentCoder: getAssetPath('src/assets/images/badges/persistent-coder.svg'),
    structuralThinker: getAssetPath('src/assets/images/badges/structural-thinker.svg'),
    hookMaster: getAssetPath('src/assets/images/badges/hook-master.svg'),
    routerExplorer: getAssetPath('src/assets/images/badges/router-explorer.svg'),
    layoutArchitect: getAssetPath('src/assets/images/badges/layout-architect.svg'),
    routingCommander: getAssetPath('src/assets/images/badges/routing-commander.svg'),
    contextCraftsman: getAssetPath('src/assets/images/badges/context-craftsman.svg'),
    reduxMaster: getAssetPath('src/assets/images/badges/redux-master.svg'),
    stateRefactorChampion: getAssetPath('src/assets/images/badges/state-refactor-champion.svg'),
    apiMaster: getAssetPath('src/assets/images/badges/api-master.svg'),
    queryWizard: getAssetPath('src/assets/images/badges/query-wizard.svg'),
    dataArchitect: getAssetPath('src/assets/images/badges/data-architect.svg'),
    formScholar: getAssetPath('src/assets/images/badges/form-scholar.svg'),
    formMaster: getAssetPath('src/assets/images/badges/form-master.svg'),
    formExpert: getAssetPath('src/assets/images/badges/form-expert.svg'),
    speedArchitect: getAssetPath('src/assets/images/badges/speed-architect.svg'),
    testGuardian: getAssetPath('src/assets/images/badges/test-guardian.svg'),
    ultimateOptimizer: getAssetPath('src/assets/images/badges/ultimate-optimizer.svg'),
    supremeArchitect: getAssetPath('src/assets/images/badges/supreme-architect.svg'),
  },
};