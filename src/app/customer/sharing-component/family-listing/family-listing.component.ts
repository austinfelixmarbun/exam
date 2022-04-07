import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { InputGridObj } from 'app/shared/model/input-grid-obj.model';
import { FamilyListingObj } from 'app/shared/model/new-cust/family/family-listing-obj.model';

@Component({
  selector: 'app-family-listing',
  templateUrl: './family-listing.component.html',
})
export class FamilyListingComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() isMarried: boolean = false;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  PageType: string = CommonConstant.CustPageTypePaging;

  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;

  readonly CustPageTypeHeader = CommonConstant.CustPageTypeHeader;
  readonly CustPageTypePaging = CommonConstant.CustPageTypePaging;

  constructor(private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    this.BindGridViewObj();
    await this.GetListPaging();
  }

  tempFamilyListingObj: Array<FamilyListingObj> = new Array();
  listCustNoToExclude: Array<string> = new Array();
  IsSpouseInputed: boolean = false;
  async GetListPaging() {
    this.IsSpouseInputed = false;
    await this.http.post(this.UrlConstantNew.GetMainCustAndListCustPersonalFamilyByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.tempFamilyListingObj = response["CustPersonalFamilyList"];
        for (const item of this.tempFamilyListingObj) {
          if (item["FamilyId"] && item["FamilyId"] > 0) {
            this.listCustNoToExclude.push(item["CustNo"]);
          }
          if (item["MrCustRelationship"] == CommonConstant.MasteCodeRelationshipSpouse && item["MrMaritalStatCode"] == CommonConstant.MaritalStatusMarried) this.IsSpouseInputed = true;
        }
        this.inputGridObj.resultData["Data"] = new Array();
        this.inputGridObj.resultData.Data = this.tempFamilyListingObj;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
  inputGridObj: InputGridObj = new InputGridObj();
  BindGridViewObj() {
    this.inputGridObj = new InputGridObj();
    this.inputGridObj.pagingJson = "./assets/ucgridview/Customer/gridCustFamily.json";
    this.inputGridObj.deleteUrl = this.UrlConstantNew.DeleteCustPersonalFamily;
    this.inputGridObj.resultData = { Data: [] };
  }

  selectedCustId: number = 0;
  selectedCustPersonalFamilyId: number = 0;
  addCustFamily(isAdd: boolean = true) {
    this.PageType = this.CustPageTypeHeader;
    if (isAdd) {
      this.selectedCustId = 0;
      this.selectedCustPersonalFamilyId = 0;
    }
  }

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  event(ev) {
    if(ev.Key = 'Edit'){
      this.selectedCustId = ev.RowObj.FamilyId;
      this.selectedCustPersonalFamilyId = ev.RowObj.CustPersonalFamilyId;
      this.addCustFamily(false);
    }
  }

  ReloadPaging() {
    this.GetListPaging();
    this.PageType = this.CustPageTypePaging;
  }

  next() {
    if (this.isMarried && !this.IsSpouseInputed) {
      this.toastr.warningMessage(ExceptionConstant.MUST_INPUT_SPOUSE_DATA)
      return;
    }
    this.outputTab.emit({ stepMode: 'next' });
  }
}
