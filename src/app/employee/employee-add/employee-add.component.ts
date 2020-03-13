import { Component, OnInit, ViewChild} from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { RefEmpObj } from "app/shared/model/RefEmpObj.Model";
import { NgForm, FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from "@angular/forms";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { formatDate, DatePipe } from "@angular/common";
import { RefBankObj } from "app/shared/model/RefBankObj.Model";
import { UcAddressComponent } from "app/shared/UserControl/ucAddress/ucAddress.component";
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { InputLookupObj } from "app/shared/model/InputLookupObj.Model";
import { LookuprefbankComponent } from "@adins/lookuprefbank";
import { NgxSpinnerService } from "ngx-spinner";
import { RefUserObj } from "app/shared/model/RefUserObj.Model";
import { EmpBankAccObj } from "app/shared/model/EmpBankAccObj.Model";
import { map, mergeMap } from "rxjs/operators";
import { GeneralSettingObj } from "app/shared/model/GeneralSettingObj.Model";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  styleUrls: ["./employee-add.component.scss"],
  providers: [NGXToastrService]
})
export class EmployeeAddComponent implements OnInit {
  private getEmpUrl: string = AdInsConstant.GetRefEmployeeById;
  private getRefUserUrl: string = environment.FoundationR3Url + AdInsConstant.GetRefUserByRefEmpId;
  private getEmpBankUrl: string = environment.FoundationR3Url + AdInsConstant.GetEmpBankAccByRefEmpId;
  private getGeneralSettingUrl : string = AdInsConstant.GetGeneralSettingByCode;
  private getRefBankUrl: string = AdInsConstant.GetRefBankByRefBankIdAsync;
  private addUrl: string = environment.FoundationR3Url + AdInsConstant.AddRefEmp;
  private editUrl: string = environment.FoundationR3Url + AdInsConstant.EditRefEmp;
  private addUsrUrl: string = environment.FoundationR3Url + AdInsConstant.AddRefUserR3;
  private editUsrUrl: string = environment.FoundationR3Url + AdInsConstant.EditRefUserForRefEmpR3;
  private addEmpBankAcc: string = environment.FoundationR3Url + AdInsConstant.AddEmpBankAcc;
  private editEmpBankAcc: string = environment.FoundationR3Url + AdInsConstant.EditEmpBankAcc;
  
  pageType: string = "add";
  refEmpId: number;
  inputLookupZipCodeObj: InputLookupObj;
  inputLookupBankObj: InputLookupObj;
  resultData: any;
  isPasswordNotSame: boolean = false;
  generalSettingObj: GeneralSettingObj;
  passwordPattern: string;
  refEmpObj: any;
  refUserObj: any;
  empBankAccObj: any;
  refBankObj: any;

  RefEmpForm = this.fb.group({
    RefUserId: [0, [Validators.required]],
    Username: ['', [Validators.required]],
    Password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    ConfirmPassword: ['', [Validators.required]],
    IsLockedOut: [false],
    LoggedInMethod: ['Desktop'],
    RefEmpId: [0, [Validators.required]],
    EmpNo: ['', [Validators.required]],
    EmpName: ['', [Validators.required]],
    JoinDt: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required]],
    IdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    TaxIdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    IsExt: [false],
    IsActive: [true],
    IsLeave: [false],
    Addr: ['', [Validators.required]],
    Zipcode: ['', [Validators.required]],
    AreaCode1: ['', [Validators.required]],
    AreaCode2: ['', [Validators.required]],
    AreaCode3: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    AreaCode4: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    PhnArea1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    City: ['', [Validators.required]],
    Phn1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    PhnExt1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    PhnArea2: ['', [Validators.pattern('^[0-9]+$')]],
    Phn2: ['', [Validators.pattern('^[0-9]+$')]],
    PhnExt2: ['', [Validators.pattern('^[0-9]+$')]],
    PhnArea3: ['', [Validators.pattern('^[0-9]+$')]],
    Phn3: ['', [Validators.pattern('^[0-9]+$')]],
    PhnExt3: ['', [Validators.pattern('^[0-9]+$')]],
    FaxArea: ['', [Validators.pattern('^[0-9]+$')]],
    Fax: ['', [Validators.pattern('^[0-9]+$')]],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    MobilePhnNo2: ['', [Validators.pattern('^[0-9]+$')]],
    Email1: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]],
    Email2: ['', [Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]],
    RowVersion: [''],
    EmpBankAccId: [0, [Validators.required]],
    RefBankId: [0, [Validators.required]],
    BankBranch: ['', [Validators.required]],
    BankBranchRegCode: ['', [Validators.required]],
    BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    BankAccName: ['', [Validators.required]]
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refEmpId"] != null) {
        this.refEmpId = params["refEmpId"];
      }
      console.log(this.pageType);
      console.log(this.refEmpId);
    });

    this.generalSettingObj = new GeneralSettingObj();
    this.generalSettingObj.GsCode = "PASSWORD_REGEX";
    httpClient.post(this.getGeneralSettingUrl, this.generalSettingObj).subscribe(
      (response) => {
        this.resultData = response;
        this.passwordPattern = this.resultData.GsValue;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.inputLookupZipCodeObj = new InputLookupObj();
    this.inputLookupZipCodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipCodeObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupZipCodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipCodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipCodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    this.inputLookupBankObj = new InputLookupObj();
    this.inputLookupBankObj.urlJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupBankObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupBankObj.pagingJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.genericJson = "./assets/uclookup/Bank/lookupBank.json";

    // console.log("EmpUrl : " + this.getEmpUrl);
    // console.log("UsrUrl : " + this.getRefUserUrl);
    // console.log("EmpBank : " + this.getEmpBankUrl);
    // console.log("RefBank : " + this.getRefBankUrl);
    
    if (this.pageType == "edit") {
      var empObj = new RefEmpObj();
      empObj.RefEmpId = this.refEmpId;

      this.httpClient.post(this.getEmpUrl, empObj).pipe(
        map( response => {
          return response;
        }),
        mergeMap((response: any) => {
          var tempRefUser = new RefUserObj();
          tempRefUser.RefEmpId = response.RefEmpId;
          var tempEmpBankAcc = new EmpBankAccObj();
          tempEmpBankAcc.RefEmpId = response.RefEmpId;

          var tempResponse = [];
          tempResponse.push(response);

          const refUserObj = this.httpClient.post(this.getRefUserUrl, tempRefUser);
          const empBankAccObj = this.httpClient.post(this.getEmpBankUrl, tempEmpBankAcc);

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

          const refBankObj = this.httpClient.post(this.getRefBankUrl, tempRefBank);

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
            Password: refUserData.Password,
            ConfirmPassword: refUserData.Password,
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
            Addr: refEmpData.Addr,
            Zipcode: refEmpData.Zipcode,
            AreaCode1: refEmpData.AreaCode1,
            AreaCode2: refEmpData.AreaCode2,
            AreaCode3: refEmpData.AreaCode3,
            AreaCode4: refEmpData.AreaCode4,
            PhnArea1: refEmpData.PhnArea1,
            City: refEmpData.City,
            Phn1: refEmpData.Phn1,
            PhnExt1: refEmpData.PhnExt1,
            PhnArea2: refEmpData.PhnArea2,
            Phn2: refEmpData.Phn2,
            PhnExt2: refEmpData.PhnExt2,
            PhnArea3: refEmpData.PhnArea3,
            Phn3: refEmpData.Phn3,
            PhnExt3: refEmpData.PhnExt3,
            FaxArea: refEmpData.FaxArea,
            Fax: refEmpData.Fax,
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

          this.inputLookupZipCodeObj.nameSelect = refEmpData.Zipcode;
          this.inputLookupBankObj.nameSelect = refBankData.BankName;
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }

  getLookupZipCodeResponse(e){
    this.RefEmpForm.patchValue({
      Zipcode: e.zipcode,
      AreaCode1: e.areaCode1,
      AreaCode2: e.areaCode2,
      City: e.city,
    });
  }

  getLookupBankResponse(e){
    this.RefEmpForm.patchValue({
      RefBankId: e.refBankId,
      BankBranchRegCode: e.regRptCode
    });
  }

  SaveForm() {
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
    refEmpData.Addr = refEmpFormData.Addr;
    refEmpData.Zipcode = refEmpFormData.Zipcode;
    refEmpData.AreaCode1 = refEmpFormData.AreaCode1;
    refEmpData.AreaCode2 = refEmpFormData.AreaCode2;
    refEmpData.AreaCode3 = refEmpFormData.AreaCode3;
    refEmpData.AreaCode4 = refEmpFormData.AreaCode4;
    // refEmpData.City = refEmpData.City;
    refEmpData.PhnArea1 = refEmpFormData.PhnArea1;
    refEmpData.Phn1 = refEmpFormData.Phn1;
    refEmpData.PhnExt1 = refEmpFormData.PhnExt1;
    refEmpData.PhnArea2 = refEmpFormData.PhnArea2;
    refEmpData.Phn2 = refEmpFormData.Phn2;
    refEmpData.PhnExt2 = refEmpFormData.PhnExt2;
    refEmpData.PhnArea3 = refEmpFormData.PhnArea3;
    refEmpData.Phn3 = refEmpFormData.Phn3;
    refEmpData.PhnExt3 = refEmpFormData.PhnExt3;
    refEmpData.FaxArea = refEmpFormData.FaxArea;
    refEmpData.Fax = refEmpFormData.Fax;
    refEmpData.MobilePhnNo1 = refEmpFormData.MobilePhnNo1;
    refEmpData.MobilePhnNo2 = refEmpFormData.MobilePhnNo2;
    refEmpData.Email1 = refEmpFormData.Email1;
    refEmpData.Email2 = refEmpFormData.Email2;
    refEmpData.RowVersion = refEmpFormData.RowVersion;

    var refUserData = new RefUserObj();
    refUserData.RefUserId = refEmpFormData.RefUserId;
    refUserData.Username = refEmpFormData.Username;
    refUserData.Password = refEmpFormData.Password;
    refUserData.IsLockedOut = refEmpFormData.IsLockedOut;
    refUserData.RefEmpId = refEmpFormData.RefEmpId;
    refUserData.LoggedInMethod = refEmpFormData.LoggedInMethod;

    var empBankAccData = new EmpBankAccObj();
    empBankAccData.EmpBankAccId = refEmpFormData.EmpBankAccId;
    empBankAccData.RefBankId = refEmpFormData.RefBankId;
    empBankAccData.BankBranch = refEmpFormData.BankBranch;
    empBankAccData.BankBranchRegCode = refEmpFormData.BankBranchRegCode
    empBankAccData.BankAccNo = refEmpFormData.BankAccNo;
    empBankAccData.BankAccName = refEmpFormData.BankAccName;
    empBankAccData.RefEmpId = refEmpFormData.RefEmpId;

    if (this.pageType == "add") {
      this.httpClient.post(this.addUrl, refEmpData).pipe(
        map( response => {
          this.resultData = response;
          refUserData.RefEmpId = this.resultData.RefEmpId;
          empBankAccData.RefEmpId = this.resultData.RefEmpId;
        }),
        mergeMap(() => this.httpClient.post(this.addEmpBankAcc, empBankAccData)),
        mergeMap(() => this.httpClient.post(this.addUsrUrl, refUserData))
      ).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigateByUrl('/Employee', { skipLocationChange: true }).then(() =>
          // this.router.navigate(['/Employee/detail']))
          this.router.navigate(["/Employee/paging"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
    else {
      empBankAccData.RowVersion = this.empBankAccObj.RowVersion;
      refUserData.RowVersion = this.refUserObj.RowVersion;
      this.httpClient.post(this.editUrl, refEmpFormData).pipe(
        map( response => {}),
        mergeMap(() => this.httpClient.post(this.editEmpBankAcc, empBankAccData)),
        mergeMap(() => this.httpClient.post(this.editUsrUrl, refUserData))
      ).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Employee/paging"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }

  checkConfirmPassword(){
    var confirmPass = this.RefEmpForm.get('ConfirmPassword').value;
    var pass = this.RefEmpForm.get('Password').value;

    if(confirmPass != pass){
      this.isPasswordNotSame = true;
    }
    else{
      this.isPasswordNotSame = false;
    }
  }
}
