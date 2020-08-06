import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';


@Component({
  selector: 'app-customer-personal-address',
  templateUrl: './customer-personal-address.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerPersonalAddressComponent implements OnInit {

  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  mode: string;
  AddrId: number;
  IdCust: number;
  legalAddr: any;
  residenceAddr: any;
  custAddrObj: CustAddrObj;
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
  terimaValue(ev) {
    this.mode = ev.mode;
    this.AddrId = ev.AddrId;


  }
  next() {
    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeLegal;
    this.custAddrObj.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustAddrByMrCustAddrType, this.custAddrObj).subscribe(
      (response) => {
        this.legalAddr = response;
        this.custAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeResidence;
        this.http.post(URLConstant.GetCustAddrByMrCustAddrType, this.custAddrObj).subscribe(
          (response) => {
            this.residenceAddr = response;
            if (this.legalAddr.Addr == null || this.residenceAddr.Addr == null) {
              if (this.legalAddr.Addr != null && this.residenceAddr.Addr == null) {
                this.toastr.warningMessage(ExceptionConstant.PLEASE_COMPLETE_RESIDENCE_ADDRESS);
              } else if (this.legalAddr.Addr == null && this.residenceAddr.Addr != null) {
                this.toastr.warningMessage(ExceptionConstant.PLEASE_COMPLETE_LEGAL_ADDRESS);
              } else {
                this.toastr.warningMessage(ExceptionConstant.PLEASE_COMPLETE_LEGAL_AND_RESIDENCE_ADDRESS);
              }

            }
            if (this.legalAddr.Addr != null && this.residenceAddr.Addr != null) {
              this.outputTab.emit({ stepMode: "next" });
            }
          });
      });
  }
  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }
}
