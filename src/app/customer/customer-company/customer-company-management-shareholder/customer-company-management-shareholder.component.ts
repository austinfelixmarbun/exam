import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { ActivatedRoute } from '@angular/router';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-company-management-shareholder',
  templateUrl: './customer-company-management-shareholder.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderComponent implements OnInit {
  @Input() custCompanyId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  mode: string;
  CustCompanyMgmntShrholderId: number;
  TotalShare: number;
  IdCust: number;
  tempCustCompanyObj: any;
  tempListCompanyManagementShareholder: any;

  custCompanyObj: CustCompanyObj;
  custCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;

  constructor(private route: ActivatedRoute, private toastr: NGXToastrService, private http: HttpClient,) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.mode = "check";
    console.log("checkIdCust");
    console.log(this.custCompanyId);
  }

  terimaValue(ev) {
    console.log(ev);
    this.mode = ev.mode;
    this.CustCompanyMgmntShrholderId = ev.CustCompanyMgmntShrholderId;
    this.TotalShare = ev.TotalShare;

    if (ev.stepMode != undefined) {
      this.outputTab.emit({ stepMode: ev.stepMode })
    }
  }
  next() {
    this.custCompanyObj = new CustCompanyObj;
    this.custCompanyObj.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustCompanyByCustId, this.custCompanyObj).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.http.post(URLConstant.GetListCustCompanyMgmntShrholderByCustCompanyId, this.tempCustCompanyObj).subscribe(
          (response) => {
            this.tempListCompanyManagementShareholder = response[CommonConstant.ReturnObj];
            if(this.tempListCompanyManagementShareholder.length != 0)
            {
              this.TotalShare = this.tempListCompanyManagementShareholder[0].TotalShare;
            }
            else
            {
              this.TotalShare = 0;
            }

            if(this.TotalShare < 100){
              this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_MUST_100);
              return;
            }
            this.outputTab.emit({ stepMode: 'next'});
          });
      }
    );
  }

  back() {
    this.outputTab.emit({ stepMode: 'previous'});
  }
}