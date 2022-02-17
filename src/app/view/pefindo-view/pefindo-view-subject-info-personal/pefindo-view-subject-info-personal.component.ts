import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewSubjectInfoPersonalObj } from 'app/shared/model/response/pefindo/res-view-subject-info-personal-obj.model';

@Component({
  selector: 'app-pefindo-view-subject-info-personal',
  templateUrl: './pefindo-view-subject-info-personal.component.html'
})
export class PefindoViewSubjectInfoPersonalComponent implements OnInit {
  TrxNo: string;
  ResViewSubjectInfoPersonalObj: ResViewSubjectInfoPersonalObj = new ResViewSubjectInfoPersonalObj();

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
    this.http.post(this.UrlConstantNew.GetViewSubjectInfoPersonal, reqByTrxNo).subscribe(
      (response: ResViewSubjectInfoPersonalObj) => {
        this.ResViewSubjectInfoPersonalObj = response;
      }
    )
  }

}
