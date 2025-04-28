import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { Details } from './details.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Details])],
  controllers: [SystemController],
  providers: [SystemService]
})
export class SystemModule {}
