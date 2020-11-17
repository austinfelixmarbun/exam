import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UpdateMasterCustJobDataObj } from 'app/shared/model/UpdateMasterCust/UpdateMasterCustJobDataObj.Model';
import { environment } from 'environments/environment';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-customer-job-data',
  templateUrl: './update-customer-job-data.component.html',
  styles: []
})
export class UpdateCustomerJobDataComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppJobData: UpdateMasterCustJobDataObj;
  CustModelList: Array<any>;
  JobPositionList: Array<any>;
  JobStatusList: Array<any>;
  CompanyScaleList: Array<any>;
  lookupProfessionObj: InputLookupObj;
  lookupIndustryTypeObj: InputLookupObj;
  lookupZipcodeObj: InputLookupObj;

  CustomerJobForm = this.fb.group({
    CustJobDataId: [0],
    CustId: [0],
    CustModel: [''],
    ProfessionId: [0],
    InternalEmployee: [false],
    JobPosition: [''],
    JobTitleName: [''],
    JobStatus: [''],
    EstablishmentDate: [''],
    CompanyName: [''],
    IndustryTypeId: [0],
    CompanyScale: [''],
    NumOfEmployee: [''],
    Address: [''],
    Zipcode: [''],
    AreaCode1: [{value: '', disabled: true}],
    AreaCode2: [{value: '', disabled: true}],
    AreaCode3: [''],
    AreaCode4: [''],
    City: [{value: '', disabled: true}],
    Phn1: [''],
    Phn2: [''],
    Fax: [''],
    RowVersionCustJobData: [''],
    RowVersionJobAddr: [''],
    RowVersionCust: ['']
  });

  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder,
    private router: Router
  ) {
    this.AppJobData = new UpdateMasterCustJobDataObj();
    this.CustModelList = new Array<any>();
    this.JobPositionList = new Array<any>();
    this.JobStatusList = new Array<any>();
    this.CompanyScaleList = new Array<any>();
    this.ResponseTab = new EventEmitter<any>();

    this.lookupIndustryTypeObj = new InputLookupObj();
    this.lookupIndustryTypeObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookupIndustryTypeObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookupIndustryTypeObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookupIndustryTypeObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookupIndustryTypeObj.genericJson = "./assets/lookup/lookupIndustryType.json";

    this.lookupProfessionObj = new InputLookupObj();
    this.lookupProfessionObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.lookupProfessionObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookupProfessionObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookupProfessionObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.lookupProfessionObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";

    this.lookupZipcodeObj = new InputLookupObj();
    this.lookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.lookupZipcodeObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.lookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
  }

  ngOnInit() {
    let getDetail = this.http.post(URLConstant.GetCustJobDataForUpdateMasterCustJobData, { CustDataTrxId: this.CustDataTrxId });
    let getCustModel = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustModel });
    let getJobPosition = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition });
    let getJobStatus = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobStat });
    let getCompanyScale = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCompanyScale });
    forkJoin([getDetail, getCustModel, getJobPosition, getJobStatus, getCompanyScale]).pipe(
      map((response) => {
        this.AppJobData = response[0]["AppCustJobData"];
        this.CustModelList = response[1][CommonConstant.ReturnObj];
        this.JobPositionList = response[2][CommonConstant.ReturnObj];
        this.JobStatusList = response[3][CommonConstant.ReturnObj];
        this.CompanyScaleList = response[4][CommonConstant.ReturnObj];
        this.CustomerJobForm.patchValue({...response[0]["MasterCustJobData"]});
        this.lookupZipcodeObj.nameSelect = response[0]["MasterCustJobData"]["Zipcode"];
        return response[0];
      }),
      mergeMap((response) => {
        let getAppProfession = this.http.post(URLConstant.GetRefProfessionByRefProfessionId, { RefProfessionId: response["AppCustJobData"]["ProfessionId"] });
        let getMasterProfession = this.http.post(URLConstant.GetRefProfessionByRefProfessionId, { RefProfessionId: response["MasterCustJobData"]["ProfessionId"] });
        let getAppIndustry = this.http.post(URLConstant.GetRefIndustryTypeById, { RefIndustryTypeId: response["AppCustJobData"]["IndustryTypeId"] });
        let getMasterIndustry = this.http.post(URLConstant.GetRefIndustryTypeById, { RefIndustryTypeId: response["MasterCustJobData"]["IndustryTypeId"] });
        return forkJoin([getMasterProfession, getMasterIndustry, getAppProfession, getAppIndustry]);
      })
    ).toPromise().then(
      (response) => {
        this.lookupProfessionObj.nameSelect = response[0]["ProfessionName"];
        this.lookupIndustryTypeObj.nameSelect = response[1]["IndustryTypeName"];
        this.AppJobData["ProfessionName"] = response[2]["ProfessionName"];
        this.AppJobData["IndustryTypeName"] = response[3]["IndustryTypeName"];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  getProfessionData(e){
    this.CustomerJobForm.patchValue({
      ProfessionId: e.RefProfessionId
    });
  }

  getIndustryType(e){
    this.CustomerJobForm.patchValue({
      IndustryTypeId: e.RefIndustryTypeId
    });
  }

  getZipcodeData(e){
    this.CustomerJobForm.patchValue({
      Zipcode: e.Zipcode,
      AreaCode1: e.AreaCode1,
      AreaCode2: e.AreaCode2,
      City: e.City
    });
  }

  CopyAllHandler(){
    this.CustomerJobForm.patchValue({
      JobPosition: this.AppJobData["JobPosition"],
      JobTitleName: this.AppJobData["JobTitleName"],
      Address: this.AppJobData["Address"]
    });
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppJobData[formControlName];
    this.CustomerJobForm.patchValue(obj);
  }

  back(){
    this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
  }

  SaveValue(){
    this.http.post(URLConstant.EditMasterCustJobData, this.CustomerJobForm.value).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

}
