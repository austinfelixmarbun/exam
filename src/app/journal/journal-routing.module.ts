import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PathConstant } from "app/shared/PathConstant";
import { JournalMediaDetailComponent } from "./journal-media/journal-media-detail/journal-media-detail.component";
import { JournalMediaPagingComponent } from "./journal-media/journal-media-paging/journal-media-paging.component";
const routes: Routes = [
    { path: PathConstant.JOURNAL_MEDIA_PAGING, component: JournalMediaPagingComponent },
    { path: PathConstant.JOURNAL_MEDIA_DETAIL, component: JournalMediaDetailComponent },
    // { path: PathConstant.JOURNAL_MEDIA_HEADER_FACT, component: JournalHeaderFactComponent },
    // { path: PathConstant.JOURNAL_MEDIA_GROUP, component: JournalGroupComponent },
    // { path: PathConstant.JOURNAL_MEDIA_GROUP_FACT, component: JournalGroupFactComponent },
    // { path: PathConstant.JOURNAL_MEDIA_GROUP_ITEM_VALUE, component: JournalItemValueComponent },
    // { path: PathConstant.FAILED_JOURNAL_RESULT_LIST_PAGING, component: FailedJournalResultListPagingComponent },
    // { path: PathConstant.JOURNAL_RESULT, component: JournalResultComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JournalRoutingModule { }
