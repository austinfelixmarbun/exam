import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-company-address-add',
  templateUrl: './customer-company-address-add.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerCompanyAddressAddComponent implements OnInit {
  @Input() AddrId: number;
  @Input() mode: string;
  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  listCustAddr: any;
  listAddressType: any;
  copyCustomerAddr: any;
  copyCustomerAddrFrom: any;

  addressObj: CustAddrObj;
  custAddrObj: CustAddrObj;
  addressType: RefMasterObj;
  custAddressObj: CustAddrObj;
  inputFieldAddressObj: InputFieldObj;
  custAddrFromObj: CustAddrObj;

  IdCust: number;
  pageType: string;
  addCustAddrUrl: string;
  getCustAddrUrl: string;
  editCustAddrUrl: string;
  getListCustAddrUrl: string;
  getRefMasterWithReserveFieldUrl: string;

  CustDataCompanyForm = this.fb.group({
    Notes: [''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: [''],
    MrCustAddrTypeCode: [''],
    CopyAddrFrom: ['']
  });

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService) {
    this.getRefMasterWithReserveFieldUrl = URLConstant.GetListActiveRefMasterWithReserveFieldAll;
    this.getListCustAddrUrl = URLConstant.GetListCustAddr;
    this.addCustAddrUrl = URLConstant.AddCustAddr;
    this.editCustAddrUrl = URLConstant.EditCustAddr;
    this.getCustAddrUrl = URLConstant.GetCustAddr;

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      // if (params["IdCustPersonal"] != null) {
      //   this.IdCustPersonal = params["IdCustPersonal"];
      // }
      // if (params["mode"] != null) {
      //   this.pageType = params["mode"];
      // }
      // if (params["AddrId"] != null) {
      //   this.AddrId = params["AddrId"];
      // }
    });
  }

  ngOnInit() {
    this.pageType = this.mode;
    this.inputFieldAddressObj = new InputFieldObj();
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();

    this.addressType = new RefMasterObj();
    this.addressType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustAddrType;
    this.addressType.ReserveField1 = CommonConstant.CustTypeCompany;
    this.http.post(this.getRefMasterWithReserveFieldUrl, this.addressType).subscribe(
      (response) => {
        this.listAddressType = response[CommonConstant.ReturnObj];
        //this.CustDataCompanyForm.patchValue({ MrCustAddrTypeCode: response[CommonConstant.ReturnObj][0]['Key'] });
      });

    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.CustId = this.IdCust;
    this.custAddrObj.MrCustAddrTypeCode = "-";
    this.http.post(this.getListCustAddrUrl, this.custAddrObj).subscribe(
      (response) => {
        this.listCustAddr = response[CommonConstant.ReturnObj];
        if (this.listCustAddr.length > 0) {
          this.CustDataCompanyForm.patchValue({ CopyAddrFrom: response[CommonConstant.ReturnObj][0]['CustAddrId'] });
        }
      });

    if (this.pageType == "edit") {
      this.custAddrObj = new CustAddrObj();
      this.custAddrObj.CustAddrId = this.AddrId;
      this.http.post(this.getCustAddrUrl, this.custAddrObj).subscribe(
        (response) => {
          this.copyCustomerAddr = response;
          this.CustDataCompanyForm.patchValue({
            Notes: this.copyCustomerAddr.Notes,
            MrCustAddrTypeCode: this.copyCustomerAddr.MrCustAddrTypeCode
          });

          this.addressObj = new CustAddrObj();
          this.addressObj.Addr = this.copyCustomerAddr.Addr;
          this.addressObj.AreaCode3 = this.copyCustomerAddr.AreaCode3;
          this.addressObj.AreaCode4 = this.copyCustomerAddr.AreaCode4;
          this.addressObj.AreaCode1 = this.copyCustomerAddr.AreaCode1;
          this.addressObj.AreaCode2 = this.copyCustomerAddr.AreaCode2;
          this.addressObj.City = this.copyCustomerAddr.City;
          this.addressObj.PhnArea1 = this.copyCustomerAddr.PhnArea1;
          this.addressObj.Phn1 = this.copyCustomerAddr.Phn1;
          this.addressObj.PhnExt1 = this.copyCustomerAddr.PhnExt1;
          this.addressObj.PhnArea2 = this.copyCustomerAddr.PhnArea2;
          this.addressObj.Phn2 = this.copyCustomerAddr.Phn2;
          this.addressObj.PhnArea2 = this.copyCustomerAddr.PhnArea2;
          this.addressObj.PhnExt2 = this.copyCustomerAddr.PhnExt2;
          this.addressObj.PhnArea3 = this.copyCustomerAddr.PhnArea3;
          this.addressObj.Phn3 = this.copyCustomerAddr.Phn3;
          this.addressObj.PhnExt3 = this.copyCustomerAddr.PhnExt3;
          this.addressObj.FaxArea = this.copyCustomerAddr.FaxArea;
          this.addressObj.Fax = this.copyCustomerAddr.Fax;
          this.addressObj.MrHouseOwnershipCode = this.copyCustomerAddr.MrBuildingOwnershipCode;

          this.inputFieldAddressObj = new InputFieldObj();
          this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();
          this.inputFieldAddressObj.inputLookupObj.nameSelect = this.copyCustomerAddr.Zipcode;
          this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.copyCustomerAddr.Zipcode };

        });
    }
  }

  copyAddress() {
    this.custAddrFromObj = new CustAddrObj();
    this.custAddrFromObj.CustAddrId = this.CustDataCompanyForm.controls["CopyAddrFrom"].value;
    this.http.post(this.getCustAddrUrl, this.custAddrFromObj).subscribe(
      (response) => {
        this.copyCustomerAddrFrom = response;
        this.CustDataCompanyForm.patchValue({
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
        this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.copyCustomerAddrFrom.Zipcode };
      });
  }

  setCustAddr() {
    this.custAddressObj.CustId = this.IdCust;
    this.custAddressObj.MrCustAddrTypeCode = this.CustDataCompanyForm.controls["MrCustAddrTypeCode"].value;
    this.custAddressObj.Addr = this.CustDataCompanyForm.controls["custAddress"]["controls"].Addr.value;
    this.custAddressObj.FullAddr = this.CustDataCompanyForm.controls["custAddress"]["controls"].Addr.value + " RT: " + this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode4.value + " RW: " + this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode3.value + " " + this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode2.value + ", " + this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode1.value + " " + this.CustDataCompanyForm.controls["custAddressZipcode"]["controls"].value.value;
    this.custAddressObj.AreaCode3 = this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode3.value;
    this.custAddressObj.AreaCode4 = this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode4.value;
    this.custAddressObj.Zipcode = this.CustDataCompanyForm.controls["custAddressZipcode"]["controls"].value.value;
    this.custAddressObj.AreaCode1 = this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode1.value;
    this.custAddressObj.AreaCode2 = this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode2.value;
    this.custAddressObj.City = this.CustDataCompanyForm.controls["custAddress"]["controls"].City.value;
    this.custAddressObj.PhnArea1 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnArea1.value;
    this.custAddressObj.Phn1 = this.CustDataCompanyForm.controls["custAddress"]["controls"].Phn1.value;
    this.custAddressObj.PhnExt1 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnExt1.value;
    this.custAddressObj.PhnArea2 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnArea2.value;
    this.custAddressObj.Phn2 = this.CustDataCompanyForm.controls["custAddress"]["controls"].Phn2.value;
    this.custAddressObj.PhnExt2 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnExt2.value;
    this.custAddressObj.PhnArea3 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnArea3.value;
    this.custAddressObj.Phn3 = this.CustDataCompanyForm.controls["custAddress"]["controls"].Phn3.value;
    this.custAddressObj.PhnExt3 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnExt3.value;
    this.custAddressObj.FaxArea = this.CustDataCompanyForm.controls["custAddress"]["controls"].FaxArea.value;
    this.custAddressObj.Fax = this.CustDataCompanyForm.controls["custAddress"]["controls"].Fax.value;
    this.custAddressObj.MrBuildingOwnershipCode = this.CustDataCompanyForm.controls["custAddress"]["controls"].MrHouseOwnershipCode.value;
    this.custAddressObj.Notes = this.CustDataCompanyForm.controls["Notes"].value;
  }

  SaveForm() {
    this.custAddressObj = new CustAddrObj();
    this.setCustAddr();
    if (this.pageType == "add") {
      this.http.post(this.addCustAddrUrl, this.custAddressObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.outputValue.emit({ mode: 'check' });
        }
      );
    } else {
      this.custAddressObj.CustAddrId = this.AddrId;
      this.custAddressObj.RowVersion = this.copyCustomerAddr.RowVersion;
      this.http.post(this.editCustAddrUrl, this.custAddressObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.outputValue.emit({ mode: 'check' });
        }
      );
    }
  }
  back() {
    this.outputValue.emit({ mode: 'check' });
  }
}
