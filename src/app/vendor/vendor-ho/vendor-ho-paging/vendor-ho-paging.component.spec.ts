import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorHoPagingComponent } from './vendor-ho-paging.component';

describe('VendorHoPagingComponent', () => {
  let component: VendorHoPagingComponent;
  let fixture: ComponentFixture<VendorHoPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorHoPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorHoPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
