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

import { LocationService } from './location.service'
import { createLocationsSchema } from './dto/create-location.dto'
import { ZodValidationPipe } from '@/src/pipes/zod-validation.pipe'
import { handleCache } from '@/src/utils/handle-cache'
import { IsPageDto } from '@/src/common/dto/pagination.dto'

@Controller('location')
export class CharacterController {
  constructor(
    private readonly locationService: LocationService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLocationsSchema))
  createMany(@Body() createLocationsDto: Prisma.LocationCreateManyInput) {
    return this.locationService.create(createLocationsDto)
  }

  @Get()
  findPaginated(@Req() req: FastifyRequest, @Res() res: FastifyReply, @Query() { page = 1 }: IsPageDto) {
    const cacheKey = `location-paginated-${page}`
    const ttlInMs = 30000

    return handleCache({
      req,
      res,
      cacheManager: this.cacheManager,
      cacheKey,
      ttlInMs,
      getData: () => this.locationService.findPaginated(page)
    })
  }

  @Get(':id')
  findOne(@Req() req: FastifyRequest, @Res() res: FastifyReply, @Param('id', ParseIntPipe) id: number) {
    const cacheKey = `location-${id}`
    const ttlInMs = 30000

    return handleCache({
      req,
      res,
      cacheManager: this.cacheManager,
      cacheKey,
      ttlInMs,
      getData: async () => {
        const location = await this.locationService.findOne(id)

        if (!location) {
          throw new NotFoundException('Location not found')
        }

        return location
      }
    })
  }
}
