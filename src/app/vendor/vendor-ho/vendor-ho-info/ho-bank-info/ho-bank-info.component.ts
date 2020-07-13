import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-ho-bank-info',
  templateUrl: './ho-bank-info.component.html'
})
export class HoBankInfoComponent implements OnInit {
VendorId: any;
ListData : any = new Array();

  constructor(private route: ActivatedRoute,  private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    var obj = {
      VendorId : this.VendorId
    }

    this.http.post(URLConstant.GetListVendorBankAccByVendorId, obj).subscribe(
      (response) => {
        this.ListData = response["ReturnObject"];
      }
    ); 
  }
}
