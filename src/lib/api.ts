import axios from 'axios';

// Création d'une instance axios avec une configuration de base
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers la page de login si non authentifié
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types génériques pour les réponses API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Fonction utilitaire pour gérer les erreurs API
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || 'Une erreur est survenue',
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };
  }
  return {
    message: 'Une erreur inattendue est survenue',
    status: 500,
  };
};