import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputGridObj } from 'app/shared/model/InputGridObj.Model';
import { CustPersonalFamilyObj, ResponseListCustPersonalFamilyObj } from 'app/shared/model/Response/Customer/View/ResponseListCustPersonalFamilyObj.model';

@Component({
  selector: 'app-customer-view-personal-family',
  templateUrl: './customer-view-personal-family.component.html'
})
export class CustomerViewPersonalFamilyComponent implements OnInit {
  CustId: number;
  ListFamily: Array<CustPersonalFamilyObj> = new Array();
  InputGridFamilyObj: InputGridObj = new InputGridObj();

  constructor(private http: HttpClient, private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });
  }

  ngOnInit() {
    this.InputGridFamilyObj.pagingJson = "./assets/ucgridview/Customer/View/gridCustPersonalFamilyView.json";
    this.http.post<ResponseListCustPersonalFamilyObj>(URLConstant.GetMainCustAndListCustPersonalFamilyByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.InputGridFamilyObj.resultData = {
          Data: ""
        }
        this.InputGridFamilyObj.resultData["Data"] = new Array();
        this.InputGridFamilyObj.resultData.Data = response.CustPersonalFamilyList;
        this.ListFamily = this.InputGridFamilyObj.resultData.Data;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
