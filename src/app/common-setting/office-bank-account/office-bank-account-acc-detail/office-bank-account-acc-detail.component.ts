import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { OfficeBankAccObj } from 'app/shared/model/common-setting/OfficeBankAcc.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { PathConstant } from 'app/shared/PathConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-office-bank-account-acc-detail',
  templateUrl: './office-bank-account-acc-detail.component.html'
})
export class OfficeBankAccountAccDetailComponent implements OnInit {
  title: string;
  OfficeBankAccId: number;
  AccCode: string;
  OfficeBankAccObj: OfficeBankAccObj = new OfficeBankAccObj();
  inputAddressObj: InputAddressObj;
  UcAddressObj: UcAddressObj;
  inputFieldObj: InputFieldObj;

  readonly CancelLink: string = NavigationConstant.CS_OFFICE_BANK_ACCOUNT_PAGING;

  AccDetailForm = this.fb.group({
    ContactPersonJobTitle: ['', [Validators.required, Validators.maxLength(50)]],
    ContactPerson: ['', [Validators.required, Validators.maxLength(500)]]
  });
  
  constructor(private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) {
      this.route.queryParams.subscribe(params => {
        if (params["OfficeBankAccId"] != null) {
          this.OfficeBankAccId = params["OfficeBankAccId"];
        }
      });
    }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.title = data['title'];
      }
    )

    this.UcAddressObj = new UcAddressObj();
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();

    this.OfficeBankAccObj.OfficeBankAccId = this.OfficeBankAccId;
    this.http.post<OfficeBankAccObj>(URLConstant.GetOfficeBankAccByOfficeBankAccId, {Id: this.OfficeBankAccId}).subscribe(
      (response) => {
        this.OfficeBankAccObj = response;
        this.AccCode = this.OfficeBankAccObj.OfficeBankAccCode;

        this.AccDetailForm.patchValue({
          ContactPersonJobTitle: this.OfficeBankAccObj.CntctPersonJobTitle,
          ContactPerson: this.OfficeBankAccObj.CntctPersonName
        })

        this.UcAddressObj.AreaCode1 = this.OfficeBankAccObj.BankAreaCode1;
        this.UcAddressObj.AreaCode2 = this.OfficeBankAccObj.BankAreaCode2;
        this.UcAddressObj.AreaCode3 = this.OfficeBankAccObj.BankAreaCode3;
        this.UcAddressObj.AreaCode4 = this.OfficeBankAccObj.BankAreaCode4;
        this.UcAddressObj.Addr = this.OfficeBankAccObj.BankAddr;
        this.UcAddressObj.City = this.OfficeBankAccObj.BankCity;
        this.UcAddressObj.PhnArea1 = this.OfficeBankAccObj.BankPhnArea1;
        this.UcAddressObj.Phn1 = this.OfficeBankAccObj.BankPhn1;
        this.UcAddressObj.PhnExt1 = this.OfficeBankAccObj.BankPhnExt1;
        this.UcAddressObj.PhnArea2 = this.OfficeBankAccObj.BankPhnArea2;
        this.UcAddressObj.Phn2 = this.OfficeBankAccObj.BankPhn2;
        this.UcAddressObj.PhnExt2 = this.OfficeBankAccObj.BankPhnExt2;
        this.UcAddressObj.FaxArea = this.OfficeBankAccObj.BankFaxArea;
        this.UcAddressObj.Fax = this.OfficeBankAccObj.BankFax;

        this.inputFieldObj.inputLookupObj.nameSelect = this.OfficeBankAccObj.BankZipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.OfficeBankAccObj.BankZipcode };
      },
      (error) => {
          console.log(error);
      }
    );

    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.default = this.UcAddressObj;
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showPhn3 = false;
    this.inputAddressObj.isRequired = true;
  }

  SaveForm() {
    this.OfficeBankAccObj.OfficeBankAccId = this.OfficeBankAccId;
    this.OfficeBankAccObj.OfficeBankAccCode = this.AccCode;
    this.OfficeBankAccObj.CntctPersonJobTitle = this.AccDetailForm.value.ContactPersonJobTitle;
    this.OfficeBankAccObj.CntctPersonName = this.AccDetailForm.value.ContactPerson;

    this.OfficeBankAccObj.BankAreaCode1 = this.AccDetailForm.value.UcAddress.AreaCode1;
    this.OfficeBankAccObj.BankAreaCode2 = this.AccDetailForm.value.UcAddress.AreaCode2;
    this.OfficeBankAccObj.BankAreaCode3 = this.AccDetailForm.value.UcAddress.AreaCode3;
    this.OfficeBankAccObj.BankAreaCode4 = this.AccDetailForm.value.UcAddress.AreaCode4;
    this.OfficeBankAccObj.BankAddr = this.AccDetailForm.value.UcAddress.Addr;
    this.OfficeBankAccObj.BankCity = this.AccDetailForm.value.UcAddress.City;
    this.OfficeBankAccObj.BankZipcode = this.AccDetailForm.value.UcAddressZipcode.value;
    this.OfficeBankAccObj.BankFax = this.AccDetailForm.value.UcAddress.Fax;
    this.OfficeBankAccObj.BankFaxArea = this.AccDetailForm.value.UcAddress.FaxArea;
    this.OfficeBankAccObj.BankPhn1 = this.AccDetailForm.value.UcAddress.Phn1;
    this.OfficeBankAccObj.BankPhn2 = this.AccDetailForm.value.UcAddress.Phn2;
    this.OfficeBankAccObj.BankPhnArea1 = this.AccDetailForm.value.UcAddress.PhnArea1;
    this.OfficeBankAccObj.BankPhnArea2 = this.AccDetailForm.value.UcAddress.PhnArea2;
    this.OfficeBankAccObj.BankPhnExt1 = this.AccDetailForm.value.UcAddress.PhnExt1;
    this.OfficeBankAccObj.BankPhnExt2 = this.AccDetailForm.value.UcAddress.PhnExt2;
    this.OfficeBankAccObj.RowVersion = "";

    this.http.post(URLConstant.SubmitOfficeBankAcc, this.OfficeBankAccObj).subscribe(
      (response) => {
        this.toastr.successMessage("Update Account Detail Success!");
        this.router.navigateByUrl(PathConstant.CS_OFFICE_BANK_ACCOUNT_PAGING);
      },
      error => {
        console.log(error);
      }
    )
  }
}