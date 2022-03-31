import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifBroadcastMessageFormComponent } from './notif-broadcast-message-form.component';

describe('NotifBroadcastMessageFormComponent', () => {
  let component: NotifBroadcastMessageFormComponent;
  let fixture: ComponentFixture<NotifBroadcastMessageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifBroadcastMessageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifBroadcastMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
