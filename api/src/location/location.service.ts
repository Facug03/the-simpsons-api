import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Location, Prisma } from '@prisma/client'
import { ConfigService } from '@nestjs/config'

import { DatabaseService } from '@/src/database/database.service'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'

@Injectable()
export class LocationService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}

  async create(createLocationsDto: Prisma.LocationCreateManyInput): Promise<Location[]> {
    return this.databaseService.location.createManyAndReturn({
      data: createLocationsDto
    })
  }

  async findOne(id: number): Promise<Location | null> {
    return this.databaseService.location.findUnique({
      where: { id },
      include: {
        first_appearance: true
      }
    })
  }

  async findPaginated(
    page: number
  ): Promise<
    PaginationResponse<Omit<Location, 'description' | 'first_appearance_ep_id' | 'first_appearance_sh_id'>[]>
  > {
    const cacheKey = 'location-count'
    let count = await this.cacheManager.get<number>(cacheKey)

    if (!count) {
      count = await this.databaseService.location.count()

      await this.cacheManager.set(cacheKey, count, 60 * 60 * 24 * 1000)
    }

    const results = await this.databaseService.location.findMany({
      take: 20,
      skip: (page - 1) * 20,
      select: {
        id: true,
        name: true,
        image_path: true,
        town: true,
        use: true
      }
    })
    const APP_URL = this.configService.get<string>('APP_URL')

    return {
      count,
      next: page < Math.ceil(count / 20) ? `${APP_URL}/location?page=${page + 1}` : null,
      prev: page > 1 ? `${APP_URL}/location?page=${page - 1}` : null,
      pages: Math.ceil(count / 20),
      results
    }
  }
}
