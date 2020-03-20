import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoAddressInfoComponent } from './ho-address-info.component';

describe('AddressInfoComponent', () => {
  let component: HoAddressInfoComponent;
  let fixture: ComponentFixture<HoAddressInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoAddressInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
