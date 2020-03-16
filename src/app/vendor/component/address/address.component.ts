import { Component, OnInit } from '@angular/core';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vendor-address', //kalau ada apa, hubungi Jovi  
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  inputLookupZipcodeObj: any;
  

  constructor(private fb: FormBuilder) { }

  AddressForm = this.fb.group({
    MrAddrTypeCode: [''],
    Addr: [''],
    Zipcode: [''],
    AreaCode2: [''], //kelurahan
    AreaCode1: [''], //kecamatan
    City: [''],
    Province: [''],
  });
  
  ngOnInit() {
    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson       = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging  = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson    = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson   = "./assets/uclookup/zipcode/lookupZipcode.json";
  }

}
