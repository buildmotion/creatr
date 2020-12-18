import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggingService, LoggingServiceMock } from '@valencia/logging';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      // providers: [LoggingService] // -- > LIVE CALLS TO API(S);
      providers: [
        {
          provide: LoggingService,
          useClass: LoggingServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   declarations: [HomeComponent],
    //   imports: [RouterTestingModule],
    // });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
