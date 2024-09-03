import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { EpisodeService } from './episode.service'
import { createEpisodesSchema } from './dto/create-episode.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createEpisodesSchema))
  createMany(@Body() createEpisodesDto: Prisma.EpisodeCreateManyInput) {
    return this.episodeService.create(createEpisodesDto)
  }

  @Get()
  findPaginated() {
    return this.episodeService.findPaginated()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.episodeService.findOne(id)
  }
}
