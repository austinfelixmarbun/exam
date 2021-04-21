import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { AuctionCompanyObj } from 'app/shared/model/vendor/AuctionCompany.Model';
import { VendorContactPersonObj } from 'app/shared/model/VendorContactPersonObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { VendorService } from 'app/vendor/vendor.service';
import { formatDate } from '@angular/common';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-auction-company-addedit',
  templateUrl: './auction-company-addedit.component.html'
})
export class AuctionCompanyAddeditComponent implements OnInit {
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj();
  inputLookupZipcodeContactPersonObj: InputLookupObj = new InputLookupObj();
  inputLookupZipcodeTaxObj: InputLookupObj = new InputLookupObj();
  mode: any;
  VendorId: number;
  isHidden: boolean = true;
  AuctionCompanyObj: any;
  getListActiveRefMasterUrl: string;
  tempMrJobPositionCode: any;
  itemCalcMethodType: any;
  title: any = "Auction Company - Add";
  result: any;
  itemIdType: any;
  RsvField: string;

  readonly CancelLink: string = NavigationConstant.VENDOR_AUCTION_COY_PAGING;
  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private vendorService: VendorService) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['VendorId'] !== null){
          this.VendorId = params['VendorId']
        }
        if (params["mode"] != null) {
          this.mode = params["mode"];
        }
      }
    );
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
  }

  AuctionCompanyForm = this.fb.group({
    Category : ['', [Validators.required]],
    VendorCode  : ['', [Validators.required]],
    VendorName  :  ['', [Validators.required]],
    MrIdTypeCode: [''],
    RegistrationNo: ['', Validators.required],
    Addr  :  ['', [Validators.required]],
    RT : ['', [Validators.required]],
    RW : ['', [Validators.required]],
    Kelurahan : ['', [Validators.required]],
    Kecamatan : ['', [Validators.required]],
    City : ['', [Validators.required]],
    Province : ['',[Validators.required]],

    TaxAddr  :  ['', [Validators.required]],
    TaxRT : ['', [Validators.required]],
    TaxRW : ['', [Validators.required]],
    TaxKelurahan : ['', [Validators.required]],
    TaxKecamatan : ['', [Validators.required]],
    TaxCity : ['', [Validators.required]],
    TaxProvince : ['',[Validators.required]],

    Phn1  :  ['', [Validators.required,Validators.pattern("^[0-9]+$")]],    
    Phn2 : [''],    
    IsActive : ['', [Validators.required]],
    Name  :  ['', [Validators.required]],
    MrJobPositionCode  :  ['', [Validators.required]],
    Phone1 : ['', [Validators.required,Validators.pattern("^[0-9]+$")]],    
    Phone2 : [''],    
    Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],    
    MrTaxCalcMethodCode : ['', [Validators.required]],
    IsVat: [true, Validators.required],
    IsNpwpExist : [false],
    TaxIdNo: [''],
    TaxpayerName: [''],
    AddrContactPerson  :  ['', [Validators.required]],
    CityContactPerson : ['', [Validators.required]],
    ProvinceContactPerson : ['',[Validators.required]],
    JoinDate : ['',[Validators.required]],
    IsOwner : [false]
  });

  ngOnInit() {
    this.AuctionCompanyForm.controls.Category.disable();
    this.AuctionCompanyForm.controls.Kelurahan.disable();
    this.AuctionCompanyForm.controls.Kecamatan.disable();
    this.AuctionCompanyForm.controls.Province.disable();
    this.AuctionCompanyForm.controls.City.disable();
    this.AuctionCompanyForm.controls.CityContactPerson.disable();
    this.AuctionCompanyForm.controls.ProvinceContactPerson.disable();

    this.AuctionCompanyForm.controls.TaxKelurahan.disable();
    this.AuctionCompanyForm.controls.TaxKecamatan.disable();
    this.AuctionCompanyForm.controls.TaxProvince.disable();
    this.AuctionCompanyForm.controls.TaxCity.disable();

    this.AuctionCompanyForm.controls.TaxIdNo.clearValidators();
    this.AuctionCompanyForm.controls.TaxpayerName.clearValidators();
    this.AuctionCompanyForm.controls.TaxAddr.clearValidators();
    this.AuctionCompanyForm.controls.TaxRT.clearValidators();
    this.AuctionCompanyForm.controls.TaxRW.clearValidators();
    this.AuctionCompanyForm.controls.TaxKelurahan.clearValidators();
    this.AuctionCompanyForm.controls.TaxKecamatan.clearValidators();
    this.AuctionCompanyForm.controls.TaxCity.clearValidators();
    this.AuctionCompanyForm.controls.TaxProvince.clearValidators();

    this.AuctionCompanyForm.controls.TaxIdNo.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxpayerName.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxAddr.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxRT.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxRW.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxKelurahan.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxKecamatan.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxCity.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxProvince.updateValueAndValidity();
    
    this.setDropdown();
    
    if (this.mode == "edit") {
      this.AuctionCompanyForm.controls.VendorCode.disable();
      this.getData();
    }
    else{
      this.setLookup();
    }
  }

  getData(){
    this.title = "Auction Company - Edit";
    this.vendorService.GetAuctionCompanyByVendorIdForEdit({ Id: this.VendorId }).subscribe(
      (response) => {
        console.log(response);
        this.result = response;
        this.setDropdown();
        this.AuctionCompanyForm.patchValue({
          VendorCode: this.result.VendorObj.VendorCode,
          VendorName: this.result.VendorObj.VendorName,
          MrIdTypeCode: this.result.VendorObj.MrIdTypeCode,
          RegistrationNo: this.result.VendorObj.RegistrationNo,
          MrTaxCalcMethodCode: this.result.VendorObj.MrTaxCalcMethodCode,
          IsVat: this.result.VendorObj.IsVat,
          IsNpwpExist: this.result.VendorObj.IsNpwpExist,
          IsActive: this.result.VendorObj.IsActive,
          TaxidNo: this.result.VendorObj.TaxidNo,
          TaxpayerName: this.result.VendorObj.TaxpayerName,

          Addr: this.result.VendorAddrLegalObj.Addr,
          Kecamatan: this.result.VendorAddrLegalObj.AreaCode1,
          Kelurahan: this.result.VendorAddrLegalObj.AreaCode2,
          RW: this.result.VendorAddrLegalObj.AreaCode3,
          RT: this.result.VendorAddrLegalObj.AreaCode4,
          City: this.result.VendorAddrLegalObj.City,
          Province: this.result.VendorAddrLegalObj.Province,
          
          Phn1: this.result.VendorObj.MobilePhnNo1,
          Phn2: this.result.VendorObj.MobilePhnNo2,
          Name: this.result.VendorContactPersonObj.Name,
          MrJobPositionCode: this.result.VendorContactPersonObj.MrEmployeePosition,
          Phone1: this.result.VendorContactPersonObj.Phone1,
          Phone2: this.result.VendorContactPersonObj.Phone2,
          CityContactPerson: this.result.VendorContactPersonObj.City,
          ProvinceContactPerson: this.result.VendorContactPersonObj.Province,
          AddrContactPerson: this.result.VendorContactPersonObj.Addr,          
          JoinDate: formatDate(this.result.VendorContactPersonObj.JoinDate, 'yyyy-MM-dd', 'en-US'),
          IsOwner: this.result.VendorContactPersonObj.IsOwner,
          Email: this.result.VendorContactPersonObj.Email,
          TaxIdNo: this.result.VendorObj.TaxIdNo
        });
        
        if(this.AuctionCompanyForm.controls.IsNpwpExist.value == true) {
          this.AuctionCompanyForm.patchValue({
            TaxAddr: this.result.VendorAddrTaxObj.Addr,
            TaxRT: this.result.VendorAddrTaxObj.AreaCode4,
            TaxRW: this.result.VendorAddrTaxObj.AreaCode3,
            TaxKecamatan: this.result.VendorAddrTaxObj.AreaCode1,
            TaxKelurahan: this.result.VendorAddrTaxObj.AreaCode2,
            TaxCity: this.result.VendorAddrTaxObj.City,
            TaxProvince: this.result.VendorAddrTaxObj.Province,
          })
        } 
        this.NpwpCheck();
        this.setLookup();
      }
    );
  }

  setDropdown(){
    var refMasterObjMrJobPositionCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrJobPositionCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0)
          this.tempMrJobPositionCode = response[CommonConstant.ReturnObj];
      }
    );

    this.RsvField = CommonConstant.CustTypeCompany

    var refMasterIdObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdTypeVendor,
      MappingCode: this.RsvField,
    }
    this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, refMasterIdObj).subscribe(
      (response) => {
        this.itemIdType = response[CommonConstant.ReturnObj];
        if (this.mode != "edit") {
          if (this.itemIdType.length > 0) {
            this.AuctionCompanyForm.patchValue({
              MrIdTypeCode: this.itemIdType[0].Key
            });
          }
        }
      }
    );

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeTaxCalcMethod,
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterCalcMethodObj).subscribe(
      (response) => {
        this.itemCalcMethodType = response[CommonConstant.ReturnObj];
        if (this.itemCalcMethodType.length > 0) {
          if (this.mode != "edit") {
            this.AuctionCompanyForm.patchValue({
              MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
            });
          }
        }
      }
    );
  }

  SaveForm() {
      this.AuctionCompanyObj = new AuctionCompanyObj();
      this.AuctionCompanyObj.VendorObj = new VendorObj();
      this.AuctionCompanyObj.VendorAddrObj = new VendorAddrObj();
      this.AuctionCompanyObj.VendorContactPersonObj = new VendorContactPersonObj();

      //Vendor 
      this.AuctionCompanyObj.VendorObj.MrVendorTypeCode = 'C';
      this.AuctionCompanyObj.VendorObj.VendorCode = this.AuctionCompanyForm.controls.VendorCode.value;
      this.AuctionCompanyObj.VendorObj.VendorName = this.AuctionCompanyForm.controls.VendorName.value;
      this.AuctionCompanyObj.VendorObj.RegistrationNo = this.AuctionCompanyForm.controls.RegistrationNo.value;
      this.AuctionCompanyObj.VendorObj.MrIdTypeCode = this.AuctionCompanyForm.controls.MrIdTypeCode.value;
      this.AuctionCompanyObj.VendorObj.MrTaxCalcMethodCode = this.AuctionCompanyForm.controls.MrTaxCalcMethodCode.value;
      this.AuctionCompanyObj.VendorObj.IsVat = this.AuctionCompanyForm.controls.IsVat.value;
      this.AuctionCompanyObj.VendorObj.IsNpwpExist = this.AuctionCompanyForm.controls.IsNpwpExist.value;
      this.AuctionCompanyObj.VendorObj.TaxidNo = this.AuctionCompanyForm.controls.TaxIdNo.value;
      this.AuctionCompanyObj.VendorObj.TaxpayerName = this.AuctionCompanyForm.controls.TaxpayerName.value;
      this.AuctionCompanyObj.VendorObj.IsActive = this.AuctionCompanyForm.controls.IsActive.value;
      this.AuctionCompanyObj.VendorObj.MobilePhnNo1 = this.AuctionCompanyForm.controls.Phn1.value;
      this.AuctionCompanyObj.VendorObj.MobilePhnNo2 = this.AuctionCompanyForm.controls.Phn2.value;

      //Vendor Addr
      this.AuctionCompanyObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeLegal,
      this.AuctionCompanyObj.VendorAddrObj.Addr = this.AuctionCompanyForm.controls.Addr.value;
      this.AuctionCompanyObj.VendorAddrObj.AreaCode2 = this.AuctionCompanyForm.controls.Kelurahan.value;
      this.AuctionCompanyObj.VendorAddrObj.AreaCode1 = this.AuctionCompanyForm.controls.Kecamatan.value;
      this.AuctionCompanyObj.VendorAddrObj.AreaCode4 = this.AuctionCompanyForm.controls.RT.value;
      this.AuctionCompanyObj.VendorAddrObj.AreaCode3 = this.AuctionCompanyForm.controls.RW.value;
      this.AuctionCompanyObj.VendorAddrObj.City = this.AuctionCompanyForm.controls.City.value;
      this.AuctionCompanyObj.VendorAddrObj.Zipcode = this.AuctionCompanyForm.controls["Zipcode"]["controls"].value.value;
      this.AuctionCompanyObj.VendorAddrObj.Province = this.AuctionCompanyForm.controls.Province.value;

      //Vendor Tax Addr
      if(this.AuctionCompanyForm.controls.IsNpwpExist.value === true) {
        this.AuctionCompanyObj.VendorAddrObj.MrTaxAddrTypeCode = CommonConstant.AddrTypeTax,
        this.AuctionCompanyObj.VendorAddrObj.TaxAddr = this.AuctionCompanyForm.controls.TaxAddr.value;
        this.AuctionCompanyObj.VendorAddrObj.TaxAreaCode2 = this.AuctionCompanyForm.controls.TaxKelurahan.value;
        this.AuctionCompanyObj.VendorAddrObj.TaxAreaCode1 = this.AuctionCompanyForm.controls.TaxKecamatan.value;
        this.AuctionCompanyObj.VendorAddrObj.TaxAreaCode4 = this.AuctionCompanyForm.controls.TaxRT.value;
        this.AuctionCompanyObj.VendorAddrObj.TaxAreaCode3 = this.AuctionCompanyForm.controls.TaxRW.value;
        this.AuctionCompanyObj.VendorAddrObj.TaxCity = this.AuctionCompanyForm.controls.TaxCity.value;
        this.AuctionCompanyObj.VendorAddrObj.TaxZipcode = this.AuctionCompanyForm.controls["ZipcodeTax"]["controls"].value.value;
        this.AuctionCompanyObj.VendorAddrObj.TaxProvince = this.AuctionCompanyForm.controls.TaxProvince.value;

      } else {
        this.AuctionCompanyObj.VendorAddrObj.MrTaxAddrTypeCode = '',
        this.AuctionCompanyObj.VendorAddrObj.TaxAddr = '';
        this.AuctionCompanyObj.VendorAddrObj.TaxAreaCode2 = '';
        this.AuctionCompanyObj.VendorAddrObj.TaxAreaCode1 = '';
        this.AuctionCompanyObj.VendorAddrObj.TaxAreaCode4 = '';
        this.AuctionCompanyObj.VendorAddrObj.TaxAreaCode3 = '';
        this.AuctionCompanyObj.VendorAddrObj.TaxCity = '';
        this.AuctionCompanyObj.VendorAddrObj.TaxZipcode = '';
        this.AuctionCompanyObj.VendorAddrObj.TaxProvince = '';
      }

      //Vendor Contact Person
      this.AuctionCompanyObj.VendorContactPersonObj.Name = this.AuctionCompanyForm.controls.Name.value;
      this.AuctionCompanyObj.VendorContactPersonObj.MrEmployeePosition = this.AuctionCompanyForm.controls.MrJobPositionCode.value;
      this.AuctionCompanyObj.VendorContactPersonObj.Phone1 = this.AuctionCompanyForm.controls.Phone1.value;
      this.AuctionCompanyObj.VendorContactPersonObj.Phone2 = this.AuctionCompanyForm.controls.Phone2.value;
      this.AuctionCompanyObj.VendorContactPersonObj.Zipcode = this.AuctionCompanyForm.controls["ZipcodeContactPerson"]["controls"].value.value;
      this.AuctionCompanyObj.VendorContactPersonObj.City = this.AuctionCompanyForm.controls.CityContactPerson.value;
      this.AuctionCompanyObj.VendorContactPersonObj.Province = this.AuctionCompanyForm.controls.ProvinceContactPerson.value;
      this.AuctionCompanyObj.VendorContactPersonObj.Addr = this.AuctionCompanyForm.controls.AddrContactPerson.value;
      this.AuctionCompanyObj.VendorContactPersonObj.JoinDate = this.AuctionCompanyForm.controls.JoinDate.value;
      this.AuctionCompanyObj.VendorContactPersonObj.IsOwner = this.AuctionCompanyForm.controls.IsOwner.value;
      this.AuctionCompanyObj.VendorContactPersonObj.Email = this.AuctionCompanyForm.controls.Email.value;

      //Submit
      if(this.mode === 'edit'){

        this.AuctionCompanyObj.VendorObj.VendorId = this.VendorId;
        this.vendorService.EditAuctionCompany(this.AuctionCompanyObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate([NavigationConstant.VENDOR_AUCTION_COY_PAGING]);
          });
      }
      else{
        this.http.post(URLConstant.AddAuctionCompany , this.AuctionCompanyObj).subscribe(
          (response) => {
            this.toastr.successMessage("Success!");
            this.router.navigateByUrl(NavigationConstant.VENDOR_AUCTION_COY_PAGING);
          },
          (error) => {
            console.log(error);
          }
        );
      }
  }

  setLookup(){
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.isReady = true;

    this.inputLookupZipcodeContactPersonObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeContactPersonObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeContactPersonObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeContactPersonObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeContactPersonObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeContactPersonObj.isReady = true;

    this.inputLookupZipcodeTaxObj.isRequired = false;
    this.inputLookupZipcodeTaxObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeTaxObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeTaxObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeTaxObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeTaxObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeTaxObj.isReady = true;
    
    if (this.result != null) {
      this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result.VendorAddrLegalObj.Zipcode };
      this.inputLookupZipcodeContactPersonObj.jsonSelect = { Zipcode: this.result.VendorContactPersonObj.Zipcode };
      if(this.AuctionCompanyForm.controls.IsNpwpExist.value == true) {
        if(this.result.VendorAddrTaxObj.Zipcode != null) {
          this.inputLookupZipcodeTaxObj.jsonSelect = { Zipcode: this.result.VendorAddrTaxObj.Zipcode };
        }
      }
    }
  }

  getLookupZipcode(event) {
    this.AuctionCompanyForm.patchValue({
      City: event.City,
      Kecamatan: event.AreaCode1,
      Kelurahan: event.AreaCode2,
      Province: event.Province
    });
  }

  getLookupTaxZipcode(event) {
    this.AuctionCompanyForm.patchValue({
      TaxCity: event.City,
      TaxKecamatan: event.AreaCode1,
      TaxKelurahan: event.AreaCode2,
      TaxProvince: event.Province
    });
  }

  getLookupZipcodeContactPerson(event) {
    this.AuctionCompanyForm.patchValue({
      CityContactPerson: event.City,
      ProvinceContactPerson: event.Province
    });
  }

  NpwpCheck(isGetData: boolean = false) {

    if (this.AuctionCompanyForm.controls.IsNpwpExist.value == false) {
      this.isHidden = true;
      this.inputLookupZipcodeTaxObj.isReady = false;

      this.AuctionCompanyForm.controls.TaxIdNo.clearValidators();
      this.AuctionCompanyForm.controls.TaxpayerName.clearValidators();
      this.AuctionCompanyForm.controls.TaxAddr.clearValidators();
      this.AuctionCompanyForm.controls.TaxRT.clearValidators();
      this.AuctionCompanyForm.controls.TaxRW.clearValidators();
      this.AuctionCompanyForm.controls.TaxKelurahan.clearValidators();
      this.AuctionCompanyForm.controls.TaxKecamatan.clearValidators();
      this.AuctionCompanyForm.controls.TaxCity.clearValidators();
      this.AuctionCompanyForm.controls.TaxProvince.clearValidators();
      this.inputLookupZipcodeTaxObj.isRequired = false;
      this.inputLookupZipcodeTaxObj.isReady = true;
    } else {
      this.isHidden = false;
      this.inputLookupZipcodeTaxObj.isReady = false;

      this.AuctionCompanyForm.controls.TaxIdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]);
      this.AuctionCompanyForm.controls.TaxpayerName.setValidators(Validators.required);
      this.AuctionCompanyForm.controls.TaxAddr.setValidators(Validators.required);
      this.AuctionCompanyForm.controls.TaxRT.setValidators(Validators.required);
      this.AuctionCompanyForm.controls.TaxRW.setValidators(Validators.required);
      this.AuctionCompanyForm.controls.TaxKelurahan.setValidators(Validators.required);
      this.AuctionCompanyForm.controls.TaxKecamatan.setValidators(Validators.required);
      this.AuctionCompanyForm.controls.TaxCity.setValidators(Validators.required);
      this.AuctionCompanyForm.controls.TaxProvince.setValidators(Validators.required);
      this.inputLookupZipcodeTaxObj.isRequired = true;
      this.inputLookupZipcodeTaxObj.isReady = true;
    }
    
    this.AuctionCompanyForm.controls.TaxIdNo.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxpayerName.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxAddr.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxRT.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxRW.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxKelurahan.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxKecamatan.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxCity.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxProvince.updateValueAndValidity();
  }
}