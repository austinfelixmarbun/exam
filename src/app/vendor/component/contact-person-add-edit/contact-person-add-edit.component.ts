import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  HiddenState: boolean = false;

  ContactPersonForm = this.fb.group({
    Name : ['', Validators.required],
    MrEmployeePosition : ['',Validators.required],
    Phone1 : ['', Validators.required],
    Phone2 : [''],
    Email : ['', Validators.required],
    JoinDate : ['', Validators.required],
    IsOwner : ['', Validators.required],
    Addr : [''],
    AreaCode2: [{value: '', disabled: true}, Validators.required],
    AreaCode1 :[{value: '', disabled: true}, Validators.required],
    City :[{value: '', disabled: true}, Validators.required],
    Province : [{value: '', disabled: true}, Validators.required],
    RowVersion: []
  })

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
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, JobPosition).subscribe(
      (response) => {
        this.itemJobPosition = response["ReturnObject"];
        console.log("this.itemJobPosition[0].Key");
        this.ContactPersonForm.patchValue({          
          MrEmployeePosition: this.itemJobPosition[0].Key
        });
      }
    )

    this.inputZipcodeLookupObj = new InputLookupObj();
    this.inputZipcodeLookupObj.urlJson = "./assets/lookup/lookupZipcode.json";
    this.inputZipcodeLookupObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputZipcodeLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputZipcodeLookupObj.pagingJson = "./assets/lookup/lookupZipcode.json";
    this.inputZipcodeLookupObj.genericJson = "./assets/lookup/lookupZipcode.json";
  }

  getZipcodeData(ev){
    this.ContactPersonForm.patchValue({
      AreaCode1 : ev.AreaCode1,
      AreaCode2 : ev.AreaCode2,
      City : ev.City,
      ProvDistrictName : ev.Province
    })
  }

  HiddenCheck(){
    this.HiddenState = true;
    this.objOutput.emit(this.HiddenState);
  }
}
