import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-ref-form-paging',
  templateUrl: './ref-form-paging.component.html',
  styleUrls: ['./ref-form-paging.component.scss'],
  providers: [NGXToastrService]
})
export class RefFormPagingComponent implements OnInit {
  inputPagingObj: any;

  constructor() { }


  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchRefForm.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefForm.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefFormData;
  }
}
