import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { SurveyorObj } from 'app/shared/model/SurveyorObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { WhereValueObj } from '@adins/ucsearch/lib/model/InputSearchObj.Model';
import { UclookupgenericComponent } from '@adins/uclookupgeneric';

@Component({
  selector: 'app-surveyor-add',
  templateUrl: './surveyor-add.component.html',
  styleUrls: ['./surveyor-add.component.css']
})
export class SurveyorAddComponent implements OnInit {

  private uclookupUsername: UclookupgenericComponent;
  @ViewChild('lookupUsername') set content(content: UclookupgenericComponent){
    if(content){
      this.uclookupUsername = content;
    }
  }

  readonly CancelLink: string = NavigationConstant.SURVEYOR_PAGING;

  lookupUsernameObj: InputLookupObj = new InputLookupObj();
  lookupSurveyorGrpObj: InputLookupObj = new InputLookupObj();
  lookupVendorObj: InputLookupObj = new InputLookupObj();

  surveyorObj: SurveyorObj;  

  pageType: string;
  userId: number;
  officeId: number;
  surveyorId: number;
  vendorId: number;
  dropdownSurveyType: [];

  isEdit: boolean = false;
  isAdd: boolean = false;
  isExternal: boolean = false;

  SurveyorForm = this.fb.group({
    SurveyorType: ['',Validators.required],  
    UserId: ['',Validators.required],
    SurveyorGroupId: ['',Validators.required],
    VendorGroupId: [''],
    SurveyorNo: ['Test',Validators.required],
    Workload: ['',Validators.required],
    CurrWorkloadAmt: ['',Validators.required],
    CurrRRTask: ['',Validators.required],
    IsActive: [false]
    
  })


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    
    this.route.queryParams.subscribe(params => {
      if (params['SurveyorId'] != null) {
        this.isEdit = true;
        this.pageType = "edit";
        this.surveyorId = params['SurveyorId'];

      } else {
        this.isEdit = false;
        this.pageType = "add";
      }
    });

    
    

  }

  setDropDown(){
    
    this.httpClient.post(URLConstant.GetListActiveRefMaster,{RefMasterTypeCode: "SURVEYOR_TYPE"}).subscribe(
      (response) => {
        this.dropdownSurveyType = response['ReturnObject'];
        
      }
    )
  }

  

  onSurveyorTypeSelect(event){
    this.SurveyorForm.patchValue({
      SurveyorType: event.target.value
    });
    
    if(event.target.value == "EXTERNAL_SURVEYOR"){
      this.isExternal = true;
      
      this.lookupUsernameObj.addCritInput = new Array();
      var critObj = new CriteriaObj();
      critObj.propName = "RE.IS_EXT";
      critObj.restriction = AdInsConstant.RestrictionEq;      
      critObj.value = '1';
      this.lookupUsernameObj.addCritInput.push(critObj);

      this.uclookupUsername.setAddCritInput();
      
    }else{
      this.isExternal = false;
      this.lookupUsernameObj.addCritInput = new Array();
      
      var critObj = new CriteriaObj();
      critObj.propName = "RE.IS_EXT";
      critObj.restriction = AdInsConstant.RestrictionEq;      
      critObj.value = "0";
      this.lookupUsernameObj.addCritInput.push(critObj);

      this.uclookupUsername.setAddCritInput();
      
    }
  }

  getLookupUsername(event){
    
    this.SurveyorForm.patchValue({
      UserId: event.UserId
    });
    this.lookupUsernameObj.nameSelect = event.Username;
    this.userId = event.UserId;
    
  }

  getLookupSurveyorGroup(event){
    this.SurveyorForm.patchValue({
      SurveyorGroupId: event.RefOfficeId
    });
    this.lookupSurveyorGrpObj.nameSelect = event.OfficeCode;
    this.officeId = event.RefOfficeId;
    
  }

  getLookupVendorGroup(event){
    this.SurveyorForm.patchValue({
      VendorGroupId: event.VendorId
    });
    this.lookupVendorObj.nameSelect = event.RefrantorCode;
    
  }



  ngOnInit() {
    this.setDropDown();
    this.lookupUsernameObj.urlJson = "./assets/lookup/lookupUsername.json";
    this.lookupUsernameObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.lookupUsernameObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookupUsernameObj.pagingJson = "./assets/lookup/lookupUsername.json";
    this.lookupUsernameObj.genericJson = "./assets/lookup/lookupUsername.json";
    this.lookupUsernameObj.isRequired = true;

    this.lookupSurveyorGrpObj.urlJson = "./assets/lookup/lookupOfficeSrvyGrp.json";
    this.lookupSurveyorGrpObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.lookupSurveyorGrpObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookupSurveyorGrpObj.pagingJson = "./assets/lookup/lookupOfficeSrvyGrp.json";
    this.lookupSurveyorGrpObj.genericJson = "./assets/lookup/lookupOfficeSrvyGrp.json";
    this.lookupSurveyorGrpObj.isRequired = true;

    this.lookupVendorObj.urlJson = "./assets/uclookup/vendor/lookupVendor.json";
    this.lookupVendorObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.lookupVendorObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookupVendorObj.pagingJson = "./assets/uclookup/vendor/lookupVendor.json";
    this.lookupVendorObj.genericJson = "./assets/uclookup/vendor/lookupVendor.json";
    this.lookupVendorObj.isRequired = true;

    
    if(this.pageType == "edit"){
      this.surveyorObj = new SurveyorObj();
      this.SurveyorForm.controls['SurveyorType'].disable();
      this.SurveyorForm.controls['SurveyorNo'].disable();
      this.httpClient.post<SurveyorObj>(URLConstant.GetSurveyorBySurveyorId, {Id: this.surveyorId}).subscribe(
        (response) => {
          this.surveyorObj = response;    
          this.SurveyorForm.patchValue({
            SurveyorType: this.surveyorObj.MrSurveyorTypeCode, 
            UserId: this.surveyorObj.RefUserId,
            SurveyorGroupId: this.surveyorObj.RefOfficeId,
            VendorGroupId: this.surveyorObj.VendorId,
            SurveyorNo: this.surveyorObj.SurveyorNo,
            Workload: this.surveyorObj.WorkloadAmt,
            CurrWorkloadAmt: this.surveyorObj.CurrWorkloadAmt,
            CurrRRTask: this.surveyorObj.CurrRRTask,
            IsActive: this.surveyorObj.IsActive
          });

          this.httpClient.post(URLConstant.GetRefOfficeByRefOfficeId, {Id: this.surveyorObj.RefOfficeId}).subscribe(
            (response) => {
              this.lookupSurveyorGrpObj.nameSelect = response['OfficeCode'];
              this.lookupSurveyorGrpObj.jsonSelect = response;
              
            }
          )

          this.httpClient.post(URLConstant.GetVendorByVendorId, {Id: this.surveyorObj.VendorId}).subscribe(
            (response) => {              
              this.lookupVendorObj.nameSelect = response['VendorName'];
              this.lookupVendorObj.jsonSelect = response;
            }
          )

          this.httpClient.post(URLConstant.GetRefUserById, {Id: this.surveyorObj.RefUserId}).subscribe(
            (response) => {              
              this.lookupUsernameObj.nameSelect = response['Username'];
              this.lookupVendorObj.jsonSelect = response;
            }
          )
        }
        
      )
    }
    

  }
  

  SaveForm(){
    this.surveyorObj = new SurveyorObj();

    this.surveyorObj.MrSurveyorTypeCode = this.SurveyorForm.getRawValue().SurveyorType;
    this.surveyorObj.RefUserId = this.SurveyorForm.value.UserId;
    this.surveyorObj.RefOfficeId = this.SurveyorForm.value.SurveyorGroupId;
    this.surveyorObj.VendorId = this.SurveyorForm.value.VendorGroupId;
    this.surveyorObj.SurveyorNo = this.SurveyorForm.getRawValue().SurveyorNo;    
    this.surveyorObj.WorkloadAmt = this.SurveyorForm.value.Workload;
    this.surveyorObj.CurrWorkloadAmt = this.SurveyorForm.value.CurrWorkloadAmt;
    this.surveyorObj.CurrRRTask = this.SurveyorForm.value.CurrRRTask;
    this.surveyorObj.IsActive = this.SurveyorForm.value.IsActive;

    if(this.pageType == "add"){
      this.httpClient.post(URLConstant.AddSurveyor, this.surveyorObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.SURVEYOR_PAGING], {});
        }
      )
    }else{
      this.surveyorObj.SurveyorId = this.surveyorId;
      this.surveyorObj.RowVersion = '';
      this.httpClient.post(URLConstant.EditSurveyor, this.surveyorObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.SURVEYOR_PAGING], {});
        }
      )
    }

    

   
    
     
  }

}
