import { Component, OnInit, Input } from '@angular/core';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { FormBuilder } from '@angular/forms';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  inputLookupZipcodeObj: any;
  vendorAddrObj: VendorAddrObj = new VendorAddrObj();
  mode: string = "add";
  @Input() objInput: any;
  result: any;
  VendorAddrId: number;
  MrVendorClass: string;
  resultAddr: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: NGXToastrService, private wizard: WizardComponent) {

  }

  AddressForm = this.fb.group({
    MrAddrTypeCode: [''],
    Addr: [''],
    Zipcode: [''],
    AreaCode2: [''], //kelurahan
    AreaCode1: [''], //kecamatan
    City: [''],
    Province: [''],
    Latitude: [''],
    Longitude: ['']
  });

  ngOnInit() {
    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    this.AddressForm.controls.AreaCode2.disable();
    this.AddressForm.controls.AreaCode1.disable();
    this.AddressForm.controls.City.disable();
    this.AddressForm.controls.Province.disable();

    var obj = {
      VendorId: this.objInput.VendorId
    }
    this.http.post(AdInsConstant.GetVendorByVendorId, obj).subscribe(
      (response) => {
        this.result = response;
        this.MrVendorClass = this.result.MrVendorClass;
      }
    );

    this.refreshVendorAddress();
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
    this.vendorAddrObj.MrAddrTypeCode = this.AddressForm.controls.MrAddrTypeCode.value;
    this.vendorAddrObj.AreaCode2 = this.AddressForm.controls.AreaCode2.value;
    this.vendorAddrObj.AreaCode1 = this.AddressForm.controls.AreaCode1.value;
    this.vendorAddrObj.City = this.AddressForm.controls.City.value;
    this.vendorAddrObj.Zipcode = this.AddressForm.controls["lookupZipcode"]["controls"].value.value;
    this.vendorAddrObj.Addr = this.AddressForm.controls.Addr.value;
    this.vendorAddrObj.Province = this.AddressForm.controls.Province.value;
    this.vendorAddrObj.VendorId = this.objInput.VendorId;
    this.vendorAddrObj.Latitude = this.AddressForm.controls.Latitude.value;
    this.vendorAddrObj.Longitude = this.AddressForm.controls.Longitude.value;

    this.vendorAddrObj.VendorAddrId = this.VendorAddrId;
    if (this.mode == "edit") {
      this.http.post(AdInsConstant.EditVendorAddr, this.vendorAddrObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
          this.refreshVendorAddress();
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.vendorAddrObj.MrAddrTypeCode = "LEGAL";
      this.http.post<VendorAddrObj>(AdInsConstant.AddVendorAddr, this.vendorAddrObj).subscribe(
        (response) => {
          this.vendorAddrObj = response;
          this.mode = "edit";
          this.VendorAddrId = this.vendorAddrObj.VendorAddrId;
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
          this.refreshVendorAddress();
        },
        (error) => {
          console.log(error);
        });
    }
  }

  refreshVendorAddress(){
    var vendorAddrObj = {
      VendorId: this.objInput.VendorId,
      MrAddrTypeCode: "LEGAL"
    }

    this.http.post<VendorAddrObj>(AdInsConstant.GetVendorAddrByVendorId, vendorAddrObj).subscribe(
      (response) => {
        this.mode = "edit";
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
        });
        this.inputLookupZipcodeObj.jsonSelect = {Zipcode: this.vendorAddrObj.Zipcode};
        this.VendorAddrId = this.vendorAddrObj.VendorAddrId;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}