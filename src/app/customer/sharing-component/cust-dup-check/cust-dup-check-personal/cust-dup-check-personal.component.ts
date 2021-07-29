import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
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

  ngOnInit() {
    this.initRefMaster(this.RefMasterTypeCodeIdType);
    this.initRefMaster(this.RefMasterTypeCodeGender);
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
