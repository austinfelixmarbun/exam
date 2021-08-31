import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewOtherLiabilitiesObj } from 'app/shared/model/Response/Pefindo/ResViewOtherLiabilitiesObj.model';

@Component({
  selector: 'app-pefindo-view-other-liabilities',
  templateUrl: './pefindo-view-other-liabilities.component.html'
})
export class PefindoViewOtherLiabilitiesComponent implements OnInit {
  TrxNo: string;
  ResViewOtherLiabilitiesObj: ResViewOtherLiabilitiesObj = new ResViewOtherLiabilitiesObj();

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
    this.http.post(URLConstant.HandleViewOtherLiabilities, reqByTrxNo).subscribe(
      (response: ResViewOtherLiabilitiesObj) => {
        this.ResViewOtherLiabilitiesObj = response;
      }
    )
  }

}
