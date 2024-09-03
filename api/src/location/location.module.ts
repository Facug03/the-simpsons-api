import { Module } from '@nestjs/common'
import { LocationService } from './location.service'
import { CharacterController } from './location.controller'

@Module({
  controllers: [CharacterController],
  providers: [LocationService]
})
export class LocationModule {}
