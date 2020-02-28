import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetConfigurationAddEditComponent } from './asset-configuration-add-edit.component';

describe('AssetConfigurationAddEditComponent', () => {
  let component: AssetConfigurationAddEditComponent;
  let fixture: ComponentFixture<AssetConfigurationAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetConfigurationAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetConfigurationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
