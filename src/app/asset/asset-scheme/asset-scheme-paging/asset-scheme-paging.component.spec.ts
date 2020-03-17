import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetSchemePagingComponent } from './asset-scheme-paging.component';

describe('AssetSchemePagingComponent', () => {
  let component: AssetSchemePagingComponent;
  let fixture: ComponentFixture<AssetSchemePagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSchemePagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSchemePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
