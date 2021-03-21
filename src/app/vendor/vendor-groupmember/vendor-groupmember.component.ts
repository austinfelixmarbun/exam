import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-groupmember',
  templateUrl: './vendor-groupmember.component.html'
})
export class VendorGroupmemberComponent implements OnInit {
  VendorId: number;
  listSelectedId: Array<number> = new Array<number>();
  VendorGrpId: number;
  MrVendorCategoryCode: string = '';
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();

  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params['VendorGrpId'] != null) {
        this.VendorGrpId = params['VendorGrpId'];
      }
      if (params['MrVendorCategoryCode'] != null) {
        this.MrVendorCategoryCode = params['MrVendorCategoryCode'];
      }
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/vendorGrpMbrTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/vendorGrpMbrTempPaging.json";

    var crit1Obj = new CriteriaObj();
    crit1Obj.propName = "MR_VENDOR_CATEGORY_CODE";
    crit1Obj.restriction = AdInsConstant.RestrictionEq;
    crit1Obj.value = this.MrVendorCategoryCode;
    this.tempPagingObj.addCritInput.push(crit1Obj)

    if (this.MrVendorCategoryCode.includes("_HOLDING")) {
      var crit2Obj = new CriteriaObj();
      crit2Obj.propName = "MR_VENDOR_CLASS";
      crit2Obj.restriction = AdInsConstant.RestrictionEq;
      crit2Obj.value = CommonConstant.Holding;
      this.tempPagingObj.addCritInput.push(crit2Obj);
    } else if (this.MrVendorCategoryCode.includes("_HO")) {
      var crit2Obj = new CriteriaObj();
      crit2Obj.propName = "MR_VENDOR_CLASS";
      crit2Obj.restriction = AdInsConstant.RestrictionEq;
      crit2Obj.value = CommonConstant.HeadOffice;
      this.tempPagingObj.addCritInput.push(crit2Obj);
    } else if (this.MrVendorCategoryCode.includes("_BRANCH")) {
      var crit2Obj = new CriteriaObj();
      crit2Obj.propName = "MR_VENDOR_CLASS";
      crit2Obj.restriction = AdInsConstant.RestrictionEq;
      crit2Obj.value = CommonConstant.Branch;
      this.tempPagingObj.addCritInput.push(crit2Obj);
    }

    this.GetListVendorGrpMbrByVendorGrpId();
  }

  GetListVendorGrpMbrByVendorGrpId() {
    this.http.post(URLConstant.GetListVendorGrpMbrByVendorGrpId, { VendorGrpId: this.VendorGrpId }).subscribe(
      (response) => {
        var arrMemberList = new Array();
        if(response[CommonConstant.ReturnObj] != null){
          for (let index = 0; index < response[CommonConstant.ReturnObj].length; index++) {
          arrMemberList.push(response[CommonConstant.ReturnObj][index].VendorId)
          }
        }
        if (arrMemberList.length != 0) {
          const addCritListVendorGrp = new CriteriaObj();
          addCritListVendorGrp.DataType = 'numeric';
          addCritListVendorGrp.propName = 'VENDOR_ID';
          addCritListVendorGrp.restriction = AdInsConstant.RestrictionNotIn;
          addCritListVendorGrp.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListVendorGrp);
        }
        this.tempPagingObj.isReady = true;
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveVendorGroupMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    var obj = {
      VendorGrpId: this.VendorGrpId,
      VendorId: this.listSelectedId
    }

    this.http.post(URLConstant.AddVendorGrpMbr, obj).subscribe(
      (response) => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_GRP_VIEW],{ "VendorGrpId": this.VendorGrpId, "MrVendorCategoryCode": this.MrVendorCategoryCode });
      });
  }
}
