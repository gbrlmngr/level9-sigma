import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Space } from './space.entity';
import { SpacesService } from './spaces.service';
import { SpacesSubscriber } from './spaces.subscriber';
import { SpacesMembership } from './spaces-membership.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Space]),
    TypeOrmModule.forFeature([SpacesMembership]),
  ],
  providers: [SpacesService, SpacesSubscriber],
  exports: [SpacesService],
})
export class SpacesModule {}
