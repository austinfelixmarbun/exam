import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-office-group-member-add',
  templateUrl: './office-group-member-add.component.html'
})
export class OfficeGroupMemberAddComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  listSelectedId: Array<number> = new Array<number>();
  RefOfficeId: number;
  CenterGrpId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();

  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.RefOfficeId = params['RefOfficeId'];
      this.CenterGrpId = params['CenterGrpId'];
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewOfficeCenterGrpMbr.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/officeGrpMbrTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/officeGrpMbrTempPaging.json";

    this.GetListCenterGrpMemberByRefOfficeId();
  }

  GetListCenterGrpMemberByRefOfficeId() {
    this.http.post(URLConstant.GetListCenterGrpMemberByRefOfficeId, { CenterGrpId: this.CenterGrpId, RefOfficeId: this.RefOfficeId }).subscribe(
      (response) => {
        var arrMemberList = new Array();
        for (let index = 0; index < response["ListCenterGrpOfficeMbr"].length; index++) {
          arrMemberList.push(response["ListCenterGrpOfficeMbr"][index].RefOfficeId)
        }

        if (arrMemberList.length != 0) {
          const addCritListRefOffice = new CriteriaObj();
          addCritListRefOffice.DataType = 'numeric';
          addCritListRefOffice.propName = 'REF_OFFICE_ID';
          addCritListRefOffice.restriction = AdInsConstant.RestrictionNotIn;
          addCritListRefOffice.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListRefOffice);
        }
        this.tempPagingObj.isReady = true;
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveOfficeGroupMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    var obj = {
      CenterGrpId: this.CenterGrpId,
      RefOfficeId: this.listSelectedId
    }

    this.http.post(URLConstant.AddCenterGrpOfficeMember, obj).subscribe(
      (response) => {
        this.router.navigate(['/Office/Group/Member'], { queryParams: { RefOfficeId: this.RefOfficeId, CenterGrpId: this.CenterGrpId } });
      });
  }
}