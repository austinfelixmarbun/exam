import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';

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
    MobilePhnNo1: [''], 
    MobilePhnNo2: [''], 
    Email1: [''], 
    Email2: [''], 
  });
  UcAddressObj :  any;
  inputFieldObj : any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder ) { }

  ngOnInit() {
    
    this.UcAddressObj = new UcAddressObj();
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    console.log("aaaa");
  }

}
