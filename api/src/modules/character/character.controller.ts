import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  NotFoundException,
  Query,
  UseGuards
} from '@nestjs/common'
import { Prisma, Character as CharacterModel } from '@prisma/client'

import { CharacterService } from './character.service'
import { createCharactersSchema } from './dto/create-character.dto'
import { ZodValidationPipe } from '@/src/common/pipes/zod-validation.pipe'
import { IsPageDto } from '@/src/common/dto/pagination.dto'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'
import { ApiKeyGuard } from '@/src/common/guards/api-key.guard'

@Controller('character')
export class CharacterController {
  constructor(private readonly charactersService: CharacterService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ZodValidationPipe(createCharactersSchema))
  createMany(@Body() createCharactersDto: Prisma.CharacterCreateManyInput): Promise<CharacterModel[]> {
    return this.charactersService.create(createCharactersDto)
  }

  @Get()
  findPaginated(
    @Query() { page = 1 }: IsPageDto
  ): Promise<
    PaginationResponse<Omit<CharacterModel, 'first_appearance_ep_id' | 'description' | 'first_appearance_sh_id'>[]>
  > {
    return this.charactersService.findPaginated(page)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CharacterModel> {
    const character = await this.charactersService.findOne(id)

    if (!character) {
      throw new NotFoundException('Character not found')
    }

    return character
  }
}
