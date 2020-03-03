import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AssetAccessoryObj } from 'app/shared/model/AssetAccesorryObj.Model';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-asset-document-information',
  templateUrl: './asset-document-information.component.html',
  styleUrls: ['./asset-document-information.component.scss']
})
export class AssetDocumentInformationComponent implements OnInit {
    AssetDocumentForm = this.fb.group({
    AssetDocumentName: [''],
    MainDoc: [false],
    ValueNeeded : [false],
    Pledge : [false],
    Borrow : [false],
    MandatoryNew : [false],
    MandatoryUsed : [false],
    ActiveStatus : [false],
  
 });

  
 
  pageType: any;
  AssetTypeId: any; 
  AssetDocListId: any;
  apiUrl: any;
  settingUrl: string = environment.FoundationR3Url;
  urlEnviPaging: string = environment.foundationUrl;
  result:any;
  acObj : AssetAccessoryObj;
  getUrl: any;
  addUrl: any;
  editUrl: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 

    this.addUrl = environment.FoundationR3Url+ AdInsConstant.AddNewAssetAccesory;
    this.editUrl = environment.FoundationR3Url+AdInsConstant.EditAssetAccessory;
    // this.getUrl = environment.localHostUrl + AdInsConstant.get
  //    this.route.queryParams.subscribe(params => {

    
  //     if (params["AssetTypeId"] != null) {
  //       this.AssetTypeId = params["AssetTypeId"];
  //     } 
  //       if (params["mode"] != null) {
  //         this.pageType = params["mode"];
  //       }

  //       if (params["AssetAccessoryId"] != null) {
  //         this.AssetAccessoryId = params["AssetAccessoryId"];
  //       }
  
    
     
  //  });
   
 
  }

  ngOnInit() {
  }

}
