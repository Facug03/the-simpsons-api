import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { DatabaseService } from '@/src/database/database.service'

@Injectable()
export class LocationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocationsDto: Prisma.LocationCreateManyInput) {
    return this.databaseService.location.createManyAndReturn({
      data: createLocationsDto
    })
  }

  async findOne(id: number) {
    return this.databaseService.location.findUnique({
      where: { id },
      include: {
        first_appearance: true
      }
    })
  }

  async findPaginated() {
    return this.databaseService.location.findMany({
      take: 20,
      select: {
        id: true,
        name: true,
        address: true,
        image_url: true,
        town: true,
        use: true
      }
    })
  }
}
