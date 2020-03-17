import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetAccessoryPagingComponent } from './asset-accessory-paging.component';

describe('AssetAccessoryPagingComponent', () => {
  let component: AssetAccessoryPagingComponent;
  let fixture: ComponentFixture<AssetAccessoryPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAccessoryPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAccessoryPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
