import { z } from 'zod'

export const createShortSchema = z
  .object({
    airdate: z.string(),
    description: z.string(),
    episode_number: z.number(),
    image_path: z.string(),
    name: z.string(),
    season: z.number(),
    synopsis: z.string()
  })
  .required()

export const createShortsSchema = z.array(createShortSchema)

export type createShortsDto = z.infer<typeof createShortsSchema>
