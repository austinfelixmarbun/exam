import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMdlStrucDetailComponent } from './org-mdl-struc-detail.component';

describe('OrgMdlStrucDetailComponent', () => {
  let component: OrgMdlStrucDetailComponent;
  let fixture: ComponentFixture<OrgMdlStrucDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMdlStrucDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMdlStrucDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
