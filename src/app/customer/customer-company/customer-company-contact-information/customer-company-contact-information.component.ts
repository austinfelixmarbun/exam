import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-customer-company-contact-information',
  templateUrl: './customer-company-contact-information.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyContactInformationComponent implements OnInit {
  @Input() custCompanyId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  tempCustAddrObj: any;
  tempMrGenderCode: any;
  tempMrJobPositionCode: any;
  tempCustCompanyContactPersonObj: any;

  custAddrObj: CustAddrObj;
  UcAddressObj: UcAddressObj;
  inputFieldObj: InputFieldObj;
  custCompanyContactPersonObj: CustCompanyContactPersonObj;

  IdCust: number;
  getCustAddrUrl: string;
  editCustAddrUrl: string;
  addNewCustAddrUrl: string;
  getListActiveRefMasterUrl: string;
  getCustCompanyByCustIdUrl: string;
  addCustCompanyContactPersonUrl: string;
  getCustAddrByMrCustAddrTypeUrl: string;
  editCustCompanyContactPersonByCustCompanyIdUrl: string;
  getCustCompanyContactPersonByCustCompanyIdUrl: string;

  ContactInformationForm = this.fb.group({
    ContactPersonName: ['', [Validators.maxLength(100), Validators.required]],
    MrGenderCode: ['', [Validators.maxLength(100)]],
    MrJobPositionCode: ['', [Validators.required]],
    JobTitleName: ['', [Validators.required]],
    MobilePhnNo1: ['', [Validators.pattern("^[0-9]+$"), Validators.maxLength(100), Validators.required]],
    MobilePhnNo2: ['', Validators.pattern("^[0-9]+$")],
    Email1: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    Email2: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
    this.addNewCustAddrUrl = AdInsConstant.AddCustAddr;
    this.addCustCompanyContactPersonUrl = AdInsConstant.AddCustCompanyContactPerson;
    this.getListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
    this.getCustAddrUrl = AdInsConstant.GetCustAddr;
    this.getCustCompanyContactPersonByCustCompanyIdUrl = AdInsConstant.GetCustCompanyContactPersonByCustCompanyId;
    this.getCustAddrByMrCustAddrTypeUrl = AdInsConstant.GetCustAddrByMrCustAddrType;
    this.editCustAddrUrl = AdInsConstant.EditCustAddr;
    this.editCustCompanyContactPersonByCustCompanyIdUrl = AdInsConstant.EditCustCompanyContactPersonByCustCompanyId
  }

  ngOnInit() {
    this.UcAddressObj = new UcAddressObj();
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    var refMasterObjMrJobPositionCode = {
      RefMasterTypeCode: "JOB_POSITION",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrJobPositionCode).subscribe(
      (response) => {
        this.tempMrJobPositionCode = response["ReturnObject"];
      }
    );
    var refMasterObjMrGenderCode = {
      RefMasterTypeCode: "GENDER",
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrGenderCode).subscribe(
      (response) => {
        this.tempMrGenderCode = response["ReturnObject"];
      }
    );

    this.custCompanyContactPersonObj = new CustCompanyContactPersonObj();
    this.custAddrObj = new CustAddrObj();

    var custObj = { CustId: this.IdCust };
      this.http.post(AdInsConstant.GetCustCompanyByCustId, custObj).subscribe(
        (response: any) => {
          this.custCompanyId = response['CustCompanyId'];

          this.custCompanyContactPersonObj.CustCompanyId = this.custCompanyId;
          this.http.post(this.getCustCompanyContactPersonByCustCompanyIdUrl, this.custCompanyContactPersonObj).subscribe(
            (response) => {
              this.tempCustCompanyContactPersonObj = response;
              // console.log("testcontact")
              // console.log(this.tempCustCompanyContactPersonObj);
              this.ContactInformationForm.patchValue({
                ContactPersonName: this.tempCustCompanyContactPersonObj.ContactPersonName,
                MrGenderCode: this.tempCustCompanyContactPersonObj.MrGenderCode,
                MrJobPositionCode: this.tempCustCompanyContactPersonObj.MrJobPositionCode,
                JobTitleName: this.tempCustCompanyContactPersonObj.JobTitleName,
                MobilePhnNo1: this.tempCustCompanyContactPersonObj.MobilePhnNo1,
                MobilePhnNo2: this.tempCustCompanyContactPersonObj.MobilePhnNo2,
                Email1: this.tempCustCompanyContactPersonObj.Email1,
                Email2: this.tempCustCompanyContactPersonObj.Email2,
              });

              if (this.tempCustCompanyContactPersonObj.MrGenderCode == null) {
                this.ContactInformationForm.patchValue({
                  MrGenderCode: this.tempMrGenderCode[0].Key
                });
              }
              if (this.tempCustCompanyContactPersonObj.MrJobPositionCode == null) {
                this.ContactInformationForm.patchValue({
                  MrJobPositionCode: this.tempMrJobPositionCode[0].Key
                });
              }

            });
        }
      );

    this.custAddrObj.CustId = this.IdCust;
    this.custAddrObj.MrCustAddrTypeCode = "CONTACT";
    this.http.post(this.getCustAddrByMrCustAddrTypeUrl, this.custAddrObj).subscribe(
      (response) => {
        this.tempCustAddrObj = response;
        this.UcAddressObj.AreaCode1 = this.tempCustAddrObj.AreaCode1;
        this.UcAddressObj.AreaCode2 = this.tempCustAddrObj.AreaCode2;
        this.UcAddressObj.AreaCode3 = this.tempCustAddrObj.AreaCode3;
        this.UcAddressObj.AreaCode4 = this.tempCustAddrObj.AreaCode4;
        this.UcAddressObj.Addr = this.tempCustAddrObj.Addr;
        this.UcAddressObj.City = this.tempCustAddrObj.City;
        this.UcAddressObj.PhnArea1 = this.tempCustAddrObj.PhnArea1;
        this.UcAddressObj.Phn1 = this.tempCustAddrObj.Phn1;
        this.UcAddressObj.PhnExt1 = this.tempCustAddrObj.PhnExt1;
        this.UcAddressObj.PhnArea2 = this.tempCustAddrObj.PhnArea2;
        this.UcAddressObj.Phn2 = this.tempCustAddrObj.Phn2;
        this.UcAddressObj.PhnExt2 = this.tempCustAddrObj.PhnExt2;
        this.UcAddressObj.FaxArea = this.tempCustAddrObj.FaxArea;
        this.UcAddressObj.Fax = this.tempCustAddrObj.Fax;
        this.inputFieldObj.inputLookupObj.nameSelect = this.tempCustAddrObj.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustAddrObj.Zipcode };
      });

  }

  // back() {
  //   this.outputTab.emit({ stepMode: 'previous' });
  // }

  SaveValue() {
    this.custCompanyContactPersonObj = new CustCompanyContactPersonObj();
    this.custAddrObj = new CustAddrObj();
    if (this.tempCustAddrObj.CustAddrId != null) {
      this.custAddrObj = this.tempCustAddrObj;
      this.custCompanyContactPersonObj = this.tempCustCompanyContactPersonObj;
    }

    this.custCompanyContactPersonObj.CustCompanyId = this.custCompanyId;
    this.custCompanyContactPersonObj.ContactPersonName = this.ContactInformationForm.controls["ContactPersonName"].value;
    this.custCompanyContactPersonObj.MrGenderCode = this.ContactInformationForm.controls["MrGenderCode"].value;
    this.custCompanyContactPersonObj.MrJobPositionCode = this.ContactInformationForm.controls["MrJobPositionCode"].value;
    this.custCompanyContactPersonObj.JobTitleName = this.ContactInformationForm.controls["JobTitleName"].value;
    this.custCompanyContactPersonObj.MobilePhnNo1 = this.ContactInformationForm.controls["MobilePhnNo1"].value;
    this.custCompanyContactPersonObj.MobilePhnNo2 = this.ContactInformationForm.controls["MobilePhnNo2"].value;
    this.custCompanyContactPersonObj.Email1 = this.ContactInformationForm.controls["Email1"].value;
    this.custCompanyContactPersonObj.Email2 = this.ContactInformationForm.controls["Email2"].value;

    this.custAddrObj.CustId = this.IdCust;
    this.custAddrObj.MrCustAddrTypeCode = "CONTACT";
    this.custAddrObj.Addr = this.ContactInformationForm.value.UcAddress.Addr;
    this.custAddrObj.AreaCode1 = this.ContactInformationForm.value.UcAddress.AreaCode1;
    this.custAddrObj.AreaCode2 = this.ContactInformationForm.value.UcAddress.AreaCode2;
    this.custAddrObj.AreaCode3 = this.ContactInformationForm.value.UcAddress.AreaCode3;
    this.custAddrObj.AreaCode4 = this.ContactInformationForm.value.UcAddress.AreaCode4;
    this.custAddrObj.City = this.ContactInformationForm.value.UcAddress.City;
    this.custAddrObj.Zipcode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.FullAddr = this.ContactInformationForm.value.UcAddress.Addr + " RT: "+ this.ContactInformationForm.value.UcAddress.AreaCode4 + " RW: " +this.ContactInformationForm.value.UcAddress.AreaCode3 + " " +  this.ContactInformationForm.value.UcAddress.AreaCode2 +", " + this.ContactInformationForm.value.UcAddress.AreaCode1 + " " + this.ContactInformationForm.value.UcAddressZipcode.value; 
    this.custAddrObj.SubZipcode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.Fax = this.ContactInformationForm.value.UcAddress.Fax;
    this.custAddrObj.FaxArea = this.ContactInformationForm.value.UcAddress.FaxArea;
    this.custAddrObj.Phn1 = this.ContactInformationForm.value.UcAddress.Phn1;
    this.custAddrObj.Phn2 = this.ContactInformationForm.value.UcAddress.Phn2;
    this.custAddrObj.PhnArea1 = this.ContactInformationForm.value.UcAddress.PhnArea1;
    this.custAddrObj.PhnArea2 = this.ContactInformationForm.value.UcAddress.PhnArea2; 
    this.custAddrObj.PhnExt1 = this.ContactInformationForm.value.UcAddress.PhnExt1;
    this.custAddrObj.PhnExt2 = this.ContactInformationForm.value.UcAddress.PhnExt2;

    if (this.tempCustCompanyContactPersonObj.CustCompanyContactPersonId != 0) {
      this.custAddrObj = this.tempCustAddrObj;
      this.custCompanyContactPersonObj = this.tempCustCompanyContactPersonObj;
      this.custCompanyContactPersonObj.RowVersion = this.tempCustCompanyContactPersonObj.RowVersion;

      // console.log("tempcust")
      // console.log(this.custCompanyContactPersonObj)

      this.http.post(this.editCustAddrUrl, this.custAddrObj).subscribe(
        (response) => {
          this.http.post(this.editCustCompanyContactPersonByCustCompanyIdUrl, this.custCompanyContactPersonObj).subscribe(
            (response) => {
              this.toastr.successMessage(response["Message"]);
              this.outputTab.emit({ stepMode: 'next' });
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
    } else {
      this.http.post(this.addNewCustAddrUrl, this.custAddrObj).subscribe(
        (response) => {
          this.http.post(this.addCustCompanyContactPersonUrl, this.custCompanyContactPersonObj).subscribe(
            (response) => {
              this.toastr.successMessage(response["Message"]);
              this.outputTab.emit({ stepMode: 'next' });
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
}
