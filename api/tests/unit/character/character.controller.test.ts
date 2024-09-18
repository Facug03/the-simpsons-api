import { Test } from '@nestjs/testing'
import { Character as CharacterModel } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'
import { IsPageDto } from '@/src/common/dto/pagination.dto'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'
import { CharacterController } from '@/src/modules/character/character.controller'
import { CharacterService } from '@/src/modules/character/character.service'
import { CharacterObjectMother } from './character-mother'

describe('CharacterController', () => {
  let characterController: CharacterController

  const mockCharacterService = {
    create: vi.fn(),
    findPaginated: vi.fn(),
    findOne: vi.fn()
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CharacterService,
          useValue: mockCharacterService
        }
      ]
    }).compile()

    characterController = moduleRef.get<CharacterController>(CharacterController)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('createMany', () => {
    it('should call the service to create characters', async () => {
      const character = CharacterObjectMother.create()
      const result: CharacterModel[] = [character]

      mockCharacterService.create.mockResolvedValue(result)

      const response = await characterController.createMany(character)
      expect(response).toEqual(result)
      expect(mockCharacterService.create).toHaveBeenCalledWith(character)
    })
  })

  describe('findPaginated', () => {
    it('should return paginated characters', async () => {
      const pageDto: IsPageDto = { page: 1 }
      const character = CharacterObjectMother.create()
      const paginatedResponse: PaginationResponse<CharacterModel[]> = {
        count: 1,
        next: null,
        prev: null,
        pages: 1,
        results: [character]
      }

      mockCharacterService.findPaginated.mockResolvedValue(paginatedResponse)

      const response = await characterController.findPaginated(pageDto)
      expect(response).toEqual(paginatedResponse)
      expect(mockCharacterService.findPaginated).toHaveBeenCalledWith(pageDto.page)
    })
  })

  describe('findOne', () => {
    it('should return a character by ID', async () => {
      const character = CharacterObjectMother.create()

      mockCharacterService.findOne.mockResolvedValue(character)

      const response = await characterController.findOne(1)
      expect(response).toEqual(character)
      expect(mockCharacterService.findOne).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException if character is not found', async () => {
      mockCharacterService.findOne.mockResolvedValue(null)

      await expect(characterController.findOne(999)).rejects.toThrow(NotFoundException)
      expect(mockCharacterService.findOne).toHaveBeenCalledWith(999)
    })
  })
})
