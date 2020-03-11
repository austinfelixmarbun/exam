import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-negative-customer-detail',
  templateUrl: './negative-customer-detail.component.html',
  styleUrls: ['./negative-customer-detail.component.scss'],
  providers: [NGXToastrService]
})
export class NegativeCustomerDetailComponent implements OnInit {
  private refMasterByTypeUrl: string = environment.FoundationR3Url + AdInsConstant.GetListActiveRefMaster;
  pageType: string = "add";
  negativeCustId: number;
  refMasterIdType: any;
  negativeTypeList: any;
  negativeSourceList: any;
  inputLookupCustPersonalObj: InputLookupObj;
  inputLookupCustCompanyObj: InputLookupObj;
  inputLookupZipcodeObj: InputLookupObj;
  custType: string = "P";
  custNo: string = "";

  NegativeCustForm = this.fb.group({
    NegativeCustId: [0, [Validators.required]],
    CustId: [0, [Validators.required]],
    MrCustTypeCode: ['P', [Validators.required]],
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
        this.refMasterIdType = response[0],
        this.negativeTypeList = response[1],
        this.negativeSourceList = response[2]
      }
    );
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    var criteriaList;
    var criteriaObj;
    
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
    criteriaObj.value = "P";
    criteriaList.push(criteriaObj);
    this.inputLookupCustPersonalObj.addCritInput = criteriaList;

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
    criteriaObj.value = "C";
    criteriaList.push(criteriaObj);
    this.inputLookupCustCompanyObj.addCritInput = criteriaList;

    if(this.pageType == "edit"){
      var negativeCustObj = new NegativeCustObj();
      negativeCustObj.NegativeCustId = this.negativeCustId;
      this.httpClient.post(AdInsConstant.GetNegativeCustByNegativeCustId, negativeCustObj).subscribe(
        (response: any) => {
          var expiredDt = datePipe.transform(response.IdExpiredDt, 'yyyy-MM-dd');
          var birthDt = datePipe.transform(response.BirthDt, 'yyyy-MM-dd');
          this.custNo = response.CustNo;
          this.NegativeCustForm.patchValue({
            NegativeCustId: response.NegativeCustId,
            CustId: response.CustId,
            MrCustTypeCode: response.MrCustTypeCode,
            CustNo: response.CustNo,
            CustName: response.CustName,
            MrIdTypeCode: response.MrIdTypeCode,
            IdNo: response.IdNo,
            IdExpiredDt: expiredDt,
            TaxIdNo: response.TaxIdNo,
            BirthPlace: response.BirthPlace,
            BirthDt: birthDt,
            MrGenderCode: response.MrGenderCode,
            MotherMaidenName: response.MotherMaidenName,
            LegalAddr: response.LegalAddr,
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
            MobilePhn: response.MobilePhn,
            MrNegCustTypeCode: response.MrNegCustTypeCode,
            MrNegCustSourceCode: response.MrNegCustSourceCode,
            NegCustCause: response.NegCustCause,
            Notes: response.Notes,
            IsActive: response.IsActive,
            RowVersion: response.RowVersion
          });

          this.inputLookupZipcodeObj.nameSelect = response.Zipcode;

          if(response.MrCustTypeCode == "P"){
            this.inputLookupCustPersonalObj.nameSelect = response.CustNo;
          }
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  custTypeHandler(e){
    if(e.target.value == "P"){
      this.NegativeCustForm.controls['CustName'].setValidators([Validators.required]);
      this.NegativeCustForm.controls['MrIdTypeCode'].setValidators([Validators.required]);
      this.NegativeCustForm.controls['IdNo'].setValidators([Validators.required]);
      this.NegativeCustForm.controls['BirthPlace'].setValidators([Validators.required]);
      this.NegativeCustForm.controls['BirthDt'].setValidators([Validators.required]);
      this.NegativeCustForm.controls['MotherMaidenName'].setValidators([Validators.required]);
    }
    else if(e.target.value == "C"){
      this.NegativeCustForm.controls['CustName'].setValidators([Validators.required]);
      this.NegativeCustForm.controls['MrIdTypeCode'].clearValidators();
      this.NegativeCustForm.controls['IdNo'].clearValidators();
      this.NegativeCustForm.controls['BirthPlace'].clearValidators();
      this.NegativeCustForm.controls['BirthDt'].clearValidators();
      this.NegativeCustForm.controls['MotherMaidenName'].clearValidators();
    }

    this.NegativeCustForm.patchValue({
      CustId: "",
      CustNo: "",
      CustName: "",
      MrIdTypeCode: "",
      IdNo: "",
      BirthPlace: "",
      BirthDt: "",
      MotherMaidenName: "",
      TaxIdNo: ""
    });

    this.inputLookupCustPersonalObj.nameSelect = "";
    this.inputLookupCustCompanyObj.nameSelect = "";
    this.custType = e.target.value;
  }

  getLookupCustPersonalResponse(e){
    this.NegativeCustForm.patchValue({
      CustId: e.custId,
      CustNo: e.custNo,
      CustName: e.custName,
      MrIdTypeCode: e.idType,
      IdNo: e.idNo,
      BirthPlace: e.birthPlace,
      BirthDt: e.birthDt,
      MotherMaidenName: e.motherMaidenName,
      TaxIdNo: e.taxIdNo
    });
  }

  getLookupCustCompanyResponse(e){
    this.NegativeCustForm.patchValue({
      CustId: e.custId,
      CustNo: e.custNo,
      CustName: e.custName,
      MrIdTypeCode: "",
      IdNo: "",
      BirthPlace: "",
      BirthDt: "",
      MotherMaidenName: "",
      TaxIdNo: e.taxIdNo
    });
  }

  getLookupZipcodeResponse(e){
    this.NegativeCustForm.patchValue({
      Zipcode: e.zipcode,
      AreaCode1: e.areaCode1,
      AreaCode2: e.areaCode2,
      City: e.city
    });
  }

  SaveForm(){
    var negativeCustFormData = this.NegativeCustForm.value;
    console.log("Form Data : " + JSON.stringify(negativeCustFormData));

    // This Code Is Temporary Due to Negative Customer Approval Is Not Ready At The Moment
    if(this.pageType == "add"){ 
      this.httpClient.post(AdInsConstant.AddNegativeCustomer, negativeCustFormData).pipe(
        map( (response) => {
          return response;
        }),
        mergeMap( (response: any) => {
          var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
          negativeCustChangeTrxObj.NegativeCustId = response.NegativeCustId;
          negativeCustChangeTrxObj.TrxNo = "DUMMY_TRX_NO";
          negativeCustChangeTrxObj.MrTrxStatCode = "EXE";
          negativeCustChangeTrxObj.MrNegCustTypeCode = negativeCustFormData.MrCustTypeCode;
          negativeCustChangeTrxObj.MrNegCustSourceCode = negativeCustFormData.MrNegCustSourceCode;
          negativeCustChangeTrxObj.NegCustCause = negativeCustFormData.NegCustCause;
          negativeCustChangeTrxObj.Notes = negativeCustChangeTrxObj.Notes;
          negativeCustChangeTrxObj.RfaNo = "DUMMY_RFA";
          negativeCustChangeTrxObj.ReqDt = new Date();
          negativeCustChangeTrxObj.ApvDt = new Date();
          negativeCustChangeTrxObj.ExeDt = new Date();
          console.log("Negative Cust Change Trx : " + JSON.stringify(negativeCustChangeTrxObj));

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
          console.log("Error");
          console.log(error);
        }
      );
    }
    else if(this.pageType == "edit"){
      this.httpClient.post(AdInsConstant.EditNegativeCustomer, negativeCustFormData).pipe(
        map( (response) => {
          return response;
        }),
        mergeMap( (response) => {
          var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
          negativeCustChangeTrxObj.NegativeCustId = negativeCustFormData.NegativeCustId;
          negativeCustChangeTrxObj.TrxNo = "DUMMY_TRX_NO";
          negativeCustChangeTrxObj.MrTrxStatCode = "EXE";
          negativeCustChangeTrxObj.MrNegCustTypeCode = negativeCustFormData.MrCustTypeCode;
          negativeCustChangeTrxObj.MrNegCustSourceCode = negativeCustFormData.MrNegCustSourceCode;
          negativeCustChangeTrxObj.NegCustCause = negativeCustFormData.NegCustCause;
          negativeCustChangeTrxObj.Notes = negativeCustChangeTrxObj.Notes;
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
          console.log("Error");
          console.log(error);
        }
      );
    }
  }
}
