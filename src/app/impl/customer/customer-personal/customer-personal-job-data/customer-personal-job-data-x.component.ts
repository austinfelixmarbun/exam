import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { GenericKeyValueListObj } from 'app/shared/model/Generic/GenericKeyValueListObj.model';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';

@Component({
  selector: 'app-customer-personal-job-data-x',
  templateUrl: './customer-personal-job-data-x.component.html',
  styleUrls: ['./customer-personal-job-data-x.component.css']
})
export class CustomerPersonalJobDataXComponent implements OnInit {

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
          (response : GenericKeyValueListObj) => {
            this.tempCustModel = response[CommonConstant.ReturnObj];
            if(!this.CustModel){
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

  ResetRefProf(){
    this.IsReset = true;
  }
}
