import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
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

  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  selectedCustId: number = 0;
  selectedCustCompanyMgmntShrholderId: number = 0;
  ngOnInit() {
    this.BindGridViewObj();
    this.GetListPaging();
  }

  tempShareholderListingObj: Array<ShareholderListingObj> = new Array();
  tempTotalSharePrct: number = 0;
  tempIsOwner: boolean = false;
  GetListPaging() {
    this.http.post(URLConstant.GetListManagementShareholderForListPagingByCustId, { Id: this.CustId }).subscribe(
      (response: GenericListObj) => {
        this.tempShareholderListingObj = response.ReturnObject;
        let tempTotalSharePrct: number = 0;
        let tempIsOwner: boolean = false;
        for (let index = 0; index < this.tempShareholderListingObj.length; index++) {
          const element = this.tempShareholderListingObj[index];
          if (element.IsActive) {
            tempTotalSharePrct += element.SharePrcnt;
          }
          if (element.IsOwner) {
            tempIsOwner = true;
          }
        }
        this.tempTotalSharePrct = tempTotalSharePrct;
        this.tempIsOwner = tempIsOwner;
        this.inputGridObj.resultData["Data"] = new Array();
        this.inputGridObj.resultData.Data = this.tempShareholderListingObj;
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
    this.selectedCustCompanyMgmntShrholderId = ev.RowObj.CustCompanyMgmntShrholderId;
    this.selectedCustId = ev.RowObj.ShareholderId;
    if (ev.RowObj.ShareholderType == this.CustTypePublic) {
    } else {
    }
    this.CustType = ev.RowObj.ShareholderType;
    this.tempTotalSharePrct -= ev.RowObj.SharePrcnt;
    this.addCustShareHolder(false);
  }

  ReloadPaging() {
    this.GetListPaging();
    this.PageType = this.CustPageTypePaging;
  }

  next() {
    if (this.tempShareholderListingObj.length == 0) {
      this.toastr.warningMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }
    if (!this.tempIsOwner) {
      this.toastr.warningMessage(ExceptionConstant.Add_Min_1_Owner);
      return;
    }
    if (this.tempTotalSharePrct != 100) {
      this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_MUST_100);
      return;
    }

    this.outputTab.emit({ stepMode: 'next' });
  }
}
