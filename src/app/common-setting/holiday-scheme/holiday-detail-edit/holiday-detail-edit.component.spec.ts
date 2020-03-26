import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayDetailEditComponent } from './holiday-detail-edit.component';

describe('HolidayDetailEditComponent', () => {
  let component: HolidayDetailEditComponent;
  let fixture: ComponentFixture<HolidayDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
