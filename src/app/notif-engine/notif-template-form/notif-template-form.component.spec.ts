import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifTemplateFormComponent } from './notif-template-form.component';

describe('NotifTemplateFormComponent', () => {
  let component: NotifTemplateFormComponent;
  let fixture: ComponentFixture<NotifTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifTemplateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
