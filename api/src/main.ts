import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import helmet from '@fastify/helmet'
import awsLambdaFastify from '@fastify/aws-lambda'

import { AppModule } from '@/src/app.module'

export async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix('api')
  await app.register(helmet, {
    contentSecurityPolicy: false
  })

  const configService = app.get(ConfigService)
  const NODE_ENV = configService.get<string>('NODE_ENV')
  const logger = app.get(Logger)

  if (NODE_ENV === 'production') {
    await app.init()

    logger.log('App is ready 🚀')

    const fastifyApp = app.getHttpAdapter().getInstance()
    return awsLambdaFastify(fastifyApp)
  }

  const PORT = configService.get<string>('PORT', '3000')
  await app.listen(PORT, '0.0.0.0')

  logger.log(`App is ready and listening on port ${PORT} 🚀`)
}

bootstrap().catch(handleError)

function handleError(error: unknown) {
  console.error(error)
  process.exit(1)
}

process.on('uncaughtException', handleError)
