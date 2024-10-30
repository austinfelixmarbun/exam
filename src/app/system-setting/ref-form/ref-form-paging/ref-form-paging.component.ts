import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-ref-form-paging',
  templateUrl: './ref-form-paging.component.html',
  styleUrls: ['./ref-form-paging.component.scss']
})
export class RefFormPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_REF_FORM_DETAIL;
  constructor() { }


  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefForm.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefForm.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefFormData;
    
  }
}
