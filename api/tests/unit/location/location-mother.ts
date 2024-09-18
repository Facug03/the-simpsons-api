import { Location as LocationModel } from '@prisma/client'
import { faker } from '@faker-js/faker'

export class LocationObjectMother {
  static create(overrides: Partial<LocationModel> = {}): LocationModel {
    return {
      id: faker.number.int(),
      description: faker.lorem.paragraph(),
      first_appearance_ep_id: null,
      first_appearance_sh_id: null,
      image_path: faker.image.avatar(),
      name: faker.person.fullName(),
      town: faker.location.city(),
      use: faker.lorem.paragraph(),
      ...overrides
    }
  }
}
