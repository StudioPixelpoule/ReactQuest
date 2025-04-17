import { z } from 'zod';

// Schémas de validation réutilisables
export const emailSchema = z.string()
  .min(1, "L'email est requis")
  .email("Format d'email invalide");

export const passwordSchema = z.string()
  .min(6, "Le mot de passe doit faire au moins 6 caractères")
  .max(100, "Le mot de passe est trop long")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre");

export const usernameSchema = z.string()
  .min(2, "Le nom d'utilisateur doit faire au moins 2 caractères")
  .max(50, "Le nom d'utilisateur est trop long")
  .regex(/^[a-zA-Z0-9_-]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores");

// Fonction utilitaire pour valider les données
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
};