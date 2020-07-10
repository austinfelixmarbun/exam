import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from '../../../../environments/environment';
import { ProdOfferingHDeactivateObj } from '../../../shared/model/ProdOfferingHDeactivateObj.Model';
import { RefProductOfferingBrancMbrObj } from '../../../shared/model/RefProductOfferingBranchMbrObj.Model';


@Component({
  selector: 'app-product-offering-deactivate-edit',
  templateUrl: './product-offering-deactivate-edit.component.html',
  providers: [NGXToastrService]
})
export class ProductOfferingDeactivateEditComponent implements OnInit {

  prodOfferingHId: any;
  prodOfferingHDeactivateObj: any;
  resultData: any;
  apiUrl: any;
  editUrl: any;
  arrCrit: any;
  getValueReasonModel: any;
  allRefReasonMethod: any;
  viewObj: any;
  ProdOfferingBranchMemObj: any;
  OfficeList: any;
  ProdOfferingBranchUrl: any;

  ProdOfferingHDeactForm = this.fb.group({
    Reason: ['', [Validators.required, Validators.maxLength(50)]],
    EffectiveDate: ['', Validators.required],
    Notes: ['', [Validators.required, Validators.maxLength(4000)]]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.editUrl = AdInsConstant.RequestOfferingDeactivation;
    this.getValueReasonModel = AdInsConstant.GetListActiveRefReason;
    this.ProdOfferingBranchUrl = AdInsConstant.GetListProdOfferingBranchOfficeMbrByProdHIdAndApp;

    this.route.queryParams.subscribe(params => {
      if (params["prodOfferingHId"] != null) {
        this.prodOfferingHId = params["prodOfferingHId"];
      }

    });
  }

  ngOnInit() {
    var obj = { RefReasonTypeCode: AdInsConstant.RefReasonTypeCodeProdDeactivate };
    this.http.post(this.getValueReasonModel, obj).subscribe(
      (response) => {
        console.log(response);
        if (response['ReturnObject'].length > 0) {
          this.allRefReasonMethod = response['ReturnObject'];
          this.ProdOfferingHDeactForm.patchValue({ Reason: response['ReturnObject'][0]['Key'] });
        }
      },
      (error) => {
        console.log(error);
      });

    this.ProdOfferingBranchMemObj = new RefProductOfferingBrancMbrObj
    this.ProdOfferingBranchMemObj.ProdOfferingHId = this.prodOfferingHId;
    this.http.post(this.ProdOfferingBranchUrl, this.ProdOfferingBranchMemObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        if (response['ReturnObject'].length > 0) {          
          this.OfficeList = response['ReturnObject'];
        }
      },
      error => {
        console.log(error);
      }
    );


    this.viewObj = "./assets/ucviewgeneric/viewProductOfferingMainInformation.json";
  }

  SaveForm() {
    this.prodOfferingHDeactivateObj = new ProdOfferingHDeactivateObj();
    this.prodOfferingHDeactivateObj = this.ProdOfferingHDeactForm.value;
    this.prodOfferingHDeactivateObj.ProdOfferingHId = this.prodOfferingHId;
    this.prodOfferingHDeactivateObj.RowVersion = "";
    this.http.post(this.editUrl, this.prodOfferingHDeactivateObj).subscribe(
      response => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/Product/OfferingDeactivate"]);
      },
      error => {
        console.log(error);
      }
    );

  }
}
