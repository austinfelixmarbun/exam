import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
  providers: [NGXToastrService]
})
export class GeneralDataComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: NGXToastrService
  ) { }
  

  RefGeneralDataForm=this.fb.group({
    ProdDId: [''],
    ProdHId: [''],
    RefProdCompntCode: [''],
    RefProdCompntGrpCode: [''],
    CompntValue: [''],
    CompntValueDesc: [''],
    MrProdBehaviour: [''],
  });

  itemLineOfBusiness;
  itemProductType;
  itemPurposeOfFinancing;
  itemCurrency;

  itemWayOfFinancing;
  itemInstallmentScheme;
  itemInterestType;
  itemEffectiveRateType;

  itemPaymentFrequency;
  itemAssetCondition;
  itemAssetType;
  itemFirstInstallmentType;

  UrlBackEnd;

  ngOnInit() {
    console.log(this.RefGeneralDataForm);
    this.UrlBackEnd = AdInsConstant.GetProductHOComponent;
    var ProdHOComponent={
      GroupCodes: [
        "GEN"
      ],
      RowVersion: ""
    }
    this.http.post(this.UrlBackEnd, ProdHOComponent).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
