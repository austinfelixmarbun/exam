import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-branch-registration',
  templateUrl: './vendor-branch-registration.component.html',
  styleUrls: ['./vendor-branch-registration.component.scss']
})
export class VendorBranchRegistrationComponent implements OnInit {
  VendorId: any; 
  objPassing: any = {};

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      if(!params['VendorEmpId']){
      this.objPassing["VendorEmpId"] = params['VendorEmpId'];
      }
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";
  }
}