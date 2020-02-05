import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { Dummy1Component } from "./dummy1/dummy1.component";
import { TestNewRoutingModule } from "./testNew-routing.module";
import { ShowErrorsComponent } from "./show-errors.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
        NgbModule,
        TestNewRoutingModule
    ],
    declarations: [
        Dummy1Component,
        ShowErrorsComponent
    ],

})
export class TestNewModule { }