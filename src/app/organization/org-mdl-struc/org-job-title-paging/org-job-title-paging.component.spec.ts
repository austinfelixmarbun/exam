import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgJobTitlePagingComponent } from './org-job-title-paging.component';

describe('OrgJobTitlePagingComponent', () => {
  let component: OrgJobTitlePagingComponent;
  let fixture: ComponentFixture<OrgJobTitlePagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgJobTitlePagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgJobTitlePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
