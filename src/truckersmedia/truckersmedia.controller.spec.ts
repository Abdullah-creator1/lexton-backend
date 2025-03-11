import { Test, TestingModule } from '@nestjs/testing';
import { TruckersmediaController } from './truckersmedia.controller';
import { TruckersmediaService } from './truckersmedia.service';

describe('TruckersmediaController', () => {
  let controller: TruckersmediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckersmediaController],
      providers: [TruckersmediaService],
    }).compile();

    controller = module.get<TruckersmediaController>(TruckersmediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
