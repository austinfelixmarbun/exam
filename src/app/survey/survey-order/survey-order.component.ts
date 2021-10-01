import { Component, OnInit, ViewChild } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcpagingComponent } from '@adins/ucpaging';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-survey-order',
  templateUrl: './survey-order.component.html'
})
export class SurveyOrderComponent implements OnInit {

  @ViewChild(UcpagingComponent) ucPaging: UcpagingComponent;

  inputPagingObj: UcPagingObj = new UcPagingObj();
  SrvyOrderId: number;

  constructor() {
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyOrder.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyOrder.json";
  }

  getCallback(event){
    this.SrvyOrderId = event['RowObj']['SrvyOrderId']
    AdInsHelper.OpenSurveyOrderViewBySrvyOrderId(this.SrvyOrderId);
  }
}