import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UpdateCustEmergencyObj } from 'app/shared/model/UpdateMasterCust/UpdateCustEmergencyObj.Model';
import { environment } from 'environments/environment';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-customer-emergency-detail',
  templateUrl: './update-customer-emergency-detail.component.html',
  styles: []
})
export class UpdateCustomerEmergencyDetailComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppEmergencyData: UpdateCustEmergencyObj;
  CustRelationList: Array<any>;
  IdTypeList: Array<any>;
  GenderList: Array<any>;
  lookupObj: Record<string, any>;
  DisplayName: Record<string, any>;

  CustomerEmergencyForm = this.fb.group({
    CustEmergencyId: [0],
    CustId: [0],
    CustName: [''],
    CustRelation: [''],
    IdType: [''],
    IdNo: [''],
    BirthPlace: [''],
    BirthDate: [''],
    Gender: [''],
    Profession: [''],
    Email: [''],
    MobilePhn1: [''],
    MobilePhn2: [''],
    Address: [''],
    Zipcode: [''],
    AreaCode1: [{value: '', disabled: true}],
    AreaCode2: [{value: '', disabled: true}],
    AreaCode3: [''],
    AreaCode4: [''],
    City: [''],
    RowVersion: ['']
  });

  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder,
    private router: Router
  ) {
    this.ResponseTab = new EventEmitter<any>();
    this.CustRelationList = new Array<Object>();
    this.IdTypeList = new Array<any>();
    this.GenderList = new Array<any>();
    this.AppEmergencyData = new UpdateCustEmergencyObj();
    // this.DisplayName = new Object();
    // this.lookupObj = new Object();

    this.lookupObj["Zipcode"] = new InputLookupObj();
    this.lookupObj["Zipcode"].urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.lookupObj["Zipcode"].urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookupObj["Zipcode"].urlEnviPaging = environment.FoundationR3Url;
    this.lookupObj["Zipcode"].pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.lookupObj["Zipcode"].genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    this.lookupObj["Profession"] = new InputLookupObj();
    this.lookupObj["Profession"].urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.lookupObj["Profession"].urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookupObj["Profession"].urlEnviPaging = environment.FoundationR3Url;
    this.lookupObj["Profession"].pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.lookupObj["Profession"].genericJson = "./assets/lookup/lookupCustomerProfession.json";
  }

  ngOnInit() {
    let getDetail = this.http.post(URLConstant.GetCustEmergencyDataForUpdateMasterCustEmergency, { CustDataTrxId: this.CustDataTrxId });
    let getCustRelationship = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustRelationship });
    let getIdType = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType });
    let getGender = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender });
    forkJoin([getDetail, getCustRelationship, getIdType, getGender]).pipe(
      map((response) => {
        this.AppEmergencyData = response[0]["AppCustEmergency"];
        this.CustRelationList = response[1][CommonConstant.ReturnObj];
        this.IdTypeList = response[2][CommonConstant.ReturnObj];
        this.GenderList = response[3][CommonConstant.ReturnObj];
        this.CustomerEmergencyForm.patchValue({...response[0]["MasterCustEmergency"]});
        this.DisplayName["Zipcode"] = this.AppEmergencyData["Zipcode"];
        return response[0];
      }),
      mergeMap((response) => {
        let getAppProfession = this.http.post(URLConstant.GetRefProfessionByProfessionCode, { ProfessionCode: response["AppCustEmergency"]["Profession"] });
        let getMasterProfession = this.http.post(URLConstant.GetRefProfessionByProfessionCode, { ProfessionCode: response["MasterCustEmergency"]["Profession"] });
        return forkJoin([getMasterProfession, getAppProfession]);
      })
    ).toPromise().then(
      (response) => {
        this.lookupObj["Profession"]["nameSelect"] = response[0]["ProfessionName"];
        this.DisplayName["Profession"] = response[1]["ProfessionName"];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  CopyHandler(formControlName, lookupName){
    var obj = new Object();
    obj[formControlName] = this.AppEmergencyData[formControlName];
    this.CustomerEmergencyForm.patchValue(obj);

    if(lookupName){
      this.lookupObj[lookupName]["isReady"] = false;
      this.lookupObj[lookupName]["nameSelect"] = this.DisplayName[formControlName];
      this.lookupObj[lookupName]["isReady"] = true;
    }
  }

  CopyAllHandler(){
    this.CustomerEmergencyForm.patchValue({
      CustName: this.AppEmergencyData["CustName"],
      CustRelation: this.AppEmergencyData["CustRelation"],
      IdType: this.AppEmergencyData["IdType"],
      IdNo: this.AppEmergencyData["IdNo"],
      BirthPlace: this.AppEmergencyData["BirthPlace"],
      BirthDate: this.AppEmergencyData["BirthDate"],
      Gender: this.AppEmergencyData["Gender"],
      Profession: this.AppEmergencyData["Profession"],
      Email: this.AppEmergencyData["Email"],
      MobilePhn1: this.AppEmergencyData["MobilePhn1"],
      MobilePhn2: this.AppEmergencyData["MobilePhn2"],
      Address: this.AppEmergencyData["Address"]
    });
    this.lookupObj["Zipcode"]["isReady"] = false;
    this.lookupObj["Zipcode"]["nameSelect"] = this.DisplayName["Zipcode"];
    this.lookupObj["Zipcode"]["isReady"] = true;
    this.lookupObj["Profession"]["isReady"] = false;
    this.lookupObj["Profession"]["nameSelect"] = this.DisplayName["Profession"];
    this.lookupObj["Profession"]["isReady"] = true;
  }

  back(){
    this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
  }

  SaveValue(){
    this.http.post(URLConstant.EditMasterCustEmergency, this.CustomerEmergencyForm.value).toPromise().then(
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
