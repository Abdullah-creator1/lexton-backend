import { Test, TestingModule } from '@nestjs/testing';
import { DistPortController } from './dist-port.controller';
import { DistPortService } from './dist-port.service';

describe('DistPortController', () => {
  let controller: DistPortController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistPortController],
      providers: [DistPortService],
    }).compile();

    controller = module.get<DistPortController>(DistPortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
