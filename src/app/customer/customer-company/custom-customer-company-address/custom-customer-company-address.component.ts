import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-custom-customer-company-address',
  templateUrl: './custom-customer-company-address.component.html'
})
export class CustomCustomerCompanyAddressComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();
  
  IdCust: number = 0;

  constructor() {}

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
