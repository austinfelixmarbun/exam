import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-customer-asset',
  templateUrl: './customer-view-customer-asset.component.html',
  styleUrls: ['./customer-view-customer-asset.component.css']
})
export class CustomerViewCustomerAssetComponent implements OnInit {

  CustId: number = 0;
  ListAsset: Array<any> = new Array<any>();

  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew){
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });
  }

  async ngOnInit() {
    await this.http.post(this.UrlConstantNew.GetListCustAssetByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        console.log(response)
        this.ListAsset = response["CustAssetList"];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
