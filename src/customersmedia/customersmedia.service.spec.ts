import { Test, TestingModule } from '@nestjs/testing';
import { CustomersmediaService } from './customersmedia.service';

describe('CustomersmediaService', () => {
  let service: CustomersmediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersmediaService],
    }).compile();

    service = module.get<CustomersmediaService>(CustomersmediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
