import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Space } from './space.entity';
import { SpacesService } from './spaces.service';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  providers: [SpacesService],
  exports: [SpacesService],
})
export class SpacesModule {}
