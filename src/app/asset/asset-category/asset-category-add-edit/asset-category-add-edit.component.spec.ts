import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetCategoryAddEditComponent } from './asset-category-add-edit.component';

describe('AssetCategoryAddEditComponent', () => {
  let component: AssetCategoryAddEditComponent;
  let fixture: ComponentFixture<AssetCategoryAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetCategoryAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
