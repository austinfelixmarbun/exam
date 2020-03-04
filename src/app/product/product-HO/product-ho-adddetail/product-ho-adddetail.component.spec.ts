import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHoAdddetailComponent } from './product-ho-adddetail.component';

describe('ProductHoAdddetailComponent', () => {
  let component: ProductHoAdddetailComponent;
  let fixture: ComponentFixture<ProductHoAdddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHoAdddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHoAdddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
