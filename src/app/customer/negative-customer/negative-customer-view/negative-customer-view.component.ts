import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { DatePipe, Location } from '@angular/common';
import { NegativeCustObj } from 'app/shared/model/NegativeCustObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { map, mergeMap } from 'rxjs/operators';
import { NegativeCustChangeTrxObj } from 'app/shared/model/NegativeCustChangeTrxObj.Model';
import { forkJoin } from 'rxjs';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-negative-customer-view',
  templateUrl: './negative-customer-view.component.html',
  styleUrls: []
})
export class NegativeCustomerViewComponent implements OnInit {
  negativeCustId: number = 0;
  response: any;
  responseTrx: any;
  expiredDt: string;
  birthDt: string;
  custType: string = 'P';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private httpClient: HttpClient,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['negativeCustId'] != null) {
        this.negativeCustId = params['negativeCustId'];
      }
    });
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    var negativeCustObj = new NegativeCustObj();
    negativeCustObj.NegativeCustId = this.negativeCustId;

    this.httpClient.post(URLConstant.GetNegativeCustByNegativeCustId, negativeCustObj).pipe(
      map((response) => {
        return response;
      }),
      mergeMap((response: any) => {
        var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
        negativeCustChangeTrxObj.NegativeCustId = response.NegativeCustId;
        const negativeCustChangeTrx = this.httpClient.post(URLConstant.GetListNegativeCustChangeTrxByNegativeCustId, negativeCustChangeTrxObj);
        var tempResponse = [response];
        return forkJoin([tempResponse, negativeCustChangeTrx]);
      }),
      mergeMap((response: any) => {
        var refMasterIdTypeObj = new RefMasterObj();
        refMasterIdTypeObj.MasterCode = response[0].MrIdTypeCode;
        var refMasterNegativeCustTypeObj = new RefMasterObj();
        refMasterNegativeCustTypeObj.MasterCode = response[0].MrNegCustTypeCode;
        var refMasterNegativeSourceObj = new RefMasterObj();
        refMasterNegativeSourceObj.MasterCode = response[0].MrNegCustSourceCode;
        let requestIdType = this.httpClient.post(URLConstant.GetRefMasterByMasterCode, refMasterIdTypeObj);
        let requestNegativeCustType = this.httpClient.post(URLConstant.GetRefMasterByMasterCode, refMasterNegativeCustTypeObj);
        let requestNegativeSource = this.httpClient.post(URLConstant.GetRefMasterByMasterCode, refMasterNegativeSourceObj);

        var tempResponse = [response];

        return forkJoin([tempResponse, requestIdType, requestNegativeCustType, requestNegativeSource]);
      })
    ).subscribe(
      (response: any) => {
        this.response = response[0][0];
        this.expiredDt = datePipe.transform(this.response.IdExpiredDt, 'yyyy-MM-dd');
        this.birthDt = datePipe.transform(this.response.BirthDt, 'yyyy-MM-dd');
        this.responseTrx = response[0][1].ReturnObject;
        this.response.MrIdTypeCode = response[1].Descr;
        this.response.MrNegCustTypeCode = response[2].Descr;
        this.response.MrNegCustSourceCode = response[3].Descr;
        this.custType = this.response.MrCustTypeCode;
      }
    );
  }
}
