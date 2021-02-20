import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { DatePipe } from '@angular/common';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/LibraryObj/CustomPatternObj.model';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-company-management-shareholder-personal',
  templateUrl: './customer-company-management-shareholder-personal.component.html',
  styleUrls: [],
  providers: [NGXToastrService, RegexService],
})
export class CustomerCompanyManagementShareholderPersonalComponent implements OnInit {
  @Input() custCompanyId : number;
  @Input() CustCompanyMgmntShrholderId : number;
  @Input() TotalShare : number;
  @Output() outputTab : EventEmitter<object>= new EventEmitter();
  isExistingCust: boolean;
  
  tempIdType: any;
  tempMrGenderCode: any;
  tempMrCustModelCode : any;
  tempMrJobPositionCode : any;
  tempCustCompanyMgmntShrholderObj : any;

  inputLookupCustPersonalObj : InputLookupObj;
  custCompanyMgmntShrholderObj : CustCompanyMgmntShrholderObj;

  isIdExpiredDtRequired: boolean;

  KTP: string;
  tempShareholderCustNo: string;
  getListActiveRefMasterUrl: string;
  addManagementShareholderUrl : string;
  editManagementShareholderUrl : string;
  getCustCompanyMgmntShrholderUrl : string;
  getListKeyValueByMrCustTypeCode: string;

  MaxDate: Date;
  UserAccess: Object;


  ManagementShareholderForm = this.fb.group({
    CustCompanyMgmntShrholderId: [0],
    CustId: [0],
    ShareholderId: [0],
    MgmntShrholderName: ['', [Validators.required,Validators.maxLength(100)]],
    MrCustModelCode: ['', [Validators.required]],
    MrIdTypeCode: ['',[Validators.required]],
    IdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    IdExpiredDt: [''],
    MrGenderCode: ['', [Validators.required]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    TaxIdNo: [''],
    MrJobPositionCode: ['',[Validators.required]],
    SharePrcnt: ['1',[ Validators.min(1),Validators.max(100)]],
    IsSigner: [false],
    IsActive: [false],
    IsOwner: [false]
  });

  constructor(private regexService: RegexService,  private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService) {
    this.KTP = RefMasterConstant.EKtp;
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.addManagementShareholderUrl = URLConstant.AddCustCompanyMgmntShrholderNew;
    this.getCustCompanyMgmntShrholderUrl = URLConstant.GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId;
    this.editManagementShareholderUrl = URLConstant.EditCustCompanyMgmntShrholderNew; 
    this.getListKeyValueByMrCustTypeCode = URLConstant.GetListKeyValueByMrCustTypeCode;
    this.isExistingCust = false;
  }

  ngOnInit() {
    this.customPattern = new Array<CustomPatternObj>();
    this.UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.MaxDate = this.UserAccess[CommonConstant.BUSINESS_DT];
    this.inputLookupCustPersonalObj = new InputLookupObj();
    this.inputLookupCustPersonalObj.urlJson = "./assets/lookup/lookUpExistingCustPersonal.json";
    this.inputLookupCustPersonalObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupCustPersonalObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupCustPersonalObj.pagingJson = "./assets/lookup/lookUpExistingCustPersonal.json";
    this.inputLookupCustPersonalObj.genericJson = "./assets/lookup/lookUpExistingCustPersonal.json";
    this.inputLookupCustPersonalObj.isRequired = false;
    var refMasterObjMrGenderCode= {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrGenderCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.tempMrGenderCode = response[CommonConstant.ReturnObj];
          this.ManagementShareholderForm.patchValue({
            MrGenderCode: this.tempMrGenderCode[0].Key
          });
        }
      }
    );
	
	   var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.tempIdType = response[CommonConstant.ReturnObj];
          this.ManagementShareholderForm.patchValue({
            MrIdTypeCode: this.tempIdType[0].Key
          });
          this.ChangeIdType(this.tempIdType[0].Key);
          if(this.tempIdType != undefined)
          {
            this.getInitPattern();
          }
        }
      }
    );
   
    var refMasterObjMrJobPositionCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrJobPositionCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.tempMrJobPositionCode = response[CommonConstant.ReturnObj];
          this.ManagementShareholderForm.patchValue({
            MrJobPositionCode: this.tempMrJobPositionCode[0].Key
          });
        }
      }
    );
    var refMasterObjCustModel = {
      MrCustTypeCode: CommonConstant.CustTypePersonal
    }
    this.http.post(this.getListKeyValueByMrCustTypeCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempMrCustModelCode = response;
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.tempMrCustModelCode = response[CommonConstant.ReturnObj];
          this.ManagementShareholderForm.patchValue({
            MrCustModelCode: this.tempMrCustModelCode[0].Key
          });
      }
    }
    ); 
    if(this.CustCompanyMgmntShrholderId!=null){
      this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
      this.custCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId  = this.CustCompanyMgmntShrholderId;
      // this.http.post(this.getCustCompanyMgmntShrholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
      this.http.post(URLConstant.GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderIdNew, this.custCompanyMgmntShrholderObj).subscribe(
        (response) => {
          this.tempCustCompanyMgmntShrholderObj = response;
          var datePipe = new DatePipe("en-US");
          this.ManagementShareholderForm.patchValue({ 
            CustCompanyMgmntShrholderId: this.tempCustCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId,
            CustId: this.tempCustCompanyMgmntShrholderObj.CustId,
            ShareholderId: this.tempCustCompanyMgmntShrholderObj.ShareholderId,
            MgmntShrholderName: this.tempCustCompanyMgmntShrholderObj.MgmntShrholderName,
            MrCustModelCode:  this.tempCustCompanyMgmntShrholderObj.MrCustModelCode,
            MrIdTypeCode: this.tempCustCompanyMgmntShrholderObj.MrIdTypeCode,
            IdNo : this.tempCustCompanyMgmntShrholderObj.IdNo,
            IdExpiredDt: datePipe.transform(this.tempCustCompanyMgmntShrholderObj.IdExpiredDt, 'yyyy-MM-dd'),
            MrGenderCode : this.tempCustCompanyMgmntShrholderObj.MrGenderCode,
            BirthPlace : this.tempCustCompanyMgmntShrholderObj.BirthPlace,   
            BirthDt: datePipe.transform(this.tempCustCompanyMgmntShrholderObj.BirthDt, 'yyyy-MM-dd'),
            MrJobPositionCode : this.tempCustCompanyMgmntShrholderObj.MrJobPositionCode,
            // MrCompanyTypeCode: this.tempCustCompanyMgmntShrholderObj.MrCompanyTypeCode ,
            TaxIdNo:  this.tempCustCompanyMgmntShrholderObj.TaxIdNo,
            SharePrcnt: this.tempCustCompanyMgmntShrholderObj.SharePrcnt,
            IsSigner: this.tempCustCompanyMgmntShrholderObj.IsSigner,
            IsActive: this.tempCustCompanyMgmntShrholderObj.IsActive,
            IsOwner: this.tempCustCompanyMgmntShrholderObj.IsOwner
          });
          if(this.tempCustCompanyMgmntShrholderObj.ShareholderCustNo!=null){ 
            this.ManagementShareholderForm.controls.MgmntShrholderName.disable();
            this.ManagementShareholderForm.controls.MrCustModelCode.disable();
            this.ManagementShareholderForm.controls.MrIdTypeCode.disable();
            this.ManagementShareholderForm.controls.IdExpiredDt.disable();
            this.ManagementShareholderForm.controls.IdNo.disable();
            this.ManagementShareholderForm.controls.BirthPlace.disable();
            this.ManagementShareholderForm.controls.BirthDt.disable();
            this.ManagementShareholderForm.controls.MrGenderCode.disable();
            this.ManagementShareholderForm.controls.TaxIdNo.disable(); 
          }

          this.TotalShare = this.TotalShare - parseFloat(this.tempCustCompanyMgmntShrholderObj.SharePrcnt);
        }
      );
      
    }
    else{
      this.ManagementShareholderForm.patchValue({ 
        CustId: this.custCompanyId
      });
    } 
  }

  LeftShare: number;
  TotalShareCurrent: number;
  SaveValue(){
    this.TotalShareCurrent = this.TotalShare + parseFloat(this.ManagementShareholderForm.controls["SharePrcnt"].value);
    if(this.TotalShareCurrent > 100){
      this.LeftShare = 100 - this.TotalShare;
      this.toastr.warningMessage("Total Share left is "+this.LeftShare+"%");
      return;
    }

    this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
    this.custCompanyMgmntShrholderObj.CustId = this.custCompanyId;
    if(this.CustCompanyMgmntShrholderId!=null){ 
      this.custCompanyMgmntShrholderObj = this.tempCustCompanyMgmntShrholderObj;
      this.custCompanyMgmntShrholderObj.MgmntShrholderName = this.ManagementShareholderForm.controls["MgmntShrholderName"].value;
      this.custCompanyMgmntShrholderObj.MrCustModelCode = this.ManagementShareholderForm.controls["MrCustModelCode"].value;
      this.custCompanyMgmntShrholderObj.MrIdTypeCode = this.ManagementShareholderForm.controls["MrIdTypeCode"].value;
      this.custCompanyMgmntShrholderObj.IdNo = this.ManagementShareholderForm.controls["IdNo"].value;
      this.custCompanyMgmntShrholderObj.IdExpiredDt = this.ManagementShareholderForm.controls["IdExpiredDt"].value;
      this.custCompanyMgmntShrholderObj.MrGenderCode = this.ManagementShareholderForm.controls["MrGenderCode"].value;
      this.custCompanyMgmntShrholderObj.BirthPlace = this.ManagementShareholderForm.controls["BirthPlace"].value;
      this.custCompanyMgmntShrholderObj.BirthDt = this.ManagementShareholderForm.controls["BirthDt"].value;
      this.custCompanyMgmntShrholderObj.TaxIdNo = this.ManagementShareholderForm.controls["TaxIdNo"].value;
      this.custCompanyMgmntShrholderObj.MrJobPositionCode = this.ManagementShareholderForm.controls["MrJobPositionCode"].value;
      this.custCompanyMgmntShrholderObj.SharePrcnt = this.ManagementShareholderForm.controls["SharePrcnt"].value;
      this.custCompanyMgmntShrholderObj.IsSigner = this.ManagementShareholderForm.controls["IsSigner"].value;
      this.custCompanyMgmntShrholderObj.IsActive = this.ManagementShareholderForm.controls["IsActive"].value;
      this.custCompanyMgmntShrholderObj.IsOwner = this.ManagementShareholderForm.controls["IsOwner"].value;
      this.custCompanyMgmntShrholderObj.MrCustTypeCode = RefMasterConstant.Personal;
      
      this.http.post(this.editManagementShareholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.outputTab.emit({mode : 'check'});
        }
      );
    }else{
      if(this.tempShareholderCustNo!=null){
        this.custCompanyMgmntShrholderObj.ShareholderCustNo = this.tempShareholderCustNo;
      }
      if(this.custExistingId != 0){
        this.custCompanyMgmntShrholderObj.ShareholderId = this.custExistingId;
      }
      // this.custCompanyMgmntShrholderObj.CustCompanyId = this.custCompanyId;
      this.custCompanyMgmntShrholderObj.MgmntShrholderName = this.ManagementShareholderForm.controls["MgmntShrholderName"].value;
      this.custCompanyMgmntShrholderObj.MrCustModelCode = this.ManagementShareholderForm.controls["MrCustModelCode"].value;
      this.custCompanyMgmntShrholderObj.MrIdTypeCode = this.ManagementShareholderForm.controls["MrIdTypeCode"].value;
      this.custCompanyMgmntShrholderObj.IdNo = this.ManagementShareholderForm.controls["IdNo"].value;
      this.custCompanyMgmntShrholderObj.IdExpiredDt = this.ManagementShareholderForm.controls["IdExpiredDt"].value;
      this.custCompanyMgmntShrholderObj.MrGenderCode = this.ManagementShareholderForm.controls["MrGenderCode"].value;
      this.custCompanyMgmntShrholderObj.BirthPlace = this.ManagementShareholderForm.controls["BirthPlace"].value;
      this.custCompanyMgmntShrholderObj.BirthDt = this.ManagementShareholderForm.controls["BirthDt"].value;
      this.custCompanyMgmntShrholderObj.TaxIdNo = this.ManagementShareholderForm.controls["TaxIdNo"].value;
      this.custCompanyMgmntShrholderObj.MrJobPositionCode = this.ManagementShareholderForm.controls["MrJobPositionCode"].value;
      this.custCompanyMgmntShrholderObj.SharePrcnt = this.ManagementShareholderForm.controls["SharePrcnt"].value;
      this.custCompanyMgmntShrholderObj.IsSigner = this.ManagementShareholderForm.controls["IsSigner"].value;
      this.custCompanyMgmntShrholderObj.IsActive = this.ManagementShareholderForm.controls["IsActive"].value;
      this.custCompanyMgmntShrholderObj.IsOwner = this.ManagementShareholderForm.controls["IsOwner"].value; 
      this.custCompanyMgmntShrholderObj.MrCustTypeCode = RefMasterConstant.Personal;

      if(this.isExistingCust){
        this.http.post(this.addManagementShareholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            this.outputTab.emit({mode : 'check'});
          }
        );
      }
      else{
        this.outputTab.emit({mode : 'duplicatePersonal', ShareholderData: this.custCompanyMgmntShrholderObj});
      }
    }
  }

  back(){
    this.outputTab.emit({mode : 'check'});
  }

  onOptionsSelected(event){  
    this.ChangeIdType(event.target.value);
    this.setValidatorPattern();
  }

  ChangeIdType(IdType: string) {
    this.ManagementShareholderForm.controls.IdExpiredDt.patchValue("");

    if (IdType == RefMasterConstant.KITAS || IdType == RefMasterConstant.SIM) {
      this.ManagementShareholderForm.controls.IdExpiredDt.setValidators([Validators.required]);
      this.isIdExpiredDtRequired = true;
    } else {
      this.ManagementShareholderForm.controls.IdExpiredDt.clearValidators();
      this.isIdExpiredDtRequired = false;
    }

    if(IdType == RefMasterConstant.Npwp || IdType == RefMasterConstant.EKtp || IdType == RefMasterConstant.AKTA){
      this.ManagementShareholderForm.controls.IdExpiredDt.disable();
    }else{
      this.ManagementShareholderForm.controls.IdExpiredDt.enable();
    }

    this.ManagementShareholderForm.controls.IdExpiredDt.updateValueAndValidity();
  }

  custExistingId: number = 0;
  getLookUpCustomer(event) {
    this.custExistingId = event.CustId;
    var datePipe = new DatePipe("en-US");
    this.ManagementShareholderForm.patchValue({
      MgmntShrholderName: event.CustName,
      MrCustModelCode: event.MrCustModelCode,
      MrIdTypeCode : event.MrIdTypeCode,
      IdNo: event.IdNo, 
      // IdExpiredDt: datePipe.transform(event.IdExpiredDt, 'yyyy-MM-dd'),
      BirthDt: datePipe.transform(event.BirthDt, 'yyyy-MM-dd'),
      MrGenderCode : event.MrGenderCode,
      BirthPlace: event.BirthPlace, 
      TaxIdNo : event.TaxIdNo,
    }); 

    if(event.MrIdTypeCode != CommonConstant.MrIdTypeCodeEKTP){
      if(event.IdExpiredDt){
        this.ManagementShareholderForm.patchValue({
          IdExpiredDt: datePipe.transform(event.IdExpiredDt, 'yyyy-MM-dd')
        });
      }
    }
    this.tempShareholderCustNo = event.CustNo;
    
    this.ManagementShareholderForm.controls.MgmntShrholderName.disable();
    this.ManagementShareholderForm.controls.MrCustModelCode.disable();
    this.ManagementShareholderForm.controls.MrIdTypeCode.disable();
    this.ManagementShareholderForm.controls.IdExpiredDt.disable();
    this.ManagementShareholderForm.controls.IdNo.disable();
    this.ManagementShareholderForm.controls.BirthPlace.disable();
    this.ManagementShareholderForm.controls.BirthDt.disable();
    this.ManagementShareholderForm.controls.MrGenderCode.disable();
    this.ManagementShareholderForm.controls.TaxIdNo.disable(); 
    this.isExistingCust = true;
  }

  //START URS-LOS-041
  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj>;
  initIdTypeCode: any;
  resultPattern: any;

  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if(this.resultPattern != undefined)
        {
          for (let i = 0; i < this.resultPattern.length; i++) {
            let patternObj: CustomPatternObj = new CustomPatternObj();
            let pattern: string = this.resultPattern[i].Value;
    
            patternObj.pattern = pattern;
            patternObj.invalidMsg = this.regexService.getErrMessage(pattern);
            this.customPattern.push(patternObj);
          }
          this.setValidatorPattern();
        }
      }
    );
  }
  // setValidatorPattern(){
  //   let idTypeValue: string;

  //   idTypeValue = this.ManagementShareholderForm.controls[this.controlNameIdType].value;

  //   if (this.resultPattern != undefined) {
  //     var result = this.resultPattern.find(x => x.Key == idTypeValue)

  //     if (result != undefined) {
  //       var pattern = result.Value;
  //       if (pattern != undefined) {
  //         this.setValidator(pattern);
  //       }
  //     }
  //   }
  // }

  setValidatorPattern() {
    let idTypeValue: string;
    idTypeValue = this.ManagementShareholderForm.controls[this.controlNameIdType].value;
    var pattern: string = '';
    if (idTypeValue != undefined) {
      if (this.resultPattern != undefined) {
        var result = this.resultPattern.find(x => x.Key == idTypeValue)
        if (result != undefined) {
          pattern = result.Value;
        }
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    if (pattern != undefined) {
      this.ManagementShareholderForm.controls[this.controlNameIdNo].setValidators([Validators.required, Validators.pattern(pattern)]);
      this.ManagementShareholderForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041
}
