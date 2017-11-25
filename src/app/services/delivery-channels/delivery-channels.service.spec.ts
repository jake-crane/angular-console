import { TestBed, inject } from '@angular/core/testing';

import { DeliveryChannelsService } from './delivery-channels.service';

describe('DeliveryChannelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryChannelsService]
    });
  });

  it('should be created', inject([DeliveryChannelsService], (service: DeliveryChannelsService) => {
    expect(service).toBeTruthy();
  }));
});
