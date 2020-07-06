import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { TestRoutingModule } from "./test-routing.module";
import { Template1Component } from './template/template1/template1.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        NgbModule,
        TestRoutingModule,
    ],
    declarations: [
        Template1Component
    ],

})
export class TestModule { }