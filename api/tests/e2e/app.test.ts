import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import * as nock from 'nock'
import request from 'supertest'
import { Character } from '@prisma/client'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '@/src/app.module'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'

describe('App', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
    nock.disableNetConnect()
    nock.enableNetConnect('127.0.0.1')
  })

  afterEach(() => {
    nock.cleanAll()
  })

  afterAll(async () => {
    await app.close()
    nock.enableNetConnect()
  })

  describe('/health', () => {
    it('/GET - should return 200', async () => {
      const response = await request(app.getHttpServer()).get('/health')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ status: 'ok' })
    })
  })

  describe('/character', () => {
    describe('GET', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/character')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.results[0]).toHaveProperty('id')
        expect(body.count).toBeGreaterThan(0)
        expect(body.pages).toBeGreaterThan(0)
      })

      it('should return 200 with a query', async () => {
        const page = 2
        const response = await request(app.getHttpServer()).get(`/character?page=${page}`)
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.next).toContain(`page=${page + 1}`)
        expect(body.prev).toContain(`page=${page - 1}`)
      })

      it('should return page 1 with a bad query', async () => {
        const response = await request(app.getHttpServer()).get('/character?page=test')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.prev).toBeNull()
        expect(body.results[0]).toHaveProperty('id')
        expect(body.next).toContain('page=2')
      })
    })

    describe('GET/:id', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/character/1')
        const body = response.body as Character

        expect(response.status).toBe(200)
        expect(body).toHaveProperty('id')
      })

      it('should return 404 if id does not exist', async () => {
        const response = await request(app.getHttpServer()).get('/character/0')

        expect(response.status).toBe(404)
      })

      it('should return 400 if id is not a number', async () => {
        const response = await request(app.getHttpServer()).get('/character/test')

        expect(response.status).toBe(400)
      })
    })

    describe('POST', () => {
      it('should return an error if api key is missing', async () => {
        const response = await request(app.getHttpServer()).post('/character')

        expect(response.status).toBe(401)
      })

      it('should return an error if api key is invalid', async () => {
        const response = await request(app.getHttpServer()).post('/character').set('Authorization', 'Bearer 123')

        expect(response.status).toBe(401)
      })
    })
  })

  describe('/location', () => {
    describe('GET', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/location')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.results[0]).toHaveProperty('id')
        expect(body.count).toBeGreaterThan(0)
        expect(body.pages).toBeGreaterThan(0)
      })

      it('should return 200 with a query', async () => {
        const page = 2
        const response = await request(app.getHttpServer()).get(`/location?page=${page}`)
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.next).toContain(`page=${page + 1}`)
        expect(body.prev).toContain(`page=${page - 1}`)
      })

      it('should return page 1 with a bad query', async () => {
        const response = await request(app.getHttpServer()).get('/location?page=test')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.prev).toBeNull()
        expect(body.results[0]).toHaveProperty('id')
        expect(body.next).toContain('page=2')
      })
    })

    describe('GET/:id', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/location/1')
        const body = response.body as Character

        expect(response.status).toBe(200)
        expect(body).toHaveProperty('id')
      })

      it('should return 404 if id does not exist', async () => {
        const response = await request(app.getHttpServer()).get('/location/0')

        expect(response.status).toBe(404)
      })

      it('should return 400 if id is not a number', async () => {
        const response = await request(app.getHttpServer()).get('/location/test')

        expect(response.status).toBe(400)
      })
    })

    describe('POST', () => {
      it('should return an error if api key is missing', async () => {
        const response = await request(app.getHttpServer()).post('/location')

        expect(response.status).toBe(401)
      })

      it('should return an error if api key is invalid', async () => {
        const response = await request(app.getHttpServer()).post('/location').set('Authorization', 'Bearer 123')

        expect(response.status).toBe(401)
      })
    })
  })

  describe('/episode', () => {
    describe('GET', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/episode')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.results[0]).toHaveProperty('id')
        expect(body.count).toBeGreaterThan(0)
        expect(body.pages).toBeGreaterThan(0)
      })

      it('should return 200 with a query', async () => {
        const page = 2
        const response = await request(app.getHttpServer()).get(`/episode?page=${page}`)
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.results.length).toBeGreaterThan(0)
        expect(body.next).toContain(`page=${page + 1}`)
        expect(body.prev).toContain(`page=${page - 1}`)
      })

      it('should return page 1 with a bad query', async () => {
        const response = await request(app.getHttpServer()).get('/episode?page=test')
        const body = response.body as PaginationResponse<Character[]>

        expect(response.status).toBe(200)
        expect(body.prev).toBeNull()
        expect(body.results[0]).toHaveProperty('id')
        expect(body.next).toContain('page=2')
      })
    })

    describe('GET/:id', () => {
      it('should return the correct body', async () => {
        const response = await request(app.getHttpServer()).get('/episode/1')
        const body = response.body as Character

        expect(response.status).toBe(200)
        expect(body).toHaveProperty('id')
      })

      it('should return 404 if id does not exist', async () => {
        const response = await request(app.getHttpServer()).get('/episode/0')

        expect(response.status).toBe(404)
      })

      it('should return 400 if id is not a number', async () => {
        const response = await request(app.getHttpServer()).get('/episode/test')

        expect(response.status).toBe(400)
      })
    })

    describe('POST', () => {
      it('should return an error if api key is missing', async () => {
        const response = await request(app.getHttpServer()).post('/episode')

        expect(response.status).toBe(401)
      })

      it('should return an error if api key is invalid', async () => {
        const response = await request(app.getHttpServer()).post('/episode').set('Authorization', 'Bearer 123')

        expect(response.status).toBe(401)
      })
    })
  })
})
