import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { WizardComponent } from 'angular-archwizard';
import { ListRefProductOfferingDetailObj } from 'app/shared/model/ListRefProductOfferingDetailObj.Model'
import { RefProductOfferingDetailObj } from 'app/shared/model/RefProductOfferingDetailObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  providers: [NGXToastrService]
})
export class ProductComponentComponent implements OnInit {

  @Input() objInput: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private wizard: WizardComponent,
    private route: ActivatedRoute,
  ) { 
    this.route.queryParams.subscribe(params => {
      this.source = params["source"];
    });
  }

  UrlBackEnd;
  prodOfferingHId: any;
  listProductComponentObj;
  source:string = "";

  ngOnInit() {
    this.prodOfferingHId = this.objInput["param"];
  }
  
  SaveForm(event) {
    this.UrlBackEnd = URLConstant.AddOrEditProdOfferingDetail;
    this.generateSaveObj(event);
    this.http.post(this.UrlBackEnd, this.listProductComponentObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.BackToPaging();
      }
    );
  }

  NextDetail(event) {
    this.UrlBackEnd = URLConstant.AddOrEditProdOfferingDetail;
    this.generateSaveObj(event);
    this.http.post(this.UrlBackEnd, this.listProductComponentObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.wizard.goToNextStep();
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

  Cancel()
  {
    this.BackToPaging();
  }

  BackToPaging()
  {
    if(this.source == "return")
    {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PROD_OFFERING_RTN_PAGING],{ });
    }
    else
    {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PROD_OFFERING_PAGING],{ });
    }
  }

 }
