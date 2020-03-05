import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { RefProductHOObj } from 'app/shared/model/RefProductHOObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product-ho-add',
  templateUrl: './product-ho-add.component.html',
  styleUrls: ['./product-ho-add.component.scss'],
  providers: [NGXToastrService]
})
export class ProductHOAddComponent implements OnInit {

  param: any;
  mode: string = "ADD";
  key: any;
  criteria: CriteriaObj[] = [];

  RefProductHOForm=this.fb.group({
    ProdCode: [''],
    ProdName: [''],
    ProdDescr: [''],
    StartDt: [''],
    EndDt: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: NGXToastrService
  ) { 
    this.route.queryParams.subscribe(params => {
      this.param = params["ProdHId"];
      this.mode = params["mode"];
      this.key = params["key"];
      if (this.mode == "edit") {
        var tempCrit = new CriteriaObj();
        tempCrit.propName = this.key;
        tempCrit.restriction = "Eq";
        tempCrit.value = this.param;
        this.criteria.push(tempCrit);
      }
    })
  }

  
  ResultResponse: any;
  ngOnInit() {
    if(this.mode=="edit"){
      this.RefProductHOForm.controls.ProdCode.disable();
      this.ProdHOBj=new RefProductHOObj();
      this.ProdHOBj.ProdHId=this.param;
      this.UrlBackEnd=AdInsConstant.GetProductMainInfo;
      this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
        (response) => {
          console.log(response);
          this.ResultResponse=response;
          this.RefProductHOForm.patchValue({
            ProdCode: this.ResultResponse.ProdCode,
            ProdName: this.ResultResponse.ProdName,
            ProdDescr: this.ResultResponse.ProdDescr,
            StartDt: formatDate(this.ResultResponse.StartDt,'yyyy-MM-dd', 'en-US'),
            EndDt: formatDate(this.ResultResponse.EndDt,'yyyy-MM-dd', 'en-US')
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ProdHOBj: any;
  UrlBackEnd: any;
  SaveForm(){
    this.ProdHOBj=new RefProductHOObj();
    this.ProdHOBj=this.RefProductHOForm.value;
    console.log("Submited " + this.ProdHOBj);
    if(this.mode=="edit"){
      this.UrlBackEnd = AdInsConstant.EditProduct;
      this.ProdHOBj.ProdId=this.param;
      this.ProdHOBj.ProdCode=this.ResultResponse.ProdCode;
      this.ProdHOBj.RowVersion=this.ResultResponse.RowVersion;
      this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/product/HOpaging"]);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    }else{
      this.UrlBackEnd = AdInsConstant.AddProduct;
      this.ProdHOBj.RowVersion="";
      this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/product/HOpaging"]);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  AddDetail(){
    this.ProdHOBj=new RefProductHOObj();
    this.ProdHOBj=this.RefProductHOForm.value;
    console.log("Add Detail Next! " + this.ProdHOBj);
    if(this.mode=="edit"){
      this.UrlBackEnd = AdInsConstant.EditProduct;
      this.ProdHOBj.ProdId=this.param;
      this.ProdHOBj.ProdCode=this.ResultResponse.ProdCode;
      this.ProdHOBj.RowVersion=this.ResultResponse.RowVersion;
      this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Product/HOadddetail"], { queryParams: { "ProdHId": this.ResultResponse.ProdHId } });
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    }else{
      this.UrlBackEnd = AdInsConstant.AddProduct;
      this.ProdHOBj.RowVersion="";
      this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
        (response) => {
          var TempResp=response;
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Product/HOadddetail"], { queryParams: { "ProdHId": TempResp["DraftProdHId"] } });
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
