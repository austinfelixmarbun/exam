import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssetRoutingModule } from "app/test/test-paging-v3/asset/asset-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AssetConfigurationAddEditComponent } from "./asset-configuration/asset-configuration-add-edit/asset-configuration-add-edit.component";
import { AssetConfigurationPagingComponent } from "./asset-configuration/asset-configuration-paging/asset-configuration-paging.component";
import { AssetRoutingComponent } from "./asset-routing.module";

@NgModule({
  imports: [
    AssetRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    NgbModule
  ],
  declarations: [
    AssetConfigurationAddEditComponent,
    AssetConfigurationPagingComponent
  ]
})
export class AssetModule { }