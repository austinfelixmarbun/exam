import { Component, OnInit, ViewChild } from '@angular/core';
import { UcpagingComponent } from '@adins/ucpaging';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-negative-asset',
  templateUrl: './negative-asset.component.html',
  styleUrls: ['./negative-asset.component.scss'],
  providers: [NGXToastrService]
})
export class NegativeAssetComponent implements OnInit {
  @ViewChild(UcpagingComponent) ucpaging;
  inputPagingObj: any;
  navigationSubscription: any;

  constructor(
    private service: NGXToastrService,
    private https: HttpClient
  ) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchNegativeAsset.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = "";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNegativeAsset.json";

    var criteriaList = new Array();
    var criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'A.IS_ACTIVE';
    criteriaObj.value = "1";
    criteriaList.push(criteriaObj);

    criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'D.REF_MASTER_TYPE_CODE';
    criteriaObj.value = "NEGATIVE_AST_SOURCE";
    criteriaList.push(criteriaObj);
    this.inputPagingObj.addCritInput = criteriaList;
  }

}
