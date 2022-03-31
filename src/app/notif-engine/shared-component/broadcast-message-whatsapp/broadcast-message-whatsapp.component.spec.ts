import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMessageWhatsappComponent } from './broadcast-message-whatsapp.component';

describe('BroadcastMessageWhatsappComponent', () => {
  let component: BroadcastMessageWhatsappComponent;
  let fixture: ComponentFixture<BroadcastMessageWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastMessageWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessageWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
