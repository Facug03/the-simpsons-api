import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { env } from 'hono/adapter'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import charactersRouter from './routes/character'
import locationsRouter from './routes/location'
import episodesRouter from './routes/episode'
import { ROUTES } from './consts/routes'

const app = new Hono().basePath('/api')

app.use(logger())
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
)
app.use(
  '*',
  secureHeaders({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false
  })
)

app.get('/', (c) => {
  const APP_URL = env<{ APP_URL: string }>(c, 'node').APP_URL

  const routesURL: Record<string, string> = {}

  ROUTES.forEach((route) => {
    routesURL[route] = `${APP_URL}/${route}`
  })

  return c.json(routesURL)
})

app.get('/health', async (c) => {
  return c.json({ status: 'ok' })
})

app.route('/characters', charactersRouter)
app.route('/locations', locationsRouter)
app.route('/episodes', episodesRouter)

app.onError((err, c) => {
  console.error(`[Error] ${err.message}`)
  return c.json(
    {
      message: 'Internal Server Error'
    },
    500
  )
})

export default app
