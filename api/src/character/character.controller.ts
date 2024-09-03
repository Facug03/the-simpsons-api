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
  Res
} from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Prisma } from '@prisma/client'
import { Cache } from 'cache-manager'
import { FastifyReply } from 'fastify'

import { CharacterService } from './character.service'
import { createCharactersSchema } from './dto/create-character.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'

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
  async findPaginated(@Res() res: FastifyReply) {
    console.log(this.cacheManager)
    const getCache = await this.cacheManager.get('character-paginated')

    if (getCache) {
      return res.code(304).send(getCache).headers({
        'cache-control': 'public, max-age=30000'
      })
    }

    const data = await this.charactersService.findPaginated()

    await this.cacheManager.set('character-paginated', data, 30000)

    return res.code(200).send(data).headers({
      'cache-control': 'public, max-age=30000'
    })
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const character = await this.charactersService.findOne(id)

    if (!character) {
      throw new NotFoundException('Character not found')
    }

    return character
  }
}
