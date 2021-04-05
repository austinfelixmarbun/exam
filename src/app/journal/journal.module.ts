import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcaddtotempModule } from "@adins/ucaddtotemp";
import { UcdropdownlistModule } from "@adins/ucdropdownlist";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatRadioModule } from "@angular/material";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { SharingModule } from "app/shared/sharing.module";
import { JournalRoutingModule } from "./journal-routing.module";
import { JournalMediaPagingComponent } from './journal-media/journal-media-paging/journal-media-paging.component';
import { JournalMediaDetailComponent } from './journal-media/journal-media-detail/journal-media-detail.component';
import { JournalItemValueComponent } from './journal-media/journal-item-value/journal-item-value.component';
import { JournalHeaderFactComponent } from './journal-media/journal-header-fact/journal-header-fact.component';
import { JournalGroupFactComponent } from './journal-media/journal-group-fact/journal-group-fact.component';
import { JournalResultComponent } from './journal-result/journal-result.component';
import { FailedJournalListPagingComponent } from './failed-journal-list/failed-journal-list-paging/failed-journal-list-paging.component';

@NgModule({
    imports: [
        JournalRoutingModule,
        CommonModule,
        MatRadioModule,
        AdInsModule,
        UcSubsectionModule,
        SharingModule,
        UcaddtotempModule,
        UcdropdownlistModule
    ],
    exports: [],
    declarations: [
        
    JournalMediaPagingComponent,
        
    JournalMediaDetailComponent,
        
    JournalItemValueComponent,
        
    JournalHeaderFactComponent,
        
    JournalGroupFactComponent,
        
    JournalResultComponent,
        
    FailedJournalListPagingComponent],
    providers: [
        NGXToastrService,
    ]
})
export class JournalModule { }
