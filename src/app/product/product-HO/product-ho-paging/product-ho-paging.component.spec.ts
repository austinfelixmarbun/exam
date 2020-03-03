import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHOPagingComponent } from './product-ho-paging.component';

describe('ProductHOPagingComponent', () => {
  let component: ProductHOPagingComponent;
  let fixture: ComponentFixture<ProductHOPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHOPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHOPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
