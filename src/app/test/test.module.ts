import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharingModule } from "app/shared/sharing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { TestRoutingModule } from "./test-routing.module";
import { DummyComponent } from "./dummy/dummy.component";
import { DummyAddComponent } from "./dummy/dummy-add/dummy-add.component";
import { Dummy2Component } from "./dummy2/dummy2.component";
import { Dummy3Component } from "./dummy3/dummy3.component";
import { DummyPagingComponent } from "./dummy/dummy-paging/dummy-paging.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        NgbModule,
        SharingModule,
        TestRoutingModule
    ],
    declarations: [
        DummyComponent,
        DummyAddComponent,
        Dummy2Component,
        Dummy3Component,
        DummyPagingComponent
    ],

})
export class TestModule { }