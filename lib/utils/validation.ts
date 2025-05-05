import { z } from 'zod';
import { ValidationError } from './error';

export const albumSchema = z.object({
  userId: z.string().uuid(),
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  image: z.string().url(),
});

export const validateAlbum = (data: unknown) => {
  try {
    return albumSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        error.errors.map((err) => err.message).join(', ')
      );
    }
    throw error;
  }
};

export const validateAlbumUpdate = z.object({
  title: z.string().min(1).max(100).optional(),
  image: z.string().url().optional(),
}).refine((data) => data.title || data.image, {
  message: "At least one field must be provided for update"
}); 