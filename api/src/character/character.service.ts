import { Inject, Injectable } from '@nestjs/common'
import { Prisma, Character } from '@prisma/client'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

import { DatabaseService } from '@/src/database/database.service'
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
        first_appearance: true
      }
    })
  }

  async findPaginated(
    page: number
  ): Promise<
    PaginationResponse<Omit<Character, 'first_appearance_ep_id' | 'description' | 'first_appearance_sh_id'>[]>
  > {
    const cacheKey = 'character-count'
    let count = await this.cacheManager.get<number>(cacheKey)

    if (!count) {
      count = await this.databaseService.character.count()

      await this.cacheManager.set(cacheKey, count, 60 * 60 * 24 * 1000)
    }

    const results = await this.databaseService.character.findMany({
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
