import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { OrgJobTitleObj } from 'app/shared/model/OrgJobTitleObj.Model';
import { environment } from 'environments/environment';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-office-emp-pos-add',
  templateUrl: './office-emp-pos-add.component.html',
  providers: [NGXToastrService]
})
export class OfficeEmpPosAddComponent implements OnInit {

  pageType: string = "add";
  refEmpId: any;
  empPositionId: any;
  empNo: any;
  empName: any;
  officeCode: any;
  officeName: any;
  isActive: boolean = false;
  allRefOffice: any;
  refOfficeId: any;
  allSupervisor: any;
  superiorRefEmpId: any = '';
  allBiz: any;
  refBizUnitId: any = 'selectOne';
  allOrgJobTitle: any;
  orgJobTitleId: any = 'selectOne';
  positionStartDt: any;
  positionFinishDt: any;
  empObj: RefEmpObj;
  refOfficeObj: RefOfficeObj;
  empPositionObj: EmpPositionObj;
  orgJobTitleObj: OrgJobTitleObj;
  addUrl: any;
  getEditUrl: any;
  editUrl: any;
  getUrl: any;
  refOfficeUrl: any;
  supervisorUrl: any;
  bizUrl: any;
  orgJobTitleUrl: any;
  foundationUrl: string = environment.FoundationR3Url;
  empPositionVisible: boolean = true;
  addEditVisible: boolean = false;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  resultData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  arrCrit: any;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.getUrl = this.foundationUrl + URLConstant.GetRefEmployeeById;
    this.addUrl = this.foundationUrl + URLConstant.AddEmpPosition;
    this.refOfficeUrl = this.foundationUrl + URLConstant.GetAllRefOffice;
    this.supervisorUrl = this.foundationUrl + URLConstant.GetEmpListByOfficeIdAndIsActive;
    this.bizUrl = this.foundationUrl + URLConstant.GetRefBizUnitByOffice;
    this.orgJobTitleUrl = this.foundationUrl + URLConstant.GetOrgJobTitleByMdlStruc;
    this.getEditUrl = this.foundationUrl + URLConstant.GetEmpByEmpPositionId;
    this.editUrl = this.foundationUrl + URLConstant.EditEmpPosition;

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
      if (params['refOfficeId'] != null) {
        this.refOfficeId = params['refOfficeId'];
      }
      if (params['officeCode'] != null) {
        this.officeCode = params['officeCode'];
      }
      if (params['officeName'] != null) {
        this.officeName = params['officeName'];
      }
      if (params['empPositionId'] != null) {
        this.empPositionId = params['empPositionId'];
      }
      if (params['refBizUnitId'] != null) {
        this.refBizUnitId = params['refBizUnitId'];
      }
    });
  }

  ngOnInit() {
    const getuserAccess = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.refOfficeId = getuserAccess.refOfficeId
    this.refOfficeObj = new RefOfficeObj()
    this.httpClient.post(this.refOfficeUrl, null).subscribe(
      (response) => {
        this.allRefOffice = response['returnObject']
      })
    this.refOfficeObj.refOfficeId = this.refOfficeId
    this.httpClient.post(this.supervisorUrl, this.refOfficeObj).subscribe(
      (response) => {
        this.allSupervisor = response['returnObject']
      })
    this.httpClient.post(this.bizUrl, this.refOfficeObj).subscribe(
      (response) => {
        this.allBiz = response['returnObject']
      })
    if (this.pageType == "edit") {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj.empPositionId = this.empPositionId
      this.onChangeBiz(this.refBizUnitId)
      this.httpClient.post(this.getEditUrl, this.empPositionObj).subscribe(
        (response) => {
          this.resultData = response['returnObject'];
          this.refOfficeId = response['returnObject']['refOfficeId']
          this.orgJobTitleId = response['returnObject']['orgJobTitleId']
          this.positionStartDt = formatDate(response['returnObject']['positionStartDt'], 'yyyy-MM-dd', 'en-US')
          this.positionFinishDt = formatDate(response['returnObject']['positionFinishDt'], 'yyyy-MM-dd', 'en-US')
          this.superiorRefEmpId = response['returnObject']['superiorRefEmpId']
          if (this.resultData.isActive == CommonConstant.TRUE_CONDITION) {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }
        })
    } else {
    }
  }
  onChangeBiz(bizValue) {
    this.orgJobTitleId = 'selectOne';
    this.orgJobTitleObj = new OrgJobTitleObj()
    if (bizValue == 'selectOne') {
      bizValue = 0
    }
    this.orgJobTitleObj.orgMdlStrucId = bizValue
    this.httpClient.post(this.orgJobTitleUrl, this.orgJobTitleObj).subscribe(
      (response) => {
        this.allOrgJobTitle = response['returnObject']
      })
  }

  SaveForm(ReqForm: NgForm) {
    if (this.pageType == 'add') {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj = ReqForm.value
      this.empPositionObj.refEmpId = this.refEmpId
      if (this.isActive == false) {
        this.empPositionObj.isActive = CommonConstant.FALSE_CONDITION;
      }
      else {
        this.empPositionObj.isActive = CommonConstant.TRUE_CONDITION;
      }

      this.httpClient.post(this.addUrl, this.empPositionObj).subscribe(
        (response) => {
          if (response['isError'] != true) {
            this.toastr.successMessage(response['message']);
            AdInsHelper.RedirectUrl(this.router,["/employee"],{});
          }
        }
      );
    } else {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj = ReqForm.value
      this.empPositionObj.refEmpId = this.refEmpId
      this.empPositionObj.empPositionId = this.empPositionId
      if (this.isActive == false) {
        this.empPositionObj.isActive = CommonConstant.FALSE_CONDITION;
      }
      else {
        this.empPositionObj.isActive = CommonConstant.TRUE_CONDITION;
      }
      this.httpClient.post(this.editUrl, this.empPositionObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.router,["/office"],{});
        }
      );

    }
  }

  toggleActive(e) {
    this.isActive = e.target.checked;
  }

}
