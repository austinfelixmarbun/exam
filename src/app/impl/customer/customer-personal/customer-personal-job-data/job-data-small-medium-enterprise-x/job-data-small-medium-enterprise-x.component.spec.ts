import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDataSmallMediumEnterpriseXComponent } from './job-data-small-medium-enterprise-x.component';

describe('JobDataSmallMediumEnterpriseXComponent', () => {
  let component: JobDataSmallMediumEnterpriseXComponent;
  let fixture: ComponentFixture<JobDataSmallMediumEnterpriseXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDataSmallMediumEnterpriseXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDataSmallMediumEnterpriseXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
