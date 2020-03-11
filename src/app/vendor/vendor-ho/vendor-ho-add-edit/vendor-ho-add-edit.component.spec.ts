import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorHoAddEditComponent } from './vendor-ho-add-edit.component';

describe('VendorHoAddEditComponent', () => {
  let component: VendorHoAddEditComponent;
  let fixture: ComponentFixture<VendorHoAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorHoAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorHoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
