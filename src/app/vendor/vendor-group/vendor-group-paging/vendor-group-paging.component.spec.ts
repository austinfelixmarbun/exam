import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorGroupPagingComponent } from './vendor-group-paging.component';

describe('VendorGroupPagingComponent', () => {
  let component: VendorGroupPagingComponent;
  let fixture: ComponentFixture<VendorGroupPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorGroupPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorGroupPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
