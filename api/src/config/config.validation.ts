import { Logger } from '@nestjs/common'
import { z } from 'zod'

export const configValidationSchema = z.object({
  LOGGER_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'log']).default('log'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  DATABASE_URL: z.string().url(),
  APP_URL: z.string().url(),
  API_KEY: z.string()
})

export const validateConfig = (config: Record<string, unknown>) => {
  const parsedConfig = configValidationSchema.safeParse(config)

  if (!parsedConfig.success) {
    Logger.error(parsedConfig.error.flatten())
    throw new Error('Invalid configuration')
  }

  return parsedConfig.data
}
