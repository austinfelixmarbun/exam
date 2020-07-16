import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-vendor-branch-office-member-add',
  templateUrl: './vendor-branch-office-member-add.component.html'
})

export class VendorBranchOfficeMemberAddComponent implements OnInit {

  VendorId: number;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();

  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/vendorBranchMemberTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/vendorBranchMemberTempPaging.json";

    const addCritIsActive = new CriteriaObj();
    addCritIsActive.DataType = 'boolean';
    addCritIsActive.propName = 'RO.IS_ACTIVE';
    addCritIsActive.restriction = AdInsConstant.RestrictionEq;
    addCritIsActive.value = "true";
    this.tempPagingObj.addCritInput.push(addCritIsActive);

    this.GetListVendorOfficeMbrByVendorId();
  }

  GetListVendorOfficeMbrByVendorId() {
    this.http.post(URLConstant.GetListVendorOfficeMbrByVendorId, { VendorId: this.VendorId }).subscribe(
      (response) => {
        var arrMemberList = new Array();
        for (let index = 0; index < response[CommonConstant.ReturnObj].length; index++) {
          arrMemberList.push(response[CommonConstant.ReturnObj][index].RefOfficeId)
        }

        if (arrMemberList.length != 0) {
          const addCritListRefOfficeId = new CriteriaObj();
          addCritListRefOfficeId.DataType = "numeric";
          addCritListRefOfficeId.propName = "RO.REF_OFFICE_ID";
          addCritListRefOfficeId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListRefOfficeId.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListRefOfficeId);
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

  SaveVendorOfficeMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    var obj = {
      VendorId: this.VendorId,
      RefOfficeId: this.listSelectedId
    }

    this.http.post(URLConstant.AddListVendorOfficeMember, obj).subscribe(
      (response) => {
        this.router.navigate(['/Vendor/Branch/Member/Paging'], { queryParams: { VendorId: this.VendorId } });
      },
      (error) => {
        console.log(error);
      });
  }
}