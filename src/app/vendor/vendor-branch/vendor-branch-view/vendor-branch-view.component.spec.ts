import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBranchViewComponent } from './vendor-branch-view.component';

describe('VendorBranchViewComponent', () => {
  let component: VendorBranchViewComponent;
  let fixture: ComponentFixture<VendorBranchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBranchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBranchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
