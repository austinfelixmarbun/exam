import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-vendor-branch-paging',
  templateUrl: './vendor-branch-paging.component.html',
  providers: [NGXToastrService]
})
export class VendorBranchPagingComponent implements OnInit {

  inputPagingObj : any;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "vdr.MR_VENDOR_CATEGORY_CODE",
        environment: environment.FoundationR3Url
      }
    ];
    
    this.inputPagingObj.addCritInput = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = "vdr.MR_VENDOR_CLASS";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = "BRANCH";
    
    this.inputPagingObj.addCritInput.push(critObj);

  }

}
