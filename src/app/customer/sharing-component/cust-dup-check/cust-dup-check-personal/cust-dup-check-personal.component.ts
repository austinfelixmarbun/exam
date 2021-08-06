import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericKeyValueListObj } from 'app/shared/model/Generic/GenericKeyValueListObj.model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';

@Component({
  selector: 'app-cust-dup-check-personal',
  templateUrl: './cust-dup-check-personal.component.html',
})
export class CustDupCheckPersonalComponent implements OnInit {

  @Input() CustObj: ReqPersonalObj;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;

  constructor(private http: HttpClient) { }

  readonly RefMasterTypeCodeIdType: string = CommonConstant.RefMasterTypeCodeIdType;
  readonly RefMasterTypeCodeGender: string = CommonConstant.RefMasterTypeCodeGender;
  readonly RefMasterTypeCodeMaritalStat: string = CommonConstant.RefMasterTypeCodeMaritalStat;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  ngOnInit() {
    this.InitCustMainDataMode();
    this.initRefMaster(this.RefMasterTypeCodeIdType);
    this.initRefMaster(this.RefMasterTypeCodeGender);
    this.initRefMaster(this.RefMasterTypeCodeMaritalStat);
    this.initRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypePersonal);
  }

  CustNameLabel: string = "Customer";
  InitCustMainDataMode() {
    switch (this.CustDataMode) {
      case CommonConstant.CustMainDataModeCust:
        this.CustNameLabel = "Customer";
        break;
      case CommonConstant.CustMainDataModeFamily:
        this.CustNameLabel = "Family";
        break;
      case CommonConstant.CustMainDataModeMgmntShrholder:
        this.CustNameLabel = "Share Legal";
        break;
      default:
    }
  }

  DictRefMaster: { [id: string]: { [code: string]: string } } = {};
  initRefMaster(refMasterTypeCode: string, mappingCode: string = null) {
    let refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: refMasterTypeCode,
      MappingCode: mappingCode
    };
    this.DictRefMaster[refMasterTypeCode] = {};
    this.http.post(URLConstant.GetListActiveRefMaster, refMasterObjMrIdTypeCode).subscribe(
      (response: GenericKeyValueListObj) => {
        for (let index = 0; index < response.ReturnObject.length; index++) {
          const element = response.ReturnObject[index];
          this.DictRefMaster[refMasterTypeCode][element.Key] = element.Value;
        }
      }
    )
  }

}
