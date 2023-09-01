import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-custom-shareholder-listing',
  templateUrl: './custom-shareholder-listing.component.html'
})
export class CustomShareholderListingComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  IdCust: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
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
