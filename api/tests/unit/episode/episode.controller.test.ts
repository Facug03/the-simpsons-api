import { Test } from '@nestjs/testing'
import { Episode as EpisodeModel } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

import { IsPageDto } from '@/src/common/dto/pagination.dto'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'
import { EpisodeObjectMother } from './episode-mother'
import { EpisodeController } from '@/src/modules/episode/episode.controller'
import { EpisodeService } from '@/src/modules/episode/episode.service'

describe('EpisodeController', () => {
  let episodeController: EpisodeController

  const mockEpisodeService = {
    create: vi.fn(),
    findPaginated: vi.fn(),
    findOne: vi.fn()
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EpisodeController],
      providers: [
        {
          provide: EpisodeService,
          useValue: mockEpisodeService
        }
      ]
    }).compile()

    episodeController = moduleRef.get<EpisodeController>(EpisodeController)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('createMany', () => {
    it('should call the service to create episodes', async () => {
      const episode = EpisodeObjectMother.create()
      const result: EpisodeModel[] = [episode]

      mockEpisodeService.create.mockResolvedValue(result)

      const response = await episodeController.createMany(episode)
      expect(response).toEqual(result)
      expect(mockEpisodeService.create).toHaveBeenCalledWith(episode)
    })
  })

  describe('findPaginated', () => {
    it('should return paginated episodes', async () => {
      const pageDto: IsPageDto = { page: 1 }
      const episode = EpisodeObjectMother.create()
      const paginatedResponse: PaginationResponse<EpisodeModel[]> = {
        count: 1,
        next: null,
        prev: null,
        pages: 1,
        results: [episode]
      }

      mockEpisodeService.findPaginated.mockResolvedValue(paginatedResponse)

      const response = await episodeController.findPaginated(pageDto)
      expect(response).toEqual(paginatedResponse)
      expect(mockEpisodeService.findPaginated).toHaveBeenCalledWith(pageDto.page)
    })
  })

  describe('findOne', () => {
    it('should return a episode by ID', async () => {
      const episode = EpisodeObjectMother.create()

      mockEpisodeService.findOne.mockResolvedValue(episode)

      const response = await episodeController.findOne(episode.id)
      expect(response).toEqual(episode)
      expect(mockEpisodeService.findOne).toHaveBeenCalledWith(episode.id)
    })

    it('should throw NotFoundException if episode is not found', async () => {
      mockEpisodeService.findOne.mockResolvedValue(null)

      await expect(episodeController.findOne(999)).rejects.toThrow(NotFoundException)
      expect(mockEpisodeService.findOne).toHaveBeenCalledWith(999)
    })
  })
})
