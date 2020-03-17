import { Component, OnInit, Input } from '@angular/core';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { FormBuilder } from '@angular/forms';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  inputLookupZipcodeObj: any;
  vendorAddrObj: any;
  mode: string = "add";
  @Input() objInput: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private wizard: WizardComponent) { 

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
    Longitude: [''],
  });
  
  ngOnInit() {
    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson       = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging  = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson    = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson   = "./assets/uclookup/zipcode/lookupZipcode.json";

    this.AddressForm.controls.AreaCode2.disable();
    this.AddressForm.controls.AreaCode1.disable();
    this.AddressForm.controls.City.disable();
    this.AddressForm.controls.Province.disable();

    console.log(this.objInput.VendorId)
  }

  getLookupZipcode(event) {
    this.AddressForm.patchValue({
      AreaCode2: event.AreaCode2,
      AreaCode1: event.AreaCode1,
      City: event.City,
      Province: event.Province
    });
  }

  SaveForm(){
    this.vendorAddrObj = new VendorAddrObj();
    this.vendorAddrObj.MrAddrTypeCode = "LEGAL";
    this.vendorAddrObj.AreaCode2 = this.AddressForm.controls.AreaCode2.value;
    this.vendorAddrObj.AreaCode1 = this.AddressForm.controls.AreaCode1.value;
    this.vendorAddrObj.City = this.AddressForm.controls.City.value;
    this.vendorAddrObj.Zipcode =  this.AddressForm.controls["lookupZipcode"]["controls"].value.value,
    this.vendorAddrObj.Addr = this.AddressForm.controls.Addr.value;
    this.vendorAddrObj.VendorId = this.objInput.VendorId;
    console.log(this.vendorAddrObj);

      if (this.mode == "edit") {
          this.http.post(AdInsConstant.AddVendorAddr, this.vendorAddrObj).subscribe(
              (response) => {
                  this.toastr.successMessage(response["message"]);
                  this.wizard.goToNextStep;
              },
              (error) => {
                  console.log(error);
              });
      }
      else {
          this.http.post(AdInsConstant.AddVendorAddr, this.vendorAddrObj).subscribe(
              (response) => {
                  this.toastr.successMessage(response["message"]);
                  this.wizard.goToNextStep;
              },
              (error) => {
                  console.log(error);
              });
      }
  }
}