import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router'; 
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { WizardComponent } from 'angular-archwizard';
 
@Component({
  selector: 'app-customer-company-address',
  templateUrl: './customer-company-address.component.html',
  styleUrls: ['./customer-company-address.component.scss'],
  providers: [NGXToastrService]
})
export class CustomerCompanyAddressComponent implements OnInit {
  CustName  : any;
  Gender : any;
  GenderDesc:any;
  MrIdTypeCode : any;
  MrIdTypeCodeDesc : any;
  CustModel : any;
  CustModelDesc
  BirthPlace : any;
  BirthDt : any;
  IdNo : any;
  TaxIdNo : any;
  IdExpiredDt : any;
  MotherMaidenName : any;
  resultData: any;
  addUrl : any; 
  IdCust : any;
  IdCustPersonal : any;
  custObj : any;
  custAddrObj : any;
  listCustAddr: any;
  getCustById: any;
  getListCustAddr: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder,private wizard: WizardComponent) { 
    this.getCustById = AdInsConstant.GetCustByCustId;
    this.getListCustAddr = AdInsConstant.GetListCustAddr;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
         this.IdCust = params["IdCust"];
       }
       if (params["IdCustPersonal"] != null) {
        this.IdCustPersonal = params["IdCustPersonal"];
      }
     });
  }

  ngOnInit() {
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(this.getCustById, this.custObj).subscribe(
      (response) => {
          this.custObj = response;
      });
      this.custAddrObj = new CustAddrObj();
      this.custAddrObj.CustId = this.IdCust;
      this.custAddrObj.MrCustAddrTypeCode = "-";
      console.log("bbb");
      console.log(this.custAddrObj);
      this.http.post(this.getListCustAddr, this.custAddrObj).subscribe(
        (response) => {
            this.listCustAddr = response["ReturnObject"];

            console.log("aaa")
            console.log(this.listCustAddr)
        });
  }
  next(){
    this.wizard.goToNextStep();
  }
}
