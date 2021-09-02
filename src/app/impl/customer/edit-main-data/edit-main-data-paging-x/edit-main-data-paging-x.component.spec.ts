import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMainDataPagingXComponent } from './edit-main-data-paging-x.component';

describe('EditMainDataPagingXComponent', () => {
  let component: EditMainDataPagingXComponent;
  let fixture: ComponentFixture<EditMainDataPagingXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainDataPagingXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainDataPagingXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
