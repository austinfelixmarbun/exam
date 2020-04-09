import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-vendor-ho-paging',
  templateUrl: './vendor-ho-paging.component.html',
  styleUrls: ['./vendor-ho-paging.component.scss']
})
export class VendorHoPagingComponent implements OnInit {
  inputPagingObj: any;
  arrCrit: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorHO.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHO.json";

    this.arrCrit = new Array();

    var crit1Obj = new CriteriaObj();
    crit1Obj.propName = "V.MR_VENDOR_CLASS";
    crit1Obj.restriction = AdInsConstant.RestrictionEq;
    crit1Obj.value = "HO";
    this.arrCrit.push(crit1Obj);

    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}
