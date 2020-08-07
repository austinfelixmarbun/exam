import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment'; 
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { first } from 'rxjs/operators';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-cust-group-tab-detail',
  templateUrl: './cust-group-tab-detail.component.html',
  providers: [NGXToastrService]
})
export class CustGroupTabDetailComponent implements OnInit {
  @Input() MrCustTypeCode: string;
  @Input() CustId: number;
  @Input() ListCustIdToExclude: Array<number>;
  @Output() AddCustGroupResponse = new EventEmitter<any>();
  inputLookupCustPersonalObj: InputLookupObj;
  inputLookupCustCompanyObj: InputLookupObj;
  relationshipList: any;
  isCustPicked: boolean;

  CustGrpForm = this.fb.group({
    CustGrpId: [0, [Validators.required]],
    CustId: [0, [Validators.required]],
    MemberCustId: [0, [Validators.required]],
    MrCustRelationshipCode: [''],
    CustGrpNotes: [''],
    IsActive: [true],
    IsBothWays: [false],
    RowVersion: [''],
    CustNo: [''],
    CustName: ['']
  });

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    var criteriaList;
    var criteriaObj;
    var refMasterRelationship = new RefMasterObj();
    this.CustGrpForm.patchValue({
      CustId: this.CustId
    });
    
    if(this.MrCustTypeCode == CommonConstant.CustTypePersonal){
      this.inputLookupCustPersonalObj = new InputLookupObj();
      this.inputLookupCustPersonalObj.urlJson = "./assets/uclookup/Customer/CustomerGroup/lookupCust_CustGrp_Personal.json";
      this.inputLookupCustPersonalObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
      this.inputLookupCustPersonalObj.urlEnviPaging = environment.FoundationR3Url;
      this.inputLookupCustPersonalObj.pagingJson = "./assets/uclookup/Customer/CustomerGroup/lookupCust_CustGrp_Personal.json";
      this.inputLookupCustPersonalObj.genericJson = "./assets/uclookup/Customer/CustomerGroup/lookupCust_CustGrp_Personal.json";
      this.inputLookupCustPersonalObj.ddlEnvironments = [
        {
          name: "A.MR_CUST_TYPE_CODE",
          environment: environment.FoundationR3Url
        }
      ];
      if(this.ListCustIdToExclude && this.ListCustIdToExclude.length > 0){
        criteriaList = new Array();
        criteriaObj = new CriteriaObj();
        criteriaObj.restriction = AdInsConstant.RestrictionNotIn;
        criteriaObj.propName = 'A.CUST_ID';
        criteriaObj.listValue = this.ListCustIdToExclude;
        criteriaList.push(criteriaObj);
        this.inputLookupCustPersonalObj.addCritInput = criteriaList;
        this.inputLookupCustPersonalObj.isRequired = false;
      }

      // criteriaList = new Array();
      // criteriaObj = new CriteriaObj();
      // criteriaObj.restriction = AdInsConstant.RestrictionEq;
      // criteriaObj.propName = 'A.MR_CUST_TYPE_CODE';
      // criteriaObj.value = "PERSONAL";
      // criteriaList.push(criteriaObj);
      // this.inputLookupCustPersonalObj.addCritInput = criteriaList;
      // this.inputLookupCustPersonalObj.isRequired = false;
      refMasterRelationship.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustPersonalRelationship;
    }
    else if(this.MrCustTypeCode == CommonConstant.CustTypeCompany){
      this.inputLookupCustCompanyObj = new InputLookupObj();
      this.inputLookupCustCompanyObj.urlJson = "./assets/uclookup/Customer/CustomerGroup/lookupCust_CustGrp_Company.json";
      this.inputLookupCustCompanyObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
      this.inputLookupCustCompanyObj.urlEnviPaging = environment.FoundationR3Url;
      this.inputLookupCustCompanyObj.pagingJson = "./assets/uclookup/Customer/CustomerGroup/lookupCust_CustGrp_Company.json";
      this.inputLookupCustCompanyObj.genericJson = "./assets/uclookup/Customer/CustomerGroup/lookupCust_CustGrp_Company.json";
      this.inputLookupCustCompanyObj.ddlEnvironments = [
        {
          name: "A.MR_CUST_TYPE_CODE",
          environment: environment.FoundationR3Url
        }
      ];
      if(this.ListCustIdToExclude && this.ListCustIdToExclude.length > 0){
        criteriaList = new Array();
        criteriaObj = new CriteriaObj();
        criteriaObj.restriction = AdInsConstant.RestrictionNotIn;
        criteriaObj.propName = 'A.CUST_ID';
        criteriaObj.listValue = this.ListCustIdToExclude;
        criteriaList.push(criteriaObj);
        this.inputLookupCustCompanyObj.addCritInput = criteriaList;
        this.inputLookupCustCompanyObj.isRequired = false;
      }

      // criteriaList = new Array();
      // criteriaObj = new CriteriaObj();
      // criteriaObj.restriction = AdInsConstant.RestrictionEq;
      // criteriaObj.propName = 'A.MR_CUST_TYPE_CODE';
      // criteriaObj.value = "COMPANY";
      // criteriaList.push(criteriaObj);
      // this.inputLookupCustCompanyObj.addCritInput = criteriaList;
      // this.inputLookupCustCompanyObj.isRequired = false;
      refMasterRelationship.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustCompanyRelationship;
    }

    this.httpClient.post(URLConstant.GetListActiveRefMaster, refMasterRelationship).pipe(first()).subscribe(
      (response) => {
        this.relationshipList = response;
      }
    );
  }

  getLookupCustPersonalResponse(e){
    this.isCustPicked = true;
    var refMasterRelationship = new RefMasterObj();
    this.CustGrpForm.patchValue({
      MemberCustId: e.custId,
      CustNo: e.custNo,
      CustName: e.custName
    });
    if(e.mrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL){
      refMasterRelationship.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustCompanyRelationship;
    }
    else{
      refMasterRelationship.RefMasterTypeCode =CommonConstant.RefMasterTypeCodeCustCompanyRelationship ;
    }
    this.httpClient.post(URLConstant.GetListActiveRefMaster, refMasterRelationship).pipe(first()).subscribe(
      (response) => {
        this.relationshipList = response;
        if (this.relationshipList[CommonConstant.ReturnObj].length > 0) {
          this.CustGrpForm.patchValue({
            MrCustRelationshipCode: this.relationshipList[CommonConstant.ReturnObj][0]["Key"]
          });
        }
      }
    );
  }

  getLookupCustCompanyResponse(e){
    this.isCustPicked = true;
    var refMasterRelationship = new RefMasterObj();
    this.CustGrpForm.patchValue({
      MemberCustId: e.custId,
      CustNo: e.custNo,
      CustName: e.custName
    });
    if(e.mrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL){
      refMasterRelationship.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustPersonalRelationship;
    }
    else{
      refMasterRelationship.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustCompanyRelationship;
    }
    this.httpClient.post(URLConstant.GetListActiveRefMaster, refMasterRelationship).pipe(first()).subscribe(
      (response) => {
        this.relationshipList = response;
        if (this.relationshipList[CommonConstant.ReturnObj].length > 0) {
          this.CustGrpForm.patchValue({
            MrCustRelationshipCode: this.relationshipList[CommonConstant.ReturnObj][0]["Key"]
          });
        }
      }
    );
  }

  Save(){
    var custGrpData = this.CustGrpForm.value;
    
    if(custGrpData.IsBothWays){
      this.httpClient.post(URLConstant.AddCustGrpBothWays, custGrpData).subscribe(
        (response) => {
          this.activeModal.close(response);
        }
      );
    }
    else{
      this.httpClient.post(URLConstant.AddCustGrp, custGrpData).subscribe(
        (response) => {
          this.activeModal.close(response);
        }
      );
    }
  }
}
