import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-role-paging',
  templateUrl: './role-paging.component.html',
  providers: [NGXToastrService, NgbPaginationConfig]
})
export class RolePagingComponent implements OnInit {

  inputPagingObj: any;


  constructor(private router: Router, private toastr: NGXToastrService) {
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchRefRole.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefRole;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefRole.json";
  }
}
