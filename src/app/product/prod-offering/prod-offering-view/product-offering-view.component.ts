import { environment } from "environments/environment";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { DecimalPipe } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefProductOfferingBrancMbrObj } from "../../../shared/model/RefProductOfferingBranchMbrObj.Model";
import { ProdOfferingHVersionObj } from "../../../shared/model/ProdOfferingHVersionObj.Model";
import { RefProductOfferingDetailObj } from "../../../shared/model/RefProductOfferingDetailObj.Model";
import { ProdOfferingCodeVersion } from "../../../shared/model/ProdOfferingCodeVersion.Model";
import { saveAs } from 'file-saver';


@Component({
  selector: "app-product-offering-view",
  templateUrl: "./product-offering-view.component.html",
  providers: [DecimalPipe, NGXToastrService]
})
export class ProductOfferingViewComponent implements OnInit {
  @Input() inputProdOfferingHId;

  prodOfferingHId: any;
  prodOfferingCode: any;
  prodOfferingVersion: any;
  viewProdOfferMainInfoObj: any;
  ProdOfferingBranchMemObj: any;
  ProdOfferingVersionObj: any;
  GetProdOfferByVerCode: any;
  ProdOfferingBranchUrl: any;
  ProdOfferingVerUrl: any;
  ProdOfferingDUrl: any;
  ProdOfferingCodeVerUrl: any
  refProductDetailObj: any;
  GenData: any;
  ProdComp: any;
  ProdCompSchm: any;
  ProdCompScore: any;
  ProdCompRule: any;
  ProdCompOther: any;
  ProdOfferingBranchMbr: any;
  ProdOfferingVersion: any;
  ProdOfferingCodeVersion: any;

  DlRuleObj = {
    CompntValue: "",
  };
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    this.ProdOfferingDUrl = AdInsConstant.GetListProdOfferingDByProdOfferingHIdAndProdCompntGrpCode;
    this.ProdOfferingBranchUrl = AdInsConstant.GetListProdOfferingBranchOfficeMbrByProdHId;
    this.ProdOfferingVerUrl = AdInsConstant.GetListProdOfferingHVersionByProdOfferingHId;
    this.ProdOfferingCodeVerUrl = AdInsConstant.GetProdOfferingHByCodeAndVerion;

    this.route.queryParams.subscribe(params => {
      if (params["prodOfferingHId"] != 0) {
        this.prodOfferingHId = params["prodOfferingHId"];
      }
      else {
        if (params["prodOfferingCode"] != "") {
          this.prodOfferingCode = params["prodOfferingCode"];
        }
        if (params["prodOfferingVersion"] != "") {
          this.prodOfferingVersion = params["prodOfferingVersion"];
        }
        this.prodOfferingHId = params["prodOfferingHId"];
      }
    });
  }

  async LoadMainInfo() {
    this.GetProdOfferByVerCode = new ProdOfferingCodeVersion;
    this.GetProdOfferByVerCode.ProdOfferingCode = this.prodOfferingCode;
    this.GetProdOfferByVerCode.ProdOfferingVersion = this.prodOfferingVersion;
    await this.http.post(this.ProdOfferingCodeVerUrl, this.GetProdOfferByVerCode).toPromise().then(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdOfferingCodeVersion = response;
        this.prodOfferingHId = this.ProdOfferingCodeVersion.ProdOfferingHId
      },
      error => {
        console.log(error);
      }
    );
  }


  async ngOnInit(): Promise<void> {
    if (this.prodOfferingHId == undefined) {
      this.prodOfferingHId = this.inputProdOfferingHId;
    }
    //** Main Information **//
    this.viewProdOfferMainInfoObj = "./assets/ucviewgeneric/viewProductOfferingMainInformation.json";

    if (this.prodOfferingHId == 0) {
      await this.LoadMainInfo();
    }

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
    this.refProductDetailObj.RefProdCompntGrpCode = ['GEN', 'SCHM', 'SCORE', 'RULE', 'OTHR'];
    this.http.post(this.ProdOfferingDUrl, this.refProductDetailObj).subscribe(
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
  DownloadRule(CompntValue, CompntValueDesc) {
    this.DlRuleObj.CompntValue = CompntValue;
    this.http.post(AdInsConstant.DownloadProductRule, this.DlRuleObj, { responseType: 'blob' }).subscribe(
      response => {
        saveAs(response, CompntValueDesc + '.xlsx');
      },
      error => {
        console.log(error);
      }
    );
  }

}
