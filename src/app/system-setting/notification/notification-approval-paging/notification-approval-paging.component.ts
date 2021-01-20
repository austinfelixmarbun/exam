import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-notification-approval-paging',
  templateUrl: './notification-approval-paging.component.html',
  providers: [NGXToastrService, NgbPaginationConfig]
})
export class NotificationApprovalPagingComponent implements OnInit {

  inputPagingObj: any;
  arrCrit: any;

  constructor(private router: Router, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchNotificationApproval.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNotificationApproval.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "NH.MR_NOTIFICATION_TYPE_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "NH.STATUS",
        environment: environment.FoundationR3Url
      }
    ];

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'Status';
    critObj.value = 'NEW';
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}
