import { Episode as EpisodeModel } from '@prisma/client'
import { faker } from '@faker-js/faker'

export class EpisodeObjectMother {
  static create(overrides: Partial<EpisodeModel> = {}): EpisodeModel {
    return {
      id: faker.number.int(),
      description: faker.lorem.paragraph(),
      name: faker.lorem.word(),
      episode_number: faker.number.int(),
      airdate: faker.date.past().toISOString(),
      season: faker.number.int(),
      image_path: faker.image.avatar(),
      synopsis: faker.lorem.paragraph(),
      ...overrides
    }
  }
}
