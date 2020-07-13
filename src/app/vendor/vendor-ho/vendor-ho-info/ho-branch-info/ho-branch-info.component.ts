import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-ho-branch-info',
  templateUrl: './ho-branch-info.component.html'
})
export class HoBranchInfoComponent implements OnInit {
  VendorId: any;
  ListData : any = new Array();
  
  constructor(private route: ActivatedRoute,  private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    this.loadTableListData();
  }

  loadTableListData(){
    var obj = {
      VendorId : this.VendorId
    }

    this.http.post(URLConstant.GetListBranchByVendorId, obj).subscribe(
      (response) => {
        this.ListData = response["ReturnObject"];
      }
    ); 
  }
}
