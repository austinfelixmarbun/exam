import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/Response/Generic/GenericObj.Model';
import { ResListKeyValueObj } from 'app/shared/model/Response/Generic/ResListKeyValueObj.model';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';

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
    this.http.post(URLConstant.GetCustByCustId, {Id : this.IdCust}).subscribe(
      (response) => {
        this.custObj = response;
        this.CustModel = this.custObj.MrCustModelCode;

        var refMasterObjCustModel = new GenericObj();
        refMasterObjCustModel.Code =  CommonConstant.CustTypePersonal;

        this.http.post(URLConstant.GetListKeyValueByMrCustTypeCode, refMasterObjCustModel).subscribe(
          (response : ResListKeyValueObj) => {
            this.tempCustModel = response[CommonConstant.ReturnObj];
            if(!this.CustModel){
              this.CustModel = this.tempCustModel[0]["Key"];
            }
          }
        );
      }
    );
  }

  getValue(ev)
  {
    this.outputTab.emit({ stepMode: ev.stepMode })
  }
}
