import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ProdOfferingObj } from 'app/shared/model/ProdOfferingObj.Mode';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcLookupObj }

@Component({
  selector: 'app-prod-offering-add',
  templateUrl: './prod-offering-add.component.html',
  styleUrls: ['./prod-offering-add.component.scss'],
  providers: [NGXToastrService]
})
export class ProdOfferingAddComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private fb:FormBuilder, private toastr: NGXToastrService) { 
    this.route.queryParams.subscribe(params => {
      this.param = params["ProdOfferingId"];
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

   ProdOfferingForm = this.fb.group({
    ProdName: [''],
    ProdOfferingCode: [''],
    ProdOfferingName: [''],
    ProdOfferingDescr: [''],
    StartDt: [''],
    EndDt: []
  });

  ngOnInit() {
    var refMasterObj = {
      RefMasterTypeCode:"ID_TYPE",
      RowVersion:""
    }

    if (this.mode == "edit") {
      var prodOfferingObj = new ProdOfferingObj();
      prodOfferingObj.ProdOfferingId = this.param;
      this.http.post(AdInsConstant.GetProductOfferingMainInfo, prodOfferingObj).subscribe(
        (response) => {
          this.resultData=response;
          console.log("response: ");
          console.log(response);
          // this.result.RefCurrId=this.resultData.RefCurrId;
          this.ProdOfferingForm.patchValue({
            ProdName : this.resultData.ProdName,
            ProdOfferingCode : this.resultData.ProdOfferingCode,
            ProdOfferingName : this.resultData.ProdOfferingName,
            ProdOfferingDescr : this.resultData.ProdOfferingDescr,
            StartDt : this.resultData.StartDt,
            EndDt : this.resultData.EndDt
          })
        },
        (error) => {
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
      this.prodOfferingObj.ProdOfferingId = this.resultData.ProdOfferingId;
      this.prodOfferingObj.ProdOfferingId = this.param;
      this.prodOfferingObj.RowVersion = this.resultData.RowVersion;
      this.http.post(AdInsConstant.EditProdOffering, this.prodOfferingObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/product/prod-offering/prod-offering-paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.prodOfferingObj.ProdOfferingId = this.ProdOfferingId;
      this.prodOfferingObj.RowVersion = "";
      this.http.post(AdInsConstant.AddProdOffering, this.prodOfferingObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/product/prod-offering/prod-offering-paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
