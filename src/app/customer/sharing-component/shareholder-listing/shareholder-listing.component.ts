import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericListObj } from 'app/shared/model/Generic/GenericListObj.Model';
import { InputGridObj } from 'app/shared/model/InputGridObj.Model';
import { ShareholderListingObj } from 'app/shared/model/NewCust/Shareholder/ShareholderListingObj.Model';

@Component({
  selector: 'app-shareholder-listing',
  templateUrl: './shareholder-listing.component.html',
})
export class ShareholderListingComponent implements OnInit {

  @Input() CustId: number = 0;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  PageType: string = CommonConstant.CustPageTypePaging;

  readonly CustPageTypeHeader = CommonConstant.CustPageTypeHeader;
  readonly CustPageTypePaging = CommonConstant.CustPageTypePaging;

  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  constructor(private http: HttpClient) { }

  selectedCustId: number = 0;
  selectedCustCompanyMgmntShrholderId: number = 0;
  ngOnInit() {
    this.BindGridViewObj();
    this.GetListPaging();
  }

  GetListPaging() {
    this.http.post(URLConstant.GetListManagementShareholderForListPagingByCustId, { Id: this.CustId }).subscribe(
      (response: GenericListObj) => {
        console.log(response);
        let tempShareholderListingObj: Array<ShareholderListingObj> = response.ReturnObject;
        this.inputGridObj.resultData["Data"] = new Array();
        this.inputGridObj.resultData.Data = tempShareholderListingObj;
        console.log(tempShareholderListingObj);
      }
    )
  }

  inputGridObj: InputGridObj = new InputGridObj();
  BindGridViewObj() {
    this.inputGridObj = new InputGridObj();
    this.inputGridObj.pagingJson = "./assets/ucgridview/Customer/gridCustShareholder.json";

    this.inputGridObj.resultData = { Data: [] };
  }

  addCustShareHolder(isAdd: boolean = true) {
    this.PageType = this.CustPageTypeHeader;
    if (isAdd) {
      this.CustType = this.CustTypePersonal;
      this.selectedCustId = 0;
      this.selectedCustCompanyMgmntShrholderId = 0;
    }
  }

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;
  readonly CustTypePublic: string = CommonConstant.CustomerPublic;
  CustType: string = "";
  event(ev: { Key: string, RowObj: ShareholderListingObj }) {
    console.log(ev);
    this.selectedCustCompanyMgmntShrholderId = ev.RowObj.CustCompanyMgmntShrholderId;
    this.selectedCustId = ev.RowObj.ShareholderId;
    if (ev.RowObj.ShareholderType == this.CustTypePublic) {
    } else {
    }
    this.CustType = ev.RowObj.ShareholderType;
    this.addCustShareHolder(false);
  }

  ReloadPaging() {
    this.GetListPaging();
    this.PageType = this.CustPageTypePaging;
  }
}
