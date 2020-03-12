import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorGroupViewComponent } from './vendor-group-view.component';

describe('VendorGroupViewComponent', () => {
  let component: VendorGroupViewComponent;
  let fixture: ComponentFixture<VendorGroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorGroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
