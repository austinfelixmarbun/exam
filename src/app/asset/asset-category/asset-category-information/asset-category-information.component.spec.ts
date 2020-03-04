import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCategoryInformationComponent } from './asset-category-information.component';

describe('AssetCategoryInformationComponent', () => {
  let component: AssetCategoryInformationComponent;
  let fixture: ComponentFixture<AssetCategoryInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetCategoryInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCategoryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
