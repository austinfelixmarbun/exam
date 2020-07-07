import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  providers: [NGXToastrService]
})
export class BankComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchBank.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.deleteUrl = "/RefBank/DeleteRefBank";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBank.json";
  }

}