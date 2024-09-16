import { z } from 'zod'

export const createCharacterSchema = z
  .object({
    age: z.number().nullable(),
    birthdate: z.string().nullable(),
    description: z.string(),
    first_appearance_ep_id: z.number().nullable().default(null),
    first_appearance_sh_id: z.number().nullable().default(null),
    gender: z.enum(['Male', 'Female', 'Unknown']).default('Unknown'),
    name: z.string(),
    occupation: z.string(),
    phrases: z.array(z.string()),
    portrait_path: z.string(),
    status: z.string().default('Unknown')
  })
  .required()

export const createCharactersSchema = z.array(createCharacterSchema)

export type createCharactersDto = z.infer<typeof createCharactersSchema>
