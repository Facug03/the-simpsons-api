import { Test } from '@nestjs/testing'
import { Location as LocationModel } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

import { IsPageDto } from '@/src/common/dto/pagination.dto'
import { PaginationResponse } from '@/src/common/interfaces/pagination-response.interface'
import { LocationObjectMother } from './location-mother'
import { LocationController } from '@/src/modules/location/location.controller'
import { LocationService } from '@/src/modules/location/location.service'

describe('LocationController', () => {
  let locationController: LocationController

  const mockLocationService = {
    create: vi.fn(),
    findPaginated: vi.fn(),
    findOne: vi.fn()
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: mockLocationService
        }
      ]
    }).compile()

    locationController = moduleRef.get<LocationController>(LocationController)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('createMany', () => {
    it('should call the service to create locations', async () => {
      const location = LocationObjectMother.create()
      const result: LocationModel[] = [location]

      mockLocationService.create.mockResolvedValue(result)

      const response = await locationController.createMany(location)
      expect(response).toEqual(result)
      expect(mockLocationService.create).toHaveBeenCalledWith(location)
    })
  })

  describe('findPaginated', () => {
    it('should return paginated locations', async () => {
      const pageDto: IsPageDto = { page: 1 }
      const location = LocationObjectMother.create()
      const paginatedResponse: PaginationResponse<LocationModel[]> = {
        count: 1,
        next: null,
        prev: null,
        pages: 1,
        results: [location]
      }

      mockLocationService.findPaginated.mockResolvedValue(paginatedResponse)

      const response = await locationController.findPaginated(pageDto)
      expect(response).toEqual(paginatedResponse)
      expect(mockLocationService.findPaginated).toHaveBeenCalledWith(pageDto.page)
    })
  })

  describe('findOne', () => {
    it('should return a location by ID', async () => {
      const location = LocationObjectMother.create()

      mockLocationService.findOne.mockResolvedValue(location)

      const response = await locationController.findOne(location.id)
      expect(response).toEqual(location)
      expect(mockLocationService.findOne).toHaveBeenCalledWith(location.id)
    })

    it('should throw NotFoundException if location is not found', async () => {
      mockLocationService.findOne.mockResolvedValue(null)

      await expect(locationController.findOne(999)).rejects.toThrow(NotFoundException)
      expect(mockLocationService.findOne).toHaveBeenCalledWith(999)
    })
  })
})
