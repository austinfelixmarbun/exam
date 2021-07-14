import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { ReqCoyObj } from 'app/shared/model/NewCust/ReqCoyObj.Model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-new-cust-header',
  templateUrl: './new-cust-header.component.html',
})
export class NewCustHeaderComponent implements OnInit {
  //#region Readonly
  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  readonly CustPageTypeHeader = CommonConstant.CustPageTypeHeader;
  readonly CustPageTypeDupCheck = CommonConstant.CustPageTypeDupCheck;
  readonly CustPageTypePaging = CommonConstant.CustPageTypePaging;
  readonly MasterCustType = CommonConstant.RefMasterTypeCodeCustType;
  //#endregion

  CustType: string = CommonConstant.CustomerPersonal;
  PageType: string = CommonConstant.CustPageTypeHeader;
  CustDataMode: string = CommonConstant.CustMainDataModeCust;
  subjectTitle: string = "Customer";
  From: string = "";
  CustId: number = 0;

  constructor(
    private http: HttpClient, private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
      if (params["CustType"] != null) {
        this.CustType = params["CustType"];
      }
      if (params["From"] != null) {
        this.CustType = params["From"];
      }
    });
  }

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

  Cancel() {
    switch (this.From) {
      case "EditMainData":
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
        break;
      case "CustFamily":
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_FAMILY_PAGING], {});
        break;
      case "CustShareholder":
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_SHRHLDR_PAGING], {});
        break;
      case "CustGuarantor":
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_GUARANTOR_PAGING], {});
        break;
      default:
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
        break;
    }
  }

  CancelDupCheck() {
    this.PageType = this.CustPageTypeHeader;
  }

  DupCheckPersonalObj: ReqPersonalObj = new ReqPersonalObj();
  ClickSavePersonal(ev: ReqPersonalObj) {
    console.log(ev);
    if (this.CustId != 0) {
      this.http.post(URLConstant.EditCustPersonalMainData, ev).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
        }
      );
      return;
    }
    this.DupCheckPersonalObj = ev;
    this.PageType = this.CustPageTypeDupCheck;
  }

  DupCheckCoyObj: ReqCoyObj = new ReqCoyObj();
  ClickSaveCoy(ev: ReqCoyObj) {
    console.log(ev);
    if (this.CustId != 0) {
      this.http.post(URLConstant.EditCustCompanyMainData, ev).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
        }
      );
      return;
    }
    this.DupCheckCoyObj = ev;
    this.PageType = this.CustPageTypeDupCheck;
  }

  SaveAfterDupcek(ev: string) {

  }
}
