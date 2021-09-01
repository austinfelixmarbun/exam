import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDataEmployeeXComponent } from './job-data-employee-x.component';

describe('JobDataEmployeeXComponent', () => {
  let component: JobDataEmployeeXComponent;
  let fixture: ComponentFixture<JobDataEmployeeXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDataEmployeeXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDataEmployeeXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
