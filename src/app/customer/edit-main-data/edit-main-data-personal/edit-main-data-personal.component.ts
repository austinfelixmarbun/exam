import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { DatePipe } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-edit-main-data-personal',
  templateUrl: './edit-main-data-personal.component.html',
  providers: [NGXToastrService]
})
export class EditMainDataPersonalComponent implements OnInit {
  CustomerPersonalForm = this.fb.group({
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    Gender: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    TaxIdNo: [''],
    IdExpiredDt: [''],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
    CustModel: ['', [Validators.required]],
    IsVip: [true],
    IsAffiliateWithMf: [true],
    VipNotes: ['']
  });
  KTP = RefMasterConstant.EKtp;
  getListActiveRefMasterUrl: string;
  tempKTPCheck: any;
  tempGender: any;
  tempIdType: any;
  tempCustModel: any;
  editCustUrl: any;
  editCustPersonalUrl: string;
  getCustPersonalByCustIdUrl: string;
  getCustByCustIdUrl: string;
  GetListActiveRefMasterWithReserveFieldAllUrl  :string;
  tempCustPersonalObj: any;
  tempCustObj: any;
  CustId: number;
  custObj: CustObj;
  custPersonalObj: any;
  From:string;
  businessDtMin : any;
  businessDtMax: any;
  VipNotesRequired : boolean;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder,private toastr: NGXToastrService) {
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.getCustPersonalByCustIdUrl = URLConstant.GetCustPersonalbyCustId;
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
    this.editCustUrl = URLConstant.EditCust;
    this.editCustPersonalUrl = URLConstant.EditCustPersonal; 
    this.GetListActiveRefMasterWithReserveFieldAllUrl = URLConstant.GetListActiveRefMasterWithReserveFieldAll;
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
      if (params["From"] != null) {
        this.From = params["From"];
      }
    });
  }

  ngOnInit() {
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);
  
    var refMasterObjGender = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjGender).subscribe(
      (response) => {
        this.tempGender = response[CommonConstant.ReturnObj];
        if(this.tempGender.length > 0){
          this.CustomerPersonalForm.patchValue({
            Gender: this.tempGender[0].Key
          });
        }
      }
    );
    var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response[CommonConstant.ReturnObj];
        if(this.tempIdType.length > 0){
          this.CustomerPersonalForm.patchValue({
            MrIdTypeCode: this.tempIdType[0].Key
          });
        }
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;
        } else {
          this.tempKTPCheck = false;
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
        if(this.tempCustModel.length > 0){
          this.CustomerPersonalForm.patchValue({
            CustModel: this.tempCustModel[0].Key
          });
        }
      }
    );
    this.custObj = new CustObj();
    this.custPersonalObj = new CustPersonalObj();
    this.custObj.CustId = this.CustId;
    this.custPersonalObj.CustId = this.CustId;
    var datePipe = new DatePipe("en-US");
    this.http.post(this.getCustByCustIdUrl, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
        this.CustomerPersonalForm.patchValue({
          CustName: this.tempCustObj.CustName,
          MrCustTypeCode: this.tempCustObj.MrCustTypeCode,
          CustModel: this.tempCustObj.MrCustModelCode,
          MrIdTypeCode: this.tempCustObj.MrIdTypeCode,
          IdNo: this.tempCustObj.IdNo,
          IdExpiredDt: datePipe.transform(this.tempCustObj.IdExpiredDt, 'yyyy-MM-dd'),
          TaxIdNo: this.tempCustObj.TaxIdNo,
          IsVip: this.tempCustObj.IsVip,
          IsAffiliateWithMf: this.tempCustObj.IsAffiliateWithMf,
          VipNotes: this.tempCustObj.VipNotes,
        });
        if(this.tempCustObj.VipNotes!= null){
          this.VipNotesRequired = true;
        }else{
          this.VipNotesRequired = false;
        }
        if(this.tempCustObj.IsVip==false){ 
        this.CustomerPersonalForm.controls.VipNotes.disable();
        }
      }
    );
    this.http.post(this.getCustPersonalByCustIdUrl, this.custPersonalObj).subscribe(
      (response) => {
        this.tempCustPersonalObj = response;
        this.CustomerPersonalForm.patchValue({
          Gender: this.tempCustPersonalObj.MrGenderCode,
          BirthPlace: this.tempCustPersonalObj.BirthPlace,
          BirthDt: datePipe.transform(this.tempCustPersonalObj.BirthDt, 'yyyy-MM-dd'),
          MotherMaidenName: this.tempCustPersonalObj.MotherMaidenName,
          IsRestInPeace: this.tempCustPersonalObj.IsRestInPeace,
        });
      }
    );
  }
  SaveValue() {
    
    this.custObj = new CustObj();
    this.custPersonalObj = new CustPersonalObj();
    this.custObj = this.tempCustObj;
    this.custPersonalObj = this.tempCustPersonalObj;
    this.custObj.CustName = this.CustomerPersonalForm.controls["CustName"].value;
    this.custObj.MrCustModelCode = this.CustomerPersonalForm.controls["CustModel"].value;
    this.custObj.MrIdTypeCode = this.CustomerPersonalForm.controls["MrIdTypeCode"].value;
    this.custObj.IdNo = this.CustomerPersonalForm.controls["IdNo"].value;
    this.custObj.IdExpiredDt = this.CustomerPersonalForm.controls["IdExpiredDt"].value;;
    this.custObj.TaxIdNo = this.CustomerPersonalForm.controls["TaxIdNo"].value;
    this.custObj.IsVip = this.CustomerPersonalForm.controls["IsVip"].value;
    this.custObj.IsAffiliateWithMf = this.CustomerPersonalForm.controls["IsAffiliateWithMf"].value; 
    if(this.custObj.IsVip==true){
      this.custObj.VipNotes = this.CustomerPersonalForm.controls["VipNotes"].value;
    }else{
      this.custObj.VipNotes = null;
    }
    this.custPersonalObj.CustFullName = this.CustomerPersonalForm.controls["CustName"].value;
    this.custPersonalObj.MrGenderCode = this.CustomerPersonalForm.controls["Gender"].value;
    this.custPersonalObj.BirthPlace = this.CustomerPersonalForm.controls["BirthPlace"].value;
    this.custPersonalObj.BirthDt = this.CustomerPersonalForm.controls["BirthDt"].value;
    this.custPersonalObj.MotherMaidenName = this.CustomerPersonalForm.controls["MotherMaidenName"].value;
    this.http.post(this.editCustUrl, this.custObj).subscribe(
      (response) => {
        this.http.post(this.editCustPersonalUrl, this.custPersonalObj).subscribe(
          (response) => {
            console.log(this.custObj.CustNo);
            this.toastr.successMessage(response["Message"]);
            
            if (this.From == "EditMainData") {
              this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { IdCust: this.CustId, Page: 'Edit', From: 'EditMainData' } });
            } else {
              this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { IdCust: this.CustId,From:'CustPaging' } });
            } 
          },
          error => {
            console.log(error);
          }
        );
      },  
      error => {
        console.log(error);
      }
    );
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
  back(){
    if(this.From =="CustPaging"){
      this.router.navigate(["/Customer/Paging"]); 
    }
    else if(this.From = "EditMainData"){
      this.router.navigate(["/Customer/EditMainData/Paging"]);
    }
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
    console.log(this.VipNotesRequired);
  }
  this.CustomerPersonalForm.controls.VipNotes.updateValueAndValidity();
}
}