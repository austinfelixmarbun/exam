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

@Component({
  selector: 'app-auction-company-addedit',
  templateUrl: './auction-company-addedit.component.html',
  styleUrls: ['./auction-company-addedit.component.scss']
})
export class AuctionCompanyAddeditComponent implements OnInit {
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj();
  inputLookupZipcodeContactPersonObj: InputLookupObj = new InputLookupObj();
  mode: any;
  VendorId: number;
  isHidden: boolean = true;
  AuctionCompanyObj: any;
  getListActiveRefMasterUrl: string;
  tempMrJobPositionCode: any;
  itemCalcMethodType: any;
  title: any = "Auction Company - Add";
  result: any;

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
    Addr  :  ['', [Validators.required]],
    Kelurahan : ['', [Validators.required]],
    Kecamatan : ['', [Validators.required]],
    City : ['', [Validators.required]],
    Province : ['',[Validators.required]],
    Phn1  :  ['', [Validators.required],Validators.pattern("^[0-9]+$")],    
    Phn2 : ['', [Validators.required],Validators.pattern("^[0-9]+$")],    
    IsActive : ['', [Validators.required]],
    Name  :  ['', [Validators.required]],
    MrJobPositionCode  :  ['', [Validators.required]],
    Phone1 : ['', [Validators.required],Validators.pattern("^[0-9]+$")],    
    Phone2 : ['', [Validators.required],Validators.pattern("^[0-9]+$")],    
    Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],    
    MrTaxCalcMethodCode : ['', [Validators.required]],
    IsVat : ['', [Validators.required]],
    IsNpwpExist : [false],
    TaxIdNo: ['', Validators.required],
    TaxpayerName: ['', Validators.required],
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
    this.AuctionCompanyForm.controls.City.disable();
    this.AuctionCompanyForm.controls.CityContactPerson.disable();
    this.AuctionCompanyForm.controls.ProvinceContactPerson.disable();
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
    this.vendorService.GetAuctionCompanyByVendorIdForEdit({ VendorId: this.VendorId }).subscribe(
      (response) => {
        this.result = response;
        this.setDropdown();
        this.AuctionCompanyForm.patchValue({
          VendorCode: this.result.VendorObj.VendorCode,
          VendorName: this.result.VendorObj.VendorName,
          MrTaxCalcMethodCode: this.result.VendorObj.MrTaxCalcMethodCode,
          IsVat: this.result.VendorObj.IsVat,
          IsNpwpExist: this.result.VendorObj.IsNpwpExist,
          IsActive: this.result.VendorObj.IsActive,
          TaxidNo: this.result.VendorObj.TaxidNo,
          TaxpayerName: this.result.VendorObj.TaxpayerName,
          Addr: this.result.VendorAddrObj.Addr,
          Kecamatan: this.result.VendorAddrObj.AreaCode1,
          Kelurahan: this.result.VendorAddrObj.AreaCode2,
          City: this.result.VendorAddrObj.City,
          Province: this.result.VendorAddrObj.Province,
          Phn1: this.result.VendorAddrObj.Phn1,
          Phn2: this.result.VendorAddrObj.Phn2,
          Name: this.result.VendorContactPersonObj.Name,
          MrJobPositionCode: this.result.VendorContactPersonObj.MrEmployeePosition,
          Phone1: this.result.VendorContactPersonObj.Phone1,
          Phone2: this.result.VendorContactPersonObj.Name,
          CityContactPerson: this.result.VendorContactPersonObj.City,
          ProvinceContactPerson: this.result.VendorContactPersonObj.Province,
          AddrContactPerson: this.result.VendorContactPersonObj.Addr,          
          JoinDate: formatDate(this.result.VendorContactPersonObj.JoinDate, 'yyyy-MM-dd', 'en-US'),
          IsOwner: this.result.VendorContactPersonObj.IsOwner,
          Email: this.result.VendorContactPersonObj.Email,
          TaxIdNo: this.result.VendorObj.TaxIdNo
        });
        this.NpwpCheck();
        this.setLookup();
        this.inputLookupZipcodeObj.jsonSelect = { 
          Zipcode: this.result["VendorAddrObj"].Zipcode 
        };
        this.inputLookupZipcodeContactPersonObj.jsonSelect = { 
          ZipcodeContactPerson: this.result["VendorContactPersonObj"].Zipcode 
        }
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
      this.AuctionCompanyObj.VendorObj.VendorCode = this.AuctionCompanyForm.controls.VendorCode.value;
      this.AuctionCompanyObj.VendorObj.VendorName = this.AuctionCompanyForm.controls.VendorName.value;
      this.AuctionCompanyObj.VendorObj.MrTaxCalcMethodCode = this.AuctionCompanyForm.controls.MrTaxCalcMethodCode.value;
      this.AuctionCompanyObj.VendorObj.IsVat = this.AuctionCompanyForm.controls.IsVat.value;
      this.AuctionCompanyObj.VendorObj.IsNpwpExist = this.AuctionCompanyForm.controls.IsNpwpExist.value;
      this.AuctionCompanyObj.VendorObj.TaxidNo = this.AuctionCompanyForm.controls.TaxIdNo.value;
      this.AuctionCompanyObj.VendorObj.TaxpayerName = this.AuctionCompanyForm.controls.TaxpayerName.value;
      this.AuctionCompanyObj.VendorObj.IsActive = this.AuctionCompanyForm.controls.IsActive.value;

      //Vendor Addr
      this.AuctionCompanyObj.VendorAddrObj.Addr = this.AuctionCompanyForm.controls.Addr.value;
      this.AuctionCompanyObj.VendorAddrObj.AreaCode2 = this.AuctionCompanyForm.controls.Kelurahan.value;
      this.AuctionCompanyObj.VendorAddrObj.AreaCode1 = this.AuctionCompanyForm.controls.Kecamatan.value;
      this.AuctionCompanyObj.VendorAddrObj.City = this.AuctionCompanyForm.controls.City.value;
      this.AuctionCompanyObj.VendorAddrObj.Zipcode = this.AuctionCompanyForm.controls["Zipcode"]["controls"].value.value;
      this.AuctionCompanyObj.VendorAddrObj.Province = this.AuctionCompanyForm.controls.Province.value;
      this.AuctionCompanyObj.VendorAddrObj.Phn1 = this.AuctionCompanyForm.controls.Phn1.value;
      this.AuctionCompanyObj.VendorAddrObj.Phn2 = this.AuctionCompanyForm.controls.Phn2.value;      

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
            this.router.navigate(['/Vendor/auctioncompany/paging']);
          });
      }
      else{
        this.http.post(URLConstant.AddAuctionCompany , this.AuctionCompanyObj).subscribe(
          (response) => {
            this.toastr.successMessage("Success!");
            this.router.navigateByUrl("/Vendor/auctioncompany/paging");
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
    
    if (this.result != null) {
      this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result["VendorAddrObj"].Zipcode };
      this.inputLookupZipcodeContactPersonObj.jsonSelect = { Zipcode: this.result["VendorContactPersonObj"].Zipcode };
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

  getLookupZipcodeContactPerson(event) {
    this.AuctionCompanyForm.patchValue({
      CityContactPerson: event.City,
      ProvinceContactPerson: event.Province
    });
  }

  NpwpCheck(isGetData: boolean = false) {
    if (this.AuctionCompanyForm.controls.IsNpwpExist.value == true) {
      this.isHidden = false;
      this.AuctionCompanyForm.controls.TaxIdNo.setValidators(Validators.required);
      this.AuctionCompanyForm.controls.TaxpayerName.setValidators(Validators.required);
    } else {
      this.AuctionCompanyForm.controls.TaxIdNo.clearValidators();
      this.AuctionCompanyForm.controls.TaxpayerName.clearValidators();
      this.isHidden = true;
    }
    this.AuctionCompanyForm.controls.TaxIdNo.updateValueAndValidity();
    this.AuctionCompanyForm.controls.TaxpayerName.updateValueAndValidity();
  }
}