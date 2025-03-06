import { Test, TestingModule } from '@nestjs/testing';
import { DistPortService } from './dist-port.service';

describe('DistPortService', () => {
  let service: DistPortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistPortService],
    }).compile();

    service = module.get<DistPortService>(DistPortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
