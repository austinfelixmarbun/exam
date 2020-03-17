import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSchemeMemberPagingComponent } from './vendor-scheme-member-paging.component';

describe('VendorSchemeMemberPagingComponent', () => {
  let component: VendorSchemeMemberPagingComponent;
  let fixture: ComponentFixture<VendorSchemeMemberPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSchemeMemberPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSchemeMemberPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
