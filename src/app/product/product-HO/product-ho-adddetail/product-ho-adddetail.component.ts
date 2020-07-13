import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { RefProductHOObj } from 'app/shared/model/RefProductHOObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-product-ho-adddetail',
  templateUrl: './product-ho-adddetail.component.html',
  providers: [NGXToastrService]
})
export class ProductHoAdddetailComponent implements OnInit {

  param: any;
  mode: string = "add";
  key: any;
  criteria: CriteriaObj[] = [];
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  objPassing: any = {};

  RefProductHOForm = this.fb.group({
    ProdCode: [''],
    ProdName: [''],
    StatusCode: [''],
    ProdDescr: [''],
    StartDt: [''],
    EndDt: [''],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: NGXToastrService
  ) {
    this.route.queryParams.subscribe(params => {
      this.objPassing["ProdId"] = params["ProdId"];
      this.objPassing["param"] = params["ProdHId"];
      this.objPassing["mode"] = params["mode"];
      this.objPassing["url"] = URLConstant.GetProductDetailComponentInfo;
      this.source = params["source"];
      this.key = params["key"];
    })
  }

  source: string = "";
  ResultResponse: any;
  ProdHOBj: any;
  UrlBackEnd: any;
  type: string;

  ngOnInit() {
    //** Main Information **//
    if(this.source == "return")
    {
      this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewProductMainInformationReturn.json";
    }
    else{
      this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewProductMainInformation.json";
    }
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
    
    this.ProdHOBj=new RefProductHOObj();
    this.ProdHOBj.ProdHId = this.objPassing.param;
    this.UrlBackEnd = URLConstant.GetProductMainInfo;
    this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
      (response) => {
        this.ResultResponse = response;
        this.RefProductHOForm.patchValue({
          ProdCode: this.ResultResponse.ProdCode,
          ProdName: this.ResultResponse.ProdName,
          ProdDescr: this.ResultResponse.ProdDescr,
          StatusCode: this.ResultResponse.StatusCode,
          StartDt: formatDate(this.ResultResponse.StartDt, 'yyyy-MM-dd', 'en-US'),
          EndDt: formatDate(this.ResultResponse.EndDt, 'yyyy-MM-dd', 'en-US')
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  EnterTab(type) {
    this.type = type;
  }
}
