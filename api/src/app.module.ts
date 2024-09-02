import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { HealthModule } from '@/src/health/health.module'
import { LoggerModule } from '@/src/logger/logger.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), LoggerModule, HealthModule, DatabaseModule]
})
export class AppModule {}
