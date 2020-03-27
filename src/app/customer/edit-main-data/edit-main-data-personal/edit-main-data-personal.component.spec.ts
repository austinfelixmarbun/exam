import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMainDataPersonalComponent } from './edit-main-data-personal.component';

describe('EditMainDataPersonalComponent', () => {
  let component: EditMainDataPersonalComponent;
  let fixture: ComponentFixture<EditMainDataPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainDataPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainDataPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
