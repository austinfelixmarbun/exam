import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';

@Component({
  selector: 'app-customer-company-management-shareholder-company',
  templateUrl: './customer-company-management-shareholder-company.component.html',
  styleUrls: ['./customer-company-management-shareholder-company.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderCompanyComponent implements OnInit {
  @Input() inputValue: any;
  @Input() custCompanyId: any;
  @Output () outputValue : EventEmitter<object>= new EventEmitter();
  getUrl: any;
  tempMrCustModelCode: any;
  tempMrCompanyTypeCode: any;
  custCompanyMgmntShrholderObj: any;
  addManagementShareholderUrl: any;
  ManagementShareholderForm = this.fb.group({
    MgmntShrholderName: ['', [Validators.maxLength(100)]],
    MrCustModelCode: [''],
    MrCompanyTypeCode: [''],
    TaxIdNo: [''],
    SharePrcnt: ['0'],
    IsSigner: [false],
  });
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
    this.getUrl = AdInsConstant.GetListActiveRefMaster;
    this.addManagementShareholderUrl = AdInsConstant.AddCustCompanyMgmntShrholder;
  }

  ngOnInit() {
    var refMasterObj1 = {
      RefMasterTypeCode: "COMPANY_TYPE",
      RowVersion: ""
    }
    this.http.post(this.getUrl, refMasterObj1).subscribe(
      (response) => {
        this.tempMrCompanyTypeCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrCompanyTypeCode: this.tempMrCompanyTypeCode[0].Key
        });
      }
    );
    var refMasterObj2 = {
      RefMasterTypeCode: "CUST_MODEL",
      Reservefield1: "PERSONAL",
      RowVersion: ""
    }
    this.http.post(this.getUrl, refMasterObj2).subscribe(
      (response) => {
        this.tempMrCustModelCode = response["ReturnObject"];
        this.ManagementShareholderForm.patchValue({
          MrCustModelCode: this.tempMrCustModelCode[0].Key
        });
      }
    );
  }

  SaveValue() {
    console.log("aaa");
    this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
    this.custCompanyMgmntShrholderObj.custCompanyId = this.custCompanyId;
    this.custCompanyMgmntShrholderObj.MgmntShrholderName = this.ManagementShareholderForm.controls["MgmntShrholderName"].value;
    // this.custCompanyMgmntShrholderObj.MrCustModelCode = this.ManagementShareholderForm.controls["MrCustModelCode"].value;   
    this.custCompanyMgmntShrholderObj.MrCompanyTypeCode = this.ManagementShareholderForm.controls["MrCompanyTypeCode"].value;  
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
}
