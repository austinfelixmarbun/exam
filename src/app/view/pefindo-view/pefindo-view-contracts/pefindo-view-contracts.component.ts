import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewContractsObj } from 'app/shared/model/response/pefindo/res-view-contracts-obj.model';

@Component({
  selector: 'app-pefindo-view-contracts',
  templateUrl: './pefindo-view-contracts.component.html'
})
export class PefindoViewContractsComponent implements OnInit {
  TrxNo: string;
  ResViewContractsObj: ResViewContractsObj = new ResViewContractsObj();

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }
    });
  }

  ngOnInit() {
    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(this.UrlConstantNew.GetViewContracts, reqByTrxNo).subscribe(
      (response: ResViewContractsObj) => {
        this.ResViewContractsObj = response;
      }
    )
  }

}
