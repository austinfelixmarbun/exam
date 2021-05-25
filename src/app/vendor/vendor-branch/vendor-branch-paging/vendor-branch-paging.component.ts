import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-vendor-branch-paging',
  templateUrl: './vendor-branch-paging.component.html'
})
export class VendorBranchPagingComponent implements OnInit {

  inputPagingObj : UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.VENDOR_BRANCH_ADD;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "vdr.MR_VENDOR_CATEGORY_CODE",
        environment: environment.FoundationR3Url
      }
    ];
    
    var critObj = new CriteriaObj();
    critObj.propName = "vdr.MR_VENDOR_CLASS";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = "BRANCH";
    
    this.inputPagingObj.addCritInput.push(critObj);

  }

}
