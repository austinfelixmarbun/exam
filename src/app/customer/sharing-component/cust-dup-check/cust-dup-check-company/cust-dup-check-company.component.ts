import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericKeyValueListObj } from 'app/shared/model/Generic/GenericKeyValueListObj.model';
import { ReqCoyObj } from 'app/shared/model/NewCust/ReqCoyObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';

@Component({
  selector: 'app-cust-dup-check-company',
  templateUrl: './cust-dup-check-company.component.html',
})
export class CustDupCheckCompanyComponent implements OnInit {

  @Input() CustObj: ReqCoyObj;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  
  readonly RefMasterTypeCodeCompanyType: string = CommonConstant.RefMasterTypeCodeCompanyType;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.initRefMaster(this.RefMasterTypeCodeCompanyType);
    this.initRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypeCompany, URLConstant.GetListActiveRefMasterWithMappingCodeAll);
  }

  DictRefMaster: { [id: string]: { [code: string]: string } } = {};
  initRefMaster(refMasterTypeCode: string, mappingCode: string = null, urlApi: string = URLConstant.GetListActiveRefMaster) {
    let refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: refMasterTypeCode,
      MappingCode: mappingCode
    };
    this.DictRefMaster[refMasterTypeCode] = {};
    this.http.post(urlApi, refMasterObjMrIdTypeCode).subscribe(
      (response: GenericKeyValueListObj) => {
        for (let index = 0; index < response.ReturnObject.length; index++) {
          const element = response.ReturnObject[index];
          this.DictRefMaster[refMasterTypeCode][element.Key] = element.Value;
        }
      }
    )
  }
}
