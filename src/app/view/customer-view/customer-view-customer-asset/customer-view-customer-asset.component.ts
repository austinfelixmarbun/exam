import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
@Component({
  selector: 'app-customer-view-customer-asset',
  templateUrl: './customer-view-customer-asset.component.html',
  styleUrls: ['./customer-view-customer-asset.component.css']
})
export class CustomerViewCustomerAssetComponent implements OnInit {

  CustId: number = 0;
  ListAsset: Array<any> = new Array<any>();

  constructor(private http: HttpClient, private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });
  }

  async ngOnInit() {
    await this.http.post(URLConstant.GetListCustAssetByCustId, { Id: this.CustId }).toPromise().then(
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
