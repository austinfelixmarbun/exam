import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBranchAddEditComponent } from './vendor-branch-add-edit.component';

describe('VendorBranchAddEditComponent', () => {
  let component: VendorBranchAddEditComponent;
  let fixture: ComponentFixture<VendorBranchAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBranchAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBranchAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
