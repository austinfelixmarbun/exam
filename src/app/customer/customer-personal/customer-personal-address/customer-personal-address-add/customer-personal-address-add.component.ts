import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { HttpClient } from '@angular/common/http';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AddrObj } from 'app/shared/model/AddrObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-customer-personal-address-add',
  templateUrl: './customer-personal-address-add.component.html',
  styleUrls: ['./customer-personal-address-add.component.scss']
})
export class CustomerPersonalAddressAddComponent implements OnInit {
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
  addUrl : any; IdCust : any;
  IdCustPersonal : any;
  custObj : any;
  inputFieldAddressObj: InputFieldObj;
  addressObj: AddrObj;
  CustDataPersonalForm = this.fb.group({
    //MrCustTypeCode: ['', [Validators.required, Validators.maxLength(50)]]
    Notes: [''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: ['']
  });

  constructor(private route: ActivatedRoute,private http: HttpClient,private fb: FormBuilder,) { 
     
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
    this.inputFieldAddressObj = new InputFieldObj();
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();

    // this.custObj = new CustObj();
    // this.custObj.CustId = this.IdCust;
    // this.http.post(AdInsConstant.GetCustByCustId, this.custObj).subscribe(
    //   (response) => {
        
    //       this.custObj = response;
    //     });
  
  }

  setAddrResidenceObj(){
    this.inputFieldAddressObj = new InputFieldObj();
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();

    // if(this.custDataPersonalObj.AppCustAddrResidenceObj != undefined){
    //   this.addressObj = new AddrObj();
    //   this.addressObj.Addr = this.custDataPersonalObj.AppCustAddrResidenceObj.Addr;
    //   this.addressObj.AreaCode1 = this.custDataPersonalObj.AppCustAddrResidenceObj.AreaCode1;
    //   this.addressObj.AreaCode2 = this.custDataPersonalObj.AppCustAddrResidenceObj.AreaCode2;
    //   this.addressObj.AreaCode3 = this.custDataPersonalObj.AppCustAddrResidenceObj.AreaCode3;
    //   this.addressObj.AreaCode4 = this.custDataPersonalObj.AppCustAddrResidenceObj.AreaCode4;
    //   this.addressObj.City = this.custDataPersonalObj.AppCustAddrResidenceObj.City;
    //   this.addressObj.Fax = this.custDataPersonalObj.AppCustAddrResidenceObj.Fax;
    //   this.addressObj.FaxArea = this.custDataPersonalObj.AppCustAddrResidenceObj.FaxArea;
    //   this.addressObj.Phn1 = this.custDataPersonalObj.AppCustAddrResidenceObj.Phn1;
    //   this.addressObj.Phn2 = this.custDataPersonalObj.AppCustAddrResidenceObj.Phn2;
    //   this.addressObj.PhnArea1 = this.custDataPersonalObj.AppCustAddrResidenceObj.PhnArea1;
    //   this.addressObj.PhnArea2 = this.custDataPersonalObj.AppCustAddrResidenceObj.PhnArea2;
    //   this.addressObj.MrHouseOwnershipCode = this.custDataPersonalObj.AppCustAddrResidenceObj.MrHouseOwnershipCode;
      
    //   this.inputFieldAddressObj.inputLookupObj.nameSelect = this.custDataPersonalObj.AppCustAddrResidenceObj.Zipcode;
    //   this.inputFieldAddressObj.inputLookupObj.jsonSelect = {Zipcode: this.custDataPersonalObj.AppCustAddrResidenceObj.Zipcode};
    //}
  }
}
