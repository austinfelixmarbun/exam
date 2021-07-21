import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAddXComponent } from './office-add-x.component';

describe('OfficeAddXComponent', () => {
  let component: OfficeAddXComponent;
  let fixture: ComponentFixture<OfficeAddXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeAddXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAddXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
