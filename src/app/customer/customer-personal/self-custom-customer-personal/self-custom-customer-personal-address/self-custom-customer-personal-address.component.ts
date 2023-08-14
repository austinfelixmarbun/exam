import { UcTemplateService } from '@adins/uctemplate';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-self-custom-customer-personal-address',
  templateUrl: './self-custom-customer-personal-address.component.html',
  styleUrls: ['./self-custom-customer-personal-address.component.css']
})
export class SelfCustomCustomerPersonalAddressComponent implements OnInit {

  pageName: string;
  isReady: boolean = false;

  @Input()
  dicts: Record<string, any> = {};

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  data: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onBtnClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private uctemplateService: UcTemplateService) {
    this.pageName = "CustomerPersonalAddress"
    this.isReady = true
  }

  ngOnInit(): void {
  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  btnClickHandler(ev)
  {
    if (ev.key == "add")
    {
      this.isReady = false;
      this.pageName = "CustomerPersonalAddressAdd"
    }
    
    if (ev.key == "back")
    {
      this.isReady = false;
      this.pageName = "CustomerPersonalAddress"
    }

    setTimeout(() => {
      this.isReady = true;
    }, 100)
  }

  callback(ev) {
    let row = ev.RowObj;

    if (ev.Action.key == "edit")
    {
      this.isReady = false;
      this.pageName = "CustomerPersonalAddressAdd"

      setTimeout(() => {
        this.isReady = true;
        const data = {
          CustAddrId: row.CustAddrId, mode: 'edit'
        };
  
        this.data.emit(data);
      }, 100)
    }
  }

  onNext() {
    // Todo: Call API Custom Implementation here...
    // Then call next action to next step
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

    let Data: any[];
    this.next.emit({Actions: actions, Data: {ListCust: Data}});
    // this.http.post(`${this.uctemplateService.envConfig['mockUrl']}/v1/mock`, {CustType: 'Personal'})
    //   .subscribe(res => {
    //     Data = res['Data'];

    //     /***
    //      * Event arguments:
    //      * Actions: required, next actions...
    //      * Data: optional, passing data reference to uctemplate dictionary
    //      */
    //     this.next.emit({Actions: actions, Data: {ListCust: Data}});
    //   });
  }

}
