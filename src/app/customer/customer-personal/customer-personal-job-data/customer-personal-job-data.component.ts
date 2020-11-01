import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-personal-job-data',
  templateUrl: './customer-personal-job-data.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerPersonalJobDataComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  tempCustModel: Array<Object>;

  custObj: any;
  objCust: CustObj;
  IdCust: number;

  CustModel: string;
  getCustById: string;
  getListActiveRefMaster: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.getCustById = URLConstant.GetCustByCustId;
    this.getListActiveRefMaster = URLConstant.GetListActiveRefMaster;
    this.tempCustModel = new Array<Object>();

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(this.getCustById, this.objCust).subscribe(
      (response) => {
        this.custObj = response;
        this.CustModel = this.custObj.MrCustModelCode;

        var refMasterObjCustModel = {
          MrCustTypeCode: CommonConstant.CustTypePersonal
        }
        this.http.post(URLConstant.GetListKeyValueByMrCustTypeCode, refMasterObjCustModel).subscribe(
          (response) => {
            this.tempCustModel = response["ReturnObject"];
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
