import { Test, TestingModule } from '@nestjs/testing';
import { TruckerController } from './trucker.controller';
import { TruckerService } from './trucker.service';

describe('TruckerController', () => {
  let controller: TruckerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckerController],
      providers: [TruckerService],
    }).compile();

    controller = module.get<TruckerController>(TruckerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
