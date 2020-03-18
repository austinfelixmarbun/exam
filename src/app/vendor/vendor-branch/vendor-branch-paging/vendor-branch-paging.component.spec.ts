import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBranchPagingComponent } from './vendor-branch-paging.component';

describe('VendorBranchPagingComponent', () => {
  let component: VendorBranchPagingComponent;
  let fixture: ComponentFixture<VendorBranchPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBranchPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBranchPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
