import { UcTemplateService } from '@adins/uctemplate';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-self-custom-customer-personal-address',
  templateUrl: './self-custom-customer-personal-address.component.html'
})
export class SelfCustomCustomerPersonalAddressComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private uctemplateService: UcTemplateService) {
  }

  ngOnInit(): void {
  }

  getValue(ev: any)
  {
    const actions = [
      {
        'result': {
          'type': 'function',
          'target': 'self',
          'alias': '',
          'methodName': 'NextStep',
          'params': []
        },
        'conditions': []
      }
    ];

    this.next.emit({Actions: actions});
  }

}
