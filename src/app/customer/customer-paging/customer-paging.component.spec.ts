import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPagingComponent } from './customer-paging.component';

describe('CustomerPagingComponent', () => {
  let component: CustomerPagingComponent;
  let fixture: ComponentFixture<CustomerPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
