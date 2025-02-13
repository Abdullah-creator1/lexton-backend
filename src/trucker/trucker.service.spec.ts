import { Test, TestingModule } from '@nestjs/testing';
import { TruckerService } from './trucker.service';

describe('TruckerService', () => {
  let service: TruckerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckerService],
    }).compile();

    service = module.get<TruckerService>(TruckerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
