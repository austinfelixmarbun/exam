import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorContactPersonObj } from 'app/shared/model/VendorContactPersonObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-contact-person-add-edit',
  templateUrl: './contact-person-add-edit.component.html',
  styleUrls: ['./contact-person-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class ContactPersonAddEditComponent implements OnInit {
  @Input() objInput: any;
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  HiddenState: boolean = false;
  mode: string;
  businessDt: Date;

  title: string = "Contact Person Main Info";
  title2: string = "Contact Person Address Info";
  ContactPersonForm = this.fb.group({
    Name: ['', Validators.required],
    JobPosition: ['', Validators.required],
    Phn1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Phn2: ['', Validators.pattern("^[0-9]+$")],
    Email: ['', [Validators.required, Validators.pattern("^\\w+([\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]],
    JoinDt: ['', Validators.required],
    IsOwner: [false],
    Addr: [''],
    AreaCode2: [{ value: '', disabled: true }, Validators.required],
    AreaCode1: [{ value: '', disabled: true }, Validators.required],
    City: [{ value: '', disabled: true }, Validators.required],
    ProvDistrictName: [{ value: '', disabled: true }, Validators.required]
  })
  inputZipcodeLookupObj: InputLookupObj = new InputLookupObj();

  contactPersonObj: VendorContactPersonObj;

  itemJobPosition: any;
  VendorContactPersonId: any;
  result: any;
  zipcodee: any;

  constructor(private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

  }

  async ngOnInit() {
    this.mode = this.objInput["mode"];
    this.VendorContactPersonId = this.objInput["VendorContactPersonId"];

    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);

    var JobPosition = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition,
      RowVersion: ""
    }
    this.http.post(URLConstant.GetListActiveRefMaster, JobPosition).subscribe(
      (response) => {
        this.itemJobPosition = response[CommonConstant.ReturnObj];
        this.ContactPersonForm.patchValue({
          JobPosition: this.itemJobPosition[0].Key
        });
      }
    )

    this.inputZipcodeLookupObj.urlJson = "./assets/lookup/lookupZipcode.json";
    this.inputZipcodeLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputZipcodeLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputZipcodeLookupObj.pagingJson = "./assets/lookup/lookupZipcode.json";
    this.inputZipcodeLookupObj.genericJson = "./assets/lookup/lookupZipcode.json";

    if (this.mode == "edit") {
      var contactPerson = new VendorContactPersonObj();
      contactPerson.VendorContactPersonId = this.VendorContactPersonId;
      await this.http.post(URLConstant.GetVendorContactPersonById, contactPerson).toPromise().then(
        (response) => {
          this.result = response;
          this.ContactPersonForm.patchValue({
            Name: this.result.Name,
            JobPosition: this.result.MrEmployeePosition,
            Phn1: this.result.Phone1,
            Phn2: this.result.Phone2,
            Email: this.result.Email,
            JoinDt: formatDate(this.result.JoinDate, 'yyyy-MM-dd', 'en-US'),
            IsOwner: this.result.IsOwner,
            Addr: this.result.Addr,
            AreaCode1: this.result.AreaCode1,
            AreaCode2: this.result.AreaCode2,
            City: this.result.City,
            ProvDistrictName: this.result.Province
          })
          this.inputZipcodeLookupObj.jsonSelect = { Zipcode: this.result.Zipcode };
          this.zipcodee = this.result.Zipcode;
        }
      );
    }
    this.inputZipcodeLookupObj.isReady = true;
  }

  getEmpData(ev) {
    this.ContactPersonForm.patchValue({
      EmpName: ev.EmpName,
      Phn1: ev.Phn1,
      Phn2: ev.Phn2,
      Email: ev.Email,
      JoinDt: formatDate(ev.JoinDt, 'yyyy-MM-dd', 'en-US'),
    })
  }

  getZipcodeData(ev) {
    this.ContactPersonForm.patchValue({
      AreaCode1: ev.AreaCode1,
      AreaCode2: ev.AreaCode2,
      City: ev.City,
      ProvDistrictName: ev.Province,

    })
    this.zipcodee = ev.Zipcode;
  }

  SaveForm() {
    if (this.mode == "edit") {
      this.contactPersonObj = new VendorContactPersonObj();
      this.contactPersonObj.VendorContactPersonId = this.VendorContactPersonId;
      this.contactPersonObj.VendorId = this.objInput["VendorId"];
      this.contactPersonObj.Name = this.ContactPersonForm.controls.Name.value;
      this.contactPersonObj.MrEmployeePosition = this.ContactPersonForm.controls.JobPosition.value;
      this.contactPersonObj.Email = this.ContactPersonForm.controls.Email.value;
      this.contactPersonObj.Phone1 = this.ContactPersonForm.controls.Phn1.value;
      this.contactPersonObj.Phone2 = this.ContactPersonForm.controls.Phn2.value;
      this.contactPersonObj.JoinDate = this.ContactPersonForm.controls.JoinDt.value;
      this.contactPersonObj.IsOwner = this.ContactPersonForm.controls.IsOwner.value;
      this.contactPersonObj.Addr = this.ContactPersonForm.controls.Addr.value;
      this.contactPersonObj.AreaCode1 = this.ContactPersonForm.controls.AreaCode1.value;
      this.contactPersonObj.AreaCode2 = this.ContactPersonForm.controls.AreaCode2.value;
      this.contactPersonObj.City = this.ContactPersonForm.controls.City.value;
      this.contactPersonObj.Province = this.ContactPersonForm.controls.ProvDistrictName.value;
      this.contactPersonObj.Zipcode = this.zipcodee;
      this.contactPersonObj.RowVersion = this.result.RowVersion;
      this.http.post(URLConstant.EditVendorContactPerson, this.contactPersonObj).subscribe(
        (response) => {
          this.HiddenCheck();
          this.toastr.successMessage(response['message']);
        });
    }
    else {
      this.contactPersonObj = new VendorContactPersonObj();
      this.contactPersonObj.Name = this.ContactPersonForm.controls.Name.value;
      this.contactPersonObj.MrEmployeePosition = this.ContactPersonForm.controls.JobPosition.value;
      this.contactPersonObj.VendorId = this.objInput["VendorId"];
      this.contactPersonObj.Email = this.ContactPersonForm.controls.Email.value;
      this.contactPersonObj.Phone1 = this.ContactPersonForm.controls.Phn1.value;
      this.contactPersonObj.Phone2 = this.ContactPersonForm.controls.Phn2.value;
      this.contactPersonObj.JoinDate = this.ContactPersonForm.controls.JoinDt.value;
      this.contactPersonObj.IsOwner = this.ContactPersonForm.controls.IsOwner.value;
      this.contactPersonObj.Addr = this.ContactPersonForm.controls.Addr.value;
      this.contactPersonObj.AreaCode1 = this.ContactPersonForm.controls.AreaCode1.value;
      this.contactPersonObj.AreaCode2 = this.ContactPersonForm.controls.AreaCode2.value;
      this.contactPersonObj.City = this.ContactPersonForm.controls.City.value;
      this.contactPersonObj.Province = this.ContactPersonForm.controls.ProvDistrictName.value;
      this.contactPersonObj.Zipcode = this.zipcodee;

      this.contactPersonObj.VendorContactPersonId = "0";
      this.contactPersonObj.RowVersion = "";
      this.http.post(URLConstant.AddVendorContactPerson, this.contactPersonObj).subscribe((response) => {
        this.toastr.successMessage(response['message']);
        this.HiddenCheck();
      });
    }
  }

  HiddenCheck() {
    var obj = {
      HiddenState: true
    }
    this.objOutput.emit(obj);
  }
}
