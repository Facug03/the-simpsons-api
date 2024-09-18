import { Inject, Injectable } from '@nestjs/common'
import { Prisma, Character } from '@prisma/client'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

import { DatabaseService } from '@/src/modules/database/database.service'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'

@Injectable()
export class CharacterService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}

  create(createCharactersDto: Prisma.CharacterCreateManyInput): Promise<Character[]> {
    return this.databaseService.character.createManyAndReturn({
      data: createCharactersDto
    })
  }

  findOne(id: number): Promise<Character | null> {
    return this.databaseService.character.findUnique({
      where: { id },
      include: {
        first_appearance_ep: true,
        first_appearance_sh: true
      }
    })
  }

  async findPaginated(
    page: number
  ): Promise<
    PaginationResponse<Omit<Character, 'first_appearance_ep_id' | 'description' | 'first_appearance_sh_id'>[]>
  > {
    const cacheCountKey = 'character-count'
    const cacheFirstPageKey = 'character-first-page'

    let count = await this.cacheManager.get<number>(cacheCountKey)
    let results =
      page === 1
        ? await this.cacheManager.get<
            Omit<Character, 'first_appearance_ep_id' | 'description' | 'first_appearance_sh_id'>[]
          >(cacheFirstPageKey)
        : null

    if (!count) {
      count = await this.databaseService.character.count()

      await this.cacheManager.set(cacheCountKey, count, 60 * 60 * 24 * 1000)
    }

    const pages = Math.ceil(count / 20)

    if (page > pages) {
      return {
        count,
        next: null,
        prev: null,
        pages,
        results: []
      }
    }

    if (!results) {
      results = await this.databaseService.character.findMany({
        take: 20,
        skip: (page - 1) * 20,
        select: {
          id: true,
          age: true,
          birthdate: true,
          gender: true,
          name: true,
          occupation: true,
          portrait_path: true,
          phrases: true,
          status: true
        }
      })

      if (page === 1) await this.cacheManager.set(cacheFirstPageKey, results, 60 * 60 * 24 * 1000)
    }

    const APP_URL = this.configService.get<string>('APP_URL')

    return {
      count,
      next: page < Math.ceil(count / 20) ? `${APP_URL}/character?page=${page + 1}` : null,
      prev: page > 1 ? `${APP_URL}/character?page=${page - 1}` : null,
      pages: Math.ceil(count / 20),
      results
    }
  }
}
