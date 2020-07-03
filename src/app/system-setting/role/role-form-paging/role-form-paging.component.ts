import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-role-form-paging',
  templateUrl: './role-form-paging.component.html'
})
export class RoleFormPagingComponent implements OnInit {
  RefRoleId: string;
  viewObj: any;
  inputPagingObj: any;

  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.RefRoleId = params["RefRoleId"];
  })
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchRoleRefForm.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRoleRefForm.json";
    this.inputPagingObj.addCritInput = new Array();
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAuthForm;

    var critInput = new CriteriaObj();
    critInput.DataType = "numeric";
    critInput.propName = "AF.REF_ROLE_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefRoleId;
    this.inputPagingObj.addCritInput.push(critInput);

    this.viewObj = "./assets/ucviewgeneric/viewRoleRefForm.json";
  }

}
