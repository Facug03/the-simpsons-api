import { Inject, Injectable } from '@nestjs/common'
import { Episode, Prisma } from '@prisma/client'
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

import { DatabaseService } from '@/src/database/database.service'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'

@Injectable()
export class EpisodeService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}

  async create(createEpisodes: Prisma.EpisodeCreateManyInput): Promise<Episode[]> {
    return this.databaseService.episode.createManyAndReturn({
      data: createEpisodes
    })
  }

  async findOne(id: number): Promise<Episode | null> {
    return this.databaseService.episode.findUnique({ where: { id } })
  }

  async findPaginated(page: number): Promise<PaginationResponse<Omit<Episode, 'description'>[]>> {
    const cacheKey = 'episode-count'
    let count = await this.cacheManager.get<number>(cacheKey)

    if (!count) {
      count = await this.databaseService.episode.count()

      await this.cacheManager.set(cacheKey, count, 60 * 60 * 24 * 1000)
    }

    const results = await this.databaseService.episode.findMany({
      take: 20,
      skip: (page - 1) * 20,
      select: {
        id: true,
        airdate: true,
        episode_number: true,
        image_path: true,
        name: true,
        season: true,
        synopsis: true
      }
    })
    const APP_URL = this.configService.get<string>('APP_URL')

    return {
      count,
      next: page < Math.ceil(count / 20) ? `${APP_URL}/episode?page=${page + 1}` : null,
      prev: page > 1 ? `${APP_URL}/episode?page=${page - 1}` : null,
      pages: Math.ceil(count / 20),
      results
    }
  }
}
