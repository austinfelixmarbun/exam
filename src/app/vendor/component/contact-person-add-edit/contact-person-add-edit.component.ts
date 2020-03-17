import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { DISABLED } from '@angular/forms/src/model';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-contact-person-add-edit',
  templateUrl: './contact-person-add-edit.component.html',
  styleUrls: ['./contact-person-add-edit.component.scss'],
  providers : [NGXToastrService]
})
export class ContactPersonAddEditComponent implements OnInit {

  title : string = "Contact Person Main Info";
  title2 : string = "Contact Person Address Info";
  ContactPersonForm = this.fb.group({
    EmpName : ['', Validators.required],
    JobPosition : ['',Validators.required],
    Phn1 : ['', Validators.required],
    Phn2 : [''],
    Email : ['', Validators.required],
    JoinDt : ['', Validators.required],
    Owner : ['', Validators.required],
    Addr : [''],
    AreaCode2: [{value: '', disabled: true}, Validators.required],
    AreaCode1 :[{value: '', disabled: true}, Validators.required],
    City :[{value: '', disabled: true}, Validators.required],
    ProvDistrictName : [{value: '', disabled: true}, Validators.required]
  })
  inputPagingObjSupervisor: InputLookupObj;
  inputEmpLookupObj: InputLookupObj;
  inputZipcodeLookupObj: InputLookupObj;
  itemJobPosition: any;
  

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    
  }

  ngOnInit() {

    var JobPosition = {
      RefMasterTypeCode: "JOB_POSITION",
      RowVersion: ""
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListKeyValueActiveByCode", JobPosition).subscribe(
      (response) => {
        this.itemJobPosition = response["ReturnObject"];
        console.log("this.itemJobPosition[0].Key");
        console.log(this.itemJobPosition[0].Key);
        this.ContactPersonForm.patchValue({          
          JobPosition: this.itemJobPosition[0].Key
        });
      }
    )


    this.inputPagingObjSupervisor = new InputLookupObj();
    this.inputPagingObjSupervisor.urlJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObjSupervisor.urlEnviPaging = environment.FoundationR3Url;
    this.inputPagingObjSupervisor.pagingJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.genericJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.isRequired = false;

    // this.inputEmpLookupObj = new InputLookupObj();
    // this.inputEmpLookupObj.urlJson = "./assets/lookup/lookupEmpForContact.json";
    // this.inputEmpLookupObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    // this.inputEmpLookupObj.urlEnviPaging = environment.FoundationR3Url;
    // this.inputEmpLookupObj.pagingJson = "./assets/lookup/lookupEmpForContact.json";
    // this.inputEmpLookupObj.genericJson = "./assets/lookup/lookupEmpForContact.json";

    this.inputZipcodeLookupObj = new InputLookupObj();
    this.inputZipcodeLookupObj.urlJson = "./assets/lookup/lookupZipcode.json";
    this.inputZipcodeLookupObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputZipcodeLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputZipcodeLookupObj.pagingJson = "./assets/lookup/lookupZipcode.json";
    this.inputZipcodeLookupObj.genericJson = "./assets/lookup/lookupZipcode.json";
  }

  getEmpData(ev){
    console.log("ketrigger gan");
    this.ContactPersonForm.patchValue({
      EmpName : ev.EmpName,
      Phn1: ev.Phn1,
      Phn2: ev.Phn2,
      Email : ev.Email,
      JoinDt: formatDate(ev.JoinDt, 'yyyy-MM-dd', 'en-US'),
    })
  }
  getZipcodeData(ev){
    this.ContactPersonForm.patchValue({
      AreaCode1 : ev.AreaCode1,
      AreaCode2 : ev.AreaCode2,
      City : ev.City,
      ProvDistrictName : ev.Province
    })
  }
}
