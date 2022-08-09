import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notif-template-attr-mapping-paging',
  templateUrl: './notif-template-attr-mapping-paging.component.html',
  styleUrls: ['./notif-template-attr-mapping-paging.component.css']
})
export class NotifTemplateAttrMappingPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/notif-engine/search-notif-source.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/search-notif-source.json";
    this.inputPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';

    var critInput = new CriteriaObj();
    critInput.DataType = "text";
    critInput.propName = "RM.REF_MASTER_TYPE_CODE";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = "NOTIFICATION_SOURCE";
    this.inputPagingObj.addCritInput.push(critInput);
  }

}
