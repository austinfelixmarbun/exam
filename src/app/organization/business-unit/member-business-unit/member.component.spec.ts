import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBusinessUnitComponent } from './member-business-unit.component';

describe('MemberComponent', () => {
  let component: MemberBusinessUnitComponent;
  let fixture: ComponentFixture<MemberBusinessUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBusinessUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBusinessUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
