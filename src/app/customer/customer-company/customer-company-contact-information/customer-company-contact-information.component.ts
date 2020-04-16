import { Component, OnInit, Input } from '@angular/core';
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
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-customer-company-contact-information',
  templateUrl: './customer-company-contact-information.component.html',
  styleUrls: ['./customer-company-contact-information.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerCompanyContactInformationComponent implements OnInit {
  
  @Input() custCompanyId : any ;
  ContactInformationForm = this.fb.group({
    ContactPersonName: ['', [Validators.maxLength(100),Validators.required]],
    MrGenderCode: ['', [Validators.maxLength(100)]],
    MrJobPostitionCode: ['',[Validators.required]],
    JobTitleName: ['',[Validators.required]], 
    MobilePhnNo1:[''],
    MobilePhnNo2:[''],
    Email1: [''], 
    Email2: [''], 
  });

  custAddrObj: any;
  IdCust: any;
  custCompanyContactPersonObj  : any;
  addCustCompanyContactPersonUrl : any;
  UcAddressObj :  any;
  inputFieldObj : any;
  addNewCustAddrUrl :any;
  tempMrGenderCode : any;
  getListActiveRefMasterUrl : any;
  tempMrJobPostitionCode : any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder,private wizard: WizardComponent ) { 
    this.route.queryParams.subscribe(params => { 
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
    this.addNewCustAddrUrl = AdInsConstant.AddCustAddr;
    this.addCustCompanyContactPersonUrl = AdInsConstant.AddCustCompanyContactPerson;
    this.getListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
  }

  ngOnInit() {  
    this.UcAddressObj = new UcAddressObj();
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();

    var refMasterObjMrJobPostitionCode = {
      RefMasterTypeCode: "JOB_POSITION",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrJobPostitionCode).subscribe(
      (response) => {
        this.tempMrJobPostitionCode = response["ReturnObject"];
        this.ContactInformationForm.patchValue({
          MrJobPostitionCode: this.tempMrJobPostitionCode[0].Key
        });
      }
    );
    
    var refMasterObjMrGenderCode = {
      RefMasterTypeCode: "GENDER",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrGenderCode).subscribe(
      (response) => {
        this.tempMrGenderCode = response["ReturnObject"];
        this.ContactInformationForm.patchValue({
          MrGenderCode: this.tempMrGenderCode[0].Key
        });
      }
    );
  }
  SaveValue(){ 
    this.custCompanyContactPersonObj = new CustCompanyContactPersonObj();
    this.custCompanyContactPersonObj.CustCompanyId = this.custCompanyId;
    this.custCompanyContactPersonObj.ContactPersonName = this.ContactInformationForm.controls["ContactPersonName"].value;
    this.custCompanyContactPersonObj.MrGenderCode = this.ContactInformationForm.controls["MrGenderCode"].value;  
    this.custCompanyContactPersonObj.MrJobPostitionCode = this.ContactInformationForm.controls["MrJobPostitionCode"].value;
    this.custCompanyContactPersonObj.JobTitleName = this.ContactInformationForm.controls["JobTitleName"].value;
    this.custCompanyContactPersonObj.MobilePhnNo1 = this.ContactInformationForm.controls["MobilePhnNo1"].value;  
    this.custCompanyContactPersonObj.MobilePhnNo2 = this.ContactInformationForm.controls["MobilePhnNo2"].value;
    this.custCompanyContactPersonObj.Email1 = this.ContactInformationForm.controls["Email1"].value;
    this.custCompanyContactPersonObj.Email2 = this.ContactInformationForm.controls["Email2"].value;

    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.CustId = this.IdCust;
    this.custAddrObj.MrCustAddrTypeCode = "CONTACT";
    this.custAddrObj.Addr = this.ContactInformationForm.value.UcAddress.Addr;
    this.custAddrObj.AreaCode1 = this.ContactInformationForm.value.UcAddress.AreaCode1;
    this.custAddrObj.AreaCode2 = this.ContactInformationForm.value.UcAddress.AreaCode2;
    this.custAddrObj.AreaCode3 = this.ContactInformationForm.value.UcAddress.AreaCode3;
    this.custAddrObj.AreaCode4 = this.ContactInformationForm.value.UcAddress.AreaCode4;
    this.custAddrObj.City = this.ContactInformationForm.value.UcAddress.City;
    this.custAddrObj.ZipCode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.SubZipcode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.Fax = this.ContactInformationForm.value.UcAddress.Fax;
    this.custAddrObj.FaxArea = this.ContactInformationForm.value.UcAddress.FaxArea;
    this.custAddrObj.Phn1 = this.ContactInformationForm.value.UcAddress.Phn1;
    this.custAddrObj.Phn2 = this.ContactInformationForm.value.UcAddress.Phn2;
    this.custAddrObj.PhnArea1 = this.ContactInformationForm.value.UcAddress.PhnArea1;
    this.custAddrObj.PhnArea2 = this.ContactInformationForm.value.UcAddress.PhnArea2;
    this.custAddrObj.PhnExt1 = this.ContactInformationForm.value.UcAddress.PhnExt1;
    this.custAddrObj.PhnExt2 = this.ContactInformationForm.value.UcAddress.PhnExt1;
    
    this.http.post(this.addNewCustAddrUrl, this.custAddrObj).subscribe(
      (response) => {

        this.http.post(this.addCustCompanyContactPersonUrl, this.custCompanyContactPersonObj).subscribe(
          (response) => { 
            this.toastr.successMessage(response["Message"]); 
            this.wizard.goToNextStep();
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

}
