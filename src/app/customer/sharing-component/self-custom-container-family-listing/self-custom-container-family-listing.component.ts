import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';

@Component({
  selector: 'app-self-custom-container-family-listing',
  templateUrl: './self-custom-container-family-listing.component.html'
})
export class SelfCustomContainerFamilyListingComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  IdCust: number = 0;
  isMarried: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  async ngOnInit() {
    await this.http.post<CustPersonalObj>(this.UrlConstantNew.GetCustPersonalbyCustId, { Id: this.IdCust }).toPromise().then(
      (response) => {
        if (response.MrMaritalStatCode == CommonConstant.MasteCodeMartialStatsMarried) {
          this.isMarried = true;
        }
      }
    );
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

    const Data = {
      "stepCode": "EmergencyCntcPerson"
    }

    this.next.emit({Actions: actions, Data: {"stepCode": "EmergencyCntcPerson"}});
  }

}
