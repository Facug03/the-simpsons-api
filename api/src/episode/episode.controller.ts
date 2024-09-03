import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Query, Req, Res, UsePipes } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import type { Cache } from 'cache-manager'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { EpisodeService } from './episode.service'
import { createEpisodesSchema } from './dto/create-episode.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'
import { handleCache } from '@/src/utils/handle-cache'
import { IsPageDto } from '@/src/common/dto/pagination.dto'

@Controller('episode')
export class EpisodeController {
  constructor(
    private readonly episodeService: EpisodeService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createEpisodesSchema))
  createMany(@Body() createEpisodesDto: Prisma.EpisodeCreateManyInput) {
    return this.episodeService.create(createEpisodesDto)
  }

  @Get()
  findPaginated(@Req() req: FastifyRequest, @Res() res: FastifyReply, @Query() { page = 1 }: IsPageDto) {
    const cacheKey = `episode-paginated-${page}`
    const ttlInMs = 30000

    return handleCache({
      req,
      res,
      cacheManager: this.cacheManager,
      cacheKey,
      ttlInMs,
      getData: () => this.episodeService.findPaginated(page)
    })
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.episodeService.findOne(id)
  }
}
