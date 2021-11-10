import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notification-paging',
  templateUrl: './notification-paging.component.html',
  providers: [NgbPaginationConfig]
})
export class NotificationPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_NOTIF_APPRV_DETAIL;
  constructor(private router: Router, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchNotification.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNotification.json";
  }

}