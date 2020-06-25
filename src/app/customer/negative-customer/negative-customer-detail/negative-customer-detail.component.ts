import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { NegativeCustObj } from 'app/shared/model/NegativeCustObj.Model';
import { NegativeCustChangeTrxObj } from 'app/shared/model/NegativeCustChangeTrxObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';

@Component({
  selector: 'app-negative-customer-detail',
  templateUrl: './negative-customer-detail.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class NegativeCustomerDetailComponent implements OnInit {
  private refMasterByTypeUrl: string = AdInsConstant.GetListActiveRefMaster;
  pageType: string = "add";
  negativeCustId: number;
  refMasterIdType: any;
  negativeTypeList: any;
  negativeSourceList: any;
  inputLookupCustPersonalObj: InputLookupObj;
  inputLookupCustCompanyObj: InputLookupObj;
  inputLookupZipcodeObj: InputLookupObj;
  custType: string = "PERSONAL";
  custNo: string = "";
  zipcode: string = "";
  negativeDataHistoryList: any;
  isFromLookup: boolean = false;
  businessDate: any;
  businessDateIdExp: any;
  tempKTPCheck: boolean;
  NegativeCustForm = this.fb.group({
    NegativeCustId: [0, [Validators.required]],
    CustId: [0],
    MrCustTypeCode: ['PERSONAL', [Validators.required]],
    CustNo: [''],
    CustName: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    IdExpiredDt: [''],
    TaxIdNo: [''],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', Validators.required],
    MrGenderCode: [''],
    MotherMaidenName: ['', [Validators.required]],
    LegalAddr: ['', [Validators.required]],
    Zipcode: ['', [Validators.required]],
    AreaCode1: ['', [Validators.required]],
    AreaCode2: ['', [Validators.required]],
    AreaCode3: ['', [Validators.required]],
    AreaCode4: ['', [Validators.required]],
    City: ['', [Validators.required]],
    PhnArea1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Phn1: ['', [Validators.required, Validators.pattern]],
    PhnExt1: ['', [Validators.required]],
    PhnArea2: ['', [Validators.pattern("^[0-9]+$")]],
    Phn2: ['', [Validators.pattern("^[0-9]+$")]],
    PhnExt2: ['', [Validators.pattern("^[0-9]+$")]],
    PhnArea3: ['', [Validators.pattern("^[0-9]+$")]],
    Phn3: ['', [Validators.pattern("^[0-9]+$")]],
    PhnExt3: ['', [Validators.pattern("^[0-9]+$")]],
    FaxArea: ['', [Validators.pattern("^[0-9]+$")]],
    Fax: ['', [Validators.pattern("^[0-9]+$")]],
    MobilePhn: ['', [Validators.pattern("^[0-9]+$")]],
    MrNegCustTypeCode: ['', [Validators.required]],
    MrNegCustSourceCode: ['', [Validators.required]],
    NegCustCause: [''],
    Notes: [''],
    IsActive: [true],
    RowVersion: ['']
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      }
      if (params['negativeCustId'] != null) {
        this.negativeCustId = params['negativeCustId'];
      }
    });

    var refMasterIdTypeObj = new RefMasterObj();
    refMasterIdTypeObj.RefMasterTypeCode = "ID_TYPE";
    var refMasterNegativeCustTypeObj = new RefMasterObj();
    refMasterNegativeCustTypeObj.RefMasterTypeCode = "NEG_CUST_TYPE";
    var refMasterNegativeSourceObj = new RefMasterObj();
    refMasterNegativeSourceObj.RefMasterTypeCode = "NEG_CUST_SOURCE";
    let requestIdType = this.httpClient.post(this.refMasterByTypeUrl, refMasterIdTypeObj);
    let requestNegativeCustType = this.httpClient.post(this.refMasterByTypeUrl, refMasterNegativeCustTypeObj);
    let requestNegativeSource = this.httpClient.post(this.refMasterByTypeUrl, refMasterNegativeSourceObj);
    forkJoin([requestIdType, requestNegativeCustType, requestNegativeSource]).subscribe(
      (response) => {
        this.refMasterIdType = response[0];
        this.negativeTypeList = response[1];
        this.negativeSourceList = response[2];
        this.NegativeCustForm.patchValue({
          MrIdTypeCode: this.refMasterIdType.ReturnObject[0].Key,
          MrNegCustTypeCode: this.negativeTypeList.ReturnObject[0].Key,
          MrNegCustSourceCode: this.negativeSourceList.ReturnObject[0].Key
        });
        if (this.pageType == "edit") {
          if (this.custType == AdInsConstant.CustomerPersonal && this.refMasterIdType.ReturnObject[0].Key == RefMasterConstant.EKtp) {
            this.tempKTPCheck = true;
            this.NegativeCustForm.controls.IdExpiredDt.clearValidators();
            this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
            this.NegativeCustForm.removeControl('CompanyLookup');
          } else if (this.custType == AdInsConstant.CustomerPersonal) {
            this.tempKTPCheck = false;
            this.NegativeCustForm.controls.IdExpiredDt.setValidators(Validators.required);
            this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
            this.NegativeCustForm.removeControl('CompanyLookup');
          }
          else {
            this.tempKTPCheck = true;
            this.NegativeCustForm.removeControl('MrIdTypeCode');
            this.NegativeCustForm.removeControl('IdNo');
            this.NegativeCustForm.removeControl('BirthPlace');
            this.NegativeCustForm.removeControl('BirthDt');
            this.NegativeCustForm.removeControl('MotherMaidenName');
            this.NegativeCustForm.removeControl('PersonalLookup');
            this.NegativeCustForm.removeControl('PersonalLookup');
          }
          this.NegativeCustForm.controls.IdExpiredDt.updateValueAndValidity();
        }
      }
    );
  }

  ngOnInit() {
    console.log('Shinano');
    var datePipe = new DatePipe("en-US");
    var criteriaList;
    var criteriaObj;
    var context = JSON.parse(localStorage.getItem("UserAccess"));
    this.businessDate = new Date(context["BusinessDt"]);
    this.businessDate.setDate(this.businessDate.getDate() - 1);
    this.businessDateIdExp = new Date(context["BusinessDt"]);
    this.businessDateIdExp.setDate(this.businessDateIdExp.getDate() + 1);

    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    this.inputLookupCustPersonalObj = new InputLookupObj();
    this.inputLookupCustPersonalObj.urlJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Personal.json";
    this.inputLookupCustPersonalObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupCustPersonalObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupCustPersonalObj.pagingJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Personal.json";
    this.inputLookupCustPersonalObj.genericJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Personal.json";
    criteriaList = new Array();
    criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'A.MR_CUST_TYPE_CODE';
    criteriaObj.value = "PERSONAL";
    criteriaList.push(criteriaObj);
    this.inputLookupCustPersonalObj.addCritInput = criteriaList;
    this.inputLookupCustPersonalObj.isRequired = false;

    this.inputLookupCustCompanyObj = new InputLookupObj();
    this.inputLookupCustCompanyObj.urlJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Company.json";
    this.inputLookupCustCompanyObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupCustCompanyObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupCustCompanyObj.pagingJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Company.json";
    this.inputLookupCustCompanyObj.genericJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Company.json";
    criteriaList = new Array();
    criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'A.MR_CUST_TYPE_CODE';
    criteriaObj.value = "COMPANY";
    criteriaList.push(criteriaObj);
    this.inputLookupCustCompanyObj.addCritInput = criteriaList;
    this.inputLookupCustCompanyObj.isRequired = false;

    if (this.pageType == "edit") {
      var negativeCustObj = new NegativeCustObj();
      negativeCustObj.NegativeCustId = this.negativeCustId;
      this.httpClient.post(AdInsConstant.GetNegativeCustByNegativeCustId, negativeCustObj).pipe(
        map((response) => {
          return response;
        }),
        mergeMap((response: any) => {
          var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
          negativeCustChangeTrxObj.NegativeCustId = response.NegativeCustId;
          const negativeCustChangeTrx = this.httpClient.post(AdInsConstant.GetListNegativeCustChangeTrxByNegativeCustId, negativeCustChangeTrxObj);
          var tempResponse = [response];
          return forkJoin([tempResponse, negativeCustChangeTrx]);
        })
      ).subscribe(
        (response: any) => {
          var negativeCustData = response[0];
          var expiredDt = datePipe.transform(negativeCustData.IdExpiredDt, 'yyyy-MM-dd');
          var birthDt = datePipe.transform(negativeCustData.BirthDt, 'yyyy-MM-dd');
          this.custNo = negativeCustData.CustNo;
          this.zipcode = negativeCustData.Zipcode;
          this.custType = negativeCustData.MrCustTypeCode;
          this.NegativeCustForm.patchValue({
            NegativeCustId: negativeCustData.NegativeCustId,
            CustId: negativeCustData.CustId,
            MrCustTypeCode: negativeCustData.MrCustTypeCode,
            CustNo: negativeCustData.CustNo,
            CustName: negativeCustData.CustName,
            MrIdTypeCode: negativeCustData.MrIdTypeCode,
            IdNo: negativeCustData.IdNo,
            IdExpiredDt: expiredDt,
            TaxIdNo: negativeCustData.TaxIdNo,
            BirthPlace: negativeCustData.BirthPlace,
            BirthDt: birthDt,
            MrGenderCode: negativeCustData.MrGenderCode,
            MotherMaidenName: negativeCustData.MotherMaidenName,
            LegalAddr: negativeCustData.LegalAddr,
            AreaCode1: negativeCustData.AreaCode1,
            AreaCode2: negativeCustData.AreaCode2,
            AreaCode3: negativeCustData.AreaCode3,
            AreaCode4: negativeCustData.AreaCode4,
            Zipcode: negativeCustData.Zipcode,
            City: negativeCustData.City,
            PhnArea1: negativeCustData.PhnArea1,
            Phn1: negativeCustData.Phn1,
            PhnExt1: negativeCustData.PhnExt1,
            PhnArea2: negativeCustData.PhnArea2,
            Phn2: negativeCustData.Phn2,
            PhnExt2: negativeCustData.PhnExt2,
            PhnArea3: negativeCustData.PhnArea3,
            Phn3: negativeCustData.Phn3,
            PhnExt3: negativeCustData.PhnExt3,
            FaxArea: negativeCustData.FaxArea,
            Fax: negativeCustData.Fax,
            MobilePhn: negativeCustData.MobilePhn,
            MrNegCustTypeCode: negativeCustData.MrNegCustTypeCode,
            MrNegCustSourceCode: negativeCustData.MrNegCustSourceCode,
            NegCustCause: negativeCustData.NegCustCause,
            Notes: negativeCustData.Notes,
            IsActive: negativeCustData.IsActive,
            RowVersion: negativeCustData.RowVersion
          });
          console.log(this.NegativeCustForm.controls);
          if (this.custType == AdInsConstant.CustomerPersonal && this.NegativeCustForm.controls.MrIdTypeCode.value == RefMasterConstant.EKtp) {
            this.tempKTPCheck = true;
            this.NegativeCustForm.controls.IdExpiredDt.clearValidators();
            this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
            this.NegativeCustForm.removeControl('CompanyLookup');
          }
          else if (this.custType == AdInsConstant.CustomerPersonal) {
            this.tempKTPCheck = false;
            this.NegativeCustForm.controls.IdExpiredDt.setValidators(Validators.required);
            this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
            this.NegativeCustForm.removeControl('CompanyLookup');
          }
          else {
            this.tempKTPCheck = true;
            this.NegativeCustForm.removeControl('MrIdTypeCode');
            this.NegativeCustForm.removeControl('IdNo');
            this.NegativeCustForm.removeControl('BirthPlace');
            this.NegativeCustForm.removeControl('BirthDt');
            this.NegativeCustForm.removeControl('MotherMaidenName');
            this.NegativeCustForm.removeControl('PersonalLookup');
            this.NegativeCustForm.removeControl('PersonalLookup');
            this.NegativeCustForm.removeControl('CustId');
          }

          if (this.NegativeCustForm.controls.MrIdTypeCode != undefined && this.NegativeCustForm.controls.MrIdTypeCode.value == null && this.NegativeCustForm.controls.MrIdTypeCode.value == undefined) {
            this.NegativeCustForm.removeControl('CustId');
          }

          this.NegativeCustForm.controls.IdExpiredDt.updateValueAndValidity();
          this.negativeDataHistoryList = response[1].ReturnObject;
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  custTypeHandler(e) {
    var selected = e.target.value;
    if (selected == "PERSONAL") {
      this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
      this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
      this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
      this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
      this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
      this.NegativeCustForm.removeControl('CompanyLookup');
    }
    else if (selected == "COMPANY") {
      this.NegativeCustForm.removeControl('MrIdTypeCode');
      this.NegativeCustForm.removeControl('IdNo');
      this.NegativeCustForm.removeControl('BirthPlace');
      this.NegativeCustForm.removeControl('BirthDt');
      this.NegativeCustForm.removeControl('MotherMaidenName');
      this.NegativeCustForm.removeControl('PersonalLookup');
    }

    this.NegativeCustForm.reset();
    this.NegativeCustForm.patchValue({
      NegativeCustId: 0,
      CustId: 0,
      MrCustTypeCode: selected,
      IsActive: true
    });

    this.inputLookupCustPersonalObj.nameSelect = "";
    this.inputLookupCustCompanyObj.nameSelect = "";
    this.custType = e.target.value;
  }

  getLookupCustPersonalResponse(e) {
    var datePipe = new DatePipe("en-US");
    var expiredDt = datePipe.transform(e.idExpiredDate, 'yyyy-MM-dd');
    var birthDt = datePipe.transform(e.birthDate, 'yyyy-MM-dd');
    var custAddr = new CustAddrObj();
    custAddr.CustId = e.custId;
    custAddr.MrCustAddrTypeCode = "LEGAL";
    this.httpClient.post(AdInsConstant.GetCustAddrByMrCustAddrType, custAddr).subscribe(
      (response: any) => {
        this.NegativeCustForm.patchValue({
          CustId: e.custId,
          CustNo: e.custNo,
          CustName: e.custName,
          MrIdTypeCode: e.idType,
          IdNo: e.idNo,
          IdExpiredDt: expiredDt,
          BirthPlace: e.birthPlace,
          BirthDt: birthDt,
          MotherMaidenName: e.motherMaidenName,
          TaxIdNo: e.taxIdNo,
          MrGenderCode: e.gender,
          LegalAddr: response.Addr,
          Zipcode: response.Zipcode,
          AreaCode1: response.AreaCode1,
          AreaCode2: response.AreaCode2,
          AreaCode3: response.AreaCode3,
          AreaCode4: response.AreaCode4,
          City: response.City,
          PhnArea1: response.PhnArea1,
          Phn1: response.Phn1,
          PhnExt1: response.PhnExt1,
          PhnArea2: response.PhnArea2,
          Phn2: response.Phn2,
          PhnExt2: response.PhnExt2,
          PhnArea3: response.PhnArea3,
          Phn3: response.Phn3,
          PhnExt3: response.PhnExt3,
          FaxArea: response.FaxArea,
          Fax: response.Fax,
          MobilePhn: e.mobilePhone
        });
        this.isFromLookup = true;
        this.inputLookupZipcodeObj.nameSelect = response.Zipcode;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLookupCustCompanyResponse(e) {
    var custAddr = new CustAddrObj();
    custAddr.CustId = e.custId;
    custAddr.MrCustAddrTypeCode = "LEGAL";
    this.httpClient.post(AdInsConstant.GetCustAddrByMrCustAddrType, custAddr).subscribe(
      (response: any) => {
        this.NegativeCustForm.patchValue({
          CustId: e.custId,
          CustNo: e.custNo,
          CustName: e.custName,
          TaxIdNo: e.taxIdNo,
          LegalAddr: response.Addr,
          Zipcode: response.Zipcode,
          AreaCode1: response.AreaCode1,
          AreaCode2: response.AreaCode2,
          AreaCode3: response.AreaCode3,
          AreaCode4: response.AreaCode4,
          City: response.City,
          PhnArea1: response.PhnArea1,
          Phn1: response.Phn1,
          PhnExt1: response.PhnExt1,
          PhnArea2: response.PhnArea2,
          Phn2: response.Phn2,
          PhnExt2: response.PhnExt2,
          PhnArea3: response.PhnArea3,
          Phn3: response.Phn3,
          PhnExt3: response.PhnExt3,
          FaxArea: response.FaxArea,
          Fax: response.Fax,
        });
        this.isFromLookup = true;
        this.inputLookupZipcodeObj.nameSelect = response.Zipcode;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLookupZipcodeResponse(e) {
    this.NegativeCustForm.patchValue({
      Zipcode: e.Zipcode,
      AreaCode1: e.AreaCode1,
      AreaCode2: e.AreaCode2,
      City: e.City
    });
  }


  onOptionsSelected(event) {
    if (event.target.value == RefMasterConstant.EKtp) {
      this.NegativeCustForm.controls.IdExpiredDt.clearValidators();
      this.tempKTPCheck = true;
    } else {
      this.NegativeCustForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.NegativeCustForm.controls.IdExpiredDt.updateValueAndValidity();
  }

  SaveForm() {
    var negativeCustFormData = this.NegativeCustForm.value;

    // This Code Is Temporary Due to Negative Customer Approval Is Not Ready At The Moment
    if (this.pageType == "add") {
      this.httpClient.post(AdInsConstant.AddNegativeCustomer, negativeCustFormData).pipe(
        map((response) => {
          return response;
        }),
        mergeMap((response: any) => {
          var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
          negativeCustChangeTrxObj.NegativeCustId = response.NegativeCustId;
          negativeCustChangeTrxObj.TrxNo = "DUMMY_TRX_NO";
          negativeCustChangeTrxObj.MrTrxStatCode = "EXE";
          negativeCustChangeTrxObj.MrNegCustTypeCode = negativeCustFormData.MrCustTypeCode;
          negativeCustChangeTrxObj.MrNegCustSourceCode = negativeCustFormData.MrNegCustSourceCode;
          negativeCustChangeTrxObj.NegCustCause = negativeCustFormData.NegCustCause;
          negativeCustChangeTrxObj.Notes = negativeCustFormData.Notes;
          negativeCustChangeTrxObj.RfaNo = "DUMMY_RFA";
          negativeCustChangeTrxObj.ReqDt = new Date();
          negativeCustChangeTrxObj.ApvDt = new Date();
          negativeCustChangeTrxObj.ExeDt = new Date();

          const addNegativeCustChangeTrx = this.httpClient.post(AdInsConstant.AddNegativeCustChangeTrx, negativeCustChangeTrxObj);
          var tempResponse = [response];
          return forkJoin([tempResponse, addNegativeCustChangeTrx]);
        })
      ).subscribe(
        (response) => {
          var responseNegativeCust = response[0];
          this.toastr.successMessage(responseNegativeCust["message"]);
          this.router.navigate(['/Customer/NegativeCustomer/Paging']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else if (this.pageType == "edit") {
      this.httpClient.post(AdInsConstant.EditNegativeCustomer, negativeCustFormData).pipe(
        map((response) => {
          return response;
        }),
        mergeMap((response) => {
          var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
          negativeCustChangeTrxObj.NegativeCustId = negativeCustFormData.NegativeCustId;
          negativeCustChangeTrxObj.TrxNo = "DUMMY_TRX_NO";
          negativeCustChangeTrxObj.MrTrxStatCode = "EXE";
          negativeCustChangeTrxObj.MrNegCustTypeCode = negativeCustFormData.MrCustTypeCode;
          negativeCustChangeTrxObj.MrNegCustSourceCode = negativeCustFormData.MrNegCustSourceCode;
          negativeCustChangeTrxObj.NegCustCause = negativeCustFormData.NegCustCause;
          negativeCustChangeTrxObj.Notes = negativeCustFormData.Notes;
          negativeCustChangeTrxObj.RfaNo = "DUMMY_RFA";
          negativeCustChangeTrxObj.ReqDt = new Date();
          negativeCustChangeTrxObj.ApvDt = new Date();
          negativeCustChangeTrxObj.ExeDt = new Date();

          const addNegativeCustChangeTrx = this.httpClient.post(AdInsConstant.AddNegativeCustChangeTrx, negativeCustChangeTrxObj);
          var tempResponse = [response];
          return forkJoin([tempResponse, addNegativeCustChangeTrx]);
        })
      ).subscribe(
        (response) => {
          var responseNegativeCust = response[0];
          this.toastr.successMessage(responseNegativeCust["message"]);
          this.router.navigate(['/Customer/NegativeCustomer/Paging']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
