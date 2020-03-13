import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficeMemberComponent } from './list-office-member.component';

describe('ListOfficeMemberComponent', () => {
  let component: ListOfficeMemberComponent;
  let fixture: ComponentFixture<ListOfficeMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfficeMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfficeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
