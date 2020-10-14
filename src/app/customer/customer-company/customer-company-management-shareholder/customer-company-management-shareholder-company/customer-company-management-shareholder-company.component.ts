import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-company-management-shareholder-company',
  templateUrl: './customer-company-management-shareholder-company.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderCompanyComponent implements OnInit {
  @Input() custCompanyId: number;
  @Input() CustCompanyMgmntShrholderId: number;
  @Input() TotalShare : number;
  @Output () outputValue : EventEmitter<object> = new EventEmitter();
  lookUpIndustryTypeObj: InputLookupObj;
  isExistingCust: boolean;

  inputLookupCustCompanyObj : InputLookupObj;
  custCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;

  tempMrCustModelCode: any;
  tempMrCompanyTypeCode: any;
  tempCustCompanyMgmntShrholderObj : any;

  tempShareholderCustNo : string;
  getListActiveRefMasterUrl: string;
  addManagementShareholderUrl: string;
  editManagementShareholderUrl: string;
  getCustCompanyMgmntShrholderUrl: string;
  getListKeyValueByMrCustTypeCode: string;

  ManagementShareholderForm = this.fb.group({
    MgmntShrholderName: ['', [Validators.maxLength(100) ,Validators.required]],
    MrCustModelCode: [''],
    MrCompanyTypeCode: ['',[Validators.required]],
    TaxIdNo: [''],
    SharePrcnt: ['1',[ Validators.min(1),Validators.max(100)]],
    MrIndustryTypeCode: [''],
    IsSigner: [false],
    IsActive: [false],
    IsOwner: [false]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.addManagementShareholderUrl = URLConstant.AddCustCompanyMgmntShrholderNew;
    this.getCustCompanyMgmntShrholderUrl = URLConstant.GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderIdNew;
    this.editManagementShareholderUrl = URLConstant.EditCustCompanyMgmntShrholderNew; 
    this.getListKeyValueByMrCustTypeCode = URLConstant.GetListKeyValueByMrCustTypeCode;
    this.isExistingCust = false;
  }

  ngOnInit() {  
    this.inputLookupCustCompanyObj = new InputLookupObj();
    this.inputLookupCustCompanyObj.urlJson = "./assets/lookup/lookUpExistingCustCompany.json";
    this.inputLookupCustCompanyObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupCustCompanyObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupCustCompanyObj.pagingJson = "./assets/lookup/lookUpExistingCustCompany.json";
    this.inputLookupCustCompanyObj.genericJson = "./assets/lookup/lookUpExistingCustCompany.json";
    this.inputLookupCustCompanyObj.isRequired = false;
    var refMasterObjMrCompanyTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCompanyType,
      RowVersion: ""
    }

    this.lookUpIndustryTypeObj = new InputLookupObj();
    this.lookUpIndustryTypeObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpIndustryTypeObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookUpIndustryTypeObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookUpIndustryTypeObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpIndustryTypeObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpIndustryTypeObj.isRequired = true;

    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.tempMrCompanyTypeCode = response[CommonConstant.ReturnObj];
          this.ManagementShareholderForm.patchValue({
            MrCompanyTypeCode: this.tempMrCompanyTypeCode[0].Key
          });
        }
      }
    );
    
    var refMasterObjCustModel = {
      MrCustTypeCode: CommonConstant.CustTypeCompany
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
      this.http.post(this.getCustCompanyMgmntShrholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
        (response) => {
          this.tempCustCompanyMgmntShrholderObj = response;
          this.http.post(URLConstant.GetRefIndustryTypeByIndustryTypeCode, { IndustryTypeCode: response["MrIndustryTypeCode"] }).subscribe(
            (response) => {
              this.lookUpIndustryTypeObj.nameSelect = response["IndustryTypeName"]; 
              this.lookUpIndustryTypeObj.jsonSelect = response;
            },
            (error) => {
              console.log(error);
            }
          );
          
          this.ManagementShareholderForm.patchValue({ 
            MgmntShrholderName: this.tempCustCompanyMgmntShrholderObj.MgmntShrholderName,
            MrCustModelCode:  this.tempCustCompanyMgmntShrholderObj.MrCustModelCode,
            MrCompanyTypeCode: this.tempCustCompanyMgmntShrholderObj.MrCompanyTypeCode ,
            TaxIdNo:  this.tempCustCompanyMgmntShrholderObj.TaxIdNo,
            SharePrcnt: this.tempCustCompanyMgmntShrholderObj.SharePrcnt,
            IsSigner: this.tempCustCompanyMgmntShrholderObj.IsSigner,
            IsActive: this.tempCustCompanyMgmntShrholderObj.IsActive,
            IsOwner: this.tempCustCompanyMgmntShrholderObj.IsOwner,
            MrIndustryTypeCode: this.tempCustCompanyMgmntShrholderObj.MrIndustryTypeCode
          });
          if(this.tempCustCompanyMgmntShrholderObj.ShareholderCustNo!=null){ 
            this.ManagementShareholderForm.controls.MgmntShrholderName.disable();
            this.ManagementShareholderForm.controls.MrCustModelCode.disable();  
            this.ManagementShareholderForm.controls.MrCompanyTypeCode.disable(); 
            this.ManagementShareholderForm.controls.TaxIdNo.disable(); ;
          }
          this.TotalShare = this.TotalShare - parseFloat(this.tempCustCompanyMgmntShrholderObj.SharePrcnt);
        }
      );
    } 
  }

  getLookUpIndustry(e){
    this.ManagementShareholderForm.patchValue({
      MrIndustryTypeCode: e.IndustryTypeCode
    });
  }

  LeftShare: number;
  TotalShareCurrent: number;
  SaveValue() {
    this.TotalShareCurrent = this.TotalShare + parseFloat(this.ManagementShareholderForm.controls["SharePrcnt"].value);

    if(this.TotalShareCurrent > 100){
      this.LeftShare = 100 - this.TotalShare;
      this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_LEFT +this.LeftShare+"%");
      return;
    }

    if(!this.ManagementShareholderForm.controls["MrIndustryTypeCode"].value){
      this.toastr.warningMessage("Industry Type Is Required");
      return false;
    }

    this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
    this.custCompanyMgmntShrholderObj.CustCompanyId = this.custCompanyId;
    if(this.CustCompanyMgmntShrholderId!=null){ 
      this.custCompanyMgmntShrholderObj = this.tempCustCompanyMgmntShrholderObj;
      this.custCompanyMgmntShrholderObj.MgmntShrholderName = this.ManagementShareholderForm.controls["MgmntShrholderName"].value;
      this.custCompanyMgmntShrholderObj.MrCustModelCode = this.ManagementShareholderForm.controls["MrCustModelCode"].value;   
      this.custCompanyMgmntShrholderObj.MrCompanyTypeCode = this.ManagementShareholderForm.controls["MrCompanyTypeCode"].value;  
      this.custCompanyMgmntShrholderObj.SharePrcnt = this.ManagementShareholderForm.controls["SharePrcnt"].value;
      this.custCompanyMgmntShrholderObj.IsSigner = this.ManagementShareholderForm.controls["IsSigner"].value;
      this.custCompanyMgmntShrholderObj.TaxIdNo = this.ManagementShareholderForm.controls["TaxIdNo"].value;
      this.custCompanyMgmntShrholderObj.IsActive = this.ManagementShareholderForm.controls["IsActive"].value;  
      this.custCompanyMgmntShrholderObj.IsOwner = this.ManagementShareholderForm.controls["IsOwner"].value;  
      this.custCompanyMgmntShrholderObj.MrCustTypeCode = RefMasterConstant.Company;
      this.custCompanyMgmntShrholderObj.MrIndustryTypeCode = this.ManagementShareholderForm.controls["MrIndustryTypeCode"].value; 
      this.http.post(this.editManagementShareholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.outputValue.emit({mode : 'check'});
        }
      );
    }else{
      if(this.tempShareholderCustNo!=null){
        this.custCompanyMgmntShrholderObj.ShareholderCustNo = this.tempShareholderCustNo;
      }
      this.custCompanyMgmntShrholderObj.MgmntShrholderName = this.ManagementShareholderForm.controls["MgmntShrholderName"].value;
      this.custCompanyMgmntShrholderObj.MrCustModelCode = this.ManagementShareholderForm.controls["MrCustModelCode"].value;   
      this.custCompanyMgmntShrholderObj.MrCompanyTypeCode = this.ManagementShareholderForm.controls["MrCompanyTypeCode"].value;  
      this.custCompanyMgmntShrholderObj.SharePrcnt = this.ManagementShareholderForm.controls["SharePrcnt"].value;
      this.custCompanyMgmntShrholderObj.IsSigner = this.ManagementShareholderForm.controls["IsSigner"].value;
      this.custCompanyMgmntShrholderObj.TaxIdNo = this.ManagementShareholderForm.controls["TaxIdNo"].value;
      this.custCompanyMgmntShrholderObj.IsActive = this.ManagementShareholderForm.controls["IsActive"].value; 
      this.custCompanyMgmntShrholderObj.IsOwner = this.ManagementShareholderForm.controls["IsOwner"].value;  
      this.custCompanyMgmntShrholderObj.MrCustTypeCode = RefMasterConstant.Company;
      this.custCompanyMgmntShrholderObj.MrIndustryTypeCode = this.ManagementShareholderForm.controls["MrIndustryTypeCode"].value; 

      if(this.isExistingCust){
        this.http.post(this.addManagementShareholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            this.outputValue.emit({mode : 'check'});
          }
        );
      }
      else{
        this.outputValue.emit({mode : 'duplicateCompany', ShareholderData: this.custCompanyMgmntShrholderObj});
      }
    }
  }

  back(){
    this.outputValue.emit({mode : 'check'});
  }

  getLookUpCustomer(event) {
    this.ManagementShareholderForm.patchValue({
      MgmntShrholderName: event.CustName,
      MrCustModelCode: event.MrCustModelCode,
      MrCompanyTypeCode: event.MrCompanyTypeCode,
      TaxIdNo : event.TaxIdNo,
    });
 
    this.tempShareholderCustNo = event.CustNo;
    this.ManagementShareholderForm.controls.MgmntShrholderName.disable();
    this.ManagementShareholderForm.controls.MrCustModelCode.disable();  
    this.ManagementShareholderForm.controls.MrCompanyTypeCode.disable(); 
    this.ManagementShareholderForm.controls.TaxIdNo.disable(); 
    this.isExistingCust = true;
  }
}
