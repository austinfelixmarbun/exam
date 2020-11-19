import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms'; 
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model'; 
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-company-address-check',
  templateUrl: './customer-company-address-check.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerCompanyAddressCheckComponent implements OnInit {
 
  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  IdCust: number;     
  custObj: any;
  objCust : CustObj;
  custAddrObj: CustAddrObj;
  listCustAddr: any;
  getCustByIdUrl: string;
  getListCustAddrUrl: string;
  From : string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.getCustByIdUrl = URLConstant.GetCustByCustId;
    this.getListCustAddrUrl = URLConstant.GetListCustAddr;
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
    this.http.post(this.getCustByIdUrl, this.objCust).subscribe(
      (response) => {
        this.custObj = response;
      });
    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.CustId = this.IdCust;
    this.custAddrObj.MrCustAddrTypeCode = "-";
    this.http.post(this.getListCustAddrUrl, this.custAddrObj).subscribe(
      (response) => {
        this.listCustAddr = response["ReturnObject"];
        let idxCompany = this.listCustAddr.findIndex(x => x.MrCustAddrTypeCode == CommonConstant.CustAddrTypeCompany);
        if(idxCompany != -1) this.listCustAddr.splice(idxCompany, 1)
      });
  }

  editItem(custAddrObj: any) {
    this.outputValue.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId });
  }
  addAddr() {
    this.outputValue.emit({ mode: 'add' });    
  }
   
}
