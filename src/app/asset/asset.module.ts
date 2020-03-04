import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssetRoutingModule } from "app/test/test-paging-v3/asset/asset-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AssetConfigurationPagingComponent } from "./asset-configuration/asset-configuration-paging/asset-configuration-paging.component";
import { AssetRoutingComponent } from "./asset-routing.module";
import { RouterModule } from "@angular/router";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { AssetCategoryPagingComponent } from "./asset-category/asset-category-paging/asset-category-paging.component";
import { AssetCategoryInformationComponent } from "./asset-category/asset-category-information/asset-category-information.component";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';

import { AssetAccessoryInformationComponent } from './asset-accessory/asset-accessory-information/asset-accessory-information.component';
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentInformationComponent } from './asset-document/asset-document-information/asset-document-information.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
import { AssetDocumentMasterPagingInformationComponent } from './asset-document-master/asset-document-master-paging-information/asset-document-master-paging-information.component';
import { NegativeAssetComponent } from './negative-asset/negative-asset.component';
import { NegativeAssetDetailComponent } from './negative-asset/negative-asset-detail/negative-asset-detail.component';
import { UclookupgenericModule } from "@adins/uclookupgeneric";
 
 
 
 

@NgModule({
  imports: [
    AssetRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    UcSubsectionModule,
    UcviewgenericModule,
    UclookupgenericModule,
    SharingComponentModule,

   
  ],
  declarations: [
    
    AssetConfigurationPagingComponent,
    AssetCategoryPagingComponent,
    AssetCategoryInformationComponent,  
   AssetAccessoryInformationComponent,
   AssetAccessoryPagingComponent,
   AssetDocumentPagingComponent,
   AssetDocumentInformationComponent,
   AssetDocumentMasterPagingComponent,
   AssetDocumentMasterPagingInformationComponent,
   NegativeAssetComponent,
   NegativeAssetDetailComponent,
       
  ]
})
export class AssetModule { }