import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewSubjectInfoCompanyObj } from 'app/shared/model/Response/Pefindo/ResViewSubjectInfoCompanyObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-pefindo-view-subject-info-company',
  templateUrl: './pefindo-view-subject-info-company.component.html'
})
export class PefindoViewSubjectInfoCompanyComponent implements OnInit {
  CustNo: string;
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
    // this.CustNo = '0002CUST20210802922';
    // this.CustNo = '0002CUST20210802924';
    let reqByTrxNo: GenericObj = new GenericObj();
    // reqByCustNo.CustNo = this.CustNo;
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(environment.FoundationR3Url + '/v1' + '/Digitalization/HandleViewSubjectInfoCompany', reqByTrxNo).subscribe(
      (response: ResViewSubjectInfoCompanyObj) => {
        console.log(response);
        this.ResViewSubjectInfoCompanyObj = response;
      }
    )
  }

}
