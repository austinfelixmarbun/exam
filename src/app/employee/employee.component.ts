import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  providers: [NGXToastrService]
})
export class EmployeeComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.EMP_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchEmployee.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefEmployee;
    this.inputPagingObj.pagingJson = "./assets/search/searchEmployee.json";
  }
}
