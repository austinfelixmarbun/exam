import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMdlStrucPagingComponent } from './org-mdl-struc-paging.component';

describe('OrgMdlStrucPagingComponent', () => {
  let component: OrgMdlStrucPagingComponent;
  let fixture: ComponentFixture<OrgMdlStrucPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMdlStrucPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMdlStrucPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
