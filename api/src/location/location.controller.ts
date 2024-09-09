import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, NotFoundException, Query } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { LocationService } from './location.service'
import { createLocationsSchema } from './dto/create-location.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'
import { IsPageDto } from '@/src/common/dto/pagination.dto'

@Controller('location')
export class CharacterController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLocationsSchema))
  createMany(@Body() createLocationsDto: Prisma.LocationCreateManyInput) {
    return this.locationService.create(createLocationsDto)
  }

  @Get()
  findPaginated(@Query() { page = 1 }: IsPageDto) {
    return this.locationService.findPaginated(page)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const location = await this.locationService.findOne(id)

    if (!location) {
      throw new NotFoundException('Location not found')
    }

    return location
  }
}
