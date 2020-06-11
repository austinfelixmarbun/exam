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
import { getComponent } from "@angular/core/src/linker/component_factory_resolver";
import { saveAs } from 'file-saver';



@Component({
  selector: "app-product-ho-view",
  templateUrl: "./product-ho-view.component.html",
  providers: [DecimalPipe, NGXToastrService]
})
export class ProductHOViewComponent implements OnInit {

  @Input() inputProdHId;

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
  ProdComp: any;

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

  DlRuleObj = {
    CompntValue: "",
  };
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
        this.ProdBranchMbr = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );

    //** General Data **//
    this.refProductDetailObj = new RefProductDetailObj
    this.refProductDetailObj.ProdHId = this.prodHId;
    this.refProductDetailObj.GroupCodes = ['GEN', 'SCHM', 'SCORE', 'RULE', 'OTHR'];
    this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
      response => {
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

    ////** Scheme Component **//
    //this.refProductDetailObj = new RefProductDetailObj
    //this.refProductDetailObj.ProdHId = this.prodHId;
    //this.refProductDetailObj.GroupCodes = ['SCHM'];
    //this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
    //  response => {
    //    this.ProdCompSchm = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);
    ////** Score Component **//
    //this.refProductDetailObj = new RefProductDetailObj
    //this.refProductDetailObj.ProdHId = this.prodHId;
    //this.refProductDetailObj.GroupCodes = ['SCORE'];
    //this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
    //  response => {
    //    this.ProdCompScore = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);
    //      //** Rule Component **//
    //this.refProductDetailObj = new RefProductDetailObj
    //this.refProductDetailObj.ProdHId = this.prodHId;
    //this.refProductDetailObj.GroupCodes = ['RULE'];
    //this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
    //  response => {
    //    this.ProdCompRule = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);
    
    //      //** Other Component **//
    //this.refProductDetailObj = new RefProductDetailObj
    //this.refProductDetailObj.ProdHId = this.prodHId;
    //this.refProductDetailObj.GroupCodes = ['OTHR'];
    //this.http.post(this.ProdDUrl, this.refProductDetailObj).subscribe(
    //  response => {
    //    this.ProdCompOther = response['ReturnObject'];
    //  },
    //  error => {
    //    console.log(error);
    //  }
    //);

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
