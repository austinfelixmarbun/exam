import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ProdOfferingObj } from 'app/shared/model/ProdOfferingObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcLookupObj } from 'app/shared/model/UcLookupObj.Model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-prod-offering-add',
  templateUrl: './prod-offering-add.component.html',
  styleUrls: ['./prod-offering-add.component.scss'],
  providers: [NGXToastrService]
})
export class ProdOfferingAddComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private fb:FormBuilder, private toastr: NGXToastrService) { 
    this.route.queryParams.subscribe(params => {
      this.param = params["ProdOfferingHId"];
      console.log(params);
      this.mode = params["mode"];
      if (this.mode == "edit") {
        var tempCrit = new CriteriaObj();
        tempCrit.propName = this.key;
        tempCrit.restriction = "Eq";
        tempCrit.value = this.param;
        this.criteria.push(tempCrit);
      }
    })
   }

   param: string;
   mode: string = "add";
   key: any;
   criteria: CriteriaObj[] = [];
   prodOfferingObj : ProdOfferingObj;
   resultData : any;
   ProdOfferingId: any;
   inputLookupObj : any;
   ProdOfferingHId: any;

   ProdOfferingForm = this.fb.group({
    ProdName: [''],
    ProdOfferingCode: [''],
    ProdOfferingName: [''],
    ProdOfferingDescr: [''],
    StartDt: [''],
    EndDt: ['']
  });

  ngOnInit() {
    this.inputLookupObj = new UcLookupObj();
    this.inputLookupObj.urlJson = "./assets/uclookup/lookupProdOffering.json";
    this.inputLookupObj.urlEnviPaging = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupObj.deleteUrl = "/RefBank/DeleteRefBank";
    this.inputLookupObj.pagingJson = "./assets/uclookup/lookupProdOffering.json";
    this.inputLookupObj.genericJson = "./assets/uclookup/lookupProdOffering.json";

    var refMasterObj = {
      RefMasterTypeCode:"ID_TYPE",
      RowVersion:""
    }

    if (this.mode == "edit") {
      
      this.ProdOfferingForm.controls.ProdOfferingCode.disable();
      var prodOfferingObj = new ProdOfferingObj();
      prodOfferingObj.ProdOfferingHId = this.param;
      this.http.post(AdInsConstant.GetProductOfferingMainInfo, prodOfferingObj).subscribe(
        (response) => {
          console.log("response: ");
          console.log(response);
          this.resultData=response;
          this.inputLookupObj.nameSelect = this.resultData.ProdName;
          prodOfferingObj.ProdHId = this.resultData.ProdHId;
          this.ProdOfferingForm.patchValue({
            ProdOfferingCode : this.resultData.ProdOfferingCode,
            ProdOfferingName : this.resultData.ProdOfferingName,
            ProdOfferingDescr : this.resultData.ProdOfferingDescr,
            StartDt : formatDate(this.resultData['StartDt'],'yyyy-MM-dd','en-US'),
            EndDt : formatDate(this.resultData['EndDt'], 'yyyy-MM-dd', 'en-US')
          })
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  AddDetail(){
      this.prodOfferingObj = new ProdOfferingObj();
      this.prodOfferingObj = this.ProdOfferingForm.value;
      if(this.mode=="edit"){
        this.prodOfferingObj.ProdOfferingCode = this.resultData.ProdOfferingCode;
        this.prodOfferingObj.ProdHId = this.resultData.ProdHId;
        this.prodOfferingObj.ProdOfferingHId = this.resultData.ProdOfferingHId;
        this.prodOfferingObj.ProdOfferingId ="0";
        this.prodOfferingObj.RowVersion = "";
        this.http.post(AdInsConstant.AddProdOffering, this.prodOfferingObj).subscribe(
          response => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(["/product/prod-offering/add-detail"],{queryParams :{"ProdOfferingHId" : this.prodOfferingObj.ProdOfferingHId}});
          },
          error => {
            console.log(error);
          }
        );
      }else{
        this.prodOfferingObj.ProdHId = this.inputLookupObj.jsonSelect.ProdHId;
        this.prodOfferingObj.ProdOfferingId ="0";
        this.prodOfferingObj.RowVersion = "";
        this.http.post(AdInsConstant.AddProdOffering, this.prodOfferingObj).subscribe(
          response => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(["/product/prod-offering/add-detail"],{queryParams :{"ProdOfferingHId" : response["ProdOfferingHId"]}});
          },
          error => {
            console.log(error);
          }
        );
      }
  }


  SaveForm() {
    this.prodOfferingObj = new ProdOfferingObj();
    this.prodOfferingObj = this.ProdOfferingForm.value;
    console.log(this.prodOfferingObj);
    if (this.mode == "edit") {
      this.prodOfferingObj.ProdOfferingCode = this.resultData.ProdOfferingCode;
      this.prodOfferingObj.ProdOfferingId = this.resultData.ProdOfferingId;
      this.prodOfferingObj.ProdHId = this.resultData.ProdHId;
      this.prodOfferingObj.RowVersion = "";
      this.http.post(AdInsConstant.EditProdOffering, this.prodOfferingObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/product/prod-offering/paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.prodOfferingObj.ProdOfferingId ="0";
      this.prodOfferingObj.ProdHId = this.inputLookupObj.jsonSelect.ProdHId;
      this.prodOfferingObj.RowVersion = "";
      this.http.post(AdInsConstant.AddProdOffering, this.prodOfferingObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/product/prod-offering/paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ProdName="";
  handleOutput(event){
    console.log(event);
    this.ProdOfferingForm.patchValue(
      {
        ProdName: event.ProdName
      }
    );
    console.log(this.ProdOfferingForm);
    this.inputLookupObj.nameSelect = event.ProdName;
    this.inputLookupObj.idSelect = event.ProdName;
  }
}
