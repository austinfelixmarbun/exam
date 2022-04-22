import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMessageSmsWaComponent } from './broadcast-message-sms-wa.component';

describe('BroadcastMessageSmsWaComponent', () => {
  let component: BroadcastMessageSmsWaComponent;
  let fixture: ComponentFixture<BroadcastMessageSmsWaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastMessageSmsWaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessageSmsWaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
