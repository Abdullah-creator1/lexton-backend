import { Test, TestingModule } from '@nestjs/testing';
import { CustomersmediaController } from './customersmedia.controller';
import { CustomersmediaService } from './customersmedia.service';

describe('CustomersmediaController', () => {
  let controller: CustomersmediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersmediaController],
      providers: [CustomersmediaService],
    }).compile();

    controller = module.get<CustomersmediaController>(CustomersmediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
