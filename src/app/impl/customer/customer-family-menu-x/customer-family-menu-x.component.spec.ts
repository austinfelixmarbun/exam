import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFamilyMenuXComponent } from './customer-family-menu-x.component';

describe('CustomerFamilyMenuXComponent', () => {
  let component: CustomerFamilyMenuXComponent;
  let fixture: ComponentFixture<CustomerFamilyMenuXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFamilyMenuXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFamilyMenuXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
