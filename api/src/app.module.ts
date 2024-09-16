import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'

import { HealthModule } from '@/src/modules/health/health.module'
import { LoggerModule } from '@/src/modules/logger/logger.module'
import { DatabaseModule } from '@/src/modules/database/database.module'
import { CharacterModule } from '@/src/modules/character/character.module'
import { EpisodeModule } from '@/src/modules/episode/episode.module'
import { LocationModule } from '@/src/modules/location/location.module'
import { ShortModule } from '@/src/modules/short/short.module'
import { validateConfig } from '@/src/config/config.validation'
import { AppControler } from './app.controler'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateConfig }),
    CacheModule.register({ isGlobal: true }),
    LoggerModule,
    HealthModule,
    DatabaseModule,
    CharacterModule,
    EpisodeModule,
    LocationModule,
    ShortModule
  ],
  controllers: [AppControler]
})
export class AppModule {}
