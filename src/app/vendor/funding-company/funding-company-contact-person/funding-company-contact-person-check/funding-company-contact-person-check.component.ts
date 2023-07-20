import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResGetListVendorContactPersonObj, ResListVendorContactPersonObj } from 'app/shared/model/response/res-get-list-vendor-contact-person-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { FundingCompanyService } from '../../../funding-company.service';

@Component({
  selector: 'app-funding-company-contact-person-check',
  templateUrl: './funding-company-contact-person-check.component.html',
})
export class FundingCompanyContactPersonCheckComponent implements OnInit {

  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  vendorObj: any;
  resultData: any;
  listVendorCP: Array<ResListVendorContactPersonObj> = new Array<ResListVendorContactPersonObj>();

  objVendor: VendorObj;
  vendorCPObj: GenericObj = new GenericObj();

  BirthDt: Date;
  IdExpiredDt: Date;
  mode: any;

  VendorId: number;
  IdCustPersonal: number;

  IdNo: string;
  addUrl: string;  
  Gender: string;
  CustName: string;
  GenderDesc: string;
  CustModel: string;
  BirthPlace: string;
  MrIdTypeCode: string;
  CustModelDesc: string;
  MrIdTypeCodeDesc: string;
  MotherMaidenName: string;
  CPFormValues: any[];
  From : string;
  
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder,
    private childFormService: FundingCompanyService
    ) { 

    this.route.queryParams.subscribe(params => {
      if (params["VendorId"] != null) {
         this.VendorId = params["VendorId"];
       }
       if (params["From"] != null) {
        this.From = params["From"];
      }
      if (params["mode"] != null) {
        this.From = params["mode"];
      }
     });
  }

  ngOnInit() {
    this.objVendor = new VendorObj();
    this.objVendor.VendorId = this.VendorId;
    if(this.mode == "edit"){
      this.http.post(URLConstant.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
        (response) => {
            this.vendorObj = response;
        });
  
        this.vendorCPObj.Id = this.VendorId;
  
     
        this.http.post(URLConstant.GetListVendorContactPersonByVendorId, this.vendorCPObj).subscribe(
          (response : ResGetListVendorContactPersonObj) => {
              this.listVendorCP = response[CommonConstant.ReturnObj];
        });
    }

    else{
      this.CPFormValues = this.childFormService.getChildFormValues();
    }
    
  }

  listAddressType: Array<string> = new Array();
  CheckListToBeEdit(VendorContactPersonId: number): boolean {
    let idx: number = this.listVendorCP.findIndex(x => x.VendorContactPersonId == VendorContactPersonId);
    if (idx >= 0) return true;
    return false;
  }

  editItem(vendorCPObj: any) {
    this.outputValue.emit({ mode: 'edit', AddrId: vendorCPObj.VendorContactPersonId});
  }

  addCP() {
    this.outputValue.emit({mode: 'add'});
    console.log("ini emit add",this.outputValue)
  }

}
