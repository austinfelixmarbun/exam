import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalDuplicateCheckXComponent } from './customer-personal-duplicate-check-x.component';

describe('CustomerPersonalDuplicateCheckXComponent', () => {
  let component: CustomerPersonalDuplicateCheckXComponent;
  let fixture: ComponentFixture<CustomerPersonalDuplicateCheckXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalDuplicateCheckXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalDuplicateCheckXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
