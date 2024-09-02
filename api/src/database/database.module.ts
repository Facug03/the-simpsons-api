import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'

@Module({
  providers: [DatabaseService]
})
export class DatabaseModule {}
