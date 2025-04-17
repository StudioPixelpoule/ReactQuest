import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '@/lib/store';
import { toast } from 'sonner';

export function useAuth() {
  const navigate = useNavigate();
  const { resetProgress } = usePlayerStore();

  const logout = useCallback(() => {
    try {
      // Réinitialiser le store
      resetProgress();
      
      // Supprimer les données de session
      localStorage.removeItem('token');
      
      // Rediriger vers la page de login
      navigate('/login', { replace: true });
      
      toast.success('Déconnexion réussie');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  }, [navigate, resetProgress]);

  return { logout };
}