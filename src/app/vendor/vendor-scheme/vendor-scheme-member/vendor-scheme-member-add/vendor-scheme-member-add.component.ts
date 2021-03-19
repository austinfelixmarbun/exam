import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { ToastrService } from 'ngx-toastr';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-scheme-member-add',
  templateUrl: './vendor-scheme-member-add.component.html'
})
export class VendorSchemeMemberAddComponent implements OnInit {

  VendorSchmId: number = 0;
  MrVendorCategoryCode: string;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();

  readonly CancelLink: string = NavigationConstant.VENDOR_SCHM_MBR;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VendorSchmId = params['VendorSchmId'];
      this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/dummyTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/dummyTempPaging.json";

    const addCritTypeCode = new CriteriaObj();
    addCritTypeCode.DataType = 'text';
    addCritTypeCode.propName = 'MR_VENDOR_CATEGORY_CODE';
    addCritTypeCode.restriction = AdInsConstant.RestrictionEq;
    addCritTypeCode.value = this.MrVendorCategoryCode;
    this.tempPagingObj.addCritInput.push(addCritTypeCode);

    this.GetListVendorSchmMemberByVendorSchmId();
  }

  GetListVendorSchmMemberByVendorSchmId() {
    this.http.post(URLConstant.GetListVendorSchmMemberByVendorSchmId, { VendorSchmId: this.VendorSchmId }).subscribe(
      (response) => {
        var arrMemberList = new Array();
        if(response["ListVendorSchmMbr"]!=null){
        for (let index = 0; index < response["ListVendorSchmMbr"].length; index++) {
          arrMemberList.push(response["ListVendorSchmMbr"][index].VendorId)
        }
        }

        if (arrMemberList.length != 0) {
          const addCritListVendorId = new CriteriaObj();
          addCritListVendorId.DataType = "numeric";
          addCritListVendorId.propName = "VENDOR_ID";
          addCritListVendorId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListVendorId.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListVendorId);
        }
        this.tempPagingObj.isReady = true;
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveVendorSchemeMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.error(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }
    
    var obj = {
      VendorSchmId: this.VendorSchmId,
      VendorId: this.listSelectedId
    }

    this.http.post(URLConstant.AddVendorSchmMember, obj).subscribe(
      (response) => {
        this.toastr.success(response["message"], 'Success!');
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_SCHM_MBR],{ "VendorSchmId" : this.VendorSchmId, "MrVendorCategoryCode": this.MrVendorCategoryCode });
      });
  }
}
