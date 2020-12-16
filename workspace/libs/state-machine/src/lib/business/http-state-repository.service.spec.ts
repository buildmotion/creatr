import { ConfigurationService, ConfigurationServiceMock } from '@valencia/configuration';
import { LoggingService, LoggingServiceMock } from '@valencia/logging';

import { HttpClientModule } from '@angular/common/http';
import { HttpStateRepositoryService } from './http-state-repository.service';
import { TestBed } from '@angular/core/testing';

describe('HttpStateRepositoryService', () => {
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
    const service: HttpStateRepositoryService = TestBed.get(HttpStateRepositoryService);
    expect(service).toBeTruthy();
  });
});
