import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSchemeAddEditMemberComponent } from './asset-scheme-add-edit-member.component';

describe('AssetSchemeAddEditMemberComponent', () => {
  let component: AssetSchemeAddEditMemberComponent;
  let fixture: ComponentFixture<AssetSchemeAddEditMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSchemeAddEditMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSchemeAddEditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
