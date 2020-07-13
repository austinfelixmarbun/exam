import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';

@Component({
  selector: 'app-search-office-offering',
  templateUrl: './search-office.component.html'
})
export class SearchOfficeComponentOffering implements OnInit {
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  @Output() componentIsOn: EventEmitter<any> = new EventEmitter();
  @Input() ListOfficeMemberObjInput: any;

  constructor(
    private http: HttpClient,
    private toastr:NGXToastrService
  ) { }
  
  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/productHOfficeMbrTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/productHOfficeMbrTempPaging.json";
    this.tempPagingObj.ddlEnvironments = [
      {
        name: "roa.AREA_CODE",
        environment: environment.FoundationR3Url
      }
    ];

    if(this.ListOfficeMemberObjInput["result"].length!=0){
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "ro.REF_OFFICE_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      addCrit.listValue = this.ListOfficeMemberObjInput["result"];
      this.tempPagingObj.addCritInput.push(addCrit);
    }
    this.tempPagingObj.isReady = true;
  }

  GoBack(){
    var obj = {
      isOn: true,
      result: []
    }
    this.componentIsOn.emit(obj);
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveForm(){
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage('Please Add At Least One Data');
      return;
    }

    var obj = {
      ProdOfferingBranchMbrs: [],
      RowVersion: ""
    };

    for(var i=0;i<this.listSelectedId.length;i++){
      var tempObj={
        ProdOfferingHId: this.ListOfficeMemberObjInput["param"],
        RefOfficeId: this.listSelectedId[i],
        IsAllowedCrt: true,
        RowVersion: ""
      }
      obj.ProdOfferingBranchMbrs.push(tempObj);
    }

    this.http.post(AdInsConstant.AddProdOfferingOfficeMbrBatch, obj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        var obj = {
          isOn: true,
          result: []
        }
        this.componentIsOn.emit(obj );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
