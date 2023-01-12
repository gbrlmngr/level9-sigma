import { Test, TestingModule } from '@nestjs/testing';
import { SpacesMembershipsService } from './spaces-memberships.service';

describe('SpacesMembershipsService', () => {
  let service: SpacesMembershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpacesMembershipsService],
    }).compile();

    service = module.get<SpacesMembershipsService>(SpacesMembershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
