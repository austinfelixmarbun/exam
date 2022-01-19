import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { GenericKeyValueListObj } from 'app/shared/model/generic/generic-key-value-list-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { JobDataEmployeeComponent } from './job-data-employee/job-data-employee.component';
import { JobDataProfessionalComponent } from './job-data-professional/job-data-professional.component';
import { JobDataSmeComponent } from './job-data-small-medium-enterprise/job-data-small-medium-enterprise.component';
import { JobDataNonProfessionalComponent } from './job-data-non-professional/job-data-non-professional.component';

@Component({
  selector: 'app-customer-personal-job-data',
  templateUrl: './customer-personal-job-data.component.html',
  styleUrls: []
})
export class CustomerPersonalJobDataComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  tempCustModel: Array<KeyValueObj> = new Array<KeyValueObj>();

  custObj: any;
  objCust: CustObj;
  IdCust: number;
  CustModel: string;
  IsReset: boolean = false;
  custModelReqObj: ReqRefMasterByTypeCodeAndMappingCodeObj;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.tempCustModel = new Array<KeyValueObj>();

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        this.custObj = response;
        this.CustModel = this.custObj.MrCustModelCode;

        this.custModelReqObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
        this.custModelReqObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustModel;
        this.custModelReqObj.MappingCode = CommonConstant.CustTypePersonal;
        this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, this.custModelReqObj).subscribe(
          (response: GenericKeyValueListObj) => {
            this.tempCustModel = response[CommonConstant.ReturnObj];
            if (!this.CustModel) {
              this.CustModel = this.tempCustModel[0]["Key"];
              this.IsReset = true;
            }
          }
        );
      }
    );
  }

  getValue(ev) {
    this.outputTab.emit({ stepMode: ev.stepMode })
  }
  ResetRefProf() {
    this.IsReset = true;
  }

  @ViewChild('JobEmp', {static: false}) private JobEmp: JobDataEmployeeComponent;
  @ViewChild('JobProf', {static: false}) private JobProf: JobDataProfessionalComponent;
  @ViewChild('JobSme', {static: false}) private JobSme: JobDataSmeComponent;
  @ViewChild('JobNonProf', {static: false}) private JobNonProf: JobDataNonProfessionalComponent;
  readonly modelEmp: string = CommonConstant.CUST_MODEL_EMP;
  readonly modelProf: string = CommonConstant.CUST_MODEL_PROF;
  readonly modelSme: string = CommonConstant.CUST_MODEL_SME;
  readonly modelNonProf: string = CommonConstant.CUST_MODEL_NONPROF;
  async SaveData(): Promise<boolean> {
    let flag: boolean = true;
    switch (this.CustModel) {
      case this.modelEmp:
        flag = await this.JobEmp.SaveForm(false);
        break;
      case this.modelProf:
        flag = await this.JobProf.SaveForm(false);
        break;
      case this.modelSme:
        flag = await this.JobSme.SaveForm(false);
        break;
      case this.modelNonProf:
        flag = await this.JobNonProf.SaveForm(false);
        break;
    }
    return flag;
  }
}
