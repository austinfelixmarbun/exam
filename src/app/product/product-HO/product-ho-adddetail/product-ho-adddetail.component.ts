import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { RefProductHOObj } from 'app/shared/model/RefProductHOObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-ho-adddetail',
  templateUrl: './product-ho-adddetail.component.html',
  styleUrls: ['./product-ho-adddetail.component.scss'],
  providers: [NGXToastrService]
})
export class ProductHoAdddetailComponent implements OnInit {

  param: any;
  mode: string = "add";
  key: any;
  criteria: CriteriaObj[] = [];

  RefProductHOForm=this.fb.group({
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
      console.log("Params: ");
      console.log(params);
      this.param = params["ProdHId"];
      console.log(this.param);
      this.key = params["key"];
    })
  }

  ResultResponse: any;
  ProdHOBj: any;
  UrlBackEnd: any;
  inputLookupObj: any;
  ngOnInit() {
    this.inputLookupObj=new InputLookupObj();
    this.inputLookupObj.urlJson="./assets/lookup/lookupProduct.json";
    this.inputLookupObj.urlEnviPaging = environment.foundationUrl;
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupObj.pagingJson = "./assets/form-setting/zipcodePaging.json";
    this.inputLookupObj.genericJson ="./assets/form-setting/zipcodeGeneric.json" ;
  }

  


}
