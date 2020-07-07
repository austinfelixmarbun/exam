import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPagingComponent } from './vendor-paging.component';

describe('VendorPagingComponent', () => {
  let component: VendorPagingComponent;
  let fixture: ComponentFixture<VendorPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
