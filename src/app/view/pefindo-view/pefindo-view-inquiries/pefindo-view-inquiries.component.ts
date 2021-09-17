import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResViewInquiriesObj } from 'app/shared/model/Response/Pefindo/ResViewInquiriesObj.model';

@Component({
  selector: 'app-pefindo-view-inquiries',
  templateUrl: './pefindo-view-inquiries.component.html'
})
export class PefindoViewInquiriesComponent implements OnInit {
  TrxNo: string;
  ResViewInquiriesObj: ResViewInquiriesObj = new ResViewInquiriesObj();

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
    this.http.post(URLConstant.GetViewInquiries, reqByTrxNo).subscribe(
      (response: ResViewInquiriesObj) => {
        this.ResViewInquiriesObj = response;
      }
    )
  }

}
