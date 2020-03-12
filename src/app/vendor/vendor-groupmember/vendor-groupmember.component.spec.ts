import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorGroupmemberComponent } from './vendor-groupmember.component';

describe('VendorGroupmemberComponent', () => {
  let component: VendorGroupmemberComponent;
  let fixture: ComponentFixture<VendorGroupmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorGroupmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorGroupmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
