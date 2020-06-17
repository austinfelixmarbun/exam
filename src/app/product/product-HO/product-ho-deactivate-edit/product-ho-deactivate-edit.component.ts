import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ProdHDeactivateObj } from '../../../shared/model/ProdHDeactivateObj.Model';
import { environment } from '../../../../environments/environment';
import { ProdOfferingVersionObj } from '../../../shared/model/ProdOfferingVersionObj.Mode';


@Component({
  selector: 'app-product-ho-deactivate-edit',
  templateUrl: './product-ho-deactivate-edit.component.html',
  providers: [NGXToastrService]
})
export class ProductHODeactivateEditComponent implements OnInit {

  prodId: number;
  prodHId: number;
  prodHDeactivateObj: ProdHDeactivateObj;
  resultData: any;
  apiUrl: string;
  requestDeactURL: string;
  ProdOfferingObj: any;
  arrCrit: any;
  getValueReasonModel: any;
  allRefReasonMethod: any;
  viewObj: any;
  prodOfferVerUrl: string;
  ProdOfferVer: any;

  ProdHDeactForm = this.fb.group({
    Reason: ['', [Validators.required, Validators.maxLength(50)]],
    EffectiveDate: ['', Validators.required],
    Notes: ['', [Validators.required, Validators.maxLength(4000)]]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.requestDeactURL = AdInsConstant.RequestDeactivation;
    this.getValueReasonModel = AdInsConstant.GetValueReasonModel;
    this.prodOfferVerUrl = AdInsConstant.GetListProdOfferingVersionByProdId;

    this.route.queryParams.subscribe(params => {
      if (params["prodHId"] != null) {
        this.prodHId = params["prodHId"];
      }
      if (params["prodId"] != null) {
        this.prodId = params["prodId"];
      }
    });
  }

  ngOnInit() {
    var obj = { RefReasonTypeCode: AdInsConstant.RefReasonTypeCodeProdDeactivate };
    this.http.post(this.getValueReasonModel, obj).subscribe(
      (response) => {
        console.log(response);
        this.allRefReasonMethod = response['ReturnObject'];
        this.ProdHDeactForm.patchValue({ Reason: response['ReturnObject'][0]['Key'] });
      },
      (error) => {
        console.log(error);
      });

    this.ProdOfferingObj = new ProdOfferingVersionObj
    this.ProdOfferingObj.ProdId = this.prodId;
    this.ProdOfferingObj.ProdOfferingStat = 'ACT';
    this.http.post(this.prodOfferVerUrl, this.ProdOfferingObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdOfferVer = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );

    this.viewObj = "./assets/ucviewgeneric/viewProductMainInformation.json";
  }

  SaveForm() {
    this.prodHDeactivateObj = new ProdHDeactivateObj();
    this.prodHDeactivateObj = this.ProdHDeactForm.value;
    //var reason = this.allRefReasonMethod.filter(
    //  x => x.Key == this.ProdHDeactForm.controls.Reason.value)
    //this.prodHDeactivateObj.Reason = reason[0].Value;
    this.prodHDeactivateObj.ProdHId = this.prodHId;
    this.prodHDeactivateObj.RowVersion = "";
    this.http.post(this.requestDeactURL, this.prodHDeactivateObj).subscribe(
      response => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/Product/HODeactivate"]);
      },
      error => {
        console.log(error);
      }
    );

  }
}
