import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { URLConstant } from "app/shared/constant/URLConstant";
import { InputLookupObj } from "app/shared/model/InputLookupObj.Model";
import { environment } from "environments/environment";
import { first } from "rxjs/operators";
import { RFAInfoObj } from 'app/shared/model/Approval/RFAInfoObj.Model'
import { VendorObj } from "app/shared/model/VendorObj.Model";
import { VendorGradingHistObj } from "app/shared/model/VendorGradingHistObj.model";

@Component({
  selector: "app-vendor-grading-request-detail",
  templateUrl: "./vendor-grading-request-detail.component.html",
  providers: [NGXToastrService],
})
export class VendorGradingRequestDetailComponent implements OnInit {
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
  ReqByUserId : String;
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService
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

  ngOnInit(): void {
    if (this.mode == "edit"){this.title = "Detail Supplier Branch Grading Request"}
    else {this.title = "Add Supplier Branch Grading Request"}

    this.VendorForm = this.fb.group({
      VendorId: [""],
      VendorCode: [""],
      VendorRating: ['', [Validators.min(1.00), Validators.max(100.00), Validators.required]],
      ListApprover: ["", Validators.required],
      Reason: ["", Validators.required],
      Notes: ["", Validators.required],
      ApvRecommendation: this.fb.array([]),
    });
    var currentUserContext = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDt = new Date(currentUserContext[CommonConstant.BUSINESS_DT]);
    this.ReqByUserId = currentUserContext[CommonConstant.USER_NAME];
    this.OfficeCode = currentUserContext["OfficeCode"];
    if (this.mode == "edit") {
      this.getData();
      var apvObj = { SchemeCode: "VENDOR_GRD_SUPPL_BRC" };
      this.http
        .post(URLConstant.GetApprovedBy, apvObj)
        .subscribe((response) => {
          this.listApprover = response;

          this.VendorForm.patchValue({
            ListApprover: this.listApprover[0].Key,
          });
        });

        this.http.post(URLConstant.GetListActiveRefReason, { RefReasonTypeCode: CommonConstant.VENDOR_GRADING_APV }).pipe(first()).subscribe(
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
  }
  getData() {
    var ReqValue = this.VendorForm.value;
    let vendorId: number;
    if(this.mode == "edit"){vendorId = this.VendorId}
    else {vendorId = ReqValue.VendorId}

    this.http
      .post(URLConstant.GetVendorByVendorId, {
        VendorId: vendorId
      })
      .subscribe((response) => {
        this.result = response;
        this.ParentId = this.result.VendorParentId;
        this.oldVendorRating = this.result.VendorRating;
        this.vendorCode = this.result.VendorCode;
        this.vendorName = this.result.VendorName;
        this.VendorForm.patchValue({
          VendorId: this.result.VendorId,
          VendorRating: this.result.VendorRating
        });
        if(this.mode == "edit")
        {
          this.setLookup();
        }
      });
  }

  getOldVendorGrade(){
    var ReqValue = this.VendorForm.value;
    let vendorId: number;
    if(this.mode == "edit"){vendorId = this.VendorId}
    else {vendorId = ReqValue.VendorId}
    this.http
      .post(URLConstant.GetVendorGrade, {
        VendorId: vendorId
      })
      .subscribe((response) => {
        this.result = response;
        this.oldGradeCode = response["VendorGrade"];
        this.gradeCode = response["VendorGrade"];
      });
  }

  async onVendorRatingChange(vendorRating: any){
    if (vendorRating !== undefined && vendorRating !== null && vendorRating !== "")
    {
      await this.LoadGradingRule(vendorRating);
    }else{
      this.gradeCode = "";
    }
  }

  async LoadGradingRule(vendorRating: number)
  {
    await this.http.post(URLConstant.GetRuleVendorGrading, { VendorRating:  vendorRating}).subscribe(
      (response) => {
        // this.gradeCode = response["Key"];
        // this.VendorForm.patchValue({
        //   VendorGrade: response["Value"],
        //   VendorGradeCode : response["Key"]
        // });

        this.gradeCode = response["VendorGrade"];
        // this.VendorForm.patchValue({
        //   VendorGrade: response["Value"],
        //   VendorGradeCode : response["Key"]
        // });
      }
    );
  }

  setLookup() {
    this.inputLookupParentObj.urlJson =
      "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupParentObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupParentObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupParentObj.pagingJson =
      "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupParentObj.genericJson =
      "./assets/uclookup/vendor/lookupVendorParent.json";
    if(this.mode == "edit"){this.inputLookupParentObj.isRequired = false;}else {this.inputLookupParentObj.isRequired = true;}
    
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
    var ReqValue = this.VendorForm.value;

    this.rfaInfoObj.ApprovedById = ReqValue.ListApprover;
    this.rfaInfoObj.Reason = ReqValue.Reason;
    this.rfaInfoObj.Notes = ReqValue.Notes;
    
    this.vendorGradingHistObj.ReqByRefUserId = this.ReqByUserId;
    this.vendorGradingHistObj.ReqDt = this.businessDt;
    this.vendorGradingHistObj.Status = CommonConstant.VENDOR_GRADING_STATUS_REQ;
    this.vendorGradingHistObj.VendorId = ReqValue.VendorId;
    // this.vendorGradingHistObj.VendorParentId = this.ParentId;
    // this.vendorGradingHistObj.PrevRating = this.oldVendorRating;
    this.vendorGradingHistObj.NewRating = ReqValue.VendorRating;
    this.vendorGradingHistObj.Notes = ReqValue.Notes;
    // this.vendorGradingHistObj.VendorCode = ReqValue.VendorCode;
    // this.vendorGradingHistObj.PrevGrade = this.oldGradeCode;
    this.vendorGradingHistObj.NewGrade = this.gradeCode;

    const reason = this.listReason.filter(reason => reason.Value == ReqValue.Reason);
    var submitVendorGradingReqObj = {
      VendorGrading: this.vendorGradingHistObj, 
      Rfa: this.rfaInfoObj, 
      OfficeCode: this.OfficeCode, 
      ReasonCode: reason[0].Key
    }
    this.http.post(URLConstant.SubmitRequestVendorGrading, submitVendorGradingReqObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/Vendor/VendorGrading/Request/Paging"]);
      })

  }

  getLookupParent(event) {
    this.VendorForm.patchValue({
      VendorId: event.VendorId,
      VendorCode: event.VendorCode
    });
    this.getData();
    this.getOldVendorGrade();
  }
}
