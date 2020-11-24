import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UpdateCustContactInfoObj } from 'app/shared/model/UpdateMasterCust/UpdateCustContactInfoObj.Model';
import { environment } from 'environments/environment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-customer-contact-info',
  templateUrl: './update-customer-contact-info.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class UpdateCustomerContactInfoComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppContactInfo: UpdateCustContactInfoObj;
  ZipcodeLookupObj: InputLookupObj;
  JobPositionList: Array<any>;
  GenderList: Array<any>;

  CustomerContactInfoForm = this.fb.group({
    CustCompanyContactPersonId: [0],
    CustCompanyId: [0],
    ContactPersonName: ['', [Validators.required]],
    MrJobPositionCode: ['', [Validators.required]],
    JobTitleName: ['', [Validators.required]],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', [Validators.pattern("^[0-9]+$")]],
    Email1: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    Email2: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    MrGenderCode: ['', [Validators.required]],
    CustAddrId: [0],
    CustId: [0],
    MrCustAddrTypeCode: [''],
    Addr: ['', [Validators.required]],
    AreaCode1: ['', [Validators.required]],
    AreaCode2: ['', [Validators.required]],
    AreaCode3: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    AreaCode4: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    City: ['', [Validators.required]],
    Zipcode: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    RowVersionContactInfo: [''],
    RowVersionContactInfoAddr: [''],
  });

  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.ResponseTab = new EventEmitter<any>();
    this.AppContactInfo = new UpdateCustContactInfoObj();
    this.ZipcodeLookupObj = new InputLookupObj();
    this.ZipcodeLookupObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.ZipcodeLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.ZipcodeLookupObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
  }

  ngOnInit() {
    let getJobPosition = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition });
    let getGender = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender });
    let getDetail = this.http.post(URLConstant.GetContactInfoForUpdateMasterCustCompanyContactInfo, { CustDataTrxId: this.CustDataTrxId });
    forkJoin([getDetail, getJobPosition, getGender]).toPromise().then(
      (response) => {
        this.AppContactInfo = response[0]["AppContactInfo"];
        this.JobPositionList = [...response[1][CommonConstant.ReturnObj]];
        this.GenderList = [...response[2][CommonConstant.ReturnObj]];
        this.CustomerContactInfoForm.patchValue({...response[0]["MasterContactInfo"]});
        this.ZipcodeLookupObj.nameSelect = response[0]["MasterContactInfo"]["Zipcode"];
        this.ZipcodeLookupObj.jsonSelect = { Zipcode: response[0]["MasterContactInfo"]["Zipcode"] };
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  getZipcode(e){
    this.CustomerContactInfoForm.patchValue({
      Zipcode: e.Zipcode,
      AreaCode1: e.AreaCode1,
      AreaCode2: e.AreaCode2,
      City: e.City
    });
  }

  CopyAllHandler(){
    this.CustomerContactInfoForm.patchValue({
      ContactPersonName: this.AppContactInfo.ContactPersonName,
      MrJobPositionCode: this.AppContactInfo.MrJobPositionCode,
      JobTitleName: this.AppContactInfo.JobTitleName,
      MobilePhnNo1: this.AppContactInfo.MobilePhnNo1,
      MobilePhnNo2: this.AppContactInfo.MobilePhnNo2,
      Email1: this.AppContactInfo.Email1,
      Email2: this.AppContactInfo.Email2,
      MrGenderCode: this.AppContactInfo.MrGenderCode,
      Addr: this.AppContactInfo.Addr,
    });
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppContactInfo[formControlName];
    this.CustomerContactInfoForm.patchValue(obj);
  }

  back(){
    this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
  }

  SaveValue(){
    this.http.post(URLConstant.EditMasterCustCompanyContactInfo, this.CustomerContactInfoForm.value).toPromise().then(
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
