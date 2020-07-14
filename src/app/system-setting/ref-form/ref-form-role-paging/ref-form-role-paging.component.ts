import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-ref-form-role-paging',
  templateUrl: './ref-form-role-paging.component.html',
  styleUrls: ['./ref-form-role-paging.component.scss']
})
export class RefFormRolePagingComponent implements OnInit {
  RefFormId: string;
  inputPagingObj: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.RefFormId = params["RefFormId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefFormRole.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchRefFormRole.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefFormRole.json";
    this.inputPagingObj.addCritInput = new Array();
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAuthForm;

    var critInput = new CriteriaObj();
    critInput.DataType = "numeric";
    critInput.propName = "AF.REF_FORM_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefFormId;
    this.inputPagingObj.addCritInput.push(critInput);
  }
}
