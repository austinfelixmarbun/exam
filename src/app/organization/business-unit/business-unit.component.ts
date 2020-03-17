import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html',
  providers: [NGXToastrService] // add NgbPaginationConfig to the component providers
})

export class BusinessUnitComponent implements OnInit {

  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchBusinessUnit.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBusinessUnit.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefBizUnit;
  }
}