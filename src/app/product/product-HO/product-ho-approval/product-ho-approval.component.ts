import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-product-ho-approval',
  templateUrl: './product-ho-approval.component.html',
  styleUrls: ['./product-ho-approval.component.scss']
})
export class ProductHOApprovalComponent implements OnInit {

  inputPagingObj: any;
  arrCrit: any;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj=new UcpagingModule();
    this.inputPagingObj._url="./assets/ucpaging/product/searchProductHOApproval.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductHOApproval.json";

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'TRX_TYPE';
    critObj.value = AdInsConstant.ApvTrxTypeProductHO;
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

}
