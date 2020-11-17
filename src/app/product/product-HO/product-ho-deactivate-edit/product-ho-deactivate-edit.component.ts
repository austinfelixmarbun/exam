import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ProdHDeactivateObj } from '../../../shared/model/ProdHDeactivateObj.Model';
import { environment } from '../../../../environments/environment';
import { ProdOfferingVersionObj } from '../../../shared/model/ProdOfferingVersionObj.Mode';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';


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
  prodOfferVerUrl: string;
  ProdOfferVer: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  ProdHDeactForm = this.fb.group({
    Reason: ['', [Validators.required, Validators.maxLength(50)]],
    EffectiveDate: ['', Validators.required],
    Notes: ['', [Validators.required, Validators.maxLength(4000)]]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.requestDeactURL = URLConstant.RequestDeactivation;
    this.getValueReasonModel = URLConstant.GetListActiveRefReason;
    this.prodOfferVerUrl = URLConstant.GetListProdOfferingVersionByProdId;

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
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewProductMainInformation.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    var obj = { RefReasonTypeCode: CommonConstant.RefReasonTypeCodeProdDeactivate };
    this.http.post(this.getValueReasonModel, obj).subscribe(
      (response) => {
        this.allRefReasonMethod = response[CommonConstant.ReturnObj];
        if (this.allRefReasonMethod.length > 0) {
          this.ProdHDeactForm.patchValue({ Reason: response[CommonConstant.ReturnObj][0]['Key'] });
        }
      });

    this.ProdOfferingObj = new ProdOfferingVersionObj
    this.ProdOfferingObj.ProdId = this.prodId;
    this.ProdOfferingObj.ProdOfferingStat = 'ACT';
    this.http.post(this.prodOfferVerUrl, this.ProdOfferingObj).subscribe(
      response => {
        this.ProdOfferVer = response[CommonConstant.ReturnObj];
      }
    );
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
        AdInsHelper.RedirectUrl(this.router,["/Product/HODeactivate"],{ });
      }
    );
  }
}
