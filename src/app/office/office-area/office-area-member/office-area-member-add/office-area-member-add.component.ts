import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-office-area-member-add',
  templateUrl: './office-area-member-add.component.html'
})
export class OfficeAreaMemberAddComponent implements OnInit {
  listSelectedId: Array<number> = new Array<number>();
  RefOfficeAreaId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  tempDataExists = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService,private location: Location,) {
    this.route.queryParams.subscribe(params => {
      if (params['RefOfficeAreaId'] != null) {
        this.RefOfficeAreaId = params['RefOfficeAreaId'];
      }
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/officeAreaMbrTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/officeAreaMbrTempPaging.json";

    this.GetListOfficeAreaMbrByRefOfficeAreaId();
  }

  GetListOfficeAreaMbrByRefOfficeAreaId(){
    this.http.post(URLConstant.GetListRefOfficeByRefOfficeAreaId, { RefOfficeAreaId: this.RefOfficeAreaId }).subscribe(
      (response) => {
        var arrMemberList = new Array();
        for (let index = 0; index < response["RefOfficeObjs"].length; index++) {
          arrMemberList.push(response["RefOfficeObjs"][index].RefOfficeId)
        }

        if (arrMemberList.length != 0) {
          const addCritListVendorGrp = new CriteriaObj();
          addCritListVendorGrp.DataType = 'numeric';
          addCritListVendorGrp.propName = 'REF_OFFICE_ID';
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
    this.tempDataExists = this.listSelectedId && this.listSelectedId.length > 0
  }

  SaveOfficeAreaMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }
    
    var RequestItem = {
      RefOfficeAreaId : this.RefOfficeAreaId,
      RefOfficeId: this.listSelectedId
    }
    this.http.post(URLConstant.AddRefOfficeAreaMember, RequestItem).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.router,["/Office/OfficeArea/Member"],{ "RefOfficeAreaId": this.RefOfficeAreaId });
      });
    
  }
}