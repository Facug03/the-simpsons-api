import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { DatabaseService } from '@/src/database/database.service'

@Injectable()
export class EpisodeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEpisodes: Prisma.EpisodeCreateManyInput) {
    return this.databaseService.episode.createManyAndReturn({
      data: createEpisodes
    })
  }

  async findOne(id: number) {
    return this.databaseService.episode.findUnique({ where: { id } })
  }

  async findPaginated() {
    return this.databaseService.episode.findMany({
      take: 20,
      select: {
        id: true,
        airdate: true,
        episode_number: true,
        image_url: true,
        name: true,
        season: true,
        synopsis: true
      }
    })
  }
}
