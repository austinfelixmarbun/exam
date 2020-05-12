import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';

@Component({
  selector: 'app-customer-personal-address-check',
  templateUrl: './customer-personal-address-check.component.html',
  styleUrls: ['./customer-personal-address-check.component.scss']
})
export class CustomerPersonalAddressCheckComponent implements OnInit {

  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  IdCust: number;   
  custObj : any;
  objCust : CustObj;
  custAddrObj : any;
  listCustAddr: any;
  getCustById: string;
  getListCustAddr: string;
  deleteCustAddr:string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder,private wizard: WizardComponent) { 
    this.getCustById = AdInsConstant.GetCustByCustId;
    this.getListCustAddr = AdInsConstant.GetListCustAddr;
    this.deleteCustAddr = AdInsConstant.DeleteCustAddr;

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
         this.IdCust = params["IdCust"];
       }
     });
  }

  ngOnInit() {
    console.log(this.IdCust);
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
            this.listCustAddr = response["ReturnObject"];
        });
  }

  editItem(custAddrObj: any) {
    this.outputValue.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId });
  }

  // deleteItem(custAddrObj: any) {
  //   var custAddr = new CustAddrObj();
  //   custAddr.CustAddrId = custAddrObj.CustAddrId;
  //   this.http.post(this.deleteCustAddr, custAddr).subscribe(
  //     (response: any) => {
  //       this.toastr.successMessage(response["message"]);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   //this.outputValue.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId });
  // }

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
