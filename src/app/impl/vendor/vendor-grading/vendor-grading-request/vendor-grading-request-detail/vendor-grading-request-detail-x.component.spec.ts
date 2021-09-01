import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorGradingRequestDetailXComponent } from './vendor-grading-request-detail-x.component';

describe('VendorGradingRequestDetailXComponent', () => {
  let component: VendorGradingRequestDetailXComponent;
  let fixture: ComponentFixture<VendorGradingRequestDetailXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorGradingRequestDetailXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorGradingRequestDetailXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
