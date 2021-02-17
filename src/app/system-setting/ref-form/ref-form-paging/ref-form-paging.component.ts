import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-ref-form-paging',
  templateUrl: './ref-form-paging.component.html',
  styleUrls: ['./ref-form-paging.component.scss'],
  providers: [NGXToastrService]
})
export class RefFormPagingComponent implements OnInit {
  inputPagingObj: any;

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_REF_FORM_DETAIL;
  constructor() { }


  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchRefForm.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefForm.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefFormData;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "RF.CLASS",
        environment: environment.FoundationR3Url
      },
      {
        name: "RF.REF_MODULE_ID",
        environment: environment.FoundationR3Url
      }
    ];
    
  }
}
