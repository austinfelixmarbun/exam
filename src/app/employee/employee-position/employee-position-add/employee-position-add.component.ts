import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NgForm } from '@angular/forms';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { OrgJobTitleObj } from 'app/shared/model/OrgJobTitleObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { formatDate } from '@angular/common';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';

@Component({
    selector: 'app-employee-position',
    templateUrl: './employee-position-add.component.html',
    styleUrls: ['./employee-position-add.component.scss'],
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
    empPositionObj: EmpPositionObj;
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
    foundationUrl: string = environment.foundationUrl;
    settingUrl: string = environment.settingUrl;
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

    constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
        this.getUrl = this.foundationUrl + AdInsConstant.GetRefEmployeeById;
        this.addUrl = this.foundationUrl + AdInsConstant.AddEmpPosition;
        this.refOfficeUrl = this.foundationUrl + AdInsConstant.GetAllRefOffice;
        this.supervisorUrl = this.foundationUrl + AdInsConstant.GetEmpListByOfficeIdAndIsActive;
        this.refMasterUrl = this.settingUrl + AdInsConstant.GetRefMasterListByTypeCode;
        this.bizUrl = this.foundationUrl + AdInsConstant.GetRefBizUnitByOffice;
        this.orgJobTitleUrl = this.foundationUrl + AdInsConstant.GetOrgJobTitleByMdlStruc;
        this.getEditUrl = this.foundationUrl + AdInsConstant.GetEmpByEmpPositionId;
        this.editUrl = this.foundationUrl + AdInsConstant.EditEmpPosition;
        this.getEmpUrl = this.foundationUrl + AdInsConstant.GetRefEmployeeById;

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
        this.inputLookupObj.urlQryPaging = AdInsConstant.GetListEmployee;
        this.inputLookupObj.urlEnviPaging = environment.foundationUrl;

        const getuserAccess = JSON.parse(localStorage.getItem('UserAccess'));
        this.refOfficeId = getuserAccess.refOfficeId;
        this.refOfficeObj = new RefOfficeObj();
        this.httpClient.post(this.refOfficeUrl, null).subscribe(
            (response) => {
                this.allRefOffice = response['returnObject']
            },
            (error) => {
                console.log(error);
            });

        this.refMasterTypeCode = "SKILL_LVL";
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
        // this.refOfficeObj.refOfficeId = this.refOfficeId
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
                if (this.pageType != "edit")
                    this.onChangeBiz(this.refBizUnitId);
            },
            (error) => {
                console.log(error);
            })
        if (this.pageType == "edit") {
            this.empPositionObj = new EmpPositionObj();
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
            },
            (error) => {
                console.log(error);
            })
    }

    SaveForm(ReqForm: NgForm) {
        if (this.pageType == 'add') {
            this.empPositionObj = new EmpPositionObj();
            this.empPositionObj = ReqForm.value;
            this.empPositionObj.refEmpId = this.refEmpId;
            this.empPositionObj.skillLvl = this.masterCode;
            this.empPositionObj.superiorRefEmpId = this.inputLookupObj.idSelect;
            if (this.isActive === false) {
                this.empPositionObj.isActive = "0";
            }
            else {
                this.empPositionObj.isActive = "1";
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
            this.empPositionObj = new EmpPositionObj();
            this.empPositionObj = ReqForm.value
            this.empPositionObj.refEmpId = this.refEmpId
            this.empPositionObj.empPositionId = this.empPositionId
            this.empPositionObj.skillLvl = this.masterCode;
            this.empPositionObj.superiorRefEmpId = this.inputLookupObj.idSelect;
            if (this.isActive === false) {
                this.empPositionObj.isActive = "0";
            }
            else {
                this.empPositionObj.isActive = "1";
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

}