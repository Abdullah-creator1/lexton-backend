import { Test, TestingModule } from '@nestjs/testing';
import { TruckersmediaService } from './truckersmedia.service';

describe('TruckersmediaService', () => {
  let service: TruckersmediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckersmediaService],
    }).compile();

    service = module.get<TruckersmediaService>(TruckersmediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
