import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { Dummy1Component } from "./dummy1/dummy1.component";
import { TestNewRoutingModule } from "./testNew-routing.module";
import { ShowErrorsComponent } from "./show-errors.component";
import { Dummy2Component } from './dummy2/dummy2.component';
import { Dummy3Component } from './dummy3/dummy3.component';

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
        ShowErrorsComponent,
        Dummy2Component,
        Dummy3Component
    ],

})
export class TestNewModule { }