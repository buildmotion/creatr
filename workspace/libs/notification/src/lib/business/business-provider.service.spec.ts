import { HttpClient, HttpHandler } from '@angular/common/http';

import { BusinessProviderService } from './business-provider.service';
import { LoggingService } from '@valencia/logging';
import { TestBed } from '@angular/core/testing';

describe('BusinessProviderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LoggingService, HttpClient, HttpHandler],
    })
  );

  it('should be created', () => {
    const service: BusinessProviderService = TestBed.get(BusinessProviderService);
    expect(service).toBeTruthy();
  });
});
