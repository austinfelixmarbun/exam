import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficeMemberComponentOffering } from './list-office-member.component';

describe('ListOfficeMemberComponentOffering', () => {
  let component: ListOfficeMemberComponentOffering;
  let fixture: ComponentFixture<ListOfficeMemberComponentOffering>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfficeMemberComponentOffering ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfficeMemberComponentOffering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
