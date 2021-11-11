import {Component, OnInit} from '@angular/core';
import {AdInsConstant} from 'app/shared/AdInstConstant';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {UcPagingObj} from 'app/shared/model/uc-paging-obj.model';
import {CriteriaObj} from 'app/shared/model/criteria-obj.model';

@Component({
  selector: 'app-edit-main-data-paging-x',
  templateUrl: './edit-main-data-paging-x.component.html'
})
export class EditMainDataPagingXComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/editMainDataCustomerX.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/editMainDataCustomerX.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;
    this.inputPagingObj.addCritInput = [];
    var critObj = new CriteriaObj();
    critObj.propName = "C.IS_CUSTOMER";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = '1';
    this.inputPagingObj.addCritInput.push(critObj);
  }

}
