import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UCGridFooterComponent } from './ucgrid-footer.component';

describe('UCGridFooterComponent', () => {
  let component: UCGridFooterComponent;
  let fixture: ComponentFixture<UCGridFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UCGridFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UCGridFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
