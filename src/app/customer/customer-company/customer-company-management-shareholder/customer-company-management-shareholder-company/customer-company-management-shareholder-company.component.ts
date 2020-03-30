import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-company-management-shareholder-company',
  templateUrl: './customer-company-management-shareholder-company.component.html',
  styleUrls: ['./customer-company-management-shareholder-company.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderCompanyComponent implements OnInit {
  
  @Input() custCompanyId: any;
  @Output () outputValue : EventEmitter<object>= new EventEmitter();
  @Input() CustCompanyMgmntShrholderId : any;
  getListActiveRefMasterUrl: string;
  GetListActiveRefMasterWithReserveFieldAllUrl : string;
  tempMrCustModelCode: any;
  tempMrCompanyTypeCode: any;
  custCompanyMgmntShrholderObj: any;
  addManagementShareholderUrl: any;
  getCustCompanyMgmntShrholderUrl : any;
  tempCustCompanyMgmntShrholderObj : any;
  editManagementShareholderUrl : string;
  inputLookupCustCompanyObj : any;
  ManagementShareholderForm = this.fb.group({
    MgmntShrholderName: ['', [Validators.maxLength(100) ,Validators.required]],
    MrCustModelCode: [''],
    MrCompanyTypeCode: [''],
    TaxIdNo: [''],
    SharePrcnt: ['1',[ Validators.min(1),Validators.max(100)]],
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
    this.inputLookupCustCompanyObj = new InputLookupObj();
    this.inputLookupCustCompanyObj.urlJson = "./assets/lookup/lookUpExistingCustCompany.json";
    this.inputLookupCustCompanyObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupCustCompanyObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupCustCompanyObj.pagingJson = "./assets/lookup/lookUpExistingCustCompany.json";
    this.inputLookupCustCompanyObj.genericJson = "./assets/lookup/lookUpExistingCustCompany.json";
    this.inputLookupCustCompanyObj.isRequired = false;
    var refMasterObjMrCompanyTypeCode = {
      RefMasterTypeCode: "COMPANY_TYPE",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        this.tempMrCompanyTypeCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrCompanyTypeCode: this.tempMrCompanyTypeCode[0].Key
        });
      }
    );
    var refMasterObjMrCustModelCode = {
      RefMasterTypeCode: "CUST_MODEL",
      Reservefield1: "COMPANY",
      RowVersion: ""
    }
    this.http.post(this.GetListActiveRefMasterWithReserveFieldAllUrl, refMasterObjMrCustModelCode).subscribe(
      (response) => {
        this.tempMrCustModelCode = response["ReturnObject"];
        console.log(this.tempMrCustModelCode);
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
          
          console.log(this.tempCustCompanyMgmntShrholderObj);
          this.ManagementShareholderForm.patchValue({ 
            MgmntShrholderName: this.tempCustCompanyMgmntShrholderObj.MgmntShrholderName,
            MrCustModelCode:  this.tempCustCompanyMgmntShrholderObj.MrCustModelCode,
            MrCompanyTypeCode: this.tempCustCompanyMgmntShrholderObj.MrCompanyTypeCode ,
            TaxIdNo:  this.tempCustCompanyMgmntShrholderObj.TaxIdNo,
            SharePrcnt: this.tempCustCompanyMgmntShrholderObj.SharePrcnt,
            IsSigner: this.tempCustCompanyMgmntShrholderObj.IsSigner
          });
        }
      );
    }

  }

  SaveValue() { 
    this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
    this.custCompanyMgmntShrholderObj.custCompanyId = this.custCompanyId;
    if(this.CustCompanyMgmntShrholderId!=null){ 
      this.custCompanyMgmntShrholderObj = this.tempCustCompanyMgmntShrholderObj;
      this.custCompanyMgmntShrholderObj.MgmntShrholderName = this.ManagementShareholderForm.controls["MgmntShrholderName"].value;
      this.custCompanyMgmntShrholderObj.MrCustModelCode = this.ManagementShareholderForm.controls["MrCustModelCode"].value;   
      this.custCompanyMgmntShrholderObj.MrCompanyTypeCode = this.ManagementShareholderForm.controls["MrCompanyTypeCode"].value;  
      this.custCompanyMgmntShrholderObj.SharePrcnt = this.ManagementShareholderForm.controls["SharePrcnt"].value;
      this.custCompanyMgmntShrholderObj.IsSigner = this.ManagementShareholderForm.controls["IsSigner"].value;
      this.custCompanyMgmntShrholderObj.TaxIdNo = this.ManagementShareholderForm.controls["TaxIdNo"].value; 
      this.custCompanyMgmntShrholderObj.MrCustTypeCode = "Company";
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
      this.custCompanyMgmntShrholderObj.MgmntShrholderName = this.ManagementShareholderForm.controls["MgmntShrholderName"].value;
      this.custCompanyMgmntShrholderObj.MrCustModelCode = this.ManagementShareholderForm.controls["MrCustModelCode"].value;   
      this.custCompanyMgmntShrholderObj.MrCompanyTypeCode = this.ManagementShareholderForm.controls["MrCompanyTypeCode"].value;  
      this.custCompanyMgmntShrholderObj.SharePrcnt = this.ManagementShareholderForm.controls["SharePrcnt"].value;
      this.custCompanyMgmntShrholderObj.IsSigner = this.ManagementShareholderForm.controls["IsSigner"].value;
      this.custCompanyMgmntShrholderObj.TaxIdNo = this.ManagementShareholderForm.controls["TaxIdNo"].value; 
      this.custCompanyMgmntShrholderObj.MrCustTypeCode = "Company";
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
  getLookUpCustomer(event) {
    console.log(event); 
    this.ManagementShareholderForm.patchValue({
      MgmntShrholderName: event.CustName,
      MrCustModelCode: event.MrCustModelCode,
      MrCompanyTypeCode: event.MrCompanyTypeCode,
      TaxIdNo : event.TaxIdNo,
    });
 
    this.ManagementShareholderForm.controls.MgmntShrholderName.disable();
    this.ManagementShareholderForm.controls.MrCustModelCode.disable();  
    this.ManagementShareholderForm.controls.MrCompanyTypeCode.disable(); 
    this.ManagementShareholderForm.controls.TaxIdNo.disable(); ;
  }
}
