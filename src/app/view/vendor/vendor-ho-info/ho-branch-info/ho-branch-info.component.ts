import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-ho-branch-info',
  templateUrl: './ho-branch-info.component.html'
})
export class HoBranchInfoComponent implements OnInit {
  VendorId: any;
  ListData : any = new Array();
  
  constructor(private route: ActivatedRoute,  private http: HttpClient, private UrlConstantNew: UrlConstantNew) { 
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

    this.http.post(this.UrlConstantNew.GetListBranchByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.ListData = response[CommonConstant.ReturnObj];
      }
    ); 
  }
}
