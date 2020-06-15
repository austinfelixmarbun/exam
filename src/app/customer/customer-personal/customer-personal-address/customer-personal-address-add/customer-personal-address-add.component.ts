import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { AddrObj } from 'app/shared/model/AddrObj.Model';
 
@Component({
  selector: 'app-customer-personal-address-add',
  templateUrl: './customer-personal-address-add.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerPersonalAddressAddComponent implements OnInit {
  @Input () AddrId: number;
  @Input() mode: string; 
  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  resultData: any;
  tempCustObj: any;
  listCustAddr: any;
  listAddressType: any;
  getListCustAddr: any;
  getCustomerAddr: any;
  copyCustomerAddr: any;

  inputFieldAddressObj: InputFieldObj;

  custObj: CustObj;
  addressObj: AddrObj;
  addressType: RefMasterObj;
  custAddrObj : CustAddrObj;
  custAddressObj: CustAddrObj;
  
  custAddrFromObj: CustAddrObj;
  copyCustomerAddrFrom: any;

  BirthDt: Date;
  IdExpiredDt: Date;

  IdCust: number;

  IdNo: string;
  Gender: string;
  pageType: string;
  CustName: string;
  GenderDesc:string;
  CustModel: string;
  BirthPlace: string;
  getCustAddr: string;
  addCustAddr: string;
  editCustAddr: string;
  MrIdTypeCode: string;
  CustModelDesc: string;
  getCustByCustId: string;
  MrIdTypeCodeDesc: string;
  MotherMaidenName: string;
  getListActiveRefMaster: string;
  getRefMasterWithReserveField: string;

  CustDataPersonalForm = this.fb.group({
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

  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient,private fb: FormBuilder,private toastr: NGXToastrService) { 
    this.getListActiveRefMaster = AdInsConstant.GetListActiveRefMaster;
    this.getRefMasterWithReserveField = AdInsConstant.GetListActiveRefMasterWithReserveFieldAll;
    this.getListCustAddr = AdInsConstant.GetListCustAddr;
    this.addCustAddr = AdInsConstant.AddCustAddr;
    this.editCustAddr = AdInsConstant.EditCustAddr;
    this.getCustAddr = AdInsConstant.GetCustAddr;
    this.getCustByCustId = AdInsConstant.GetCustByCustId;

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
         this.IdCust = params["IdCust"];
       }
     });
  }

  ngOnInit() {
    this.pageType = this.mode;
    console.log(this.pageType);
    this.inputFieldAddressObj = new InputFieldObj();
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();

    this.addressType = new RefMasterObj();
    this.addressType.RefMasterTypeCode = "CUST_ADDR_TYPE";
    this.addressType.ReserveField1 = "PERSONAL";
    this.http.post(this.getRefMasterWithReserveField, this.addressType).subscribe(
      (response) => {
          this.listAddressType = response['ReturnObject'];
          console.log("ccc")
          console.log(this.listAddressType)
          this.CustDataPersonalForm.patchValue({ MrCustAddrTypeCode: response['ReturnObject'][0]['Key'] });
      });
    
      this.custAddrObj = new CustAddrObj();
      this.custAddrObj.CustId = this.IdCust;
      this.custAddrObj.MrCustAddrTypeCode = "-";
      this.http.post(this.getListCustAddr, this.custAddrObj).subscribe(
        (response) => {
            this.listCustAddr = response["ReturnObject"];
            this.CustDataPersonalForm.patchValue({ CopyAddrFrom: response['ReturnObject'][0]['CustAddrId'] });
        });


      if(this.pageType == "edit"){
        this.custAddrObj = new CustAddrObj();
        this.custAddrObj.CustAddrId = this.AddrId;
        this.http.post(this.getCustAddr, this.custAddrObj).subscribe(
          (response) => {
              this.getCustomerAddr = response;
              this.CustDataPersonalForm.patchValue({
                  Notes: this.getCustomerAddr.Notes,
                  MrCustAddrTypeCode: this.getCustomerAddr.MrCustAddrTypeCode
              });
              
              this.addressObj = new CustAddrObj();
              this.addressObj.Addr = this.getCustomerAddr.Addr;
              this.addressObj.AreaCode3 = this.getCustomerAddr.AreaCode3;
              this.addressObj.AreaCode4 = this.getCustomerAddr.AreaCode4;
              this.addressObj.AreaCode1 = this.getCustomerAddr.AreaCode1;
              this.addressObj.AreaCode2 = this.getCustomerAddr.AreaCode2;
              this.addressObj.City = this.getCustomerAddr.City;
              this.addressObj.PhnArea1 = this.getCustomerAddr.PhnArea1;
              this.addressObj.Phn1 = this.getCustomerAddr.Phn1;
              this.addressObj.PhnExt1 = this.getCustomerAddr.PhnExt1;
              this.addressObj.PhnArea2 = this.getCustomerAddr.PhnArea2;
              this.addressObj.Phn2 = this.getCustomerAddr.Phn2;
              this.addressObj.PhnExt2 = this.getCustomerAddr.PhnExt2;
              this.addressObj.PhnArea3 = this.getCustomerAddr.PhnArea3;
              this.addressObj.Phn3 = this.getCustomerAddr.Phn3;
              this.addressObj.PhnExt3 = this.getCustomerAddr.PhnExt3;
              this.addressObj.FaxArea = this.getCustomerAddr.FaxArea;
              this.addressObj.Fax = this.getCustomerAddr.Fax;
              this.addressObj.MrHouseOwnershipCode = this.getCustomerAddr.MrBuildingOwnershipCode;

              this.inputFieldAddressObj = new InputFieldObj();
              this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();
              this.inputFieldAddressObj.inputLookupObj.nameSelect = this.getCustomerAddr.Zipcode;
              this.inputFieldAddressObj.inputLookupObj.jsonSelect = {Zipcode: this.getCustomerAddr.Zipcode};
              
          });
      }
  }

  copyAddress(){
    this.custAddrFromObj = new CustAddrObj();
    this.custAddrFromObj.CustAddrId = this.CustDataPersonalForm.controls["CopyAddrFrom"].value;
    this.http.post(this.getCustAddr, this.custAddrFromObj).subscribe(
      (response) => {
          this.copyCustomerAddrFrom = response;
          this.CustDataPersonalForm.patchValue({
              Notes: this.copyCustomerAddrFrom.Notes
          });
          
          this.addressObj = new CustAddrObj();
          this.addressObj.Addr = this.copyCustomerAddrFrom.Addr;
          this.addressObj.AreaCode3 = this.copyCustomerAddrFrom.AreaCode3;
          this.addressObj.AreaCode4 = this.copyCustomerAddrFrom.AreaCode4;
          this.addressObj.AreaCode1 = this.copyCustomerAddrFrom.AreaCode1;
          this.addressObj.AreaCode2 = this.copyCustomerAddrFrom.AreaCode2;
          this.addressObj.City = this.copyCustomerAddrFrom.City;
          this.addressObj.PhnArea1 = this.copyCustomerAddrFrom.PhnArea1;
          this.addressObj.Phn1 = this.copyCustomerAddrFrom.Phn1;
          this.addressObj.PhnExt1 = this.copyCustomerAddrFrom.PhnExt1;
          this.addressObj.PhnArea2 = this.copyCustomerAddrFrom.PhnArea2;
          this.addressObj.Phn2 = this.copyCustomerAddrFrom.Phn2;
          this.addressObj.PhnExt2 = this.copyCustomerAddrFrom.PhnExt2;
          this.addressObj.PhnArea3 = this.copyCustomerAddrFrom.PhnArea3;
          this.addressObj.Phn3 = this.copyCustomerAddrFrom.Phn3;
          this.addressObj.PhnExt3 = this.copyCustomerAddrFrom.PhnExt3;
          this.addressObj.FaxArea = this.copyCustomerAddrFrom.FaxArea;
          this.addressObj.Fax = this.copyCustomerAddrFrom.Fax;
          this.addressObj.MrHouseOwnershipCode = this.copyCustomerAddrFrom.MrBuildingOwnershipCode;

          this.inputFieldAddressObj = new InputFieldObj();
          this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();
          this.inputFieldAddressObj.inputLookupObj.nameSelect = this.copyCustomerAddrFrom.Zipcode;
          this.inputFieldAddressObj.inputLookupObj.jsonSelect = {Zipcode: this.copyCustomerAddrFrom.Zipcode};
          
      });
      console.log("vvv")
      console.log(this.CustDataPersonalForm)
  }

  setCustAddr(){
    this.custAddressObj.CustId = this.IdCust;
    this.custAddressObj.MrCustAddrTypeCode = this.CustDataPersonalForm.controls["MrCustAddrTypeCode"].value;
    this.custAddressObj.Addr = this.CustDataPersonalForm.controls["custAddress"]["controls"].Addr.value;
    this.custAddressObj.FullAddr = this.CustDataPersonalForm.controls["custAddress"]["controls"].Addr.value;
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
    this.custAddressObj.PhnArea3 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnArea3.value;
    this.custAddressObj.Phn3 = this.CustDataPersonalForm.controls["custAddress"]["controls"].Phn3.value;
    this.custAddressObj.PhnExt3 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnExt3.value;
    this.custAddressObj.FaxArea = this.CustDataPersonalForm.controls["custAddress"]["controls"].FaxArea.value;
    this.custAddressObj.Fax = this.CustDataPersonalForm.controls["custAddress"]["controls"].Fax.value;
    this.custAddressObj.MrBuildingOwnershipCode = this.CustDataPersonalForm.controls["custAddress"]["controls"].MrHouseOwnershipCode.value;
    this.custAddressObj.Notes = this.CustDataPersonalForm.controls["Notes"].value;
  }

  SaveForm(){
    this.custAddressObj = new CustAddrObj();
    this.setCustAddr();
    if(this.pageType == "add"){
      this.http.post(this.addCustAddr, this.custAddressObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          this.outputValue.emit({mode : 'check'});
          console.log(response)
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.custAddressObj.CustAddrId = this.AddrId;
      this.custAddressObj.RowVersion = this.getCustomerAddr.RowVersion;
      this.http.post(this.editCustAddr, this.custAddressObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          this.outputValue.emit({mode : 'check'});
          console.log(response)
        },
        (error) => {
          console.log(error);
        }
      );
    } 
  }
  back(){
    this.outputValue.emit({mode : 'check'});
  }
}
