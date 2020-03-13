import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBranchAddEditContactPersonComponent } from './vendor-branch-add-edit-contact-person.component';

describe('VendorBranchAddEditContactPersonComponent', () => {
  let component: VendorBranchAddEditContactPersonComponent;
  let fixture: ComponentFixture<VendorBranchAddEditContactPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBranchAddEditContactPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBranchAddEditContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
