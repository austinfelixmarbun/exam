import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RefProvDistrictObj } from 'app/shared/model/RefProvDistrictObj.Model';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';



@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  providers: [DecimalPipe]
})
export class DistrictComponent implements OnInit {

  inputPagingObj: any;
  parentId: any;
  arrCrit: any;
  resultData: any;
  provinceName: any;
  provinceCode: any;
  refProvDistrictObj: RefProvDistrictObj;
  getUrl: any;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getUrl = URLConstant.GetRefProvDistrictById;
    this.route.queryParams.subscribe(params => {
      if (params['refProvDistrictId'] != null) {
        this.parentId = params['refProvDistrictId'];
      }
    });
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchDistrict.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchDistrict.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefProvDistrict;

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'TYPE';
    critObj.value = 'DIS';
    this.arrCrit.push(critObj);
    critObj = new CriteriaObj();
    critObj.DataType = 'number';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'PARENT_ID';
    critObj.value = this.parentId;
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;

    this.refProvDistrictObj = new RefProvDistrictObj();
    this.refProvDistrictObj.RefProvDistrictId = this.parentId;
    this.http.post(this.getUrl, this.refProvDistrictObj).subscribe(
      response => {
        this.resultData = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
