import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorHoldingViewComponent } from './vendor-holding-view.component';

describe('VendorHoldingViewComponent', () => {
  let component: VendorHoldingViewComponent;
  let fixture: ComponentFixture<VendorHoldingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorHoldingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorHoldingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
