import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewDisputesObj } from 'app/shared/model/Response/Pefindo/ResViewDisputesObj.model';

@Component({
  selector: 'app-pefindo-view-disputes',
  templateUrl: './pefindo-view-disputes.component.html'
})
export class PefindoViewDisputesComponent implements OnInit {
  TrxNo: string;
  ResViewDisputesObj: ResViewDisputesObj = new ResViewDisputesObj();

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
    this.http.post(URLConstant.HandleViewDisputes, reqByTrxNo).subscribe(
      (response: ResViewDisputesObj) => {
        this.ResViewDisputesObj = response;
      }
    )
  }

}
