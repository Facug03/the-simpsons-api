import { z } from 'zod'

export const createLocationSchema = z
  .object({
    address: z.string(),
    description: z.string(),
    first_appearance_id: z.number(),
    image_url: z.string(),
    name: z.string(),
    town: z.string(),
    use: z.string()
  })
  .required()

export const createLocationsSchema = z.array(createLocationSchema)

export type createLocationsDto = z.infer<typeof createLocationsSchema>
