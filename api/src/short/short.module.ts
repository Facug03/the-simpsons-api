import { Module } from '@nestjs/common'
import { ShortService } from './short.service'
import { ShortController } from './short.controller'

@Module({
  controllers: [ShortController],
  providers: [ShortService]
})
export class ShortModule {}
