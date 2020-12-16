import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireNavigationComponent } from './questionnaire-navigation.component';

describe('QuestionnaireNavigationComponent', () => {
  let component: QuestionnaireNavigationComponent;
  let fixture: ComponentFixture<QuestionnaireNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
