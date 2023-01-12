import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpacesMembership } from './spaces-membership.entity';
import { SpacesMembershipsService } from './spaces-memberships.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpacesMembership])],
  providers: [SpacesMembershipsService],
  exports: [SpacesMembershipsService],
})
export class SpacesMembershipsModule {}
