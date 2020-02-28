import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router, NavigationEnd } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { UcpagingComponent } from '@adins/ucpaging';

@Component({
  selector: 'app-role-paging',
  templateUrl: './role-paging.component.html',
  styleUrls: ['./role-paging.component.scss'],
  providers: [NGXToastrService, NgbPaginationConfig]
})
export class RolePagingComponent implements OnInit {

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
    this.inputPagingObj._url = "../assets/ucpaging/searchRefRole.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefRole;
    this.inputPagingObj.pagingJson = "../assets/ucpaging/searchRefRole.json";
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
