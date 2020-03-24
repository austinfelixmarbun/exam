import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustCompanyContactPersonObj } from 'app/shared/model/CustCompanyContactPersonObj.model';
import { AnyMxRecord } from 'dns';

@Component({
  selector: 'app-customer-company-contact-information',
  templateUrl: './customer-company-contact-information.component.html',
  styleUrls: ['./customer-company-contact-information.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerCompanyContactInformationComponent implements OnInit {
  ContactInformationForm = this.fb.group({
    ContactPersonName: ['', [Validators.maxLength(100)]],
    MrGenderCode: ['', [Validators.maxLength(100)]],
    MrJobPostitionCode: [''],
    JobTitleName: [''], 
    MobilePhnNo1:[''],
    MobilePhnNo2:[''],
    Email1: [''], 
    Email2: [''], 

   
  });
  custCompanyContactPersonObj  : any;
  UcAddressObj :  any;
  inputFieldObj : any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.UcAddressObj = new UcAddressObj();
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    console.log("aaaa");
  }
  SaveValue(){
    console.log("aaa");
    this.custCompanyContactPersonObj = new CustCompanyContactPersonObj();
    // this.custCompanyContactPersonObj.custCompanyId = this.custCompanyId;
    this.custCompanyContactPersonObj.ContactPersonName = this.ContactInformationForm.controls["ContactPersonName"].value;

    this.custCompanyContactPersonObj.MrGenderCode = this.ContactInformationForm.controls["MrGenderCode"].value;  
    this.custCompanyContactPersonObj.MrJobPostitionCode = this.ContactInformationForm.controls["MrJobPostitionCode"].value;
    this.custCompanyContactPersonObj.JobTitleName = this.ContactInformationForm.controls["JobTitleName"].value;
    this.custCompanyContactPersonObj.MobilePhnNo1 = this.ContactInformationForm.controls["MobilePhnNo1"].value;  
    this.custCompanyContactPersonObj.MobilePhnNo2 = this.ContactInformationForm.controls["MobilePhnNo2"].value;
    this.custCompanyContactPersonObj.Email1 = this.ContactInformationForm.controls["Email1"].value;
    this.custCompanyContactPersonObj.Email2 = this.ContactInformationForm.controls["Email2"].value;

    this.custCompanyContactPersonObj.Addr = this.ContactInformationForm.value.UcAddress.Addr;
    this.custCompanyContactPersonObj.AreaCode1 = this.ContactInformationForm.value.UcAddress.AreaCode1;
    this.custCompanyContactPersonObj.AreaCode2 = this.ContactInformationForm.value.UcAddress.AreaCode2;
    this.custCompanyContactPersonObj.AreaCode3 = this.ContactInformationForm.value.UcAddress.AreaCode3;
    this.custCompanyContactPersonObj.AreaCode4 = this.ContactInformationForm.value.UcAddress.AreaCode4;
    this.custCompanyContactPersonObj.City = this.ContactInformationForm.value.UcAddress.City;
    this.custCompanyContactPersonObj.ZipCode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custCompanyContactPersonObj.SubZipcode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custCompanyContactPersonObj.Fax = this.ContactInformationForm.value.UcAddress.Fax;
    this.custCompanyContactPersonObj.Phn1 = this.ContactInformationForm.value.UcAddress.Phn1;
    this.custCompanyContactPersonObj.Phn2 = this.ContactInformationForm.value.UcAddress.Phn2;
    this.custCompanyContactPersonObj.PhnArea1 = this.ContactInformationForm.value.UcAddress.PhnArea1;
    this.custCompanyContactPersonObj.PhnArea2 = this.ContactInformationForm.value.UcAddress.PhnArea2;
    this.custCompanyContactPersonObj.PhnExt1 = this.ContactInformationForm.value.UcAddress.PhnExt1;
    this.custCompanyContactPersonObj.PhnExt2 = this.ContactInformationForm.value.UcAddress.PhnExt1;
   
 
 
    console.log(this.custCompanyContactPersonObj);

      // this.http.post(this.addManagementShareholderUrl, this.custCompanyContactPersonObj).subscribe(
      //   (response) => {
      //     this.toastr.successMessage(response["Message"]);
      //     this.outputValue.emit({mode : 'check'});
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
  }

}
