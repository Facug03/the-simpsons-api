import { Injectable } from '@nestjs/common'
import { Prisma, Short } from '@prisma/client'

import { DatabaseService } from '@/src/modules/database/database.service'

@Injectable()
export class ShortService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createShorts: Prisma.ShortCreateManyInput): Promise<Short[]> {
    return this.databaseService.short.createManyAndReturn({
      data: createShorts
    })
  }
}
