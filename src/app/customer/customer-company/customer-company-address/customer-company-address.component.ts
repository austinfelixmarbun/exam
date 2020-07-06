import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-company-address',
  templateUrl: './customer-company-address.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})

export class CustomerCompanyAddressComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  mode: string;
  AddrId: number;
  custAddrObj: CustAddrObj;
  IdCust: number;
  legalAddr: any;
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
    console.log(ev);
    this.mode = ev.mode;
    this.AddrId = ev.AddrId;

    if (ev.stepMode != undefined)
      this.outputTab.emit({ stepMode: ev.stepMode })
  }
 
  next() {
    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.MrCustAddrTypeCode = "LEGAL";
    this.custAddrObj.CustId = this.IdCust;
    this.http.post(AdInsConstant.GetCustAddrByMrCustAddrType, this.custAddrObj).subscribe(
      (response) => {
        this.legalAddr = response; 
        if (this.legalAddr.Addr == null) {
          this.toastr.warningMessage("Please complete Legal Address First");
        }
        else {
          this.outputTab.emit({ stepMode: "next" });
        }
      }); 
  }
  // back() {
  //   this.outputTab.emit({ stepMode: "previous" });
  // }
}

