import { Module } from '@nestjs/common'
import { EpisodeService } from './episode.service'
import { EpisodeController } from './episode.controller'

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService]
})
export class EpisodeModule {}
