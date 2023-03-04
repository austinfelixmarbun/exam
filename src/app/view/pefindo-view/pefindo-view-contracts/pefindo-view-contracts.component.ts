import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResContractObj } from 'app/shared/model/Response/pefindo/res-contract-obj.model';
import { ResViewContractsObj } from 'app/shared/model/response/pefindo/res-view-contracts-obj.model';

@Component({
  selector: 'app-pefindo-view-contracts',
  templateUrl: './pefindo-view-contracts.component.html'
})
export class PefindoViewContractsComponent implements OnInit {
  TrxNo: string;
  ResViewContractsObj: ResViewContractsObj = new ResViewContractsObj();
  ResListContractsObj: Array<ResContractObj> = [];
  ResSummaryContractsObj: Array<ResContractObj> = [];

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

    this.http.post(URLConstant.GetPefindoContracts, reqByTrxNo).subscribe(
      (response: {ReturnObject: Array<ResContractObj>}) => {
        this.ResListContractsObj = response.ReturnObject;
        this.ResListContractsObj = this.ResListContractsObj.filter(x => x.ClientRole == 'MainDebtor');
        this.ResListContractsObj.forEach(x => {
          var idx = this.ResSummaryContractsObj.findIndex(y => y.Creditor == x.Creditor);
          if (idx < 0)
          {
            let newItem = new ResContractObj();
            newItem.Creditor = x.Creditor;
            this.ResSummaryContractsObj.push(newItem);
            idx = this.ResSummaryContractsObj.findIndex(y => y.Creditor == x.Creditor);
          }
          let curr = this.ResSummaryContractsObj[idx];
          curr.TtlAmt += x.TtlAmt;
          curr.OsAmt += x.OsAmt;
          curr.PastDueAmt += x.PastDueAmt;
          curr.PastDueDays = x.PastDueDays > curr.PastDueDays ? x.PastDueDays : curr.PastDueDays;
      })
      }
    )
    
  }

}
