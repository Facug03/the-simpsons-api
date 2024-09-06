import { z } from 'zod'

export const createEpisodeSchema = z
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

export const createEpisodesSchema = z.array(createEpisodeSchema)

export type createEpisodesDto = z.infer<typeof createEpisodesSchema>
