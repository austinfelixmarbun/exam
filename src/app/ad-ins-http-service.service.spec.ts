import { TestBed } from '@angular/core/testing';

import { AdInsHttpServiceService } from './ad-ins-http-service.service';

describe('AdInsHttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdInsHttpServiceService = TestBed.get(AdInsHttpServiceService);
    expect(service).toBeTruthy();
  });
});
