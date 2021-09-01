import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDataProfessionalXComponent } from './job-data-professional-x.component';

describe('JobDataProfessionalXComponent', () => {
  let component: JobDataProfessionalXComponent;
  let fixture: ComponentFixture<JobDataProfessionalXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDataProfessionalXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDataProfessionalXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
