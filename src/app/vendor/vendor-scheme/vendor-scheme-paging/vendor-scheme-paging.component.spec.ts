import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSchemePagingComponent } from './vendor-scheme-paging.component';

describe('VendorSchemePagingComponent', () => {
  let component: VendorSchemePagingComponent;
  let fixture: ComponentFixture<VendorSchemePagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSchemePagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSchemePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
