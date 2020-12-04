import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustCompanyContactPersonObj } from 'app/shared/model/CustCompanyContactPersonObj.model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { formatDate } from '@angular/common';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-customer-company-contact-information',
  templateUrl: './customer-company-contact-information.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyContactInformationComponent implements OnInit {
  @Input() custCompanyId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  readonly IdTypeNpwp: string = CommonConstant.MrIdTypeCodeNPWP;
  readonly IdTypeKitas: string = CommonConstant.MrIdTypeCodeKITAS;
  readonly IdTypeSim: string = CommonConstant.MrIdTypeCodeSIM;

  isIdExpiredDtRequired: boolean;

  tempCustAddrObj: any;
  tempMrGenderCode: KeyValueObj;
  tempMrJobPositionCode: KeyValueObj;
  tempCustCompanyContactPersonObj: any;
  tempMrIdTypeCode: KeyValueObj;
  tempMrCustRelationshipCode: KeyValueObj;

  custAddrObj: CustAddrObj;
  UcAddressObj: UcAddressObj;
  inputFieldObj: InputFieldObj;
  custCompanyContactPersonObj: CustCompanyContactPersonObj;

  IdCust: number;
  getCustAddrUrl: string;
  editCustAddrUrl: string;
  addNewCustAddrUrl: string;
  getListActiveRefMasterUrl: string;
  getCustCompanyByCustIdUrl: string;
  addCustCompanyContactPersonUrl: string;
  getCustAddrByMrCustAddrTypeUrl: string;
  editCustCompanyContactPersonByCustCompanyIdUrl: string;
  getCustCompanyContactPersonByCustCompanyIdUrl: string;

  UserAccess: Object;
  MaxDate: Date;

  ContactInformationForm = this.fb.group({
    ContactPersonName: ['', [Validators.maxLength(100), Validators.required]],
    MrGenderCode: ['', [Validators.required, Validators.maxLength(100)]],
    MrJobPositionCode: ['', [Validators.required]],
    JobTitleName: ['', [Validators.required]],
    MobilePhnNo1: ['', [Validators.pattern("^[0-9]+$"), Validators.maxLength(100), Validators.required]],
    MobilePhnNo2: ['', Validators.pattern("^[0-9]+$")],
    Email1: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    Email2: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    MrIdTypeCode: [''],
    IdNo: [''],
    IdExpiredDt: [''],
    BirthPlace: [''],
    BirthDt: [''],
    MrCustRelationshipCode: [''],
  });
  inputAddressObj: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
    this.addNewCustAddrUrl = URLConstant.AddCustAddr;
    this.addCustCompanyContactPersonUrl = URLConstant.AddCustCompanyContactPerson;
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.getCustAddrUrl = URLConstant.GetCustAddr;
    this.getCustCompanyContactPersonByCustCompanyIdUrl = URLConstant.GetCustCompanyContactPersonByCustCompanyId;
    this.getCustAddrByMrCustAddrTypeUrl = URLConstant.GetCustAddrByMrCustAddrType;
    this.editCustAddrUrl = URLConstant.EditCustAddr;
    this.editCustCompanyContactPersonByCustCompanyIdUrl = URLConstant.EditCustCompanyContactPersonByCustCompanyId
  }

  ngOnInit() {
    this.UserAccess = JSON.parse(this.cookieService.get(CommonConstant.USER_ACCESS));
    this.MaxDate = this.UserAccess[CommonConstant.BUSINESS_DT];
    this.UcAddressObj = new UcAddressObj();
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
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
    var refMasterObjMrGenderCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrGenderCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0)
          this.tempMrGenderCode = response[CommonConstant.ReturnObj];
      }
    );

    var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0)
          this.tempMrIdTypeCode = response[CommonConstant.ReturnObj];
      }
    );

    var refMasterObjMrCustRelationshipCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustRelationship,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrCustRelationshipCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0)
          this.tempMrCustRelationshipCode = response[CommonConstant.ReturnObj];
      }
    );

    this.custCompanyContactPersonObj = new CustCompanyContactPersonObj();
    this.custAddrObj = new CustAddrObj();

    var custObj = { CustId: this.IdCust };
    this.http.post(URLConstant.GetCustCompanyByCustId, custObj).subscribe(
      (response: any) => {
        this.custCompanyId = response['CustCompanyId'];

        this.custCompanyContactPersonObj.CustCompanyId = this.custCompanyId;
        this.http.post(this.getCustCompanyContactPersonByCustCompanyIdUrl, this.custCompanyContactPersonObj).subscribe(
          (response) => {
            this.tempCustCompanyContactPersonObj = response;
            this.ContactInformationForm.patchValue({
              ContactPersonName: this.tempCustCompanyContactPersonObj.ContactPersonName,
              MrGenderCode: this.tempCustCompanyContactPersonObj.MrGenderCode,
              MrJobPositionCode: this.tempCustCompanyContactPersonObj.MrJobPositionCode,
              JobTitleName: this.tempCustCompanyContactPersonObj.JobTitleName,
              MobilePhnNo1: this.tempCustCompanyContactPersonObj.MobilePhnNo1,
              MobilePhnNo2: this.tempCustCompanyContactPersonObj.MobilePhnNo2,
              Email1: this.tempCustCompanyContactPersonObj.Email1,
              Email2: this.tempCustCompanyContactPersonObj.Email2,
              MrIdTypeCode: this.tempCustCompanyContactPersonObj.MrIdTypeCode,
              IdNo: this.tempCustCompanyContactPersonObj.IdNo,
              IdExpiredDt: this.tempCustCompanyContactPersonObj.IdExpiredDt != null ? formatDate(this.tempCustCompanyContactPersonObj.IdExpiredDt, 'yyyy-MM-dd', 'en-US') : "",
              BirthPlace: this.tempCustCompanyContactPersonObj.BirthPlace,
              BirthDt: this.tempCustCompanyContactPersonObj.BirthDt != null ? formatDate(this.tempCustCompanyContactPersonObj.BirthDt, 'yyyy-MM-dd', 'en-US') : "",
              MrCustRelationshipCode: this.tempCustCompanyContactPersonObj.MrCustRelationshipCode,
            });

            if (this.tempCustCompanyContactPersonObj.MrGenderCode == null) {
              this.ContactInformationForm.patchValue({
                MrGenderCode: this.tempMrGenderCode[0].Key
              });
            }
            if (this.tempCustCompanyContactPersonObj.MrJobPositionCode == null) {
              this.ContactInformationForm.patchValue({
                MrJobPositionCode: this.tempMrJobPositionCode[0].Key
              });
            }

            if (this.tempCustCompanyContactPersonObj.MrIdTypeCode == null) {
              this.ContactInformationForm.patchValue({
                MrIdTypeCode: this.tempMrIdTypeCode[0].Key
              });
            }

            if (this.tempCustCompanyContactPersonObj.MrCustRelationshipCode == null) {
              this.ContactInformationForm.patchValue({
                MrCustRelationshipCode: this.tempMrCustRelationshipCode[0].Key
              });
            }

            this.ChangeIdType(true);
          });
      }
    );

    this.custAddrObj.CustId = this.IdCust;
    this.custAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeCompany;
    this.http.post(this.getCustAddrByMrCustAddrTypeUrl, this.custAddrObj).subscribe(
      (response) => {
        this.tempCustAddrObj = response;
        this.UcAddressObj.AreaCode1 = this.tempCustAddrObj.AreaCode1;
        this.UcAddressObj.AreaCode2 = this.tempCustAddrObj.AreaCode2;
        this.UcAddressObj.AreaCode3 = this.tempCustAddrObj.AreaCode3;
        this.UcAddressObj.AreaCode4 = this.tempCustAddrObj.AreaCode4;
        this.UcAddressObj.Addr = this.tempCustAddrObj.Addr;
        this.UcAddressObj.City = this.tempCustAddrObj.City;
        this.UcAddressObj.PhnArea1 = this.tempCustAddrObj.PhnArea1;
        this.UcAddressObj.Phn1 = this.tempCustAddrObj.Phn1;
        this.UcAddressObj.PhnExt1 = this.tempCustAddrObj.PhnExt1;
        this.UcAddressObj.PhnArea2 = this.tempCustAddrObj.PhnArea2;
        this.UcAddressObj.Phn2 = this.tempCustAddrObj.Phn2;
        this.UcAddressObj.PhnExt2 = this.tempCustAddrObj.PhnExt2;
        this.UcAddressObj.FaxArea = this.tempCustAddrObj.FaxArea;
        this.UcAddressObj.Fax = this.tempCustAddrObj.Fax;
        this.inputFieldObj.inputLookupObj.nameSelect = this.tempCustAddrObj.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustAddrObj.Zipcode };
      });
      this.inputAddressObj = new InputAddressObj();
      this.inputAddressObj.default = this.UcAddressObj;
      this.inputAddressObj.inputField = this.inputFieldObj;
      this.inputAddressObj.showPhn3 = false;
  }

  ChangeIdType(FirstInit: boolean = false) {
    let IdTypeCode = this.ContactInformationForm.get("MrIdTypeCode").value;
    if (IdTypeCode == this.IdTypeNpwp) {
      this.ContactInformationForm.get("IdNo").setValidators(Validators.required);
    } else {
      this.ContactInformationForm.get("IdNo").clearValidators();
    }
    this.ContactInformationForm.get("IdNo").updateValueAndValidity();

    if (IdTypeCode == this.IdTypeKitas || IdTypeCode == this.IdTypeSim) {
      this.ContactInformationForm.get("IdExpiredDt").setValidators(Validators.required);
      this.isIdExpiredDtRequired = true;
    } else {
      this.ContactInformationForm.get("IdExpiredDt").clearValidators();
      this.isIdExpiredDtRequired = false;
    }
    
    if(!FirstInit) this.ContactInformationForm.controls.IdExpiredDt.patchValue("");
    this.ContactInformationForm.get("IdExpiredDt").updateValueAndValidity();
  }

  // back() {
  //   this.outputTab.emit({ stepMode: 'previous' });
  // }

  SaveValue() {
    this.custCompanyContactPersonObj = new CustCompanyContactPersonObj();
    this.custAddrObj = new CustAddrObj();
    if (this.tempCustAddrObj.CustAddrId != null) {
      this.custAddrObj = this.tempCustAddrObj;
      this.custCompanyContactPersonObj = this.tempCustCompanyContactPersonObj;
    }

    this.custCompanyContactPersonObj.CustCompanyId = this.custCompanyId;
    this.custCompanyContactPersonObj.ContactPersonName = this.ContactInformationForm.controls["ContactPersonName"].value;
    this.custCompanyContactPersonObj.MrGenderCode = this.ContactInformationForm.controls["MrGenderCode"].value;
    this.custCompanyContactPersonObj.MrJobPositionCode = this.ContactInformationForm.controls["MrJobPositionCode"].value;
    this.custCompanyContactPersonObj.JobTitleName = this.ContactInformationForm.controls["JobTitleName"].value;
    this.custCompanyContactPersonObj.MobilePhnNo1 = this.ContactInformationForm.controls["MobilePhnNo1"].value;
    this.custCompanyContactPersonObj.MobilePhnNo2 = this.ContactInformationForm.controls["MobilePhnNo2"].value;
    this.custCompanyContactPersonObj.Email1 = this.ContactInformationForm.controls["Email1"].value;
    this.custCompanyContactPersonObj.Email2 = this.ContactInformationForm.controls["Email2"].value;
    this.custCompanyContactPersonObj.MrIdTypeCode = this.ContactInformationForm.controls["MrIdTypeCode"].value;
    this.custCompanyContactPersonObj.IdNo = this.ContactInformationForm.controls["IdNo"].value;
    this.custCompanyContactPersonObj.IdExpiredDt = this.ContactInformationForm.controls["IdExpiredDt"].value;
    this.custCompanyContactPersonObj.BirthPlace = this.ContactInformationForm.controls["BirthPlace"].value;
    this.custCompanyContactPersonObj.BirthDt = this.ContactInformationForm.controls["BirthDt"].value;
    this.custCompanyContactPersonObj.MrCustRelationshipCode = this.ContactInformationForm.controls["MrCustRelationshipCode"].value; 

    this.custAddrObj.CustId = this.IdCust;
    this.custAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeCompany;
    this.custAddrObj.Addr = this.ContactInformationForm.value.UcAddress.Addr;
    this.custAddrObj.AreaCode1 = this.ContactInformationForm.value.UcAddress.AreaCode1;
    this.custAddrObj.AreaCode2 = this.ContactInformationForm.value.UcAddress.AreaCode2;
    this.custAddrObj.AreaCode3 = this.ContactInformationForm.value.UcAddress.AreaCode3;
    this.custAddrObj.AreaCode4 = this.ContactInformationForm.value.UcAddress.AreaCode4;
    this.custAddrObj.City = this.ContactInformationForm.value.UcAddress.City;
    this.custAddrObj.Zipcode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.FullAddr = this.ContactInformationForm.value.UcAddress.Addr + " RT: " + this.ContactInformationForm.value.UcAddress.AreaCode4 + " RW: " + this.ContactInformationForm.value.UcAddress.AreaCode3 + " " + this.ContactInformationForm.value.UcAddress.AreaCode2 + ", " + this.ContactInformationForm.value.UcAddress.AreaCode1 + " " + this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.SubZipcode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.Fax = this.ContactInformationForm.value.UcAddress.Fax;
    this.custAddrObj.FaxArea = this.ContactInformationForm.value.UcAddress.FaxArea;
    this.custAddrObj.Phn1 = this.ContactInformationForm.value.UcAddress.Phn1;
    this.custAddrObj.Phn2 = this.ContactInformationForm.value.UcAddress.Phn2;
    this.custAddrObj.PhnArea1 = this.ContactInformationForm.value.UcAddress.PhnArea1;
    this.custAddrObj.PhnArea2 = this.ContactInformationForm.value.UcAddress.PhnArea2;
    this.custAddrObj.PhnExt1 = this.ContactInformationForm.value.UcAddress.PhnExt1;
    this.custAddrObj.PhnExt2 = this.ContactInformationForm.value.UcAddress.PhnExt2;

    if (this.tempCustCompanyContactPersonObj.CustCompanyContactPersonId != 0) {
      this.custAddrObj = this.tempCustAddrObj;
      this.custCompanyContactPersonObj = this.tempCustCompanyContactPersonObj;
      this.custCompanyContactPersonObj.RowVersion = this.tempCustCompanyContactPersonObj.RowVersion;

      this.http.post(this.editCustAddrUrl, this.custAddrObj).subscribe(
        (response) => {
          this.http.post(this.editCustCompanyContactPersonByCustCompanyIdUrl, this.custCompanyContactPersonObj).subscribe(
            (response) => {
              this.toastr.successMessage(response["Message"]);
              this.outputTab.emit({ stepMode: 'next' });
            }
          );
        }
      );
    } else {
      this.http.post(this.addNewCustAddrUrl, this.custAddrObj).subscribe(
        (response) => {
          this.http.post(this.addCustCompanyContactPersonUrl, this.custCompanyContactPersonObj).subscribe(
            (response) => {
              this.toastr.successMessage(response["Message"]);
              this.outputTab.emit({ stepMode: 'next' });
            }
          );
        }
      );
    }
  }
}
