import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorGradingRequestPagingXComponent } from './vendor-grading-request-paging-x.component';

describe('VendorGradingRequestPagingXComponent', () => {
  let component: VendorGradingRequestPagingXComponent;
  let fixture: ComponentFixture<VendorGradingRequestPagingXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorGradingRequestPagingXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorGradingRequestPagingXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
