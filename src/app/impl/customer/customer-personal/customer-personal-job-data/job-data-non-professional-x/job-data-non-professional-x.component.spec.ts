import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDataNonProfessionalXComponent } from './job-data-non-professional-x.component';

describe('JobDataNonProfessionalXComponent', () => {
  let component: JobDataNonProfessionalXComponent;
  let fixture: ComponentFixture<JobDataNonProfessionalXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDataNonProfessionalXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDataNonProfessionalXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
