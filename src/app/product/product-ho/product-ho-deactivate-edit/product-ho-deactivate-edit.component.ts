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


  ProdHDeactForm = this.fb.group({
    DeactReason: [''],
    DeactEffectiveDt: ['', Validators.required],
    DeactNotes: ['', [Validators.required, Validators.maxLength(4000)]]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.editUrl = AdInsConstant.RequestDeactivation;
    this.getValueReasonModel = AdInsConstant.GetValueReasonModel;

    this.route.queryParams.subscribe(params => {
      if (params["prodId"] != null) {
        this.prodId = params["prodId"];
      }
      if (params["prodHId"] != null) {
        this.prodId = params["prodHId"];
      }
    });
  }

  ngOnInit() {

/*, [Validators.required, Validators.maxLength(50)]
 *    this.prodHDeactivateObj = new ProdHDeactivateObj();
    this.prodHDeactivateObj.ProdHId = this.prodHId;
    this.http.post(this.apiUrl, this.prodHDeactivateObj).subscribe(
      response => {
        this.resultData = response;
        console.log("Response: ");
        console.log(response);
        this.prodHId = this.resultData.ProdHId;
        this.ProdHDeactForm.patchValue({
          JobTitleCode: this.resultData.JobTitleCode,
          JobTitleName: this.resultData.JobTitleName,
          Descr: this.resultData.Descr
        });

      },
      error => {
        console.log(error);
      }
    );*/
    this.http.post(this.getValueReasonModel, null).subscribe(
      (response) => {
        console.log(response);
        this.allRefReasonMethod = response['ReturnObject'];
        this.ProdHDeactForm.patchValue({ DeactReason: response['ReturnObject'][0]['Key'] });
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

  }

  SaveForm() {
    this.prodHDeactivateObj = new ProdHDeactivateObj();
    this.prodHDeactivateObj = this.ProdHDeactForm.value;
    this.prodHDeactivateObj.ProdHId = this.prodHId;
    this.prodHDeactivateObj.RowVersion = "";
    this.http.post(this.editUrl, this.prodHDeactivateObj).subscribe(
      response => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/HODeactivate"]);
      },
      error => {
        console.log(error);
      }
    );

  }
}
