import { Component, OnInit } from '@angular/core';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  VendorSchmId: number = 0;
  MrVendorCategoryCode: string;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();

  color: string = "black";

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VendorSchmId = params['VendorSchmId'];
      this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucpaging/ucTempPaging/viewDummy.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
    this.viewGenericObj.ddlEnvironments = [
      {
        name: "LinkName",
        environment: environment.FoundationR3Web
      },
    ];

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
        for (let index = 0; index < response["ListVendorSchmMbr"].length; index++) {
          arrMemberList.push(response["ListVendorSchmMbr"][index].VendorId)
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
    this.listSelectedId = ev;
  }

  SaveVendorSchemeMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.error('Please add at least one data');
      return;
    }
    return true;
  }
}
