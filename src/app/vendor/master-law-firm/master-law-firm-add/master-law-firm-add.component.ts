import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { FormDropDownListService } from '@adins/ucform';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { KeyValueObj } from '@adins/ucform/lib/model/key-value-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-master-law-firm-add',
  templateUrl: './master-law-firm-add.component.html',
  styleUrls: ['./master-law-firm-add.component.css']
})
export class MasterLawFirmAddComponent implements OnInit {

  parentForm: FormGroup;

  pageName: string;
  ContractNo :string;
  constructor(private router: Router,
    private adInsHelperService: AdInsHelperService,
    private toastr : NGXToastrService,
    private route : ActivatedRoute,
    private ngxRouter: NgxRouterService,
    private http: HttpClient, private cookieService: CookieService,
    private ddlservice: FormDropDownListService,
    private fb: FormBuilder) {
    this.pageName = "AddNewLawFirm" 
   }
  ngOnInit(): void {
    console.log('Parent Form', this.parentForm.getRawValue());
  }

  handler = {
    callback: ($event) => this.callback($event)
  };

  async onFormCreated(ev)
  {
    this.parentForm = ev;
    let TaxKindCode = "";
    const lawFirmTypeControl = this.parentForm.controls["LawFirmType"];

    if(lawFirmTypeControl && lawFirmTypeControl.value === 'PERSONAL') {
      TaxKindCode = "P";
    } else {
      TaxKindCode = "C";
    }

    this.http.post(URLConstant.GetTaxScheme, { MrNationalityCode: 'WNI', MrTaxKindCode: TaxKindCode }).subscribe(
      (response) => {
        const keyValueArray = response[CommonConstant.ReturnObj].map(element => ({
          Key: element.TaxSchmCode,
          Value: element.TaxSchmName
        }));

        this.ddlservice.SetDictDDL("TaxScheme",keyValueArray);
        // Assuming you need to do something with keyValueArray
        console.log("inidata",keyValueArray);
      }
    );
  }

  callback(ev) {
    let row = ev.RowObj;
    let View = ev.ViewObj;
    if (ev.Key == "ViewVendor") {
      //this.onViewVendor(View.VendorCode);
    }
    if (ev.Key == "ViewVendor") {
      //this.onViewVendor(row.VendorCode);
    }
    if (ev == "LawFirmType") {

      let TaxKindCode = "";
      console.log('Parent Form', this.parentForm.getRawValue());
      const lawFirmTypeControl = this.parentForm.controls["LawFirmType"];

      if(lawFirmTypeControl && lawFirmTypeControl.value === 'PERSONAL') {
        TaxKindCode = "P";
      } else {
        TaxKindCode = "C";
      }

      this.http.post(URLConstant.GetTaxScheme, { MrNationalityCode: 'WNI', MrTaxKindCode: TaxKindCode }).subscribe(
        (response) => {
          const keyValueArray = response[CommonConstant.ReturnObj].map(element => ({
            Key: element.TaxSchmCode,
            Value: element.TaxSchmName
          }));

          this.ddlservice.SetDictDDL("TaxScheme",keyValueArray);
          // Assuming you need to do something with keyValueArray
          console.log("inidata",keyValueArray);
        }
      );
    }
  }
}
