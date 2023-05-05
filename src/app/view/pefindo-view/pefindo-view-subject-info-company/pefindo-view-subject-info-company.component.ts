import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewSubjectInfoCompanyObj } from 'app/shared/model/response/pefindo/res-view-subject-info-company-obj.model';
import { ResViewSubjectInfoHistoryObj } from 'app/shared/model/response/pefindo/res-view-subject-info-history-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-pefindo-view-subject-info-company',
  templateUrl: './pefindo-view-subject-info-company.component.html'
})
export class PefindoViewSubjectInfoCompanyComponent implements OnInit {
  TrxNo: string;
  ResViewSubjectInfoCompanyObj: ResViewSubjectInfoCompanyObj = new ResViewSubjectInfoCompanyObj();
  ListRPefindoSubjInfoAddrHist: Array<ResViewSubjectInfoHistoryObj> = new Array<ResViewSubjectInfoHistoryObj>();
  ListRPefindoSubjInfoCntctHist: Array<ResViewSubjectInfoHistoryObj> = new Array<ResViewSubjectInfoHistoryObj>();
  ListRPefindoSubjInfoGnrlHist: Array<ResViewSubjectInfoHistoryObj> = new Array<ResViewSubjectInfoHistoryObj>();
  ListRPefindoSubjInfoIdntfctnHist: Array<ResViewSubjectInfoHistoryObj> = new Array<ResViewSubjectInfoHistoryObj>();

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
    this.http.post(URLConstant.GetViewSubjectInfoCompany, reqByTrxNo).subscribe(
      (response: ResViewSubjectInfoCompanyObj) => {
        this.ResViewSubjectInfoCompanyObj = response;
      }
    )

    this.http.post(URLConstant.GetViewSubjectInfoAllHistory, reqByTrxNo).subscribe(
      (response) => {
        this.ListRPefindoSubjInfoAddrHist = response["ListRPefindoSubjInfoAddrHist"];
        this.ListRPefindoSubjInfoCntctHist = response["ListRPefindoSubjInfoCntctHist"];
        this.ListRPefindoSubjInfoGnrlHist = response["ListRPefindoSubjInfoGnrlHist"];
        this.ListRPefindoSubjInfoIdntfctnHist = response["ListRPefindoSubjInfoIdntfctnHist"];
      }
    )
  }

}
