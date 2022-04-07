import { Component, OnInit } from '@angular/core';
import { VendorContactPersonObj } from 'app/shared/model/vendor-contact-person-obj.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-ho-contact-person-info',
  templateUrl: './ho-contact-person-info.component.html',
})
export class HoContactPersonInfoComponent implements OnInit {
  VendorContactPerson: any;
  VendorId: any;
  resultData: any;
  
  constructor(private route: ActivatedRoute,  private http: HttpClient, private UrlConstantNew: UrlConstantNew) { 
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

    this.http.post(this.UrlConstantNew.GetListVendorContactPersonByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.resultData = response[CommonConstant.ReturnObj];
      }
    );
  }
}
