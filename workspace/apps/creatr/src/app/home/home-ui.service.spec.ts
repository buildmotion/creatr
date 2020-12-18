import { LoggingService, LoggingServiceMock } from '@valencia/logging';

import { HomeUIService } from './home-ui.service';
import { TestBed } from '@angular/core/testing';

describe('HomeUIService', () => {
  let service: HomeUIService;

  /**
   * Provide the [service] that is tested to the [Testing Module].
   * A reference is required so that in can be injected in line 23
   * and available during the actual tests.
   */
  beforeEach(() => {
    // TestBed --> Module (container)
    TestBed.configureTestingModule({
      providers: [
        HomeUIService, // 1. provide this targe service
        {
          provide: LoggingService, // 2. included in ctor of service
          useClass: LoggingServiceMock,
        },
      ],
    });
    service = TestBed.inject(HomeUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a service name', () => {
    expect(service.serviceName).toBeTruthy();
  });
});
