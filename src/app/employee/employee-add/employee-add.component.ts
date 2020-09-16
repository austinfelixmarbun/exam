import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { RefEmpObj } from "app/shared/model/RefEmpObj.Model";
import { FormBuilder, Validators } from "@angular/forms";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { formatDate, DatePipe } from "@angular/common";
import { RefBankObj } from "app/shared/model/RefBankObj.Model";
import { InputLookupObj } from "app/shared/model/InputLookupObj.Model";
import { NgxSpinnerService } from "ngx-spinner";
import { RefUserObj } from "app/shared/model/RefUserObj.Model";
import { EmpBankAccObj } from "app/shared/model/EmpBankAccObj.Model";
import { map, mergeMap } from "rxjs/operators";
import { GeneralSettingObj } from "app/shared/model/GeneralSettingObj.Model";
import { forkJoin } from "rxjs";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { ExceptionConstant } from "app/shared/constant/ExceptionConstant";
import { URLConstant } from "app/shared/constant/URLConstant";
import { UcAddressObj } from "app/shared/model/UcAddressObj.Model";
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  providers: [NGXToastrService]
})
export class EmployeeAddComponent implements OnInit {
  pageType: string = "add";
  RefEmpId: number;
  inputLookupBankObj: InputLookupObj;
  resultData: any;
  generalSettingObj: GeneralSettingObj;
  passwordPattern: string;
  refEmpObj: any;
  refUserObj: any;
  empBankAccObj: any;
  refBankObj: any;
  IdTypeList: any;
  businessDt: Date;

  RefEmpForm = this.fb.group({
    RefUserId: [0, [Validators.required]],
    Username: ['', [Validators.required]],
    IsLockedOut: [false],
    LoggedInMethod: ['DB'],
    RefEmpId: [0, [Validators.required]],
    EmpNo: ['', [Validators.required]],
    EmpName: ['', [Validators.required]],
    JoinDt: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required]],
    IdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    TaxIdNo: [''],
    IsExt: [false],
    IsActive: [true],
    IsLeave: [false],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
    MobilePhnNo2: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
    Email1: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    Email2: ['', [Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')]],
    RowVersion: [''],
    EmpBankAccId: [0, [Validators.required]],
    RefBankId: [0, [Validators.required]],
    BankBranch: ['', [Validators.required]],
    BankBranchRegCode: [''],
    BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    BankAccName: ['', [Validators.required]]
  });
  inputFieldAddr: InputFieldObj = new InputFieldObj();
  addressObj: UcAddressObj;
  inputAddressObj: InputAddressObj;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["RefEmpId"] != null) {
        this.RefEmpId = params["RefEmpId"];
      }
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
    });

    this.generalSettingObj = new GeneralSettingObj();
    this.generalSettingObj.GsCode = CommonConstant.GsCodePasswordRegex;
    httpClient.post(URLConstant.GetGeneralSettingByCode, this.generalSettingObj).subscribe(
      (response) => {
        this.resultData = response;
        this.passwordPattern = this.resultData.GsValue;
      }
    );
  }

  ngOnInit() {
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    this.addressObj = new UcAddressObj();

    var RefMasterIdType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, RefMasterIdType).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.IdTypeList = response[CommonConstant.ReturnObj];
          if (this.pageType != "edit") {
            this.RefEmpForm.patchValue({
              MrIdTypeCode: this.IdTypeList[0].Key
            });
          }
        }
      }
    );

    this.inputLookupBankObj = new InputLookupObj();
    this.inputLookupBankObj.urlJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupBankObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupBankObj.pagingJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.genericJson = "./assets/uclookup/Bank/lookupBank.json";

    if (this.pageType == "edit") {
      var empObj = new RefEmpObj();
      empObj.RefEmpId = this.RefEmpId;

      this.httpClient.post(URLConstant.GetRefEmployeeById, empObj).pipe(
        map(response => {
          return response;
        }),
        mergeMap((response: any) => {
          var tempRefUser = new RefUserObj();
          tempRefUser.RefEmpId = response.RefEmpId;
          var tempEmpBankAcc = new EmpBankAccObj();
          tempEmpBankAcc.RefEmpId = response.RefEmpId;

          var tempResponse = [];
          tempResponse.push(response);

          const refUserObj = this.httpClient.post(URLConstant.GetRefUserByRefEmpId, tempRefUser);
          const empBankAccObj = this.httpClient.post(URLConstant.GetEmpBankAccByRefEmpId, tempEmpBankAcc);

          return forkJoin([tempResponse, refUserObj, empBankAccObj]);
        }),
        mergeMap((response: any) => {
          var tempRefBank = new RefBankObj();
          tempRefBank.RefBankId = response[2].RefBankId;

          var tempResponseEmp = [];
          tempResponseEmp.push(response[0]);
          var tempResponseUsr = [];
          tempResponseUsr.push(response[1]);
          var tempResponseEmpBank = [];
          tempResponseEmpBank.push(response[2]);

          const refBankObj = this.httpClient.post(URLConstant.GetRefBankByRefBankIdAsync, tempRefBank);
          return forkJoin([tempResponseEmp, tempResponseUsr, tempResponseEmpBank, refBankObj]);
        })
      ).subscribe(
        (response: any) => {
          var refEmpData = response[0];
          var refUserData = response[1];
          var empBankAccData = response[2];
          var refBankData = response[3];

          this.refEmpObj = refEmpData;
          this.refUserObj = refUserData;
          this.empBankAccObj = empBankAccData;
          this.refBankObj = refBankData;

          var datePipe = new DatePipe("en-US");
          var joinDt = datePipe.transform(refEmpData.JoinDt, 'yyyy-MM-dd');

          this.RefEmpForm.patchValue({
            RefUserId: refUserData.RefUserId,
            Username: refUserData.Username,
            IsLockedOut: refUserData.IsLockedOut,
            LoggedInMethod: refUserData.LoggedInMethod,
            RefEmpId: refEmpData.RefEmpId,
            EmpNo: refEmpData.EmpNo,
            EmpName: refEmpData.EmpName,
            JoinDt: joinDt,
            MrIdTypeCode: refEmpData.MrIdTypeCode,
            IdNo: refEmpData.IdNo,
            TaxIdNo: refEmpData.TaxIdNo,
            IsExt: refEmpData.IsExt,
            IsActive: refEmpData.IsActive,
            IsLeave: refEmpData.IsLeave,   
            MobilePhnNo1: refEmpData.MobilePhnNo1,
            MobilePhnNo2: refEmpData.MobilePhnNo2,
            Email1: refEmpData.Email1,
            Email2: refEmpData.Email2,
            RowVersion: refEmpData.RowVersion,
            EmpBankAccId: empBankAccData.EmpBankAccId,
            RefBankId: empBankAccData.RefBankId,
            BankBranch: empBankAccData.BankBranch,
            BankBranchRegCode: empBankAccData.BankBranchRegCode,
            BankAccNo: empBankAccData.BankAccNo,
            BankAccName: empBankAccData.BankAccName
          });
          
          this.inputLookupBankObj.nameSelect = refBankData.BankName;
          this.addressObj.Addr = refEmpData.Addr;
          this.addressObj.AreaCode4 = refEmpData.AreaCode4;
          this.addressObj.AreaCode3 = refEmpData.AreaCode3;
          this.addressObj.AreaCode2 = refEmpData.AreaCode2;
          this.addressObj.AreaCode1 = refEmpData.AreaCode1;
          this.addressObj.City = refEmpData.City;
          this.addressObj.PhnArea1 = refEmpData.PhnArea1;
          this.addressObj.Phn1 = refEmpData.Phn1;
          this.addressObj.PhnExt1 = refEmpData.PhnExt1;
          this.addressObj.PhnArea2 = refEmpData.PhnArea2;
          this.addressObj.Phn2 = refEmpData.Phn2;
          this.addressObj.PhnExt2 = refEmpData.PhnExt2;
          this.addressObj.PhnArea3 = refEmpData.PhnArea3;
          this.addressObj.Phn3 = refEmpData.Phn3;
          this.addressObj.PhnExt3 = refEmpData.PhnExt3;
          this.addressObj.FaxArea = refEmpData.FaxArea;
          this.addressObj.Fax = refEmpData.Fax;
          this.inputFieldAddr.inputLookupObj = new InputLookupObj();
          this.inputFieldAddr.inputLookupObj.jsonSelect = { Zipcode: refEmpData.Zipcode };
          this.inputFieldAddr.inputLookupObj.nameSelect = refEmpData.Zipcode;
        }
      );
    }
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.default = this.addressObj;
    this.inputAddressObj.inputField = this.inputFieldAddr;
  }

  getLookupBankResponse(e) {
    this.RefEmpForm.patchValue({
      RefBankId: e.refBankId,
      BankBranchRegCode: e.regRptCode
    });
  }

  SaveForm() {
    if (Date.parse(this.RefEmpForm.controls.JoinDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage(ExceptionConstant.JOIN_DATE_MUST_LESS_THAN_ + "Business Date")
      return;
    }
    this.spinner.show();
    var refEmpFormData = this.RefEmpForm.value;

    var refEmpData = new RefEmpObj();
    refEmpData.RefEmpId = refEmpFormData.RefEmpId;
    refEmpData.EmpNo = refEmpFormData.EmpNo;
    refEmpData.EmpName = refEmpFormData.EmpName;
    refEmpData.JoinDt = refEmpFormData.JoinDt;
    refEmpData.MrIdTypeCode = refEmpFormData.MrIdTypeCode;
    refEmpData.IdNo = refEmpFormData.IdNo;
    refEmpData.TaxIdNo = refEmpFormData.TaxIdNo;
    refEmpData.IsExt = refEmpFormData.IsExt;
    refEmpData.IsActive = refEmpFormData.IsActive;
    refEmpData.IsLeave = refEmpFormData.IsLeave;
    refEmpData.Addr = refEmpFormData.UcAddress.Addr;
    refEmpData.Zipcode = refEmpFormData.UcAddressZipcode.value;
    refEmpData.AreaCode1 = refEmpFormData.UcAddress.AreaCode1;
    refEmpData.AreaCode2 = refEmpFormData.UcAddress.AreaCode2;
    refEmpData.AreaCode3 = refEmpFormData.UcAddress.AreaCode3;
    refEmpData.AreaCode4 = refEmpFormData.UcAddress.AreaCode4;
    refEmpData.City = refEmpFormData.UcAddress.City;
    refEmpData.PhnArea1 = refEmpFormData.UcAddress.PhnArea1;
    refEmpData.Phn1 = refEmpFormData.UcAddress.Phn1;
    refEmpData.PhnExt1 = refEmpFormData.UcAddress.PhnExt1;
    refEmpData.PhnArea2 = refEmpFormData.UcAddress.PhnArea2;
    refEmpData.Phn2 = refEmpFormData.UcAddress.Phn2;
    refEmpData.PhnExt2 = refEmpFormData.UcAddress.PhnExt2;
    refEmpData.PhnArea3 = refEmpFormData.UcAddress.PhnArea3;
    refEmpData.Phn3 = refEmpFormData.UcAddress.Phn3;
    refEmpData.PhnExt3 = refEmpFormData.UcAddress.PhnExt3;
    refEmpData.FaxArea = refEmpFormData.UcAddress.FaxArea;
    refEmpData.Fax = refEmpFormData.UcAddress.Fax;
    refEmpData.MobilePhnNo1 = refEmpFormData.MobilePhnNo1;
    refEmpData.MobilePhnNo2 = refEmpFormData.MobilePhnNo2;
    refEmpData.Email1 = refEmpFormData.Email1;
    refEmpData.Email2 = refEmpFormData.Email2;
    refEmpData.RowVersion = refEmpFormData.RowVersion;

    refEmpData.RefUser = new RefUserObj();
    refEmpData.RefUser.RefUserId = refEmpFormData.RefUserId;
    refEmpData.RefUser.Username = refEmpFormData.Username;
    refEmpData.RefUser.IsLockedOut = refEmpFormData.IsLockedOut;
    refEmpData.RefUser.RefEmpId = refEmpFormData.RefEmpId;
    refEmpData.RefUser.LoggedInMethod = refEmpFormData.LoggedInMethod;
    refEmpData.RefUser.IsActive = refEmpFormData.IsActive;
    refEmpData.RefUser.Password = "-";

    refEmpData.EmpBankAcc = new EmpBankAccObj();
    refEmpData.EmpBankAcc.EmpBankAccId = refEmpFormData.EmpBankAccId;
    refEmpData.EmpBankAcc.RefBankId = refEmpFormData.RefBankId;
    refEmpData.EmpBankAcc.BankBranch = refEmpFormData.BankBranch;
    refEmpData.EmpBankAcc.BankBranchRegCode = refEmpFormData.BankBranchRegCode
    refEmpData.EmpBankAcc.BankAccNo = refEmpFormData.BankAccNo;
    refEmpData.EmpBankAcc.BankAccName = refEmpFormData.BankAccName;
    refEmpData.EmpBankAcc.RefEmpId = refEmpFormData.RefEmpId;

    if (this.pageType == "add") {
      this.httpClient.post(URLConstant.AddRefEmp, refEmpData).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Employee/Paging"]);
        }
      );
    }
    else {
      refEmpData.EmpBankAcc.RowVersion = this.empBankAccObj.RowVersion;
      refEmpData.RefUser.RowVersion = this.refUserObj.RowVersion;
      this.httpClient.post(URLConstant.EditRefEmp, refEmpData).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Employee/Paging"]);
        }
      );
    }
  }
}
