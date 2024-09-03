import { z } from 'zod'

export const createCharacterSchema = z
  .object({
    age: z.number(),
    birthdate: z.string(),
    catchphrases: z.array(z.string()),
    description: z.string(),
    first_appearance_id: z.number(),
    full_body_image: z.string(),
    gender: z.enum(['Male', 'Female']),
    name: z.string(),
    occupation: z.string(),
    portrait_img: z.string(),
    quotes: z.array(z.string()),
    status: z.string()
  })
  .required()

export const createCharactersSchema = z.array(createCharacterSchema)

export type createCharactersDto = z.infer<typeof createCharactersSchema>
