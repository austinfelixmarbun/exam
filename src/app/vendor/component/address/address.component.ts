import { Component, OnInit, Input } from '@angular/core';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { WizardComponent } from 'angular-archwizard';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj();
  vendorAddrObj: VendorAddrObj = new VendorAddrObj();
  mode: string = "add";
  @Input() objInput: any;
  result: any;
  VendorAddrId: number;
  MrVendorClass: string;
  resultAddr: any;
  getUrl: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: NGXToastrService, private wizard: WizardComponent) {
  }

  AddressForm = this.fb.group({
    MrAddrTypeCode: [''],
    Addr: ['', Validators.required],
    Zipcode: [''],
    AreaCode2: [''], //kelurahan
    AreaCode1: [''], //kecamatan
    City: [''],
    Province: [''],
    Latitude: [''],
    Longitude: [''],
    RowVersion:['']
  });

  ngOnInit() {
    this.AddressForm.controls.AreaCode2.disable();
    this.AddressForm.controls.AreaCode1.disable();
    this.AddressForm.controls.City.disable();
    this.AddressForm.controls.Province.disable();

    if (this.objInput.Type == "Vendor") {
      this.getUrl = URLConstant.GetVendorAddrByVendorId;
      this.vendorAddrObj.VendorId = this.objInput.VendorId;
      this.vendorAddrObj.VendorEmpId = null;
      this.vendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeLegal;
    } else if (this.objInput.Type == "VendorEmployee") {
      this.getUrl = URLConstant.GetVendorAddrByVendorEmpId;
      this.vendorAddrObj.VendorId = null;
      this.vendorAddrObj.VendorEmpId = this.objInput.VendorEmpId;
      this.vendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeLegal;
    }

    var vendorObj = {
      VendorId: this.objInput.VendorId
    }
    this.http.post(URLConstant.GetVendorByVendorId, vendorObj).subscribe(
      (response) => {
        this.result = response;
        this.MrVendorClass = this.result.MrVendorClass;
        this.refreshVendorAddress();
      }
    );
  }

  setLookup() {
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    if (this.vendorAddrObj != null) {
      this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.vendorAddrObj.Zipcode };
    }

    this.inputLookupZipcodeObj.isReady = true;
  }

  getLookupZipcode(event) {
    this.AddressForm.patchValue({
      AreaCode2: event.AreaCode2,
      AreaCode1: event.AreaCode1,
      City: event.City,
      Province: event.Province
    });
  }

  SaveForm() {
    this.vendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeLegal;
    this.vendorAddrObj.AreaCode2 = this.AddressForm.controls.AreaCode2.value;
    this.vendorAddrObj.AreaCode1 = this.AddressForm.controls.AreaCode1.value;
    this.vendorAddrObj.City = this.AddressForm.controls.City.value;
    this.vendorAddrObj.Zipcode = this.AddressForm.controls["lookupZipcode"]["controls"].value.value;
    this.vendorAddrObj.Addr = this.AddressForm.controls.Addr.value;
    this.vendorAddrObj.Province = this.AddressForm.controls.Province.value;
    this.vendorAddrObj.Latitude = this.AddressForm.controls.Latitude.value;
    this.vendorAddrObj.Longitude = this.AddressForm.controls.Longitude.value;
    this.vendorAddrObj.VendorAddrId = this.VendorAddrId;
    if (this.objInput.Type == "Vendor") {
      this.vendorAddrObj.VendorId = this.objInput.VendorId;
      this.vendorAddrObj.VendorEmpId = null;
    } else if (this.objInput.Type == "VendorEmployee") {
      this.vendorAddrObj.VendorId = null;
      this.vendorAddrObj.VendorEmpId = this.objInput.VendorEmpId;
    }
    this.vendorAddrObj.Phn1 = "";
    this.vendorAddrObj.PhnArea1 = "";
    this.vendorAddrObj.Phn2 = "";
    this.vendorAddrObj.PhnArea2 = "";

    if (this.mode == "edit") {
      this.vendorAddrObj.RowVersion = this.AddressForm.controls.RowVersion.value;
      this.http.post(URLConstant.EditVendorAddr, this.vendorAddrObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
          this.refreshVendorAddress();
        });
    }
    else {
      this.http.post<VendorAddrObj>(URLConstant.AddVendorAddr, this.vendorAddrObj).subscribe(
        (response) => {
          this.vendorAddrObj = response;
          this.mode = "edit";
          this.VendorAddrId = this.vendorAddrObj.VendorAddrId;
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
          this.refreshVendorAddress();
        });
    }
  }

  refreshVendorAddress() {
    this.http.post<VendorAddrObj>(this.getUrl, this.vendorAddrObj).subscribe(
      (response) => {
        this.vendorAddrObj = response;
        this.AddressForm.patchValue({
          MrAddrTypeCode: this.vendorAddrObj.MrAddrTypeCode,
          Addr: this.vendorAddrObj.Addr,
          AreaCode2: this.vendorAddrObj.AreaCode2,
          AreaCode1: this.vendorAddrObj.AreaCode1,
          City: this.vendorAddrObj.City,
          Province: this.vendorAddrObj.Province,
          Latitude: this.vendorAddrObj.Latitude,
          Longitude: this.vendorAddrObj.Longitude,
          RowVersion: this.vendorAddrObj.RowVersion,
        });
        this.setLookup();
        this.VendorAddrId = this.vendorAddrObj.VendorAddrId;

        if (this.VendorAddrId == 0) {
          this.mode = "add";
        } else {
          this.mode = "edit";
        }
      }
    );
  }
}