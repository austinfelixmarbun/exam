import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model'; 
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericByIdObj } from 'app/shared/model/Generic/GenericByIdObj.model';
import { ResGetListCustAddrObj, ResListCustAddrObj } from 'app/shared/model/Response/ResGetListCustAddrObj.model';

@Component({
  selector: 'app-customer-company-address-check',
  templateUrl: './customer-company-address-check.component.html',
  styleUrls: []
})
export class CustomerCompanyAddressCheckComponent implements OnInit {
 
  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  IdCust: number;     
  custObj: any;
  objCust : CustObj;
  custAddrObj: GenericByIdObj;
  listCustAddr: Array<ResListCustAddrObj>;
  From : string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
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
    this.http.post(URLConstant.GetCustByCustId, {Id : this.IdCust}).subscribe(
      (response) => {
        this.custObj = response;
      });
    this.custAddrObj = new GenericByIdObj();
    this.custAddrObj.Id = this.IdCust;
    this.http.post(URLConstant.GetListCustAddr, this.custAddrObj).subscribe(
      (response : ResGetListCustAddrObj) => {
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
