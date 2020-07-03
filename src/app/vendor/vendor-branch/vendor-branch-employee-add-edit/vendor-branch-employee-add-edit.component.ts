import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-branch-employee-add-edit',
  templateUrl: './vendor-branch-employee-add-edit.component.html'
})
export class VendorBranchEmployeeAddEditComponent implements OnInit {
  VendorId: number;
  objPassing: any = {};
  VendorEmpId: number;
  IsReload: boolean;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      if(params['VendorEmpId'] != null){
        this.objPassing["VendorEmpId"] = params['VendorEmpId'];
      }
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["mode"] = "add";
    this.objPassing["Type"]="VendorEmployee";
  }

  outputValue(ev){
    console.log("TESST")
    this.VendorEmpId = ev;
    this.objPassing["VendorEmpId"] = this.VendorEmpId;
    this.objPassing["mode"] = "edit";
  }

  //Untuk force component employee load ulang
  EnterTab(ev){
    if(ev == "Employee"){
      this.IsReload = true
    }else{
      this.IsReload = false
    }
  }
}
