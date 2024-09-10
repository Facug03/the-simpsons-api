import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { Short as ShortModel, Prisma } from '@prisma/client'

import { ShortService } from './short.service'
import { createShortsSchema } from './dto/create-short.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'

@Controller('short')
export class ShortController {
  constructor(private readonly episodeService: ShortService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createShortsSchema))
  createMany(@Body() createShortsDto: Prisma.ShortCreateManyInput): Promise<ShortModel[]> {
    return this.episodeService.create(createShortsDto)
  }
}
