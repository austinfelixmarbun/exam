import { environment } from "environments/environment";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { DecimalPipe } from "@angular/common";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefProductDetailObj } from 'app/shared/model/RefProductDetailObj.Model';
import { ProdHVersionObj } from "../../../shared/model/ProdHVersionObj.Model";
import { RefProductOfferingBrancMbrObj } from "../../../shared/model/RefProductOfferingBranchMbrObj.Model";



@Component({
  selector: "app-product-offering-view",
  templateUrl: "./product-offering-view.component.html",
  providers: [DecimalPipe, NGXToastrService]
})
export class ProductOfferingViewComponent implements OnInit {

  @Input() inputProdOfferingId;
  @Input() inputProdOfferingHId;

  prodOfferingId: any;
  prodOfferingHId: any;
  viewProdOfferMainInfoObj: any;
  ProdOfferingBranchMemObj: any;
  ProdVersionObj: any;
  ProdOfferingBranchUrl: any;
  ProdVerUrl: any;
  ProdDUrl: any;
  refProductDetailObj: any;
  GenData: any;
  ProdCompSchm: any;
  ProdCompScore: any;
  ProdCompRule: any;
  ProdCompOther: any;
  ProdOfferingBranchMbr: any;
  ProdVersion: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    //this.ProdDUrl = AdInsConstant.GetProductDetailComponentInfo;
    this.ProdOfferingBranchUrl = AdInsConstant.GetListProdOfferingBranchOfficeMbrByProdHId;
    //this.ProdVerUrl = AdInsConstant.GetListProdHVersionByProdId;

    this.route.queryParams.subscribe(params => {
      if (params["prodOfferingHId"] != null) {
        this.prodOfferingHId = params["prodOfferingHId"];
      }
      if (params["prodOfferingId"] != null) {
        this.prodOfferingId = params["prodOfferingId"];
      }
    });
  }

  ngOnInit() {
    if(this.prodOfferingHId == undefined){
      this.prodOfferingHId = this.inputProdOfferingHId;
    }
    
    if(this.prodOfferingId == undefined){
      this.prodOfferingId = this.inputProdOfferingId;
    }

    //** Main Information **//
    this.viewProdOfferMainInfoObj = "./assets/ucviewgeneric/viewProductOfferingMainInformation.json";

    ////** Product Version **//
    //this.ProdVersionObj = new ProdHVersionObj
    //this.ProdVersionObj.ProdId = this.prodOfferingId;
    //this.http.post(this.ProdVerUrl, this.ProdVersionObj).subscribe(
    //  response => {
    //    console.log("Response: ");
    //    console.log(response);
    //    this.ProdVersion = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);

    //** Office Member **//
    this.ProdOfferingBranchMemObj = new RefProductOfferingBrancMbrObj
    this.ProdOfferingBranchMemObj.ProdOfferingHId = this.prodOfferingHId;
    this.http.post(this.ProdOfferingBranchUrl, this.ProdOfferingBranchMemObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdOfferingBranchMbr = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );


    ////** Product Component **//
    //      //** Scheme Component **//
    //this.refProductDetailObj = new RefProductDetailObj
    //this.refProductDetailObj.ProdHId = this.prodOfferingHId;
    //this.refProductDetailObj.RefProdCompntGrpCode = 'SCHM';
    //this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
    //  response => {
    //    console.log("Response: ");
    //    console.log(response);
    //    this.ProdCompSchm = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);
    //      //** Score Component **//
    //this.refProductDetailObj = new RefProductDetailObj
    //this.refProductDetailObj.ProdHId = this.prodOfferingHId;
    //this.refProductDetailObj.RefProdCompntGrpCode = 'SCORE';
    //this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
    //  response => {
    //    console.log("Response: ");
    //    console.log(response);
    //    this.ProdCompScore = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);
    //      //** Rule Component **//
    //this.refProductDetailObj = new RefProductDetailObj
    //this.refProductDetailObj.ProdHId = this.prodOfferingHId;
    //this.refProductDetailObj.RefProdCompntGrpCode = 'RULE';
    //this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
    //  response => {
    //    console.log("Response: ");
    //    console.log(response);
    //    this.ProdCompRule = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);
    //      //** Other Component **//
    //this.refProductDetailObj = new RefProductDetailObj
    //this.refProductDetailObj.ProdHId = this.prodOfferingHId;
    //this.refProductDetailObj.RefProdCompntGrpCode = 'OTHR';
    //this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
    //  response => {
    //    console.log("Response: ");
    //    console.log(response);
    //    this.ProdCompOther = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);

  }

}
