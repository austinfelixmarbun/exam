import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ProdHDeactivateObj } from '../../../shared/model/ProdHDeactivateObj.Model';
import { UcPagingObj } from '../../../shared/model/UcPagingObj.Model';
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-product-ho-deactivate-edit',
  templateUrl: './product-ho-deactivate-edit.component.html',
  providers: [NGXToastrService]
})
export class ProductHODeactivateEditComponent implements OnInit {

  prodId: any;
  prodHId: any;
  prodHDeactivateObj: ProdHDeactivateObj;
  resultData: any;
  apiUrl: any;
  editUrl: any;
  inputPagingObj: any;
  arrCrit: any;
  getValueReasonModel: any;
  allRefReasonMethod: any;
  viewObj: any;

  ProdHDeactForm = this.fb.group({
    Reason: ['', [Validators.required, Validators.maxLength(50)]],
    EffectiveDate: ['', Validators.required],
    Notes: ['', [Validators.required, Validators.maxLength(4000)]]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    // this.editUrl = AdInsConstant.RequestDeactivation;
    // this.getValueReasonModel = AdInsConstant.GetValueReasonModel;

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

    this.http.post(this.getValueReasonModel, null).subscribe(
      (response) => {
        console.log(response);
        this.allRefReasonMethod = response['ReturnObject'];
        this.ProdHDeactForm.patchValue({ Reason: response['ReturnObject'][0]['Key'] });
      },
      (error) => {
        console.log(error);
      });

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/product/searchProductOfferingForProductHODeactivate.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductOfferingForProductHODeactivate.json";

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionLike;
    critObj.propName = 'B.PROD_OFFERING_STAT';
    critObj.value = 'ACT';
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;

    this.viewObj = "./assets/ucviewgeneric/viewProductMainInformation.json";
  }

  SaveForm() {
    this.prodHDeactivateObj = new ProdHDeactivateObj();
    this.prodHDeactivateObj = this.ProdHDeactForm.value;
    this.prodHDeactivateObj.ProdHId = this.prodHId;
    this.prodHDeactivateObj.RowVersion = "";
    this.http.post(this.editUrl, this.prodHDeactivateObj).subscribe(
      response => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/product/HODeactivate"]);
      },
      error => {
        console.log(error);
      }
    );

  }
}
