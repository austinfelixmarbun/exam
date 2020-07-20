import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-holding-registration',
  templateUrl: './vendor-holding-registration.component.html'
})
export class VendorHoldingRegistrationComponent implements OnInit {
  VendorId : any;
  objPassing: any = {};
  objPassingCP: any = {};
  VendorContactPersonId:any
  mode: string;
  HiddenState: boolean = true;
  show : boolean = false;
  ButtonText : string = "Back";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  MrVendorCategoryCode: string = "";
  
  constructor(private route: ActivatedRoute, private http : HttpClient, private vendorService: VendorService) {
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
    });
   }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHolding.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";

    this.vendorService.GetVendorAndVendorAddrByVendorId({ VendorId: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      },
      (error) => {
        console.log(error);
      }
    );
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
