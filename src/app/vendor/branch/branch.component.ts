import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
  providers: [NGXToastrService]
})
export class BranchComponent implements OnInit {

  inputPagingObj: any;



  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
    this.inputPagingObj.deleteUrl = "/Vendor/DeleteVendor";
    this.inputPagingObj.addCritInput = new Array();

    // var critObj = new CriteriaObj();
    // critObj.propName = "vdr.MR_VENDOR_CLASS";
    // critObj.restriction = AdInsConstant.RestrictionEq;
    // critObj.value = "BRANCH";
    // this.inputPagingObj.addCritInput.push(critObj);





  }

}
