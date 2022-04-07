import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewDisputesObj } from 'app/shared/model/response/pefindo/res-view-disputes-obj.model';

@Component({
  selector: 'app-pefindo-view-disputes',
  templateUrl: './pefindo-view-disputes.component.html'
})
export class PefindoViewDisputesComponent implements OnInit {
  TrxNo: string;
  ResViewDisputesObj: ResViewDisputesObj = new ResViewDisputesObj();

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
    this.http.post(this.UrlConstantNew.GetViewDisputes, reqByTrxNo).subscribe(
      (response: ResViewDisputesObj) => {
        this.ResViewDisputesObj = response;
      }
    )
  }

}
