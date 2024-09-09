import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'

import { HealthModule } from '@/src/health/health.module'
import { LoggerModule } from '@/src/logger/logger.module'
import { DatabaseModule } from '@/src/database/database.module'
import { CharacterModule } from '@/src/character/character.module'
import { EpisodeModule } from '@/src/episode/episode.module'
import { LocationModule } from '@/src/location/location.module'
import { validateConfig } from '@/src/config/config.validation'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateConfig }),
    CacheModule.register({ isGlobal: true }),
    LoggerModule,
    HealthModule,
    DatabaseModule,
    CharacterModule,
    EpisodeModule,
    LocationModule
  ]
})
export class AppModule {}
