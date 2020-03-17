import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHOAddComponent } from './product-ho-add.component';

describe('ProductHOAddComponent', () => {
  let component: ProductHOAddComponent;
  let fixture: ComponentFixture<ProductHOAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHOAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHOAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
