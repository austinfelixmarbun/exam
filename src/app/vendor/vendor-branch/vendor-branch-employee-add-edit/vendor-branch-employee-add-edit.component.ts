import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-branch-employee-add-edit',
  templateUrl: './vendor-branch-employee-add-edit.component.html',
  styleUrls: ['./vendor-branch-employee-add-edit.component.scss']
})
export class VendorBranchEmployeeAddEditComponent implements OnInit {
  VendorId: any;
  objPassing: any = {};
  
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      this.objPassing["VendorEmpId"] = params['VendorEmpId'];
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
  }

}
