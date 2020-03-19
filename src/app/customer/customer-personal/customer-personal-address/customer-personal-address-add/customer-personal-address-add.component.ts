import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { HttpClient } from '@angular/common/http';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
 
@Component({
  selector: 'app-customer-personal-address-add',
  templateUrl: './customer-personal-address-add.component.html',
  styleUrls: ['./customer-personal-address-add.component.scss'],
  providers: [NGXToastrService]
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
  addCustAddr : any;
  editCustAddr : any;
  getCustAddr : any;
  IdCust : any;
  IdCustPersonal : any;
  custObj : any;
  inputFieldAddressObj: InputFieldObj;
  custAddressObj: CustAddrObj;
  getListActiveRefMaster: any;
  addressType: any;
  addressObj: any;
  listAddressType: any;
  custAddrObj : any;
  getListCustAddr: any;
  listCustAddr: any;
  copyCustomerAddr: any;
  CustDataPersonalForm = this.fb.group({
    //MrCustTypeCode: ['', [Validators.required, Validators.maxLength(50)]]
    Notes: [''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: [''],
    MrCustAddrTypeCode:[''],
    CopyAddrFrom:['']
  });

  constructor(private route: ActivatedRoute,private http: HttpClient,private fb: FormBuilder,private toastr: NGXToastrService) { 
    this.getListActiveRefMaster = AdInsConstant.GetListActiveRefMaster;
    this.getListCustAddr = AdInsConstant.GetListCustAddr;
    this.addCustAddr = AdInsConstant.AddCustAddr;
    this.editCustAddr = AdInsConstant.EditCustAddr;
    this.getCustAddr = AdInsConstant.GetCustAddr;

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

    this.addressType = new RefMasterObj();
    this.addressType.RefMasterTypeCode = "CUST_ADDR_TYPE";
    this.http.post(this.getListActiveRefMaster, this.addressType).subscribe(
      (response) => {
          this.listAddressType = response['ReturnObject'];
          console.log("aaaa");
          console.log(this.listAddressType);
          this.CustDataPersonalForm.patchValue({ MrCustAddrTypeCode: response['ReturnObject'][0]['Key'] });
      });
    
      this.custAddrObj = new CustAddrObj();
      this.custAddrObj.CustId = this.IdCust;
      this.custAddrObj.MrCustAddrTypeCode = "-";
      console.log("bbb");
      console.log(this.custAddrObj);
      this.http.post(this.getListCustAddr, this.custAddrObj).subscribe(
        (response) => {
            this.listCustAddr = response["ReturnObject"];
            this.CustDataPersonalForm.patchValue({ CopyAddrFrom: response['ReturnObject'][0]['CustAddrId'] });

            console.log("aaa")
            console.log(this.listCustAddr)
        });
  }

  copyAddress(){
    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.CustAddrId = this.CustDataPersonalForm.controls["CopyAddrFrom"].value;
    this.http.post(this.getCustAddr, this.custAddrObj).subscribe(
      (response) => {
          this.copyCustomerAddr = response;
          this.CustDataPersonalForm.patchValue({
              Notes: this.copyCustomerAddr.Notes
          });
          
          this.addressObj = new CustAddrObj();
          this.addressObj.Addr = this.copyCustomerAddr.Addr;
          
      });
      console.log("vvv")
      console.log(this.CustDataPersonalForm)
  }

  setCustAddr(){
    this.custAddressObj.CustId = this.IdCust;
    this.custAddressObj.MrCustAddrTypeCode = this.CustDataPersonalForm.controls["MrCustAddrTypeCode"].value;
    this.custAddressObj.Addr = this.CustDataPersonalForm.controls["custAddress"]["controls"].Addr.value;
    this.custAddressObj.AreaCode3 = this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode3.value;
    this.custAddressObj.AreaCode4 = this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode4.value;
    this.custAddressObj.Zipcode = this.CustDataPersonalForm.controls["custAddressZipcode"]["controls"].value.value;
    this.custAddressObj.AreaCode1 = this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode1.value;
    this.custAddressObj.AreaCode2 = this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode2.value;
    this.custAddressObj.City = this.CustDataPersonalForm.controls["custAddress"]["controls"].City.value;
    this.custAddressObj.PhnArea1 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnArea1.value;
    this.custAddressObj.Phn1 = this.CustDataPersonalForm.controls["custAddress"]["controls"].Phn1.value;
    this.custAddressObj.PhnExt1 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnExt1.value;
    this.custAddressObj.PhnArea2 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnArea2.value;
    this.custAddressObj.Phn2 = this.CustDataPersonalForm.controls["custAddress"]["controls"].Phn2.value;
    this.custAddressObj.PhnExt2 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnExt2.value;
    this.custAddressObj.FaxArea = this.CustDataPersonalForm.controls["custAddress"]["controls"].FaxArea.value;
    this.custAddressObj.Fax = this.CustDataPersonalForm.controls["custAddress"]["controls"].Fax.value;
    this.custAddressObj.MrBuildingOwnershipCode = this.CustDataPersonalForm.controls["custAddress"]["controls"].MrHouseOwnershipCode.value;
    this.custAddressObj.Notes = this.CustDataPersonalForm.controls["Notes"].value;
  }

  SaveForm(){
    this.custAddressObj = new CustAddrObj();
    this.setCustAddr();
    console.log("ccc");
    console.log(this.custAddressObj);
    this.http.post(this.addCustAddr, this.custAddressObj).subscribe(
      (response) => {
        console.log(response);
        this.toastr.successMessage(response["message"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setAddrResidenceObj(){
    this.inputFieldAddressObj = new InputFieldObj();
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();

    // if(this.custDataPersonalObj.AppCustAddrResidenceObj != undefined){
    //   this.addressObj = new AddrObj();
    //   this.addressObj.Addr = this.custDataPersonalObj.Addr;
    //   this.addressObj.AreaCode1 = this.custDataPersonalObj.AreaCode1;
    //   this.addressObj.AreaCode2 = this.custDataPersonalObj.AreaCode2;
    //   this.addressObj.AreaCode3 = this.custDataPersonalObj.AreaCode3;
    //   this.addressObj.AreaCode4 = this.custDataPersonalObj.AreaCode4;
    //   this.addressObj.City = this.custDataPersonalObj.City;
    //   this.addressObj.Fax = this.custDataPersonalObj.Fax;
    //   this.addressObj.FaxArea = this.custDataPersonalObj.FaxArea;
    //   this.addressObj.Phn1 = this.custDataPersonalObj.Phn1;
    //   this.addressObj.Phn2 = this.custDataPersonalObj.Phn2;
    //   this.addressObj.PhnArea1 = this.custDataPersonalObj.PhnArea1;
    //   this.addressObj.PhnArea2 = this.custDataPersonalObj.PhnArea2;
    //   this.addressObj.MrHouseOwnershipCode = this.custDataPersonalObj.MrHouseOwnershipCode;
      
    //   this.inputFieldAddressObj.inputLookupObj.nameSelect = this.custDataPersonalObj.Zipcode;
    //   this.inputFieldAddressObj.inputLookupObj.jsonSelect = {Zipcode: this.custDataPersonalObj.Zipcode};
    //}
  }
}
