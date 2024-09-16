import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { Short as ShortModel, Prisma } from '@prisma/client'

import { ShortService } from './short.service'
import { createShortsSchema } from './dto/create-short.dto'
import { ZodValidationPipe } from '@/src/common/pipes/zod-validation.pipe'
import { ApiKeyGuard } from '@/src/common/guards/api-key.guard'

@Controller('short')
export class ShortController {
  constructor(private readonly episodeService: ShortService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ZodValidationPipe(createShortsSchema))
  createMany(@Body() createShortsDto: Prisma.ShortCreateManyInput): Promise<ShortModel[]> {
    return this.episodeService.create(createShortsDto)
  }
}
