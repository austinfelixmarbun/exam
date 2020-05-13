import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefFormRolePagingComponent } from './ref-form-role-paging.component';

describe('RefFormRolePagingComponent', () => {
  let component: RefFormRolePagingComponent;
  let fixture: ComponentFixture<RefFormRolePagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefFormRolePagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefFormRolePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
