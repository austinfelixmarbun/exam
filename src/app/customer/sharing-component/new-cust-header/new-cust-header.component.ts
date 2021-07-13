import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';

@Component({
  selector: 'app-new-cust-header',
  templateUrl: './new-cust-header.component.html',
})
export class NewCustHeaderComponent implements OnInit {

  CustType: string = CommonConstant.CustomerPersonal;
  PageType: string = CommonConstant.CustPageTypeHeader;
  CustDataMode: string = CommonConstant.CustMainDataModeCust;
  CustId: number = 0;
  IsDupCheck: boolean = false;
  readonly MasterCustType = CommonConstant.RefMasterTypeCodeCustType;

  constructor(
    private http: HttpClient, private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
      if (params["CustType"] != null) {
        this.CustType = params["CustType"];
      }
    });
  }

  //#region Readonly
  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  readonly CustPageTypeHeader = CommonConstant.CustPageTypeHeader;
  readonly CustPageTypeDupCheck = CommonConstant.CustPageTypeDupCheck;
  readonly CustPageTypePaging = CommonConstant.CustPageTypePaging;
  //#endregion

  async ngOnInit() {
    await this.GetListActiveRefMaster(this.MasterCustType);
  }

  DictRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  async GetListActiveRefMaster(RefMasterTypeCode: string) {
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: RefMasterTypeCode, MappingCode: null };
    await this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, tempReq).toPromise().then(
      (response) => {
        this.DictRefMaster[RefMasterTypeCode] = response[CommonConstant.ReturnObj];
      });
  }

  ChangeType() {
    console.log(this.CustType);
  }

  ClickCancel() {

  }

  CancelDupCheck(){
    this.PageType = this.CustPageTypeHeader;
  }

  DupCheckPersonalObj: ReqPersonalObj = new ReqPersonalObj();
  ClickSavePersonal(ev: ReqPersonalObj) {
    console.log(ev);
    if (this.CustId != 0) {
      this.http.post(URLConstant.EditCustPersonalMainData, ev).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.ClickCancel();
        }
      );
      return;
    }
    this.IsDupCheck = true;
    this.DupCheckPersonalObj = ev;
    this.PageType = this.CustPageTypeDupCheck;
  }

  DupCheckCoyObj;
  ClickSaveCoy(ev) {
    console.log(ev);
  }
}
