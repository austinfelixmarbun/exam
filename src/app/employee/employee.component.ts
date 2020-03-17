import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcpagingComponent } from '@adins/ucpaging';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class EmployeeComponent implements OnInit {

  @ViewChild(UcpagingComponent) ucpaging;
  inputPagingObj: any;

  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchEmployee.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefEmployee;
    this.inputPagingObj.pagingJson = "./assets/search/searchEmployee.json";
  }
}
