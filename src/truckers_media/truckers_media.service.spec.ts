import { Test, TestingModule } from '@nestjs/testing';
import { TruckersMediaService } from './truckers_media.service';

describe('TruckersMediaService', () => {
  let service: TruckersMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckersMediaService],
    }).compile();

    service = module.get<TruckersMediaService>(TruckersMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
