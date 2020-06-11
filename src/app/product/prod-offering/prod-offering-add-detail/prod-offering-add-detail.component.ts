import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ProdOfferingObj } from 'app/shared/model/ProdOfferingObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-prod-offering-add-detail',
  templateUrl: './prod-offering-add-detail.component.html',
  providers: [NGXToastrService]
})
export class ProdOfferingAddDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private fb:FormBuilder, private toastr: NGXToastrService) { 
    this.route.queryParams.subscribe(params => {
      // console.log("param: ");
      // console.log(params);
      
      this.objPassing["param"] = params["ProdOfferingHId"];
      this.objPassing["mode"] = params["mode"];
      this.objPassing["url"] = AdInsConstant.GetProdOfferingDetailInfo;
      this.key = params["key"];
    })
  }

  param: string;
  key: any;
  prodOfferingObj : ProdOfferingObj;
  resultData : any;
  ProdOfferingHId: any;

  isGeneralData: boolean = true;
  isProdCompnt: boolean = false;
  isOfficeMbr: boolean = false;

  objPassing: any = {};

  ProdOfferingForm = this.fb.group({
    ProdName: [''],
    ProdOfferingCode: [''],
    ProdOfferingName: [''],
    ProdOfferingDescr: [''],
    StartDt: [''],
    EndDt: [''],
    ProdOfferingStat: ['']
  });

  ngOnInit() {
    var prodOfferingObj = new ProdOfferingObj();
    prodOfferingObj.ProdOfferingHId = this.objPassing.param;
    this.http.post(AdInsConstant.GetProductOfferingMainInfo, prodOfferingObj).subscribe(
      (response) => {
        this.resultData=response;
        console.log("response: ");
        console.log(response);
        this.ProdOfferingForm.patchValue({
          ProdOfferingCode : this.resultData.ProdOfferingCode,
          ProdOfferingName : this.resultData.ProdOfferingName,
          ProdOfferingDescr : this.resultData.ProdOfferingDescr,
          StartDt : formatDate(this.resultData.StartDt,'yyyy-MM-dd', 'en-US'),
          EndDt: formatDate(this.resultData.EndDt,'yyyy-MM-dd', 'en-US'),
          ProdOfferingStat : this.resultData.ProdOfferingStat
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  EnterTab(type){
    if(type == "general"){
      this.isGeneralData = true;
      this.isProdCompnt = false;
      this.isOfficeMbr = false;
    }

    if(type == "prodCompnt"){
      this.isGeneralData = false;
      this.isProdCompnt = true;
      this.isOfficeMbr = false;
    }

    if(type == "officeMbr"){
      this.isGeneralData = false;
      this.isProdCompnt = false;
      this.isOfficeMbr = true;
    }
  }

}
