import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import helmet from '@fastify/helmet'

import { AppModule } from '@/src/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix('api')
  await app.register(helmet, {
    contentSecurityPolicy: false
  })
  const configService = app.get(ConfigService)
  const port = configService.get<string>('PORT', '3000')

  await app.listen(port, '0.0.0.0')

  const logger = app.get(Logger)
  logger.log(`App is ready and listening on port ${port} 🚀`)
}

bootstrap().catch(handleError)

function handleError(error: unknown) {
  console.error(error)
  process.exit(1)
}

process.on('uncaughtException', handleError)
