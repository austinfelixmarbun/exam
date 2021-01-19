import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-coa-scheme-view',
  templateUrl: './coa-scheme-view.component.html'
})
export class CoaSchemeViewComponent implements OnInit {
  coaSchmId: string = '';
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  ListProd: Array<any> = new Array<any>();

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['CoaSchmId'] != null) {
        this.coaSchmId = params['CoaSchmId'];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/common-setting/view-coa-scheme-information.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    // this.ListProd = [{
    //   ProdCode: "ProdCode1",
    //   ProdName: "Product 1",
    //   StartDt:"20-Sept-2020",
    //   ExpDt: "20-Oct-2020"
    // }];
  }
}