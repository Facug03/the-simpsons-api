import { z } from 'zod'

export const createLocationSchema = z
  .object({
    description: z.string(),
    first_appearance_ep_id: z.number().nullable().default(null),
    first_appearance_sh_id: z.number().nullable().default(null),
    image_path: z.string(),
    name: z.string(),
    town: z.string(),
    use: z.string()
  })
  .required()

export const createLocationsSchema = z.array(createLocationSchema)

export type createLocationsDto = z.infer<typeof createLocationsSchema>
