import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { DecimalPipe } from "@angular/common";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefProductDetailObj } from 'app/shared/model/RefProductDetailObj.Model';
import { RefProductBrancMbrObj } from "../../../shared/model/RefProductBrancMbrObj.Model";
import { ProdHVersionObj } from "../../../shared/model/ProdHVersionObj.Model";



@Component({
  selector: "app-product-ho-view",
  templateUrl: "./product-ho-view.component.html",
  providers: [DecimalPipe, NGXToastrService]
})
export class ProductHOViewComponent implements OnInit {

  prodId: any;
  prodHId: any;
  viewProdMainInfoObj: any;
  ProdBranchMemObj: any;
  ProdVersionObj: any;
  ProdBranchUrl: any;
  ProdVerUrl: any;
  ProdDUrl: any;
  refProductDetailObj: any;
  GenData: any;
  ProdCompSchm: any;
  ProdCompScore: any;
  ProdCompRule: any;
  ProdCompOther: any;
  ProdBranchMbr: any;
  ProdVersion: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    this.ProdDUrl = AdInsConstant.GetProductDetailComponentInfo;
    this.ProdBranchUrl = AdInsConstant.GetListProdBranchOfficeMbrByProdHId;
    this.ProdVerUrl = AdInsConstant.GetListProdHVersionByProdId;

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
    //** Main Information **//
    this.viewProdMainInfoObj = "./assets/ucviewgeneric/viewProductMainInformation.json";

    //** Product Version **//
    this.ProdVersionObj = new ProdHVersionObj
    this.ProdVersionObj.ProdId = this.prodId;
    this.http.post(this.ProdVerUrl, this.ProdVersionObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdVersion = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );

    //** Office Member **//
    this.ProdBranchMemObj = new RefProductBrancMbrObj
    this.ProdBranchMemObj.ProdHId = this.prodHId;
    this.http.post(this.ProdBranchUrl, this.ProdBranchMemObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdBranchMbr = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );

    //** General Data **//
    this.refProductDetailObj = new RefProductDetailObj
    this.refProductDetailObj.ProdHId = this.prodHId;
    this.refProductDetailObj.RefProdCompntGrpCode = 'GEN';
    this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.GenData = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );

    //** Product Component **//
          //** Scheme Component **//
    this.refProductDetailObj = new RefProductDetailObj
    this.refProductDetailObj.ProdHId = this.prodHId;
    this.refProductDetailObj.RefProdCompntGrpCode = 'SCHM';
    this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdCompSchm = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );
          //** Score Component **//
    this.refProductDetailObj = new RefProductDetailObj
    this.refProductDetailObj.ProdHId = this.prodHId;
    this.refProductDetailObj.RefProdCompntGrpCode = 'SCORE';
    this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdCompScore = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );
          //** Rule Component **//
    this.refProductDetailObj = new RefProductDetailObj
    this.refProductDetailObj.ProdHId = this.prodHId;
    this.refProductDetailObj.RefProdCompntGrpCode = 'RULE';
    this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdCompRule = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );
          //** Other Component **//
    this.refProductDetailObj = new RefProductDetailObj
    this.refProductDetailObj.ProdHId = this.prodHId;
    this.refProductDetailObj.RefProdCompntGrpCode = 'OTHR';
    this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdCompOther = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );

  }

}
