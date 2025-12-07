import { Hono } from 'hono'
import { validator } from 'hono/validator'
import * as z from 'zod'
import { prisma } from '../../lib/prisma'
import { env } from 'hono/adapter'

const app = new Hono()

app.get(
  '/',
  validator('query', (value, c) => {
    const schema = z.object({ page: z.coerce.number().int().positive().optional().default(1) })
    const valueParsed = schema.safeParse(value)

    if (valueParsed.success) {
      return valueParsed.data.page
    }
    return 1
  }),
  async (c) => {
    const page = c.req.valid('query')
    const count = await prisma.episode.count()
    const pages = Math.ceil(count / 20)

    if (page > pages) {
      return c.json({
        count,
        next: null,
        prev: null,
        pages,
        results: []
      })
    }

    const results = await prisma.episode.findMany({
      take: 20,
      skip: (page - 1) * 20,
      select: {
        id: true,
        airdate: true,
        episode_number: true,
        image_path: true,
        name: true,
        season: true,
        synopsis: true
      }
    })

    const { APP_URL } = env<{ APP_URL: string }>(c, 'node')

    return c.json({
      count,
      next: page < Math.ceil(count / 20) ? `${APP_URL}/episodes?page=${page + 1}` : null,
      prev: page > 1 ? `${APP_URL}/episodes?page=${page - 1}` : null,
      pages: Math.ceil(count / 20),
      results
    })
  }
)

app.get(
  '/:id',
  validator('param', (value) => {
    const schema = z.object({ id: z.coerce.number().int().positive() })
    const valueParsed = schema.safeParse(value)

    if (valueParsed.success) {
      return valueParsed.data.id
    }
    return null
  }),
  async (c) => {
    const id = c.req.valid('param')
    if (!id) {
      c.status(400)
      return c.json({
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
        statusCode: 400
      })
    }
    const episode = await prisma.episode.findUnique({
      where: { id }
    })

    if (!episode) {
      c.status(404)
      return c.json({ message: 'Episode not found', error: 'Not Found', statusCode: 404 })
    }

    return c.json(episode)
  }
)

export default app
