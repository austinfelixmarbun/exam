import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetConfigurationPagingComponent } from './asset-configuration-paging.component';

describe('AssetConfigurationPagingComponent', () => {
  let component: AssetConfigurationPagingComponent;
  let fixture: ComponentFixture<AssetConfigurationPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetConfigurationPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetConfigurationPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
