import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAccessoryInformationComponent } from './asset-accessory-information.component';

describe('AssetAccessoryInformationComponent', () => {
  let component: AssetAccessoryInformationComponent;
  let fixture: ComponentFixture<AssetAccessoryInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAccessoryInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAccessoryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
