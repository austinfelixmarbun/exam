import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewSubjectInfoPersonalObj } from 'app/shared/model/Response/Pefindo/ResViewSubjectInfoPersonalObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-pefindo-view-subject-info-personal',
  templateUrl: './pefindo-view-subject-info-personal.component.html'
})
export class PefindoViewSubjectInfoPersonalComponent implements OnInit {
  CustNo: string;
  TrxNo: string;
  ResViewSubjectInfoPersonalObj: ResViewSubjectInfoPersonalObj = new ResViewSubjectInfoPersonalObj();

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }
    });
  }
  
  ngOnInit() {
    // this.CustNo = '0002CUST20210802921';
    // this.TrxNo = '0002CTP20210800032';
    // this.CustNo = '0002CUST20210802923';
    console.log("test");
    let reqByTrxNo: GenericObj = new GenericObj();
    // reqByCustNo.CustNo = this.CustNo;
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(environment.FoundationR3Url + '/v1' + '/Digitalization/HandleViewSubjectInfoPersonal', reqByTrxNo).subscribe(
      (response: ResViewSubjectInfoPersonalObj) => {
        console.log(response);
        this.ResViewSubjectInfoPersonalObj = response;
      }
    )
  }

}
