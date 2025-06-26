import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeratorController } from './moderator.controller';
import { Details } from '../system/details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Details])],
  controllers: [ModeratorController],
})
export class ModeratorModule {}
