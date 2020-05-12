import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms'; 
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model'; 
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-customer-company-address-check',
  templateUrl: './customer-company-address-check.component.html',
  styleUrls: ['./customer-company-address-check.component.scss'],
  providers: [NGXToastrService]
})
export class CustomerCompanyAddressCheckComponent implements OnInit {
 
  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  IdCust: number;
  CustName: string;
  Gender: string;
  GenderDesc: string;
  MrIdTypeCode: string;
  MrIdTypeCodeDesc: string;
  CustModel: string;
  CustModelDesc
  BirthPlace: string;
  BirthDt: Date;
  IdNo: string;
  TaxIdNo: string;
  IdExpiredDt: Date;
  MotherMaidenName: string;
  resultData: any;
  addUrl: string;
  IdCustPersonal: number;
  custObj: any;
  custAddrObj: CustAddrObj;
  listCustAddr: any;
  getCustById: string;
  getListCustAddr: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
    this.getCustById = AdInsConstant.GetCustByCustId;
    this.getListCustAddr = AdInsConstant.GetListCustAddr;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
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
    this.http.post(this.getListCustAddr, this.custAddrObj).subscribe(
      (response) => {
        this.listCustAddr = response["ReturnObject"];
      });
  }

  editItem(custAddrObj: any) {
    this.outputValue.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId });
  }
  addAddr() {
    this.outputValue.emit({ mode: 'add' });    
  }
  next() {
    this.wizard.goToNextStep();
  }
  back(){
    this.wizard.goToPreviousStep();
  }
}
