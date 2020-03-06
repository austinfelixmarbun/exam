import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-company-main-info',
  templateUrl: './customer-company-main-info.component.html',
  styleUrls: ['./customer-company-main-info.component.scss']
})
export class CustomerCompanyMainInfoComponent implements OnInit {

  CustomerPersonalForm = this.fb.group({
    CustModel : ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    IdNo: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.required]], 
  });
  getUrl: any;
  tempGender: any;
  tempIdType: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { 
    this.getUrl = environment.FoundationR3Url + AdInsConstant.GetListKeyValueByCode;  
  }

  ngOnInit() { 
    var refMasterObj1 = {
      RefMasterTypeCode: "ID_TYPE",
      RowVersion: ""
    }

    this.http.post(this.getUrl, refMasterObj1).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key

        });
      }
    );
  }

}
