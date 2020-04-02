import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { DatePipe } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';

@Component({
  selector: 'app-edit-main-data-personal',
  templateUrl: './edit-main-data-personal.component.html',
  styleUrls: ['./edit-main-data-personal.component.scss'],
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
    TaxIdNo: ['', [Validators.required]],
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
  CustId: any;
  custObj: any;
  custPersonalObj: any;
  From:any;
  businessDtMin : any;
  businessDtMax: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder,private toastr: NGXToastrService) {
    this.getListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
    this.getCustPersonalByCustIdUrl = AdInsConstant.GetCustPersonalbyCustId;
    this.getCustByCustIdUrl = AdInsConstant.GetCustByCustId;
    this.editCustUrl = AdInsConstant.EditCust;
    this.editCustPersonalUrl = AdInsConstant.EditCustPersonal; 
    this.GetListActiveRefMasterWithReserveFieldAllUrl = AdInsConstant.GetListActiveRefMasterWithReserveFieldAll;
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
    var context = JSON.parse(localStorage.getItem("UserAccess"));
    this.businessDtMin = new Date(context["BusinessDt"]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context["BusinessDt"]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);
  
    var refMasterObjGender = {
      RefMasterTypeCode: "GENDER",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjGender).subscribe(
      (response) => {
        this.tempGender = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          Gender: this.tempGender[0].Key
        });
      }
    );
    var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: "ID_TYPE",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;
        } else {
          this.tempKTPCheck = false;
        }
      }
    );
    var refMasterObjCustModel = {
      RefMasterTypeCode: "CUST_MODEL",
      ReserveField1: "PERSONAL",
      RowVersion: ""
    }

    this.http.post(this.GetListActiveRefMasterWithReserveFieldAllUrl, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          CustModel: this.tempCustModel[0].Key
        });
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
    this.custObj.VipNotes = this.CustomerPersonalForm.controls["VipNotes"].value;
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
              this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { IdCust: this.CustId, Page: 'Edit' } });
            } else {
              this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { IdCust: this.CustId } });
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
}