import { Component, OnInit } from '@angular/core';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-businessunit-add',
  templateUrl: './employee-businessunit-add.component.html',
  styleUrls: ['./employee-businessunit-add.component.scss']
})
export class EmployeeBusinessunitAddComponent implements OnInit {

  EmployeeBusinessUnitForm = this.fb.group({
    IsActive : [false]
  });

  title : string = "Business Unit-Add";
  lookupValue : any;
  mode: string;

  inputPagingObjBusinessUnit : InputLookupObj;
  inputPagingObjJobTitle : InputLookupObj;
  inputPagingObjSupervisor : InputLookupObj;
  inputPagingObjOffice : InputLookupObj;
  inputPagingObjRole : InputLookupObj;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.initLookUp();
  }

  initLookUp(){
    this.inputPagingObjBusinessUnit = new InputLookupObj();
    this.inputPagingObjBusinessUnit.urlJson = "./assets/lookup/searchBusinessUnitLookUp.json";
    this.inputPagingObjBusinessUnit.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjBusinessUnit.urlEnviPaging = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.inputPagingObjBusinessUnit.pagingJson = "./assets/lookup/searchBusinessUnitLookUp.json";
    this.inputPagingObjBusinessUnit.genericJson = "./assets/form-setting/bizUnitGeneric.json";

    this.inputPagingObjJobTitle = new InputLookupObj();
    this.inputPagingObjJobTitle.urlJson = "./assets/lookup/searchJobTitleLookUp.json";
    this.inputPagingObjJobTitle.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjJobTitle.urlEnviPaging = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.inputPagingObjJobTitle.pagingJson = "./assets/lookup/searchJobTitleLookUp.json";
    this.inputPagingObjJobTitle.genericJson = "./assets/form-setting/jobTitleGeneric.json";

    this.inputPagingObjSupervisor = new InputLookupObj();
    this.inputPagingObjSupervisor.urlJson = "./assets/lookup/searchSupervisor.json";
    this.inputPagingObjSupervisor.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjSupervisor.urlEnviPaging = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.inputPagingObjSupervisor.pagingJson = "./assets/lookup/searchSupervisor.json";
    this.inputPagingObjSupervisor.genericJson = "./assets/form-setting/supervisorGeneric.json";

    this.inputPagingObjOffice = new InputLookupObj();
    this.inputPagingObjOffice.urlJson = "./assets/lookup/searchOfficeLookUp.json";
    this.inputPagingObjOffice.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjOffice.urlEnviPaging = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.inputPagingObjOffice.pagingJson = "./assets/lookup/searchOfficeLookUp.json";
    this.inputPagingObjOffice.genericJson = "./assets/form-setting/officeGeneric.json";

    this.inputPagingObjRole = new InputLookupObj();
    this.inputPagingObjRole.urlJson = "./assets/lookup/searchRoleLookUp.json";
    this.inputPagingObjRole.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjRole.urlEnviPaging = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.inputPagingObjRole.pagingJson = "./assets/lookup/searchRoleLookUp.json";
    this.inputPagingObjRole.genericJson = "./assets/form-setting/roleGeneric.json";

  }

  getBizUnit(ev){

  }

  SaveForm(){
    if(this.mode == "edit"){

    }
    else{
    
    }
  }
}
