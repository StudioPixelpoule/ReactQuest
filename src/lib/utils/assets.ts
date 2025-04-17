// Utility to handle asset paths in development and production
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production, assets are in the /assets directory
  return import.meta.env.PROD ? `/assets/${cleanPath}` : `/${cleanPath}`;
};