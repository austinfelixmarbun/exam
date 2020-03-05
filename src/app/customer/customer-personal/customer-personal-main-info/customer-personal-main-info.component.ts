import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-personal-main-info',
  templateUrl: './customer-personal-main-info.component.html',
  styleUrls: ['./customer-personal-main-info.component.scss']
})
export class CustomerPersonalMainInfoComponent implements OnInit {



  CustomerPersonalForm = this.fb.group({
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    Gender: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.required]],
    IdExpiredDt: ['', [Validators.required]],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]]

  });

  getGenderUrl: any;
  getIdTypeUrl: any;
  custPersonalObj: CustPersonalObj;
  tempGender: any;
  tempIdType: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
  this.getGenderUrl = environment.FoundationR3Url + AdInsConstant.GetListKeyValueRefMasterByCode;
  }

  ngOnInit() {
    console.log("Awd");
    var refMasterObj = {
      RefMasterTypeCode: "GENDER",
      RowVersion: ""
    }
    this.http.post(this.getGenderUrl, refMasterObj).subscribe(
      (response) => {
        this.tempGender = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          Gender: this.tempGender[0].Key

        });
 
      }
    );
    var refMasterObj1 = {
      RefMasterTypeCode: "ID_TYPE",
      RowVersion: ""
    }

    this.http.post(this.getGenderUrl, refMasterObj1).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key

        });


      }
    );


  }

}
