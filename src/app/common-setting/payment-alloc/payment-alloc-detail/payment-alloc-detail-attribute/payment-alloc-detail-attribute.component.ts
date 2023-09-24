import { ContainerService } from '@adins/uctemplate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-alloc-detail-attribute',
  templateUrl: './payment-alloc-detail-attribute.component.html'
})
export class PaymentAllocDetailAttributeComponent implements OnInit {

  constructor(
    private containerService: ContainerService
  ) { }

  ngOnInit(): void {
    console.log(this.containerService.getForm())
  }

}
