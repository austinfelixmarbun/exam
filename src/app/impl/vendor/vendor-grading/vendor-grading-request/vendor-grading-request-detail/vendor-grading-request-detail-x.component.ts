import {UcapprovalcreateComponent} from '@adins/ucapprovalcreate';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NGXToastrService} from 'app/components/extra/toastr/toastr.service';
import {CommonConstantX} from 'app/impl/shared/constant/CommonConstantX';
import {URLConstantX} from 'app/impl/shared/constant/URLConstantX';
import {AdInsHelper} from 'app/shared/AdInsHelper';
import {CommonConstant} from 'app/shared/constant/CommonConstant';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {NavigationConstant} from 'app/shared/NavigationConstant';
import {environment} from 'environments/environment';
import {CookieService} from 'ngx-cookie';
import {InputLookupObj} from 'app/shared/model/input-lookup-obj.model';
import {VendorObj} from 'app/shared/model/vendor-obj.model';
import {RFAInfoObj} from 'app/shared/model/Approval/rfa-info-obj.model';
import {VendorGradingHistObj} from 'app/shared/model/vendor-grading-hist-obj.model';
import {UcInputRFAObj} from 'app/shared/model/uc-input-rfa-obj.model';
import { ReqGetVendorGradeByVendorRatingAndVendorCategoryCodeObj } from "app/shared/model/request/req-get-vendor-grading.model";

@Component({
  selector: 'app-vendor-grading-request-detail-x',
  templateUrl: './vendor-grading-request-detail-x.component.html'
})

export class VendorGradingRequestDetailXComponent implements OnInit {

  inputLookupParentObj: InputLookupObj = new InputLookupObj();
  VendorId: number;
  mode: string;
  businessDt: Date;
  Grade: string;
  ParentId: number;
  result: any;
  listApprover: any;
  listReason: any;
  rfaInfoObj: RFAInfoObj = new RFAInfoObj();
  vendorObj: VendorObj = new VendorObj();
  vendorGradingHistObj: VendorGradingHistObj = new VendorGradingHistObj();
  ReqByUserId: String;
  OfficeCode: String;
  VendorForm: FormGroup;
  selected: String;
  selectedReasonCode: String;
  title: String;
  vendorName: String;
  vendorCode: String;
  gradeCode: String;
  oldGradeCode: String;
  oldVendorRating: number;
  supplierType: string = "";
  private createComponent: UcapprovalcreateComponent;
  @ViewChild('ApprovalComponent') set content(content: UcapprovalcreateComponent) {
    if (content) {
      // initially setter gets called with undefined
      this.createComponent = content;
    }
  }
  ApprovalCreateOutput: any;
  InputObj: UcInputRFAObj = new UcInputRFAObj(this.cookieService);
  IsReady: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private cookieService: CookieService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params["VendorId"] != 0) {
        this.VendorId = params["VendorId"];
      }
      if (params["mode"] != null) {
        this.mode = params["mode"];
      }
    });
  }
  currentUserContext: any;

  async ngOnInit() {
    this.currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    if (this.mode == "edit") { this.title = "Detail Supplier Grading Request" }
    else { this.title = "Add Supplier Grading Request" }

    this.VendorForm = this.fb.group({
      VendorId: [""],
      VendorCode: [""],
      VendorRating: ['', [Validators.min(1.00), Validators.max(100.00), Validators.required]],

      ApvRecommendation: this.fb.array([]),
    });

    if (this.mode == "edit") {
      await this.getData();
      // var apvObj = { SchemeCode: "VENDOR_GRD_SUPPL_BRC" };
      // this.http
      //   .post(URLConstant.GetApprovedBy, apvObj)
      //   .subscribe((response) => {
      //     this.listApprover = response;

      //     this.VendorForm.patchValue({
      //       ListApprover: this.listApprover[0].Key,
      //     });
      //   });

      await this.http.post(URLConstant.GetListActiveRefReason, { RefReasonTypeCode: CommonConstant.VENDOR_GRADING_APV }).toPromise().then(
        (response) => {
          this.listReason = response[CommonConstant.ReturnObj];
          this.VendorForm.patchValue({
            Reason: this.listReason[0].Key
          });
          this.selected = this.listReason[0].Key;
        }
      );
    } else {
      this.inputLookupParentObj.isRequired = true;
      this.setLookup();
    }
    this.initInputApprovalObj();
  }

  async getData() {
    var ReqValue = this.VendorForm.value;
    let vendorId: number;
    if (this.mode == "edit") { vendorId = this.VendorId }
    else { vendorId = ReqValue.VendorId }

    await this.http.post(URLConstant.GetVendorByVendorId, { Id: vendorId }).toPromise().then((response) => {
      this.result = response;
      this.ParentId = this.result.VendorParentId;
      this.oldVendorRating = this.result.VendorRating;
      this.vendorCode = this.result.VendorCode;
      this.vendorName = this.result.VendorName;
      this.VendorForm.patchValue({
        VendorId: this.result.VendorId,
        VendorRating: this.result.VendorRating
      });
      if (this.mode == "edit") {
        this.setLookup();
        this.LoadGradingRule(this.result.VendorRating);
      }
    });

    var obj = {
      VendorCode: this.vendorCode,
      VendorAttrCode: CommonConstantX.VENDOR_ATTR_CODE_SUPPLIER_TYPE
    }
    await this.http.post(URLConstantX.GetAttrContentByVendorCodeAndVendorAttrCode, obj).toPromise().then(
      (response) => {
        if (response["Code"] != "") {
          this.supplierType = response["Code"];
        }
      }
    );

  }

  getOldVendorGrade() {
    var ReqValue = this.VendorForm.value;
    let vendorId: number;
    // if(this.mode == "edit"){vendorId = this.VendorId}
    // else {vendorId = ReqValue.VendorId}
    this.http.post(URLConstant.GetVendorGrade, { Id: this.VendorId }).subscribe((response) => {
      console.log(response);
      this.result = response;
      this.oldGradeCode = response["VendorGrade"];
      this.gradeCode = response["VendorGrade"];
    });
  }

  async onVendorRatingChange(vendorRating: any) {
    if (vendorRating !== undefined && vendorRating !== null && vendorRating !== "") {
      await this.LoadGradingRule(vendorRating);
    } else {
      this.gradeCode = "";
    }
  }

  async LoadGradingRule(vendorRating: number) {
    let reqObj = new ReqGetVendorGradeByVendorRatingAndVendorCategoryCodeObj();
    reqObj.VendorRating = vendorRating;
    reqObj.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
    await this.http.post(URLConstant.GetRuleVendorGradingV2, reqObj).toPromise().then(
      (response) => {
        this.gradeCode = response["VendorGrade"];
      }
    );
  }

  setLookup() {
    this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    if (this.mode == "edit") { this.inputLookupParentObj.isRequired = false; } else { this.inputLookupParentObj.isRequired = true; }

    this.inputLookupParentObj.addCritInput = new Array();

    if (this.mode == "edit") {
      if (this.result.VendorId != null) {
        this.inputLookupParentObj.jsonSelect = {
          VendorName: this.result.VendorName,
        };
      }
    }

    this.inputLookupParentObj.isReady = true;
  }
  selectOption(id: String) {

  }

  SaveForm() {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    var ReqValue = this.VendorForm.value;

    this.rfaInfoObj.ApprovedById = ReqValue.ListApprover;
    this.rfaInfoObj.Reason = ReqValue.Reason;
    this.rfaInfoObj.Notes = ReqValue.Notes;

    this.vendorGradingHistObj.ReqByRefUserId = this.ReqByUserId;
    this.vendorGradingHistObj.ReqDt = context[CommonConstant.BUSINESS_DT]
    this.vendorGradingHistObj.Status = CommonConstant.VENDOR_GRADING_STATUS_REQ;
    this.vendorGradingHistObj.VendorId = ReqValue.VendorId;
    this.vendorGradingHistObj.NewRating = ReqValue.VendorRating;
    this.vendorGradingHistObj.Notes = ReqValue.Notes;
    this.vendorGradingHistObj.NewGrade = this.gradeCode;

    const reason = this.listReason.filter(reason => reason.Value == ReqValue.Reason);
    let rfaInfo = { RFAInfo: this.VendorForm.controls.RFAInfo.value };
    var submitVendorGradingReqObj = {
      VendorGrading: this.vendorGradingHistObj,
      OfficeCode: this.currentUserContext[CommonConstant.OFFICE_CODE],
      RequestRFAObj: rfaInfo

    }

    let SubmitRequestVendorGradingUrl = environment.isCore ? URLConstant.SubmitRequestVendorGradingV2 : URLConstant.SubmitRequestVendorGrading;
    this.http.post(SubmitRequestVendorGradingUrl, submitVendorGradingReqObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate([NavigationConstant.VENDOR_GRD_REQ_PAGING]);
      })

  }

  async getLookupParent(event) {
    this.VendorForm.patchValue({
      VendorId: event.VendorId,
      VendorCode: event.VendorCode
    });
    await this.getData();
    this.getOldVendorGrade();
  }

  initInputApprovalObj() {
    let Attributes = [{}]
    let TypeCode = {
      "TypeCode": CommonConstant.VENDOR_GRD_SUPPL_BRC_APV_TYPE,
      "Attributes": Attributes,
    }

    this.InputObj.ApvTypecodes = [TypeCode];
    this.InputObj.CategoryCode = CommonConstant.VENDOR_GRADING_APV;

    this.InputObj.Reason = this.listReason;
    this.InputObj.TrxNo = " ";

    console.log(this.supplierType)
    if (this.supplierType == CommonConstantX.VENDOR_ATTR_CONT_SUPPL_TYPE_FACTORING) {
      this.InputObj.SchemeCode = CommonConstantX.SCHM_CODE_VENDOR_GRD_SUPPL_BRC_SCHM_FCTR;
    }
    else if (this.supplierType == CommonConstantX.VENDOR_ATTR_CONT_SUPPL_TYPE_DEALER_FINANCING) {
      this.InputObj.SchemeCode = CommonConstantX.SCHM_CODE_VENDOR_GRD_SUPPL_BRC_SCHM_DLFN;
    }
    else {
      this.InputObj.SchemeCode = CommonConstantX.SCHM_CODE_VENDOR_GRD_SUPPL_BRC_SCHM;
    }

    this.IsReady = true;
    console.log(this.listReason);
  }

}
