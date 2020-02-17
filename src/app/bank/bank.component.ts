import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router, NavigationEnd } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { UcpagingComponent } from '@adins/ucpaging';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
  providers: [NGXToastrService, NgbPaginationConfig]
})
export class BankComponent implements OnInit {

  @ViewChild(UcpagingComponent) ucpaging;
  inputPagingObj: any;
  navigationSubscription: any;

  constructor(private router: Router) {
    // subscribe to the router events - storing the subscription so we can unsubscribe later. 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchBank.json";
    this.inputPagingObj.enviromentUrl = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = "/RefBank/DeleteRefBank";
    this.inputPagingObj.pagingJson = "./assets/form-setting/bankPaging.json";
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    if (this.ucpaging.gridObj != null) {
      this.ucpaging.gridObj.resultData = null;
    }
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we don't 
    // then we will continue to run our initialiseInvites() method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
