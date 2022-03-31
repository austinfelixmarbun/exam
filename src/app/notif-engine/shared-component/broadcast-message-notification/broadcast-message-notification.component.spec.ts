import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMessageNotificationComponent } from './broadcast-message-notification.component';

describe('BroadcastMessageNotificationComponent', () => {
  let component: BroadcastMessageNotificationComponent;
  let fixture: ComponentFixture<BroadcastMessageNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastMessageNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessageNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
