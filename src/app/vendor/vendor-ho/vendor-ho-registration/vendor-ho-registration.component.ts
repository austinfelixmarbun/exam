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
  HiddenState: boolean = true;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
  }

  outputValue(ev){
    this.HiddenState = ev;
  }
}
