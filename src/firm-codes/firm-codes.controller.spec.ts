import { Test, TestingModule } from '@nestjs/testing';
import { FirmCodesController } from './firm-codes.controller';
import { FirmCodesService } from './firm-codes.service';

describe('FirmCodesController', () => {
  let controller: FirmCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirmCodesController],
      providers: [FirmCodesService],
    }).compile();

    controller = module.get<FirmCodesController>(FirmCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
