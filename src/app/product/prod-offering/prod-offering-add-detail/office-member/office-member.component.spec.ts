import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeMemberComponent } from './office-member.component';

describe('OfficeMemberComponent', () => {
  let component: OfficeMemberComponent;
  let fixture: ComponentFixture<OfficeMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
