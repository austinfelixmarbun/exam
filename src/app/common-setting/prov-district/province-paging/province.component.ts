import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';


@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  providers: [DecimalPipe]
})
export class ProvinceComponent implements OnInit {

  inputPagingObj: any;
  arrCrit: any;
  
  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchProvince.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchProvince.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefProvDistrict;

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'TYPE';
    critObj.value = 'PRV';
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}
