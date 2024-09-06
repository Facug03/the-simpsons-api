import { Injectable } from '@nestjs/common'
import { Prisma, Character } from '@prisma/client'

import { DatabaseService } from '@/src/database/database.service'

@Injectable()
export class CharacterService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async findPaginated(page: number): Promise<{
    count: number
    results: Omit<Character, 'first_appearance_ep_id' | 'description' | 'first_appearance_sh_id'>[]
  }> {
    const count = await this.databaseService.character.count()
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

    return {
      count,
      results
    }
  }
}
