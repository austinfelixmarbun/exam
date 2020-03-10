import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { DecimalPipe } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefProductOfferingBrancMbrObj } from "../../../shared/model/RefProductOfferingBranchMbrObj.Model";
import { ProdOfferingHVersionObj } from "../../../shared/model/ProdOfferingHVersionObj.Model";
import { RefProductOfferingDetailObj } from "../../../shared/model/RefProductOfferingDetailObj.Model";



@Component({
  selector: "app-product-offering-view",
  templateUrl: "./product-offering-view.component.html",
  providers: [DecimalPipe, NGXToastrService]
})
export class ProductOfferingViewComponent implements OnInit {

  prodOfferingHId: any;
  viewProdOfferMainInfoObj: any;
  ProdOfferingBranchMemObj: any;
  ProdOfferingVersionObj: any;
  ProdOfferingBranchUrl: any;
  ProdOfferingVerUrl: any;
  ProdOfferingDUrl: any;
  refProductDetailObj: any;
  GenData: any;
  ProdComp: any;
  ProdCompSchm: any;
  ProdCompScore: any;
  ProdCompRule: any;
  ProdCompOther: any;
  ProdOfferingBranchMbr: any;
  ProdOfferingVersion: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    this.ProdOfferingDUrl = AdInsConstant.GetListProdOfferingDByProdOfferingHIdAndProdCompntGrpCode;
    this.ProdOfferingBranchUrl = AdInsConstant.GetListProdOfferingBranchOfficeMbrByProdHId;
    this.ProdOfferingVerUrl = AdInsConstant.GetListProdOfferingHVersionByProdOfferingHId;

    this.route.queryParams.subscribe(params => {
      if (params["prodOfferingHId"] != null) {
        this.prodOfferingHId = params["prodOfferingHId"];
      }
    });
  }

  ngOnInit() {
    //** Main Information **//
    this.viewProdOfferMainInfoObj = "./assets/ucviewgeneric/viewProductOfferingMainInformation.json";

    //** Product Offering Version **//
    this.ProdOfferingVersionObj = new ProdOfferingHVersionObj;
    this.ProdOfferingVersionObj.ProdOfferingHId = this.prodOfferingHId;
    this.http.post(this.ProdOfferingVerUrl, this.ProdOfferingVersionObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdOfferingVersion = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );

    //** Office Member **//
    this.ProdOfferingBranchMemObj = new RefProductOfferingBrancMbrObj;
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


    //** Product Component **//
    this.refProductDetailObj = new RefProductOfferingDetailObj;
    this.refProductDetailObj.ProdOfferingHId = this.prodOfferingHId;
    this.refProductDetailObj.RefProdCompntGrpCode = ['SCHM', 'SCORE', 'RULE', 'OTHR'];
    this.http.post(this.ProdOfferingDUrl, this.refProductDetailObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdComp = response['ReturnObject'];

        this.ProdCompSchm = this.ProdComp.filter(
          comp => comp.RefProdCompntGrpCode === 'SCHM');
        this.ProdCompScore = this.ProdComp.filter(
          comp => comp.RefProdCompntGrpCode === 'SCORE');
        this.ProdCompRule = this.ProdComp.filter(
          comp => comp.RefProdCompntGrpCode === 'RULE');
        this.ProdCompOther = this.ProdComp.filter(
          comp => comp.RefProdCompntGrpCode === 'OTHR');
      },
      error => {
        console.log(error);
      }
    );

  }

}
