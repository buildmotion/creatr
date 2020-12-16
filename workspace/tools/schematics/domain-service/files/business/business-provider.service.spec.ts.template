import { TestBed } from '@angular/core/testing';

import { BusinessProviderService } from './business-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationService, ConfigurationServiceMock } from '@valencia/configuration';
import { LoggingService, MockLoggingService } from '@valencia/logging';

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
          useClass: MockLoggingService,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: BusinessProviderService = TestBed.get(BusinessProviderService);
    expect(service).toBeTruthy();
  });
});
