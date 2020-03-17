import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { TestProviderRoutingModule } from "./testProvider-routing.module";
import { TestProviderComponent } from "./test-provider.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        NgbModule,
        TestProviderRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        TestProviderComponent
    ],

})
export class TestProviderModule { }