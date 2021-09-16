import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewPefindoAlertQuestObj } from 'app/shared/model/Response/Pefindo/ResViewPefindoAlertQuestObj.model';

@Component({
  selector: 'app-pefindo-view-pefindo-alert-quest',
  templateUrl: './pefindo-view-pefindo-alert-quest.component.html'
})
export class PefindoViewPefindoAlertQuestComponent implements OnInit {
  TrxNo: string;
  ResViewPefindoAlertQuestObj: ResViewPefindoAlertQuestObj = new ResViewPefindoAlertQuestObj();

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
    this.http.post(URLConstant.GetViewPefindoAlertQuest, reqByTrxNo).subscribe(
      (response: ResViewPefindoAlertQuestObj) => {
        this.ResViewPefindoAlertQuestObj = response;
      }
    )
  }

}
