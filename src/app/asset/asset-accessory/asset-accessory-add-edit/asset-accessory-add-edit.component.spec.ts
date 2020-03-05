import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAccessoryAddEditComponent } from './asset-accessory-add-edit.component';

describe('AssetAccessoryAddEditComponent', () => {
  let component: AssetAccessoryAddEditComponent;
  let fixture: ComponentFixture<AssetAccessoryAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAccessoryAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAccessoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
