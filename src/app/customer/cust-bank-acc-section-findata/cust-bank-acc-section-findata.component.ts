import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustBankAccObj } from 'app/shared/model/CustBankAccObj.Model';

@Component({
  selector: 'app-cust-bank-acc-section-findata',
  templateUrl: './cust-bank-acc-section-findata.component.html',
  styleUrls: ['./cust-bank-acc-section-findata.component.scss']
})
export class CustBankAccSectionFindataComponent implements OnInit {
  @Input() CustId: number;
  cbaFinDataList: any;

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    var custBankAccObj = new CustBankAccObj();
    custBankAccObj.CustId = this.CustId;
    this.httpClient.post(AdInsConstant.GetCBAForCustFinDataByCustId, custBankAccObj).subscribe(
      (response: any) => {
        this.cbaFinDataList = response.ListCBAForCustFinData;
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
      }
    );
  }

}
