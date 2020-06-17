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
  ProdCompGen: any;
  ProdCompNonGen: any;
  ProdOfferingBranchMbr: any;
  ProdOfferingVersion: any;
  ProdOfferingCodeVersion: any;
  mainInfoByHIdOnly: boolean = true;
  IsLoaded: boolean = false;

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
        this.mainInfoByHIdOnly = false;
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
    if (this.mainInfoByHIdOnly == true) {
      this.viewProdOfferMainInfoObj = "./assets/ucviewgeneric/viewProductOfferingMainInformation.json";
    }
    else {
      this.viewProdOfferMainInfoObj = "./assets/ucviewgeneric/viewProductOfferingMainInformationByCode.json";
    }


    if (this.prodOfferingHId == 0) {
      await this.LoadMainInfo();
    }

    //** Product Offering Version **//
    this.ProdOfferingVersionObj = new ProdOfferingHVersionObj;
    this.ProdOfferingVersionObj.ProdOfferingHId = this.prodOfferingHId;
    await this.http.post(this.ProdOfferingVerUrl, this.ProdOfferingVersionObj).toPromise().then(
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
    await this.http.post(this.ProdOfferingBranchUrl, this.ProdOfferingBranchMemObj).toPromise().then(
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
    this.refProductDetailObj.RefProdCompntGrpCode = ['GEN', 'SCHM', 'SCORE', 'RULE', 'OTHR','LOS'];
    await this.http.post(this.ProdOfferingDUrl, this.refProductDetailObj).toPromise().then(
      response => {
        console.log("Response: ");
        console.log(response);
        this.ProdComp = response['ReturnObject'].ProdOffComponents;
        console.log(this.ProdComp);
        this.GenData = this.ProdComp.filter(
          comp => comp.GroupCode == 'GEN');
        this.ProdCompGen = this.GenData[0];
        this.ProdCompNonGen = this.ProdComp.filter(
          comp => comp.GroupCode != 'GEN');
        console.log(this.ProdCompNonGen);
      },
      error => {
        console.log(error);
      }
    );
    this.IsLoaded = true;
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
