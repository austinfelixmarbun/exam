import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WizardComponent } from 'angular-archwizard';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';

@Component({
  selector: 'app-customer-company-management-shareholder-personal',
  templateUrl: './customer-company-management-shareholder-personal.component.html',
  styleUrls: ['./customer-company-management-shareholder-personal.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderPersonalComponent implements OnInit {
  @Input() inputValue: any;
  @Input() custCompanyId : any;
  @Output () outputValue : EventEmitter<object>= new EventEmitter();
  getUrl: any;
  tempMrGenderCode: any;
  tempIdType: any;
  tempMrJobPositionCode : any;
  tempMrCustModelCode : any;
  custCompanyMgmntShrholderObj : any;
  addManagementShareholderUrl : any;
  tempKTPCheck: any;
  KTP = "KTP";
  ManagementShareholderForm = this.fb.group({
    MgmntShrholderName: ['', [Validators.required,Validators.maxLength(100)]],
    MrCustModelCode: [''],
    MrIdTypeCode: [''],
    IdNo: [''],
    IdExpiredDt: [''],
    MrGenderCode: [''],
    BirthPlace: [''],
    BirthDt: [''],
    TaxIdNo: [''],
    MrJobPositionCode: [''],
    SharePrcnt: ['0'],
    IsSigner: [false], 
  });
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
    this.getUrl = AdInsConstant.GetListActiveRefMaster;
    this.addManagementShareholderUrl = AdInsConstant.AddCustCompanyMgmntShrholder;
  }

  ngOnInit() {
    var refMasterObj1 = {
      RefMasterTypeCode: "GENDER",
      RowVersion: ""
    }
    this.http.post(this.getUrl, refMasterObj1).subscribe(
      (response) => {
        this.tempMrGenderCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrGenderCode: this.tempMrGenderCode[0].Key
        });
      }
    );
	
	   var refMasterObj2 = {
      RefMasterTypeCode: "ID_TYPE"
    }
    this.http.post(this.getUrl, refMasterObj2).subscribe(
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
   
    var refMasterObj3 = {
      RefMasterTypeCode: "JOB_POSITION",
      RowVersion: ""
    }
    this.http.post(this.getUrl, refMasterObj3).subscribe(
      (response) => {
        this.tempMrJobPositionCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrJobPositionCode: this.tempMrJobPositionCode[0].Key
        });
      }
    );
    var refMasterObj4 = {
      RefMasterTypeCode: "CUST_MODEL",
      Reservefield1: "PERSONAL",
      RowVersion: ""
    }
    this.http.post(this.getUrl, refMasterObj4).subscribe(
      (response) => {
        this.tempMrCustModelCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrCustModelCode: this.tempMrCustModelCode[0].Key
        });
      }
    );


  }
  SaveValue(){ 
    this.custCompanyMgmntShrholderObj= new CustCompanyMgmntShrholderObj();
    this.custCompanyMgmntShrholderObj.custCompanyId = this.custCompanyId;
    this.custCompanyMgmntShrholderObj.MgmntShrholderName = this.ManagementShareholderForm.controls["MgmntShrholderName"].value;
    // this.custCompanyMgmntShrholderObj.MrCustModelCode = this.ManagementShareholderForm.controls["MrCustModelCode"].value;
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
}
