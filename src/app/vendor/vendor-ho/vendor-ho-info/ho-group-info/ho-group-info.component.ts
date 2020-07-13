import { Component, OnInit } from '@angular/core';
import { VendorGroupObj } from 'app/shared/model/VendorGroupObj.Model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-ho-group-info',
  templateUrl: './ho-group-info.component.html',
  styleUrls: ['./ho-group-info.component.scss']
})
export class HoGroupInfoComponent implements OnInit {
  VendorGroupObj: any;
  VendorId: any;
  resultData: any;
  
  constructor(private route: ActivatedRoute,  private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    this.loadTableListData();
  }

  loadTableListData(){
    this.VendorGroupObj = new VendorGroupObj();
    this.VendorGroupObj.VendorId = this.VendorId;

    this.http.post(URLConstant.GetListVendorGrpByVendorId, this.VendorGroupObj).subscribe(
      (response) => {
        this.resultData = response[CommonConstant.ReturnObj];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
