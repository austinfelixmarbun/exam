import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { UcpagingComponent } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
  providers: [NGXToastrService, NgbPaginationConfig]
})
export class BankComponent implements OnInit {
  inputPagingObj: any;

  ngOnInit() {
    //sudah dibenerin
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchBank.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.deleteUrl = "/RefBank/DeleteRefBank";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBank.json";
  }

}