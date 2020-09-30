import { Component, OnInit } from '@angular/core';
import { VendorContactPersonObj } from 'app/shared/model/VendorContactPersonObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-ho-contact-person-info',
  templateUrl: './ho-contact-person-info.component.html',
})
export class HoContactPersonInfoComponent implements OnInit {
  VendorContactPerson: any;
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
    this.VendorContactPerson = new VendorContactPersonObj;
    this.VendorContactPerson.VendorId = this.VendorId;

    this.http.post(URLConstant.GetListVendorContactPersonByVendorId, this.VendorContactPerson).subscribe(
      (response) => {
        this.resultData = response[CommonConstant.ReturnObj];
      }
    );
  }
}
