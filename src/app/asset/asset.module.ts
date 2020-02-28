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
import { AssetCategoryPagingComponent } from './asset-configuration/asset-category-paging/asset-category-paging.component';
import { AssetCategoryInformationComponent } from './asset-configuration/asset-category-information/asset-category-information.component';
import { ShowErrorsComponent } from "app/test-new/show-errors.component";
import { RouterModule } from "@angular/router";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
 
 
 
 

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
    UcviewgenericModule
 

   
  ],
  declarations: [
    
    AssetConfigurationPagingComponent,
    AssetCategoryPagingComponent,
    AssetCategoryInformationComponent,
   ShowErrorsComponent
  ]
})
export class AssetModule { }