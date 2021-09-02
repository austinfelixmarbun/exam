import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMainDataPersonalXComponent } from './edit-main-data-personal-x.component';

describe('EditMainDataPersonalXComponent', () => {
  let component: EditMainDataPersonalXComponent;
  let fixture: ComponentFixture<EditMainDataPersonalXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainDataPersonalXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainDataPersonalXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
