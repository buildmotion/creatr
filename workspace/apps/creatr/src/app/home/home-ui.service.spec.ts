import { TestBed } from '@angular/core/testing';

import { HomeUIService } from './home.service';

describe('HomeUIService', () => {
  let service: HomeUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
