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
    const count = await prisma.character.count()
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

    const results = await prisma.character.findMany({
      take: 20,
      skip: (page - 1) * 20,
      select: {
        id: true,
        age: true,
        birthdate: true,
        gender: true,
        name: true,
        occupation: true,
        portrait_path: true,
        phrases: true,
        status: true
      }
    })

    const { APP_URL } = env<{ APP_URL: string }>(c, 'node')

    return c.json({
      count,
      next: page < Math.ceil(count / 20) ? `${APP_URL}/characters?page=${page + 1}` : null,
      prev: page > 1 ? `${APP_URL}/characters?page=${page - 1}` : null,
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
    const character = await prisma.character.findUnique({
      where: { id },
      include: {
        first_appearance_ep: true,
        first_appearance_sh: true
      }
    })

    if (!character) {
      c.status(404)
      return c.json({ message: 'Character not found', error: 'Not Found', statusCode: 404 })
    }

    return c.json(character)
  }
)

export default app
