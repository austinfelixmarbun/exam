import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgJobTitleDetailComponent } from './org-job-title-detail.component';

describe('OrgJobTitleDetailComponent', () => {
  let component: OrgJobTitleDetailComponent;
  let fixture: ComponentFixture<OrgJobTitleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgJobTitleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgJobTitleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
