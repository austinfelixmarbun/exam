import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefFormRoleMappingComponent } from './ref-form-role-mapping.component';

describe('RefFormRoleMappingComponent', () => {
  let component: RefFormRoleMappingComponent;
  let fixture: ComponentFixture<RefFormRoleMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefFormRoleMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefFormRoleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
