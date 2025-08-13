import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationDashboardComponent } from './education-dashboard.component';

describe('EducationDashboardComponent', () => {
  let component: EducationDashboardComponent;
  let fixture: ComponentFixture<EducationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
