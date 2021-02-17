import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-atpm-registration',
  templateUrl: './vendor-atpm-registration.component.html'
})
export class VendorATPMRegistrationComponent implements OnInit {
  VendorId : any;
  objPassing: any = {};
  objPassingCP: any = {};
  VendorContactPersonId:any
  mode: string;
  HiddenState: boolean = true;
  show : boolean = false;
  ButtonText : string = "Back";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  
  readonly EditLink: string = NavigationConstant.VENDOR_ATPM_DETAIL;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
    });
   }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorATPM.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

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

  Finish() {
    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_PAGING],{ "MrVendorCategoryCode": CommonConstant.SUPPLIER_ATPM });
  }
}
