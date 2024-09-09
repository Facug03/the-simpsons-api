import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UsePipes } from '@nestjs/common'
import { Episode as EpisodeModel, Prisma } from '@prisma/client'

import { EpisodeService } from './episode.service'
import { createEpisodesSchema } from './dto/create-episode.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'
import { IsPageDto } from '@/src/common/dto/pagination.dto'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createEpisodesSchema))
  createMany(@Body() createEpisodesDto: Prisma.EpisodeCreateManyInput): Promise<EpisodeModel[]> {
    return this.episodeService.create(createEpisodesDto)
  }

  @Get()
  findPaginated(@Query() { page = 1 }: IsPageDto): Promise<PaginationResponse<Omit<EpisodeModel, 'description'>[]>> {
    return this.episodeService.findPaginated(page)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EpisodeModel> {
    const episode = await this.episodeService.findOne(id)

    if (!episode) {
      throw new NotFoundException('Episode not found')
    }

    return episode
  }
}
