import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AssetPagingComponent } from "./asset-paging/asset-paging.component";
import { AssetRoutingModule } from "./asset-routing.module";
import { AssetDetailComponent } from './asset-detail/asset-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        NgbModule,
        AssetRoutingModule
    ],
    declarations: [
        AssetPagingComponent,
        AssetDetailComponent
    ],

})
export class AssetModule { }