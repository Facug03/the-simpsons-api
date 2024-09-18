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
import { Location as LocationModel, Prisma } from '@prisma/client'

import { LocationService } from './location.service'
import { createLocationsSchema } from './dto/create-location.dto'
import { ZodValidationPipe } from '@/src/common/pipes/zod-validation.pipe'
import { IsPageDto } from '@/src/common/dto/pagination.dto'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'
import { ApiKeyGuard } from '@/src/common/guards/api-key.guard'

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ZodValidationPipe(createLocationsSchema))
  createMany(@Body() createLocationsDto: Prisma.LocationCreateManyInput): Promise<LocationModel[]> {
    return this.locationService.create(createLocationsDto)
  }

  @Get()
  findPaginated(
    @Query() { page = 1 }: IsPageDto
  ): Promise<
    PaginationResponse<Omit<LocationModel, 'description' | 'first_appearance_ep_id' | 'first_appearance_sh_id'>[]>
  > {
    return this.locationService.findPaginated(page)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<LocationModel> {
    const location = await this.locationService.findOne(id)

    if (!location) {
      throw new NotFoundException('Location not found')
    }

    return location
  }
}
