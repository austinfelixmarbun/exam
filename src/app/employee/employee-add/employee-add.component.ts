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
import { AdInsHelper } from "app/shared/AdInsHelper";
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/LibraryObj/CustomPatternObj.model';
import { CookieService } from "ngx-cookie";

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  providers: [NGXToastrService, RegexService]
})
export class EmployeeAddComponent implements OnInit {
  pageType: string = "add";
  RefEmpId: number;
  inputLookupBankObj: InputLookupObj;
  resultData: any;
  generalSettingObj: GeneralSettingObj;
  passwordPattern: string;
  refEmpObj: RefEmpObj;
  refUserObj: RefUserObj;
  empBankAccObj: EmpBankAccObj;
  refBankObj: RefBankObj;
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
    Email2: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
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
    private regexService: RegexService, 
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient, 
    private cookieService: CookieService
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

    if(this.pageType == 'edit'){
      this.RefEmpForm = this.fb.group({
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
        Email2: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        RowVersion: [''],
        EmpBankAccId: [0, [Validators.required]],
        RefBankId: [0, [Validators.required]],
        BankBranch: ['', [Validators.required]],
        BankBranchRegCode: [''],
        BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        BankAccName: ['', [Validators.required]]
      });
    }else{
      this.RefEmpForm = this.fb.group({
        RefUserId: [0],
        Username: ['', [Validators.required]],
        IsLockedOut: [false],
        LoggedInMethod: ['DB'],
        RefEmpId: [0],
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
        Email2: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        RowVersion: [''],
        EmpBankAccId: [0],
        RefBankId: [0, [Validators.required]],
        BankBranch: ['', [Validators.required]],
        BankBranchRegCode: [''],
        BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        BankAccName: ['', [Validators.required]]
      });
    }

    this.customPattern = new Array<CustomPatternObj>();
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
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
          if(this.IdTypeList != undefined)
          {
            this.getInitPattern();
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

    if (this.pageType == "edit") 
    {
      var empObj = new RefEmpObj();
      empObj.RefEmpId = this.RefEmpId;

      this.http.post(URLConstant.GetEmpForUpdateById, empObj).subscribe(
        (response) => {
          this.refEmpObj = response['RefEmpObj'];
          this.refUserObj = response['RefUserObj'];
          this.empBankAccObj = response['EmpBankAccObj'];
          this.refBankObj = response['RefBankObj'];

          var datePipe = new DatePipe("en-US");
          var joinDt = datePipe.transform(this.refEmpObj.JoinDt, 'yyyy-MM-dd');
          this.RefEmpForm.patchValue({
            RefUserId: this.refUserObj.RefUserId,
            Username: this.refUserObj.Username,
            IsLockedOut: this.refUserObj.IsLockedOut,
            LoggedInMethod: this.refUserObj.LoggedInMethod,
            RefEmpId: this.refEmpObj.RefEmpId,
            EmpNo: this.refEmpObj.EmpNo,
            EmpName: this.refEmpObj.EmpName,
            JoinDt: joinDt,
            MrIdTypeCode: this.refEmpObj.MrIdTypeCode,
            IdNo: this.refEmpObj.IdNo,
            TaxIdNo: this.refEmpObj.TaxIdNo,
            IsExt: this.refEmpObj.IsExt,
            IsActive: this.refEmpObj.IsActive,
            IsLeave: this.refEmpObj.IsLeave,   
            MobilePhnNo1: this.refEmpObj.MobilePhnNo1,
            MobilePhnNo2: this.refEmpObj.MobilePhnNo2,
            Email1: this.refEmpObj.Email1,
            Email2: this.refEmpObj.Email2,
            RowVersion: this.refEmpObj.RowVersion,
            EmpBankAccId: this.empBankAccObj.EmpBankAccId,
            RefBankId: this.empBankAccObj.RefBankId,
            BankBranch: this.empBankAccObj.BankBranch,
            BankBranchRegCode: this.empBankAccObj.BankBranchRegCode,
            BankAccNo: this.empBankAccObj.BankAccNo,
            BankAccName: this.empBankAccObj.BankAccName
          });
          
          this.inputLookupBankObj.nameSelect = this.refBankObj.BankName;
          this.inputLookupBankObj.jsonSelect = { bankName: this.refBankObj.BankName };

          this.addressObj.Addr = this.refEmpObj.Addr;
          this.addressObj.AreaCode4 = this.refEmpObj.AreaCode4;
          this.addressObj.AreaCode3 = this.refEmpObj.AreaCode3;
          this.addressObj.AreaCode2 = this.refEmpObj.AreaCode2;
          this.addressObj.AreaCode1 = this.refEmpObj.AreaCode1;
          this.addressObj.City = this.refEmpObj.City;
          this.addressObj.PhnArea1 = this.refEmpObj.PhnArea1;
          this.addressObj.Phn1 = this.refEmpObj.Phn1;
          this.addressObj.PhnExt1 = this.refEmpObj.PhnExt1;
          this.addressObj.PhnArea2 = this.refEmpObj.PhnArea2;
          this.addressObj.Phn2 = this.refEmpObj.Phn2;
          this.addressObj.PhnExt2 = this.refEmpObj.PhnExt2;
          this.addressObj.PhnArea3 = this.refEmpObj.PhnArea3;
          this.addressObj.Phn3 = this.refEmpObj.Phn3;
          this.addressObj.PhnExt3 = this.refEmpObj.PhnExt3;
          this.addressObj.FaxArea = this.refEmpObj.FaxArea;
          this.addressObj.Fax = this.refEmpObj.Fax;
          this.inputFieldAddr.inputLookupObj = new InputLookupObj();
          this.inputFieldAddr.inputLookupObj.jsonSelect = { Zipcode: this.refEmpObj.Zipcode };
          this.inputFieldAddr.inputLookupObj.nameSelect = this.refEmpObj.Zipcode;
        }
      );
    }
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.requiredPhn1 = true;
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
          AdInsHelper.RedirectUrl(this.router,["/Employee/Paging"],{});
        }
      );
    }
    else {
      refEmpData.EmpBankAcc.RowVersion = this.empBankAccObj.RowVersion;
      refEmpData.RefUser.RowVersion = this.refUserObj.RowVersion;
      this.httpClient.post(URLConstant.EditRefEmp, refEmpData).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,["/Employee/Paging"],{});
        }
      );
    }
  }

  //START URS-LOS-041

  onOptionsSelected(event){  
    this.setValidatorPattern();
  }

  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj>;
  initIdTypeCode: any;
  resultPattern: any;

  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if(this.resultPattern != undefined)
        {
          for (let i = 0; i < this.resultPattern.length; i++) {
            let patternObj: CustomPatternObj = new CustomPatternObj();
            let pattern: string = this.resultPattern[i].Value;
    
            patternObj.pattern = pattern;
            patternObj.invalidMsg = this.regexService.getErrMessage(pattern);
            this.customPattern.push(patternObj);
          }
          this.setValidatorPattern();
        }
      }
    );
  }
  // setValidatorPattern(){
  //   let idTypeValue: string;

  //   idTypeValue = this.RefEmpForm.controls[this.controlNameIdType].value;

  //   if (this.resultPattern != undefined) {
  //     var result = this.resultPattern.find(x => x.Key == idTypeValue)

  //     if (result != undefined) {
  //       var pattern = result.Value;
  //       if (pattern != undefined) {
  //         this.setValidator(pattern);
  //       }
  //     }
  //   }
  // }

  setValidatorPattern() {
    let idTypeValue: string;
    idTypeValue = this.RefEmpForm.controls[this.controlNameIdType].value;
    var pattern: string = '';
    if (idTypeValue != undefined) {
      if (this.resultPattern != undefined) {
        var result = this.resultPattern.find(x => x.Key == idTypeValue)
        if (result != undefined) {
          pattern = result.Value;
        }
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    if (pattern != undefined) {
      this.RefEmpForm.controls[this.controlNameIdNo].setValidators(Validators.pattern(pattern));
      this.RefEmpForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041
}
