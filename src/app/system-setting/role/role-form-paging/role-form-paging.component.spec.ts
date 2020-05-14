import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFormPagingComponent } from './role-form-paging.component';

describe('RoleFormPagingComponent', () => {
  let component: RoleFormPagingComponent;
  let fixture: ComponentFixture<RoleFormPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleFormPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleFormPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
