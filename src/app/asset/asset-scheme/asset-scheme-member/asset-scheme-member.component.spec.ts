import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetSchemeMemberComponent } from './asset-scheme-member.component';

describe('AssetSchemeMemberComponent', () => {
  let component: AssetSchemeMemberComponent;
  let fixture: ComponentFixture<AssetSchemeMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSchemeMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSchemeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
