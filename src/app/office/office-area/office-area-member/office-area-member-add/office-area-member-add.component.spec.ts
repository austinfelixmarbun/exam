import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAreaMemberAddComponent } from './office-area-member-add.component';

describe('OfficeAreaMemberAddComponent', () => {
  let component: OfficeAreaMemberAddComponent;
  let fixture: ComponentFixture<OfficeAreaMemberAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeAreaMemberAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAreaMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
