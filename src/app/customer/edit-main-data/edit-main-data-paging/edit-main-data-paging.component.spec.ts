import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMainDataPagingComponent } from './edit-main-data-paging.component';

describe('EditMainDataPagingComponent', () => {
  let component: EditMainDataPagingComponent;
  let fixture: ComponentFixture<EditMainDataPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainDataPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainDataPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
