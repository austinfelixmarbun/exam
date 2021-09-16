import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewSubjectInfoCompanyObj } from 'app/shared/model/Response/Pefindo/ResViewSubjectInfoCompanyObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-pefindo-view-subject-info-company',
  templateUrl: './pefindo-view-subject-info-company.component.html'
})
export class PefindoViewSubjectInfoCompanyComponent implements OnInit {
  TrxNo: string;
  ResViewSubjectInfoCompanyObj: ResViewSubjectInfoCompanyObj = new ResViewSubjectInfoCompanyObj();

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
  }

}
