import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-personal-address-check',
  templateUrl: './customer-personal-address-check.component.html',
  styleUrls: []
})
export class CustomerPersonalAddressCheckComponent implements OnInit {
  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  custObj: any;
  resultData: any;
  listCustAddr: any;

  objCust: CustObj;
  custAddrObj: CustAddrObj;

  BirthDt: Date;
  IdExpiredDt: Date;

  IdCust: number;
  IdCustPersonal: number;

  IdNo: string;
  addUrl: string;  
  Gender: string;
  CustName: string;
  GenderDesc: string;
  CustModel: string;
  BirthPlace: string;
  MrIdTypeCode: string;
  CustModelDesc: string;
  MrIdTypeCodeDesc: string;
  MotherMaidenName: string;

  getCustById: string;
  deleteCustAddr: string;
  getListCustAddr: string;
  From : string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getCustById = URLConstant.GetCustByCustId;
    this.getListCustAddr = URLConstant.GetListCustAddr;
    this.deleteCustAddr = URLConstant.DeleteCustAddr;

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
         this.IdCust = params["IdCust"];
       }
       if (params["From"] != null) {
        this.From = params["From"];
      }
     });
  }

  ngOnInit() {
    
    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(this.getCustById, this.objCust).subscribe(
      (response) => {
          this.custObj = response;
      });

      this.custAddrObj = new CustAddrObj();
      this.custAddrObj.CustId = this.IdCust;
      this.custAddrObj.MrCustAddrTypeCode = "-";
      this.http.post(this.getListCustAddr, this.custAddrObj).subscribe(
        (response) => {
            this.listCustAddr = response[CommonConstant.ReturnObj];
        });
  }

  editItem(custAddrObj: any) {
    this.outputValue.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId});
  }

  // deleteItem(custAddrObj: any) {
  //   var custAddr = new CustAddrObj();
  //   custAddr.CustAddrId = custAddrObj.CustAddrId;
  //   this.http.post(this.deleteCustAddr, custAddr).subscribe(
  //     (response: any) => {
  //       this.toastr.successMessage(response["message"]);
  //     }
  //   );
  //   //this.outputTab.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId });
  // }

  addAddr() {
    this.outputValue.emit({ mode: 'add' });
  }
  
}
