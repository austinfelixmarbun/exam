import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefProductDetailObj } from 'app/shared/model/RefProductDetailObj.Model';
import { WizardComponent } from 'angular-archwizard';
import { ListRefProductOfferingDetailObj } from 'app/shared/model/ListRefProductOfferingDetailObj.Model'
import { ListRefProductDetailObj } from 'app/shared/model/ListRefProductDetailObj.Model';
import { RefProdOfferingDetailObj } from 'app/shared/model/RefProdOfferingDetailObj.Model';
import { RefProductOfferingDetailObj } from 'app/shared/model/RefProductOfferingDetailObj.Model';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss'],
  providers: [NGXToastrService]
})
export class ProductComponentComponent implements OnInit {

  @Input() objInput: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: NGXToastrService,
    private wizard: WizardComponent
  ) { }

  UrlBackEnd;
  prodOfferingHId: any;
  listProductComponentObj;


  ngOnInit() {
    this.prodOfferingHId = this.objInput["param"];
  }
  
  SaveForm(event) {
    this.UrlBackEnd = AdInsConstant.AddOrEditProdOfferingDetail;
    this.generateSaveObj(event);
    this.http.post(this.UrlBackEnd, this.listProductComponentObj).subscribe(
      (response) => {
        console.log(response);
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/Product/ProdOffering/paging"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  NextDetail(event) {
    this.UrlBackEnd = AdInsConstant.AddOrEditProdOfferingDetail;
    this.generateSaveObj(event);
    this.http.post(this.UrlBackEnd, this.listProductComponentObj).subscribe(
      (response) => {
        console.log(response);
        this.toastr.successMessage(response["message"]);
        this.wizard.goToNextStep();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generateSaveObj(event){
    this.listProductComponentObj = new ListRefProductOfferingDetailObj();
    this.listProductComponentObj.ProdOfferingDetails = new Array();
    this.listProductComponentObj.ProdOfferingHId = this.objInput["param"];
    for (var i = 0; i < event.length; i++) {
      var GeneralDataObj = new RefProductOfferingDetailObj();
      GeneralDataObj.ProdOfferingDId = event[i].ProdOfferingDId;
      GeneralDataObj.ProdOfferingHId = this.objInput["param"];
      GeneralDataObj.RefProdCompntCode = event[i].RefProdCompntCode;
      GeneralDataObj.RefProdCompntGrpCode = event[i].RefProdCompntGrpCode;
      if(event[i].IsProdOffering == true){
        GeneralDataObj.CompntValue = event[i].OfferingCompntValue;
        GeneralDataObj.CompntValueDesc = event[i].OfferingCompntValueDesc;
        GeneralDataObj.MrProdBehaviour = event[i].OfferingMrProdBehaviour;  
      }else{
        GeneralDataObj.CompntValue = event[i].HOCompntValue;
        GeneralDataObj.CompntValueDesc = event[i].HOCompntValueDesc;
        GeneralDataObj.MrProdBehaviour = event[i].HOMrProdBehaviour;
      }
      this.listProductComponentObj.ProdOfferingDetails.push(GeneralDataObj);
    }
  }

 }
