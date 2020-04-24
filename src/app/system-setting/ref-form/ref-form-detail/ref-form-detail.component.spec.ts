import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefFormDetailComponent } from './ref-form-detail.component';

describe('RefFormDetailComponent', () => {
  let component: RefFormDetailComponent;
  let fixture: ComponentFixture<RefFormDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefFormDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
