import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMainDataCompanyComponent } from './edit-main-data-company.component';

describe('EditMainDataCompanyComponent', () => {
  let component: EditMainDataCompanyComponent;
  let fixture: ComponentFixture<EditMainDataCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainDataCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainDataCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
