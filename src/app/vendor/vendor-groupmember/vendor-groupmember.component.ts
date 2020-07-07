import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';

@Component({
  selector: 'app-vendor-groupmember',
  templateUrl: './vendor-groupmember.component.html',
  providers: [NGXToastrService]
})
export class VendorGroupmemberComponent implements OnInit {
  VendorId: number;
  VendorGrpMbrId: number;
  listSelectedId: Array<number> = new Array<number>();
  VendorGrpId: number;
  MrVendorCategoryCode: string = '';
  
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  
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
  inputObj: any;
  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/vendorGrpMbrTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
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
      crit2Obj.value = "HOLDING";
      this.tempPagingObj.addCritInput.push(crit2Obj);
    } else if (this.MrVendorCategoryCode.includes("_HO")) {
      var crit2Obj = new CriteriaObj();
      crit2Obj.propName = "MR_VENDOR_CLASS";
      crit2Obj.restriction = AdInsConstant.RestrictionEq;
      crit2Obj.value = "HO";
      this.tempPagingObj.addCritInput.push(crit2Obj);
    } else if (this.MrVendorCategoryCode.includes("_BRANCH")) {
      var crit2Obj = new CriteriaObj();
      crit2Obj.propName = "MR_VENDOR_CLASS";
      crit2Obj.restriction = AdInsConstant.RestrictionEq;
      crit2Obj.value = "BRANCH";
      this.tempPagingObj.addCritInput.push(crit2Obj);
    }

    this.GetListVendorGrpMbrByVendorGrpId();
  }

  GetListVendorGrpMbrByVendorGrpId() {
    var getListUrl = AdInsConstant.GetListVendorGrpMbrByVendorGrpId;
    this.http.post(getListUrl, {VendorGrpId: this.VendorGrpId}).subscribe(
      (response) => {
        var arrMemberList = new Array();
        for (let index = 0; index < response["ReturnObject"].length; index++) {
          arrMemberList.push(response["ReturnObject"][index].VendorId)
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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveVendorGroupMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.typeErrorCustom('Please Add At Least One Data');
      return;
    }

    var obj = {
      VendorGrpId: this.VendorGrpId,
      VendorId: this.listSelectedId
    }

    this.http.post(AdInsConstant.AddVendorGrpMbr, obj).subscribe(
      (response) => {
        this.router.navigate(['/Vendor/Group/View/'], { queryParams: { VendorGrpId: this.VendorGrpId, MrVendorCategoryCode: this.MrVendorCategoryCode } });
      },
      (error) => {
        console.log(error);
      });

  }
}
