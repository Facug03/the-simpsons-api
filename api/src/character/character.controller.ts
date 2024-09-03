import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  NotFoundException,
  Inject,
  Res,
  Req,
  Query
} from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Prisma } from '@prisma/client'
import type { Cache } from 'cache-manager'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { CharacterService } from './character.service'
import { createCharactersSchema } from './dto/create-character.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'
import { IsPageDto } from '@/src/common/dto/pagination.dto'
import { handleCache } from '@/src/utils/handle-cache'

@Controller('character')
export class CharacterController {
  constructor(
    private readonly charactersService: CharacterService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCharactersSchema))
  createMany(@Body() createCharactersDto: Prisma.CharacterCreateManyInput) {
    return this.charactersService.create(createCharactersDto)
  }

  @Get()
  findPaginated(@Req() req: FastifyRequest, @Res() res: FastifyReply, @Query() { page = 1 }: IsPageDto) {
    console.log({ page })
    const cacheKey = `character-paginated-${page}`
    const ttlInMs = 30000

    return handleCache({
      req,
      res,
      cacheManager: this.cacheManager,
      cacheKey,
      ttlInMs,
      getData: () => this.charactersService.findPaginated(page)
    })
  }

  @Get(':id')
  findOne(@Req() req: FastifyRequest, @Res() res: FastifyReply, @Param('id', ParseIntPipe) id: number) {
    const cacheKey = `character-${id}`
    const ttlInMs = 30000

    return handleCache({
      req,
      res,
      cacheManager: this.cacheManager,
      cacheKey,
      ttlInMs,
      getData: async () => {
        const character = await this.charactersService.findOne(id)

        if (!character) {
          console.log('character not found')
          throw new NotFoundException('Character not found')
        }

        return character
      }
    })
  }
}
