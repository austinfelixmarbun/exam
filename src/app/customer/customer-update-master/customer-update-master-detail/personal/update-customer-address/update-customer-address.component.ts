import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-customer-address',
  templateUrl: './update-customer-address.component.html',
  styles: []
})
export class UpdateCustomerAddressComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppCustPersonalAddr: Object;
  ZipcodeLookupObj: InputLookupObj;
  OwnershipList: Array<Object>;
  DetailData: Object;
  
  CustomerAddressForm = this.fb.group({
    CustAddrLegalId: [0],
    CustAddrResidenceId: [0],
    CustId: [0],
    ResidenceAddress: [''],
    ResidenceAreaCode1: [{value: '', disabled: true}],
    ResidenceAreaCode2: [{value: '', disabled: true}],
    ResidenceAreaCode3: [''],
    ResidenceAreaCode4: [''],
    ResidenceZipcode: [''],
    ResidenceCity: [{value: '', disabled: true}],
    PhnArea1: [''],
    Phn1: [''],
    PhnExt1: [''],
    PhnArea2: [''],
    Phn2: [''],
    PhnExt2: [''],
    FaxArea: [''],
    Fax: [''],
    OwnershipStatus: [''],
    StayLength: [''],
    LegalAddress: [''],
    LegalAreaCode1: [{value: '', disabled: true}],
    LegalAreaCode2: [{value: '', disabled: true}],
    LegalAreaCode3: [''],
    LegalAreaCode4: [''],
    LegalZipcode: [''],
    LegalCity: [{value: '', disabled: true}],
    RowVersionResidenceAddr: [''],
    RowVersionLegalAddr: ['']
  });

  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder
  ) { 
    this.AppCustPersonalAddr = new Object();
    this.ResponseTab = new EventEmitter<any>();
    this.OwnershipList = new Array<Object>();
    this.DetailData = new Object();
    this.ZipcodeLookupObj = new InputLookupObj();
    this.ZipcodeLookupObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.ZipcodeLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.ZipcodeLookupObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
  }

  ngOnInit() {
    let getOwnershipList = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeBuildingOwnership });
    let getDetail = this.http.post(URLConstant.GetCustAddrDataForUpdateMasterCustAddr, { CustDataTrxId: this.CustDataTrxId });
    forkJoin([getDetail, getOwnershipList]).toPromise().then(
      (response) => {
        this.DetailData = response[0];
        this.AppCustPersonalAddr = response[0]["AppCustAddr"];
        this.CustomerAddressForm.patchValue({...response[0]["MasterCustAddr"]});
        this.OwnershipList = response[1][CommonConstant.ReturnObj];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  CopyAllHandler(){
    this.CustomerAddressForm.patchValue({
      ResidenceAddress: this.AppCustPersonalAddr["ResidenceAddress"],
      OwnershipStatus: this.AppCustPersonalAddr["OwnershipStatus"],
      StayLength: this.AppCustPersonalAddr["StayLength"],
      LegalAddress: this.AppCustPersonalAddr["LegalAddress"]
    });
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppCustPersonalAddr[formControlName];
    this.CustomerAddressForm.patchValue(obj);
  }

  getResidenceZipCode(e){
    this.CustomerAddressForm.patchValue({
      ResidenceZipcode: e.Zipcode,
      ResidenceAreaCode1: e.AreaCode1,
      ResidenceAreaCode2: e.AreaCode2,
      ResidenceCity: e.City
    });
  }

  getLegalZipCode(e){
    this.CustomerAddressForm.patchValue({
      LegalZipcode: e.Zipcode,
      LegalAreaCode1: e.AreaCode1,
      LegalAreaCode2: e.AreaCode2,
      LegalCity: e.City
    });
  }

  back(){
    
  }

  SaveValue(){
    this.http.post(URLConstant.EditMasterCustAddr, this.CustomerAddressForm.value).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
