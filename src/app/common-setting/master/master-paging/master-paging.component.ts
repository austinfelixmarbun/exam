import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { DecimalPipe } from '@angular/common';
import { UcpagingComponent } from '@adins/ucpaging';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-master-paging',
  templateUrl: './master-paging.component.html',
  providers: [NGXToastrService, DecimalPipe]
})
export class MasterPagingComponent implements OnInit {

  @ViewChild(UcpagingComponent) ucpaging;
  inputPagingObj: any;
  navigationSubscription: any;

  constructor(
    private service: NGXToastrService,
    private https: HttpClient
  ) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchMaster.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = "/RefMaster/DeleteRefMaster";
    this.inputPagingObj.pagingJson = "./assets/search/searchMaster.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "ref_Master_Type_Code",
        environment: environment.FoundationR3Url
      }
    ];
  }

}
