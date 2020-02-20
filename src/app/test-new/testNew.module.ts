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
import { UcAddressGroupComponent } from './uc-address-group/uc-address-group.component';
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcLookupGroupComponent } from './uc-lookup-group/uc-lookup-group.component';
import { UcpagingModule } from "@adins/ucpaging";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
        NgbModule,
        TestNewRoutingModule,
        UclookupgenericModule,
        UcpagingModule
    ],
    declarations: [
        Dummy1Component,
        ShowErrorsComponent,
        Dummy2Component,
        Dummy3Component,
        UcAddressGroupComponent,
        UcLookupGroupComponent
    ],

})
export class TestNewModule { }