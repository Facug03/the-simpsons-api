import { Character as CharacterModel } from '@prisma/client'
import { faker } from '@faker-js/faker'

export class CharacterObjectMother {
  static create(overrides: Partial<CharacterModel> = {}): CharacterModel {
    return {
      id: faker.number.int(),
      age: faker.number.int(),
      birthdate: faker.date.past().toISOString(),
      description: faker.lorem.paragraph(),
      first_appearance_ep_id: null,
      first_appearance_sh_id: null,
      gender: faker.helpers.arrayElement(['Male', 'Female']),
      name: faker.person.fullName(),
      occupation: faker.person.jobTitle(),
      portrait_path: faker.image.avatar(),
      status: faker.helpers.arrayElement(['Alive', 'Dead', 'Unknown']),
      phrases: [],
      ...overrides
    }
  }
}
