import { TestBed, inject } from '@angular/core/testing';

import { ClientSettingsService } from './client-settings.service';

describe('ClientSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientSettingsService]
    });
  });

  it('should be created', inject([ClientSettingsService], (service: ClientSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
