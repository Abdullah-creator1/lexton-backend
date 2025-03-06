import { Test, TestingModule } from '@nestjs/testing';
import { TruckersMediaController } from './truckers_media.controller';
import { TruckersMediaService } from './truckers_media.service';

describe('TruckersMediaController', () => {
  let controller: TruckersMediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckersMediaController],
      providers: [TruckersMediaService],
    }).compile();

    controller = module.get<TruckersMediaController>(TruckersMediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
