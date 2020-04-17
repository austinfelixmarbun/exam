import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-ho-registration',
  templateUrl: './vendor-ho-registration.component.html',
  styleUrls: ['./vendor-ho-registration.component.scss']
})
export class VendorHoRegistrationComponent implements OnInit {
  VendorId: any; 
  objPassing: any = {};
  objPassingCP: any = {};
  HiddenState: boolean = true;
  mode: string;
  VendorContactPersonId:any;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";
  }

  outputValue(ev){
    this.HiddenState = ev.HiddenState;
    this.mode = ev.mode;
    this.VendorContactPersonId = ev.VendorContactPersonId;

    this.objPassingCP.VendorContactPersonId = this.VendorContactPersonId;
    this.objPassingCP.mode = this.mode;
    this.objPassingCP.VendorId = this.VendorId;
  }
}
