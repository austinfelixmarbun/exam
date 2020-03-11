import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSchemeAddEditComponent } from './vendor-scheme-add-edit.component';

describe('VendorSchemeAddEditComponent', () => {
  let component: VendorSchemeAddEditComponent;
  let fixture: ComponentFixture<VendorSchemeAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSchemeAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSchemeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
