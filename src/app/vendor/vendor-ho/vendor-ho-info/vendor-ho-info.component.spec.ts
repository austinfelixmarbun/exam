import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorHoInfoComponent } from './vendor-ho-info.component';

describe('VendorHoInfoComponent', () => {
  let component: VendorHoInfoComponent;
  let fixture: ComponentFixture<VendorHoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorHoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorHoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
