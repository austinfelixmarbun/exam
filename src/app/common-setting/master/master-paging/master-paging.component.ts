import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-master-paging',
  templateUrl: './master-paging.component.html',
  providers: [NGXToastrService]
})
export class MasterPagingComponent implements OnInit {
  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchMaster.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.pagingJson = "./assets/search/searchMaster.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefMaster;
  }

}
