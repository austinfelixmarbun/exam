import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewSecuritiesObj } from 'app/shared/model/Response/Pefindo/ResViewSecuritiesObj.model';

@Component({
  selector: 'app-pefindo-view-securities',
  templateUrl: './pefindo-view-securities.component.html'
})
export class PefindoViewSecuritiesComponent implements OnInit {
  TrxNo: string;
  ResViewSecuritiesObj: ResViewSecuritiesObj = new ResViewSecuritiesObj();

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
    this.http.post(URLConstant.HandleViewSecurities, reqByTrxNo).subscribe(
      (response: ResViewSecuritiesObj) => {
        this.ResViewSecuritiesObj = response;
      }
    )
  }

}
