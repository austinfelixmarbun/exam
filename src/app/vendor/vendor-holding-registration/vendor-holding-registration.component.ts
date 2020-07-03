import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-holding-registration',
  templateUrl: './vendor-holding-registration.component.html'
})
export class VendorHoldingRegistrationComponent implements OnInit {
  viewObj: any;
  VendorId : any;
  objPassing: any = {};
  objPassingCP: any = {};
  VendorContactPersonId:any
  mode: string;
  HiddenState: boolean = true;
  show : boolean = false;
  ButtonText : string = "Back";
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
    });
   }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewVendorHolding.json";
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

  OnEnter()
  {
    this.ButtonText = "Finish";
  }

  OnExit()
  {
    this.ButtonText = "Back";
  }
}
