import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { DatabaseService } from '@/src/database/database.service'

@Injectable()
export class CharacterService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCharactersDto: Prisma.CharacterCreateManyInput) {
    return this.databaseService.character.createManyAndReturn({
      data: createCharactersDto
    })
  }

  async findOne(id: number) {
    return this.databaseService.character.findUnique({
      where: { id },
      include: {
        first_appearance: true
      }
    })
  }

  async findPaginated(page: number) {
    const count = await this.databaseService.character.count()
    const results = await this.databaseService.character.findMany({
      take: 20,
      skip: (page - 1) * 20,
      select: {
        id: true,
        age: true,
        birthdate: true,
        catchphrases: true,
        full_body_image: true,
        gender: true,
        name: true,
        occupation: true,
        portrait_img: true,
        quotes: true,
        status: true
      }
    })

    return {
      count,
      results
    }
  }
}
