import { ConfigurationService, ConfigurationServiceMock } from '@valencia/configuration';
import { LoggingService, LoggingServiceMock } from '@valencia/logging';

import { BusinessProviderService } from './business-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

describe('BusinessProviderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: ConfigurationService,
          useClass: ConfigurationServiceMock,
        },
        {
          provide: LoggingService,
          useClass: LoggingServiceMock,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: BusinessProviderService = TestBed.get(BusinessProviderService);
    expect(service).toBeTruthy();
  });
});
