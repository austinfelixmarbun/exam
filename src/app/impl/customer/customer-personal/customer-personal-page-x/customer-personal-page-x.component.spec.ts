import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalPageXComponent } from './customer-personal-page-x.component';

describe('CustomerPersonalPageXComponent', () => {
  let component: CustomerPersonalPageXComponent;
  let fixture: ComponentFixture<CustomerPersonalPageXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalPageXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalPageXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
