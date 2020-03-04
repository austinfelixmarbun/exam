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
  styleUrls: ['./prod-offering-add-detail.component.scss'],
  providers: [NGXToastrService]
})
export class ProdOfferingAddDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private fb:FormBuilder, private toastr: NGXToastrService) { 
    this.route.queryParams.subscribe(params => {
      console.log("param: ");
      console.log(params);
      if (params["ProdOfferingHId"] != null) {
        this.param = params["ProdOfferingHId"];
      }
      console.log(this.param);

    })
  }

  param: string;
  key: any;
  prodOfferingObj : ProdOfferingObj;
  resultData : any;
  ProdOfferingHId: any;

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
    prodOfferingObj.ProdOfferingHId = this.param;
    this.http.post(AdInsConstant.GetProductOfferingMainInfo, prodOfferingObj).subscribe(
      (response) => {
        this.resultData=response;
        console.log("response: ");
        console.log(response);
        this.ProdOfferingForm.patchValue({
          ProdOfferingCode : this.resultData.ProdOfferingCode,
          ProdOfferingName : this.resultData.ProdOfferingName,
          ProdOfferingDescr : this.resultData.ProdOfferingDescr,
          StartDt : this.resultData.StartDt,
          EndDt : this.resultData.EndDt,
          ProdOfferingStat : this.resultData.ProdOfferingStat
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
