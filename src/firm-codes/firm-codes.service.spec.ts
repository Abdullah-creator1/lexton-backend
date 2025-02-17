import { Test, TestingModule } from '@nestjs/testing';
import { FirmCodesService } from './firm-codes.service';

describe('FirmCodesService', () => {
  let service: FirmCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirmCodesService],
    }).compile();

    service = module.get<FirmCodesService>(FirmCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
