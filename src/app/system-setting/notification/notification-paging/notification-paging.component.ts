import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-notification-paging',
  templateUrl: './notification-paging.component.html',
  providers: [NGXToastrService, NgbPaginationConfig]
})
export class NotificationPagingComponent implements OnInit {

  inputPagingObj: any;

  constructor(private router: Router, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchNotification.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNotification.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "NH.MR_NOTIFICATION_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }

}

// ,ini Header Action di JSON nya
//       {
//         "type": "label",
//         "position": "center",
//         "label": "Action"
//       }

// , ini Tombol Action di JSON nya
//       {
//         "type": "action",
//         "position": "center",
//         "action": [
//           {
//             "type": "edit",
//             "path": "/SystemSetting/Notification/Detail",
//             "param": [
//               {
//                 "type": "NotificationHId",
//                 "property": "NotificationHId"
//               },
//               {
//                 "type": "mode",
//                 "property": "edit"
//               }
//             ]
//           }
//         ]
//       }