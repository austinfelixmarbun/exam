import { Component, OnInit } from '@angular/core';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-personal-main-info',
  templateUrl: './customer-personal-main-info.component.html'
})
export class CustomerPersonalMainInfoComponent implements OnInit {

  Gender: any;
  tempGender: any;
  tempIdType: any;
  tempCustModel: any;

  custPersonalObj: CustPersonalObj;

  BirthDt: Date;
  IdExpiredDt: Date;
  businessDtMin: Date;
  businessDtMax: Date;

  IsVip: boolean;
  tempKTPCheck: boolean;
  VipNotesRequired: boolean;

  KTP: string;
  IdNo: string;
  state: string;
  TaxIdNo: string;
  VipNotes: string;
  CustName: string;
  CustModel: string;
  BirthPlace: string;
  MrIdTypeCode: string;
  MotherMaidenName: string;
  IsAffiliateWithMf: string;
  getListActiveRefMasterUrl: string;
  GetListActiveRefMasterWithReserveFieldAllUrl: string;

  CustomerPersonalForm = this.fb.group({
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    Gender: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    IdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    TaxIdNo: [''],
    IdExpiredDt: [''],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
    CustModel: ['', [Validators.required]],
    IsVip: [true],
    IsAffiliateWithMf: [true],
    VipNotes: ['', [Validators.required]]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.KTP = RefMasterConstant.EKtp;
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.GetListActiveRefMasterWithReserveFieldAllUrl = URLConstant.GetListActiveRefMasterWithReserveFieldAll;
  }

  ngOnInit() {
    this.VipNotesRequired = true;
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);


    var refMasterObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObj).subscribe(
      (response) => {
        this.tempGender = response[CommonConstant.ReturnObj];
        this.CustomerPersonalForm.patchValue({
          Gender: this.tempGender[0].Key
        });
      }
    );
    var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response[CommonConstant.ReturnObj];
        this.CustomerPersonalForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;
        
        } else {
          this.tempKTPCheck = false;
          this.CustomerPersonalForm.controls.IdExpiredDt.setValidators(Validators.required);  
          this.CustomerPersonalForm.controls.IdExpiredDt.updateValueAndValidity();
        }
      }
    );
    var refMasterObjCustModel = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustModel,
      ReserveField1: CommonConstant.CustTypePersonal,
      RowVersion: ""
    }

    this.http.post(this.GetListActiveRefMasterWithReserveFieldAllUrl, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response[CommonConstant.ReturnObj];
        this.CustomerPersonalForm.patchValue({
          CustModel: this.tempCustModel[0].Key
        });
      }
    );
  }
  checkState() {
    if (this.CustomerPersonalForm.controls.IsVip.value === true) {
      this.CustomerPersonalForm.patchValue({
        VipNotes: null
      });
      this.CustomerPersonalForm.controls.VipNotes.disable();
      this.VipNotesRequired = false;
      this.CustomerPersonalForm.controls.IdExpiredDt.clearValidators();
  
    } else {
      this.CustomerPersonalForm.controls.VipNotes.enable();
      this.CustomerPersonalForm.controls.VipNotes.setValidators(Validators.required);
      this.VipNotesRequired = true;
    }
    this.CustomerPersonalForm.controls.VipNotes.updateValueAndValidity();
  }
  SaveValue() {
    this.CustName = this.CustomerPersonalForm.controls["CustName"].value;
    this.CustModel = this.CustomerPersonalForm.controls["CustModel"].value;
    this.Gender = this.CustomerPersonalForm.controls["Gender"].value;
    this.MrIdTypeCode = this.CustomerPersonalForm.controls["MrIdTypeCode"].value;
    this.BirthPlace = this.CustomerPersonalForm.controls["BirthPlace"].value;
    this.BirthDt = this.CustomerPersonalForm.controls["BirthDt"].value;
    this.IdNo = this.CustomerPersonalForm.controls["IdNo"].value;
    this.TaxIdNo = this.CustomerPersonalForm.controls["TaxIdNo"].value;
    this.IdExpiredDt = this.CustomerPersonalForm.controls["IdExpiredDt"].value;
    this.MotherMaidenName = this.CustomerPersonalForm.controls["MotherMaidenName"].value;
    this.IsVip = this.CustomerPersonalForm.controls["IsVip"].value;
    this.IsAffiliateWithMf = this.CustomerPersonalForm.controls["IsAffiliateWithMf"].value;
    if(this.IsVip){
      this.VipNotes = this.CustomerPersonalForm.controls["VipNotes"].value;
    } 
    this.router.navigate(["/Customer/CustomerPersonal/DuplicateCheck"], { queryParams: { "CustName": this.CustName, "Gender": this.Gender, "MrIdTypeCode": this.MrIdTypeCode, "CustModel": this.CustModel, "BirthPlace": this.BirthPlace, "BirthDt": this.BirthDt, "IdNo": this.IdNo, "TaxIdNo": this.TaxIdNo, "IdExpiredDt": this.IdExpiredDt, "MotherMaidenName": this.MotherMaidenName, "IsVip": this.IsVip, "IsAffiliateWithMf": this.IsAffiliateWithMf, "VipNotes": this.VipNotes } });
  }
  onOptionsSelected(event) {
    if (event.target.value == this.KTP) {
      this.CustomerPersonalForm.controls.IdExpiredDt.clearValidators();
      this.tempKTPCheck = true;
    } else {
      this.CustomerPersonalForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.CustomerPersonalForm.controls.IdExpiredDt.updateValueAndValidity();
  }

}

