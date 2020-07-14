import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormGroupDirective, ControlContainer } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-uc-address-group',
  templateUrl: './uc-address-group.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class UcAddressGroupComponent implements OnInit {

  @Input() UCAddrForm: FormGroup;
  @Input() enjiForm: NgForm;
  @Input() identifier: any;
  @Input() default: any;
  inputLookupObj: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log("UcAddressForm");
    this.default = new Array();
    this.default = {
      Addr: '',
      AreaCode4: '',
      AreaCode3: '',
      AreaCode2: '',
      AreaCode1: '',
      City: '',
      PhnArea1: '',
      Phn1: '',
      PhnExt1: '',
      PhnArea2: '',
      Phn2: '',
      PhnExt2: '',
      PhnArea3: '',
      Phn3: '',
      PhnExt3: '',
      FaxArea: '',
      Fax: ''
    };
    
    this.UCAddrForm.addControl(this.identifier, this.fb.group({
      Addr: ['', Validators.required],
      AreaCode4: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(3)]],
      AreaCode3: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(3)]],
      AreaCode2: ['', Validators.required],
      AreaCode1: ['', Validators.required],
      City: ['', Validators.required],
      PhnArea1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      Phn1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      PhnExt1: ['', Validators.pattern("^[0-9]+$")],
      PhnArea2: ['', Validators.pattern("^[0-9]+$")],
      Phn2: ['', Validators.pattern("^[0-9]+$")],
      PhnExt2: ['', Validators.pattern("^[0-9]+$")],
      PhnArea3: ['', Validators.pattern("^[0-9]+$")],
      Phn3: ['', Validators.pattern("^[0-9]+$")],
      PhnExt3: ['', Validators.pattern("^[0-9]+$")],
      FaxArea: ['', Validators.pattern("^[0-9]+$")],
      Fax: ['', Validators.pattern("^[0-9]+$")]
    }));

    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupObj.nameSelect = "456789";
  }

  getLookup(event) {
    console.log(event);
    this.UCAddrForm.controls[this.identifier].patchValue(
      {
        AreaCode2: event.areaCode2,
        AreaCode1: event.areaCode1,
        PhnArea1: event.phnArea,
        City: event.city,
        ZipcodeNumber: event.zipcodeNumber
      });
    console.log(this.UCAddrForm.controls[this.identifier]["controls"]);
    this.inputLookupObj.nameSelect = event.zipcode;
    this.inputLookupObj.idSelect = event.zipcode;
  }
}
