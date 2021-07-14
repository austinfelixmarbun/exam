import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';

@Component({
  selector: 'app-customer-company-address',
  templateUrl: './customer-company-address.component.html',
  styleUrls: []
})

export class CustomerCompanyAddressComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  mode: string;
  AddrId: number;
  custAddrObj: CustAddrObj;
  IdCust: number;
  legalAddr: CustAddrObj;
  bizAddr: CustAddrObj;
  constructor(private http: HttpClient, private route: ActivatedRoute, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.mode = "check";
  }
  terimaValue(ev: any) {
    this.mode = ev.mode;
    this.AddrId = ev.AddrId;

    if (ev.stepMode != undefined)
      this.outputTab.emit({ stepMode: ev.stepMode })
  }
 
  next() {
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.IdCust;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: CustAddrObj) => {
        this.legalAddr = response;
        reqObj.Code = CommonConstant.CustAddrTypeBiz;
        this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).subscribe(
          (response: CustAddrObj) => {
            this.bizAddr = response;
            if (this.legalAddr.Addr == null || this.bizAddr.Addr == null) {
              let warningMsg: string = ExceptionConstant.PLEASE_COMPLETE_LEGAL_AND_BIZ_ADDRESS;
              if(this.legalAddr.Addr != null && this.bizAddr.Addr == null){
                warningMsg = ExceptionConstant.PLEASE_COMPLETE_BIZ_ADDRESS;
              }
              if(this.legalAddr == null && this.bizAddr.Addr != null){
                warningMsg = ExceptionConstant.PLEASE_COMPLETE_LEGAL_ADDRESS;
              }
              this.toastr.warningMessage(warningMsg);
            }
            else {
              this.outputTab.emit({ stepMode: "next" });
            }
          }
        )
      }); 
  }
  // back() {
  //   this.outputTab.emit({ stepMode: "previous" });
  // }
}

