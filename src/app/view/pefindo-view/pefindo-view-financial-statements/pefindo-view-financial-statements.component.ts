import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewFinancialStatementsObj } from 'app/shared/model/response/pefindo/res-view-financial-statements-obj.model';

@Component({
  selector: 'app-pefindo-view-financial-statements',
  templateUrl: './pefindo-view-financial-statements.component.html'
})
export class PefindoViewFinancialStatementsComponent implements OnInit {
  TrxNo: string;
  ResViewFinancialStatementsObj: ResViewFinancialStatementsObj = new ResViewFinancialStatementsObj();

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }
    });
  }

  ngOnInit() {
    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(URLConstant.GetViewFinancialStatements, reqByTrxNo).subscribe(
      (response: ResViewFinancialStatementsObj) => {
        this.ResViewFinancialStatementsObj = response;
      }
    )
  }

}
