import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { RefProductHOObj } from 'app/shared/model/RefProductHOObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product-ho-add',
  templateUrl: './product-ho-add.component.html',
  providers: [NGXToastrService]
})
export class ProductHOAddComponent implements OnInit {

  param: any;
  mode: string = "add";
  key: any;
  criteria: CriteriaObj[] = [];

  RefProductHOForm = this.fb.group({
    ProdCode: ['', Validators.required],
    ProdName: ['',Validators.required],
    ProdDescr: ['',Validators.required],
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
    if (this.mode == "edit") {
      this.RefProductHOForm.controls.ProdCode.disable();
      this.ProdHOBj = new RefProductHOObj();
      this.ProdHOBj.ProdHId = this.param;
      this.UrlBackEnd = AdInsConstant.GetProductMainInfo;
      this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
        (response) => {
          console.log(response);
          this.ResultResponse = response;
          this.RefProductHOForm.patchValue({
            ProdCode: this.ResultResponse.ProdCode,
            ProdName: this.ResultResponse.ProdName,
            ProdDescr: this.ResultResponse.ProdDescr,
            StartDt: formatDate(this.ResultResponse.StartDt, 'yyyy-MM-dd', 'en-US'),
            EndDt: formatDate(this.ResultResponse.EndDt, 'yyyy-MM-dd', 'en-US')
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  SaveMode;
  ClickSave(ev) {
    this.SaveMode = ev;
  }

  ProdHOBj: any;
  UrlBackEnd: any;

  ValidateDate() {
    var context = JSON.parse(localStorage.getItem("UserAccess"));
    let businessDate = new Date(context["BusinessDt"]);
    let startDate = new Date(this.RefProductHOForm.get("StartDt").value);
    let endDate = new Date(this.RefProductHOForm.get("EndDt").value);



    if (startDate > endDate) {
      this.toastr.errorMessage("Start Date Must be Less than End Date");
      return false;
    }

    if (endDate <= businessDate) {
      this.toastr.errorMessage("End Date Must be Greater than Business Date");
      return false;
    }
    return true;
  }

  SaveForm() {
    if (this.SaveMode == "save") {
      this.ProdHOBj = new RefProductHOObj();
      this.ProdHOBj = this.RefProductHOForm.value;

      if (this.mode == "edit") {
        if (this.ValidateDate()) {
          this.UrlBackEnd = AdInsConstant.EditProduct;
          this.ProdHOBj.ProdId = this.ResultResponse.ProdId;
          this.ProdHOBj.ProdCode = this.ResultResponse.ProdCode;
          this.ProdHOBj.RowVersion = this.ResultResponse.RowVersion;
          this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
            (response) => {
              this.toastr.successMessage(response["message"]);
              this.router.navigate(["/product/HOpaging"]);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } else {
        if (this.ValidateDate()) {
          this.UrlBackEnd = AdInsConstant.AddProduct;
          this.ProdHOBj.RowVersion = "";
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
    } else { //next
      console.log("next mode");
      this.ProdHOBj = new RefProductHOObj();
      this.ProdHOBj = this.RefProductHOForm.value;
      console.log("Add Detail Next! " + this.ProdHOBj);
      if (this.mode == "edit") {
        if (this.ValidateDate()) {
          this.UrlBackEnd = AdInsConstant.EditProduct;
          this.ProdHOBj.ProdId = this.ResultResponse.ProdId;
          this.ProdHOBj.ProdCode = this.ResultResponse.ProdCode;
          this.ProdHOBj.RowVersion = this.ResultResponse.RowVersion;
          this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
            (response) => {
              this.toastr.successMessage(response["message"]);
              this.router.navigate(["/Product/HOadddetail"], { queryParams: { "ProdHId": this.ResultResponse.ProdHId, "ProdId" : this.ResultResponse.ProdId, "mode": this.mode } });
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } else {
        if (this.ValidateDate()) {
          this.UrlBackEnd = AdInsConstant.AddProduct;
          this.ProdHOBj.RowVersion = "";
          this.http.post(this.UrlBackEnd, this.ProdHOBj).subscribe(
            (response) => {
              var TempResp = response;
              this.toastr.successMessage(response["message"]);
              this.router.navigate(["/Product/HOadddetail"], { queryParams: { "ProdHId": TempResp["DraftProdHId"],"ProdId" : TempResp["ProdId"], "mode": this.mode } });
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    }
  }

  AddDetail() {
  }
}
