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
import { RefProductBrancMbrObj } from "../../../shared/model/RefProductBrancMbrObj.Model";
import { ProdHVersionObj } from "../../../shared/model/ProdHVersionObj.Model";



@Component({
  selector: "app-product-ho-view",
  templateUrl: "./product-ho-view.component.html",
  providers: [DecimalPipe, NGXToastrService]
})
export class ProductHOViewComponent implements OnInit {

  @Input() inputProdHId;

  prodHId: any;
  viewProdMainInfoObj: any;
  ProdBranchMemObj: any;
  ProdVersionObj: any;
  ProdBranchUrl: any;
  ProdVerUrl: any;
  ProdDUrl: any;
  refProductDetailObj: any;
  GenData: any;
  ProdComp: any;
  ProdCompSchm: any;
  ProdCompScore: any;
  ProdCompRule: any;
  ProdCompOther: any;
  ProdBranchMbr: any;
  ProdVersion: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    this.ProdDUrl = AdInsConstant.GetProductDetailComponentInfo;
    this.ProdBranchUrl = AdInsConstant.GetListProdBranchOfficeMbrByProdHId;
    this.ProdVerUrl = AdInsConstant.GetListProdHVersionByProdHId;

    this.route.queryParams.subscribe(params => {
      if (params["prodHId"] != null) {
        this.prodHId = params["prodHId"];
      }
    });
  }

  ngOnInit() {
    if(this.prodHId == undefined){
      this.prodHId = this.inputProdHId;
    }
    
    //** Main Information **//
    this.viewProdMainInfoObj = "./assets/ucviewgeneric/viewProductMainInformation.json";
    
    //** Product Version **//
    this.ProdVersionObj = new ProdHVersionObj
    this.ProdVersionObj.ProdHId = this.prodHId;
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

//     //** Office Member **//
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

    //** Product Component **//
    this.refProductDetailObj = new RefProductDetailObj
    this.refProductDetailObj.ProdHId = this.prodHId;
    this.refProductDetailObj.GroupCodes = ['GEN', 'SCHM','SCORE', 'RULE','OTHR'];
    this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdComp = response['ReturnObject'];

        this.GenData = this.ProdComp.filter(
          comp => comp.RefProdCompntGrpCode === 'GEN');
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
