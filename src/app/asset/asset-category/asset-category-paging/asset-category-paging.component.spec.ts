import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCategoryPagingComponent } from './asset-category-paging.component';

describe('AssetCategoryPagingComponent', () => {
  let component: AssetCategoryPagingComponent;
  let fixture: ComponentFixture<AssetCategoryPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetCategoryPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCategoryPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
