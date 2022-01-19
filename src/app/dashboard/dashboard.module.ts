import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "app/dashboard/dashboard-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "app/shared/directives/match-height.directive";

import { Dashboard2Component } from "app/dashboard/dashboard2/dashboard2.component";
import { DashBoardComponent } from 'app/dashboard/dash-board/dash-board.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { SharedModule } from 'app/shared/shared.module';
import { DashEmptyComponent } from './dash-empty/dash-empty.component';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
        MatchHeightModule,
        SharingComponentModule,
        SharedModule,
        AdInsSharedModule
    ],
    exports: [],
    declarations: [
        Dashboard2Component,
        DashBoardComponent,
        DashEmptyComponent
    ],
    providers: [],
})
export class DashboardModule { }
