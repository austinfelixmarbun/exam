import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResLabelValueMOSummaryObj } from 'app/shared/model/response/pefindo/res-label-value-mo-summary-obj.model';

@Component({
  selector: 'app-pefindo-view-mo-summary',
  templateUrl: './pefindo-view-mo-summary.component.html'
})
export class PefindoViewMoSummaryComponent implements OnInit {
  TrxNo: string;
  ListMOSummaryObj: Array<ResLabelValueMOSummaryObj> = new Array<ResLabelValueMOSummaryObj>();
  IsReady: boolean = false;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }
    });
  }

  ngOnInit() {
    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(this.UrlConstantNew.GetViewMOSummary, reqByTrxNo).subscribe(
      (response) => {
        console.log(response[CommonConstant.ReturnObj]);
        if(response[CommonConstant.ReturnObj] != null) {
          this.ListMOSummaryObj = response[CommonConstant.ReturnObj];
        }
        this.IsReady = true;
      }
    );
  }

}
