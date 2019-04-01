import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from "app/pages/full-pages/full-pages-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GalleryPageComponent } from "app/pages/full-pages/gallery/gallery-page.component";
import { InvoicePageComponent } from "app/pages/full-pages/invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component";
import { HorizontalTimelineComponent } from 'app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component';
import { VerticalTimelinePageComponent } from "app/pages/full-pages/timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "app/pages/full-pages/user-profile/user-profile-page.component";
import { FaqComponent } from 'app/pages/full-pages/faq/faq.component';
import { KnowledgeBaseComponent } from 'app/pages/full-pages/knowledge-base/knowledge-base.component';
import { SearchComponent } from 'app/pages/full-pages/search/search.component';


@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule,
    ],
    declarations: [       
        GalleryPageComponent,
        InvoicePageComponent,       
        HorizontalTimelinePageComponent,
        HorizontalTimelineComponent,
        VerticalTimelinePageComponent,
        UserProfilePageComponent,
        SearchComponent,
        FaqComponent,
        KnowledgeBaseComponent
    ]
})
export class FullPagesModule { }
