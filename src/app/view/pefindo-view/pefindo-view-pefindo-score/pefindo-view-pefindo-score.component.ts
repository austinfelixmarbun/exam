import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ViewPefindoScoreObj } from 'app/shared/model/Pefindo/ViewPefindoScoreObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-pefindo-view-pefindo-score',
  templateUrl: './pefindo-view-pefindo-score.component.html'
})
export class PefindoViewPefindoScoreComponent implements OnInit {
  CustNo: string;
  TrxNo: string;
  PefindoScoreInfo: ViewPefindoScoreObj = new ViewPefindoScoreObj();
  PefindoScoreHist: Array<ViewPefindoScoreObj> = new Array<ViewPefindoScoreObj>();
  IsReady: boolean = false;
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }
    });
  }

  ngOnInit() {
    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(environment.FoundationR3Url + '/v1' + '/Digitalization/HandleViewPefindoScore', reqByTrxNo).subscribe(
      (response) => {
        console.log(response[CommonConstant.ReturnObj]);
        if(response[CommonConstant.ReturnObj] != null) {
          this.PefindoScoreHist = response[CommonConstant.ReturnObj];
          this.PefindoScoreInfo = this.PefindoScoreHist.pop();
        }
        this.IsReady = true;
      }
    )
  }

}
