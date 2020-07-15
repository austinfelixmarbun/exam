import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm, FormBuilder } from '@angular/forms';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { OrgJobTitleObj } from 'app/shared/model/OrgJobTitleObj.Model';
import { formatDate } from '@angular/common';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
    selector: 'app-employee-position',
    templateUrl: './employee-position-add.component.html',
    providers: [NGXToastrService]
})
export class EmployeePositionAddComponent implements OnInit {

    pageType: string = "add";
    refEmpId: any;
    empPositionId: any;
    empNo: any;
    empName: any;
    isActive: boolean = false;
    allRefOffice: any;
    refOfficeId: any;
    allSupervisor: any;
    superiorRefEmpId: any = '';
    allBiz: any;
    refBizUnitId: any;
    allOrgJobTitle: any;
    orgJobTitleId: any;
    positionStartDt: any;
    positionFinishDt: any;
    empObj: RefEmpObj;
    refOfficeObj: RefOfficeObj
    empPositionObj: EmpPositionObj = new EmpPositionObj();
    orgJobTitleObj: OrgJobTitleObj;
    addUrl: any;
    getEditUrl: any;
    editUrl: any;
    getUrl: any;
    refMasterUrl: any;
    refOfficeUrl: any;
    supervisorUrl: any;
    bizUrl: any;
    orgJobTitleUrl: any;
    foundationUrl: string = environment.FoundationR3Url;
    settingUrl: string = environment.FoundationR3Url;
    empPositionVisible: boolean = true;
    addEditVisible: boolean = false;
    pageNow: any;
    totalData: any;
    pageSize: any = 10;
    resultData: any;
    orderByKey: any = null;
    orderByValue: boolean = true;
    arrCrit: any;
    allSkillLvl: any;
    refMasterTypeCode: any;
    masterCode: any;
    inputLookupObj: any;
    getEmpUrl:any;

    RefEmpPositionForm = this.fb.group({});

    constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
        this.getUrl = this.foundationUrl + URLConstant.GetRefEmployeeById;
        this.addUrl = this.foundationUrl + URLConstant.AddEmpPosition;
        this.refOfficeUrl = this.foundationUrl + URLConstant.GetAllRefOffice;
        this.supervisorUrl = this.foundationUrl + URLConstant.GetEmpListByOfficeIdAndIsActive;
        this.refMasterUrl = this.settingUrl + URLConstant.GetRefMasterListDesc;
        this.bizUrl = this.foundationUrl + URLConstant.GetRefBizUnitByOffice;
        this.orgJobTitleUrl = this.foundationUrl + URLConstant.GetOrgJobTitleByMdlStruc;
        this.getEditUrl = this.foundationUrl + URLConstant.GetEmpByEmpPositionId;
        this.editUrl = this.foundationUrl + URLConstant.EditEmpPosition;
        this.getEmpUrl = this.foundationUrl + URLConstant.GetRefEmployeeById;

        this.route.queryParams.subscribe(params => {
            if (params['param'] != null) {
                this.pageType = params['param'];
            }
            if (params['refEmpId'] != null) {
                this.refEmpId = params['refEmpId'];
            }
            if (params['empNo'] != null) {
                this.empNo = params['empNo'];
            }
            if (params['empName'] != null) {
                this.empName = params['empName'];
            }
            if (params['empPositionId'] != null) {
                this.empPositionId = params['empPositionId'];
            }
            if (params['refBizUnitId'] != null) {
                this.refBizUnitId = params['refBizUnitId'];
            } else {
                this.refBizUnitId = 0;
            }
        });
    }

    ngOnInit() {

        this.inputLookupObj = new InputLookupObj();
        this.inputLookupObj.urlJson = "./assets/lookup/lookupSupervisor.json";
        this.inputLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
        this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
        this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupervisor.json";
        this.inputLookupObj.genericJson = "./assets/lookup/lookupSupervisor.json";

        const getuserAccess = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
        this.refOfficeId = getuserAccess.refOfficeId;
        this.refOfficeObj = new RefOfficeObj();
        this.refOfficeObj.refOfficeId = this.refOfficeId
        this.httpClient.post(this.refOfficeUrl, null).subscribe(
            (response) => {
                this.allRefOffice = response['returnObject']
            },
            (error) => {
                console.log(error);
            });

        this.refMasterTypeCode = CommonConstant.RefMasterTypeCodeSkillLvl;
        var RefMasterObj = { RefMasterTypeCode: this.refMasterTypeCode, MasterCode: "" };
        this.httpClient.post(this.refMasterUrl, RefMasterObj).subscribe(
            (response) => {
                console.log(response);
                this.allSkillLvl = response['returnObject'];
                this.masterCode = this.allSkillLvl[0].masterCode;
            },
            (error) => {
                console.log(error);
            });
        // this.httpClient.post(this.supervisorUrl, this.refOfficeObj).subscribe(
        //     (response) => {
        //         this.allSupervisor = response['returnObject']
        //     },
        //     (error) => {
        //         console.log(error);
        //     })
        this.httpClient.post(this.bizUrl, this.refOfficeObj).subscribe(
            (response) => {
                this.allBiz = response['returnObject'];
                this.refBizUnitId = this.allBiz[0].orgMdlStrucId;
                if (this.pageType != "edit"){
                    this.onChangeBiz(this.refBizUnitId);
                }
            },
            (error) => {
                console.log(error);
            })
        if (this.pageType == "edit") {
            this.empPositionObj.empPositionId = this.empPositionId
            this.onChangeBiz(this.refBizUnitId)
            this.httpClient.post(this.getEditUrl, this.empPositionObj).subscribe(
                (response) => {
                    console.log("Success");
                    this.resultData = response['returnObject'];
                    console.log(this.resultData);
                    this.refOfficeId = response['returnObject']['refOfficeId']
                    this.orgJobTitleId = response['returnObject']['orgJobTitleId']
                    this.positionStartDt = formatDate(response['returnObject']['positionStartDt'], 'yyyy-MM-dd', 'en-US')
                    this.positionFinishDt = formatDate(response['returnObject']['positionFinishDt'], 'yyyy-MM-dd', 'en-US')
                    //this.superiorRefEmpId = response['returnObject']['superiorRefEmpId']

                    var refEmpObj = { RefEmpId: response['returnObject']['superiorRefEmpId'] };
                    this.httpClient.post(this.getEmpUrl, refEmpObj).subscribe(
                        (response) => {
                            console.log(response);
                            this.inputLookupObj.nameSelect = response["returnObject"].empName;
                            this.inputLookupObj.jsonSelect = response["returnObject"];
                            this.inputLookupObj.idSelect = response['returnObject'].refEmpId;
                            if (this.resultData.isActive == "1") {
                                this.isActive = true;
                            }
                            else {
                                this.isActive = false;
                            }
                        });
                })
        } else {
        }
    }

    onChangeBiz(bizValue) {
        this.orgJobTitleObj = new OrgJobTitleObj()
        this.orgJobTitleObj.orgMdlStrucId = bizValue
        this.httpClient.post(this.orgJobTitleUrl, this.orgJobTitleObj).subscribe(
            (response) => {
                console.log(response);
                this.allOrgJobTitle = response['returnObject'];
                this.orgJobTitleId = this.allOrgJobTitle.orgJobTitleId;
                if (this.pageType != "edit"){
                    this.orgJobTitleId = this.allOrgJobTitle[0].orgJobTitleId;
                }
            },
            (error) => {
                console.log(error);
            })
    }

    SaveForm(ReqForm: NgForm) {
        if (this.pageType == 'add') {
            this.empPositionObj = ReqForm.value;
            this.empPositionObj.refEmpId = this.refEmpId;
            this.empPositionObj.skillLvl = this.masterCode;
            this.empPositionObj.superiorRefEmpId = this.inputLookupObj.idSelect;
            if (this.isActive == false) {
                this.empPositionObj.isActive = CommonConstant.FALSE_CONDITION;
            }
            else {
                this.empPositionObj.isActive = CommonConstant.TRUE_CONDITION;
            }

            console.log(JSON.stringify(this.empPositionObj))
            console.log(this.empPositionObj);
            this.httpClient.post(this.addUrl, this.empPositionObj).subscribe(
                (response) => {
                    console.log("Success");
                    console.log(response);
                    if (response['isError'] != true) {
                        this.toastr.successMessage(response['message']);
                        this.router.navigate(["/employee/employeePosition"], { queryParams: {refEmpId:this.refEmpId }});
                    }
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                }
            );
        } else {
            this.empPositionObj = ReqForm.value
            this.empPositionObj.refEmpId = this.refEmpId
            this.empPositionObj.empPositionId = this.empPositionId
            this.empPositionObj.skillLvl = this.masterCode;
            this.empPositionObj.superiorRefEmpId = this.inputLookupObj.idSelect;
            if (this.isActive == false) {
                this.empPositionObj.isActive = CommonConstant.FALSE_CONDITION;
            }
            else {
                this.empPositionObj.isActive = CommonConstant.TRUE_CONDITION;
            }
            console.log(JSON.stringify(this.empPositionObj))
            console.log(this.empPositionObj);
            this.httpClient.post(this.editUrl, this.empPositionObj).subscribe(
                (response) => {
                    console.log("Success");
                    console.log(response);
                    this.toastr.successMessage(response['message']);
                    this.router.navigate(["/employee/employeePosition"], { queryParams: {refEmpId:this.refEmpId }});
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                }
            );

        }
    }

    toggleActive(e) {
        this.isActive = e.target.checked;
    }

    getLookupResponse(e){
        this.empPositionObj.superiorRefEmpId = e.RefEmpId
    }
}