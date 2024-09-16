import { Module } from '@nestjs/common'
import { CharacterService } from './character.service'
import { CharacterController } from './character.controller'

@Module({
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
