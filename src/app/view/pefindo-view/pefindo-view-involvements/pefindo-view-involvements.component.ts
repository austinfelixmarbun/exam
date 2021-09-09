import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewInvolvementsObj } from 'app/shared/model/Response/Pefindo/ResViewInvolvementsObj.model';

@Component({
  selector: 'app-pefindo-view-involvements',
  templateUrl: './pefindo-view-involvements.component.html'
})
export class PefindoViewInvolvementsComponent implements OnInit {
  TrxNo: string;
  ResViewInvolvementsObj: ResViewInvolvementsObj = new ResViewInvolvementsObj();

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
    this.http.post(URLConstant.HandleViewInvolvements, reqByTrxNo).subscribe(
      (response: ResViewInvolvementsObj) => {
        this.ResViewInvolvementsObj = response;
      }
    )
  }

}
