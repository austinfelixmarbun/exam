import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewRelationsObj } from 'app/shared/model/response/pefindo/res-view-relations-obj.model';

@Component({
  selector: 'app-pefindo-view-relations',
  templateUrl: './pefindo-view-relations.component.html'
})
export class PefindoViewRelationsComponent implements OnInit {
  TrxNo: string;
  ResViewRelationsObj: ResViewRelationsObj = new ResViewRelationsObj();

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
    this.http.post(URLConstant.GetViewRelations, reqByTrxNo).subscribe(
      (response: ResViewRelationsObj) => {
        this.ResViewRelationsObj = response;
      }
    )
  }

}
