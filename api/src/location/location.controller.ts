import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { LocationService } from './location.service'
import { createLocationsSchema } from './dto/create-location.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'

@Controller('location')
export class CharacterController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLocationsSchema))
  createMany(@Body() createLocationsDto: Prisma.LocationCreateManyInput) {
    return this.locationService.create(createLocationsDto)
  }

  @Get()
  findPaginated() {
    return this.locationService.findPaginated()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.findOne(id)
  }
}
