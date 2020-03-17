import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorHoRegistrationComponent } from './vendor-ho-registration.component';

describe('VendorHoRegistrationComponent', () => {
  let component: VendorHoRegistrationComponent;
  let fixture: ComponentFixture<VendorHoRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorHoRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorHoRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
