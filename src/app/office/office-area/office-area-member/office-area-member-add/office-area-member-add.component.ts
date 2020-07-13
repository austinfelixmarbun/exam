import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';

@Component({
  selector: 'app-office-area-member-add',
  templateUrl: './office-area-member-add.component.html'
})
export class OfficeAreaMemberAddComponent implements OnInit {
  listSelectedId: Array<number> = new Array<number>();
  RefOfficeAreaId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();

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
    this.tempPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/officeAreaMbrTempPaging.json";

    this.GetListOfficeAreaMbrByRefOfficeAreaId();
  }

  GetListOfficeAreaMbrByRefOfficeAreaId(){
    this.http.post(AdInsConstant.GetListRefOfficeByRefOfficeAreaId, { RefOfficeAreaId: this.RefOfficeAreaId }).subscribe(
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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveOfficeAreaMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage('Please Add At Least One Data');
      return;
    }
    
    var RequestItem = {
      RefOfficeAreaId : this.RefOfficeAreaId,
      RefOfficeId: this.listSelectedId
    }
    this.http.post(AdInsConstant.AddRefOfficeAreaMember, RequestItem).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        this.router.navigate(["/Office/OfficeArea/Member"], { queryParams: { "RefOfficeAreaId": this.RefOfficeAreaId } });
      },
      (error) => {
          console.log(error);
      });
    
  }
}