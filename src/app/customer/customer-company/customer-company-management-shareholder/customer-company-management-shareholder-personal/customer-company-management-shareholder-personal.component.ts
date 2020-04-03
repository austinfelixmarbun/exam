import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WizardComponent } from 'angular-archwizard';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { DatePipe } from '@angular/common';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';

@Component({
  selector: 'app-customer-company-management-shareholder-personal',
  templateUrl: './customer-company-management-shareholder-personal.component.html',
  styleUrls: ['./customer-company-management-shareholder-personal.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderPersonalComponent implements OnInit {
   
  @Input() custCompanyId : any;
  @Input() CustCompanyMgmntShrholderId : any;
  @Output () outputValue : EventEmitter<object>= new EventEmitter();
  getListActiveRefMasterUrl: any;
  tempMrGenderCode: any;
  tempIdType: any;
  tempMrJobPositionCode : any;
  tempMrCustModelCode : any;
  custCompanyMgmntShrholderObj : any;
  addManagementShareholderUrl : any;
  tempKTPCheck: any;
  KTP = RefMasterConstant.EKtp;
  getCustCompanyMgmntShrholderUrl : string;
  editManagementShareholderUrl : string;
  GetListActiveRefMasterWithReserveFieldAllUrl : string;
  tempCustCompanyMgmntShrholderObj : any;
  inputLookupCustPersonalObj : any;
  tempShareholderCustNo : any;
  ManagementShareholderForm = this.fb.group({
    MgmntShrholderName: ['', [Validators.required,Validators.maxLength(100)]],
    MrCustModelCode: [''],
    MrIdTypeCode: ['',[Validators.required]],
    IdNo: ['',Validators.pattern("^[0-9]+$")],
    IdExpiredDt: ['',[Validators.required]],
    MrGenderCode: [''],
    BirthPlace: [''],
    BirthDt: [''],
    TaxIdNo: ['',Validators.pattern("^[0-9]+$")],
    MrJobPositionCode: ['',[Validators.required]],
    SharePrcnt: ['1',[ Validators.min(1),Validators.max(100)]],
    
    // SharePrcnt: new FormControl('1', Validators.compose([ Validators.min(0), Validators.max(100)])),
    IsSigner: [false], 
  });
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
    this.getListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
    this.addManagementShareholderUrl = AdInsConstant.AddCustCompanyMgmntShrholder;
    this.getCustCompanyMgmntShrholderUrl = AdInsConstant.GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId;
    this.editManagementShareholderUrl = AdInsConstant.EditCustCompanyMgmntShrholder; 
    this.GetListActiveRefMasterWithReserveFieldAllUrl = AdInsConstant.GetListActiveRefMasterWithReserveFieldAll;
  }

  ngOnInit() {

    this.inputLookupCustPersonalObj = new InputLookupObj();
    this.inputLookupCustPersonalObj.urlJson = "./assets/lookup/lookUpExistingCustPersonal.json";
    this.inputLookupCustPersonalObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupCustPersonalObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupCustPersonalObj.pagingJson = "./assets/lookup/lookUpExistingCustPersonal.json";
    this.inputLookupCustPersonalObj.genericJson = "./assets/lookup/lookUpExistingCustPersonal.json";
    this.inputLookupCustPersonalObj.isRequired = false;
    var refMasterObjMrGenderCode= {
      RefMasterTypeCode: "GENDER",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrGenderCode).subscribe(
      (response) => {
        this.tempMrGenderCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrGenderCode: this.tempMrGenderCode[0].Key
        });
      }
    );
	
	   var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: "ID_TYPE"
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;
        } else {
          this.tempKTPCheck = false;
        }
      }
    );
   
    var refMasterObjMrJobPositionCode = {
      RefMasterTypeCode: "JOB_POSITION",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrJobPositionCode).subscribe(
      (response) => {
        this.tempMrJobPositionCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrJobPositionCode: this.tempMrJobPositionCode[0].Key
        });
      }
    );
    var refMasterObjMrCustModelCode = {
      RefMasterTypeCode: "CUST_MODEL",
      Reservefield1: "PERSONAL",
      RowVersion: ""
    }
    this.http.post(this.GetListActiveRefMasterWithReserveFieldAllUrl, refMasterObjMrCustModelCode).subscribe(
      (response) => {
        this.tempMrCustModelCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrCustModelCode: this.tempMrCustModelCode[0].Key
        });
      }
    );
    if(this.CustCompanyMgmntShrholderId!=null){
      this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
      this.custCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId  = this.CustCompanyMgmntShrholderId;
      this.http.post(this.getCustCompanyMgmntShrholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
        (response) => {
          this.tempCustCompanyMgmntShrholderObj = response;
          var datePipe = new DatePipe("en-US");
          console.log(this.tempCustCompanyMgmntShrholderObj);
          this.ManagementShareholderForm.patchValue({ 
            
            MgmntShrholderName: this.tempCustCompanyMgmntShrholderObj.MgmntShrholderName,
            MrCustModelCode:  this.tempCustCompanyMgmntShrholderObj.MrCustModelCode,
            MrIdTypeCode: this.tempCustCompanyMgmntShrholderObj.MrIdTypeCode,
            IdNo : this.tempCustCompanyMgmntShrholderObj.IdNo,
            IdExpiredDt: datePipe.transform(this.tempCustCompanyMgmntShrholderObj.IdExpiredDt, 'yyyy-MM-dd'),
            MrGenderCode : this.tempCustCompanyMgmntShrholderObj.MrGenderCode,
            BirthPlace : this.tempCustCompanyMgmntShrholderObj.BirthPlace,   
            BirthDt: datePipe.transform(this.tempCustCompanyMgmntShrholderObj.BirthDt, 'yyyy-MM-dd'),
            MrJobPositionCode : this.tempCustCompanyMgmntShrholderObj.MrJobPositionCode,
            MrCompanyTypeCode: this.tempCustCompanyMgmntShrholderObj.MrCompanyTypeCode ,
            TaxIdNo:  this.tempCustCompanyMgmntShrholderObj.TaxIdNo,
            SharePrcnt: this.tempCustCompanyMgmntShrholderObj.SharePrcnt,
            IsSigner: this.tempCustCompanyMgmntShrholderObj.IsSigner
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
            this.ManagementShareholderForm.controls.TaxIdNo.disable(); ;
          }
        }
      );
      
    } 
  

  }
  SaveValue(){ 
    this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
    this.custCompanyMgmntShrholderObj.custCompanyId = this.custCompanyId;
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
      this.custCompanyMgmntShrholderObj.MrCustTypeCode = "Personal";
      this.http.post(this.editManagementShareholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.outputValue.emit({mode : 'check'});
        },
        error => {
          console.log(error);
        }
      );
    }else{

      if(this.tempShareholderCustNo!=null){
        this.custCompanyMgmntShrholderObj.ShareholderCustNo = this.tempShareholderCustNo;
      }
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
      this.custCompanyMgmntShrholderObj.MrCustTypeCode = "Personal";
      this.http.post(this.addManagementShareholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.outputValue.emit({mode : 'check'});
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  back(){
    this.outputValue.emit({mode : 'check'});
  }
  onOptionsSelected(event){  
    if(event.target.value == this.KTP){
      this.ManagementShareholderForm.controls.IdExpiredDt.clearValidators();
      this.tempKTPCheck= true;
    }else{
      this.ManagementShareholderForm.controls.IdExpiredDt.setValidators(Validators.required);  
      this.tempKTPCheck=false;
    }
    this.ManagementShareholderForm.controls.IdExpiredDt.updateValueAndValidity();
  }

  

  getLookUpCustomer(event) {
    
    var datePipe = new DatePipe("en-US");
    this.ManagementShareholderForm.patchValue({
      MgmntShrholderName: event.CustName,
      MrCustModelCode: event.MrCustModelCode,
      MrIdTypeCode : event.MrIdTypeCode,
      IdNo: event.IdNo, 
      IdExpiredDt: datePipe.transform(event.IdExpiredDt, 'yyyy-MM-dd'),
      BirthDt: datePipe.transform(event.BirthDt, 'yyyy-MM-dd'),
      MrGenderCode : event.MrGenderCode,
      BirthPlace: event.BirthPlace, 
      TaxIdNo : event.TaxIdNo,
    }); 
    this.tempShareholderCustNo = event.CustNo;
    
    console.log(this.tempShareholderCustNo);
    this.ManagementShareholderForm.controls.MgmntShrholderName.disable();
    this.ManagementShareholderForm.controls.MrCustModelCode.disable();
    this.ManagementShareholderForm.controls.MrIdTypeCode.disable();
    this.ManagementShareholderForm.controls.IdExpiredDt.disable();
    this.ManagementShareholderForm.controls.IdNo.disable();
    this.ManagementShareholderForm.controls.BirthPlace.disable();
    this.ManagementShareholderForm.controls.BirthDt.disable();
    this.ManagementShareholderForm.controls.MrGenderCode.disable();
    this.ManagementShareholderForm.controls.TaxIdNo.disable(); ;
  }
}
