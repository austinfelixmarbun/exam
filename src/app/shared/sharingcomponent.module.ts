
import { NgModule } from '@angular/core';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { LookupzipcodeModule } from '@adins/lookupzipcode';
import { UcInfoComponent } from './UserControl/uc-info/uc-info.component';
import { SearchComponent } from './search/search.component';
import { UCGridFooterComponent } from './UserControl/ucgrid-footer/ucgrid-footer.component';
import { UcgridviewComponent } from './UserControl/ucgridview/ucgridview.component';
import { RouterModule } from '@angular/router';
import { SearchV2Component } from './search-v2/search-v2.component';
import { LookupgenericComponent } from './UserControl/lookupgeneric/lookupgeneric.component';
import { UcpagingComponent } from './UserControl/ucpaging/ucpaging.component';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { ViewgenericComponent } from './UserControl/viewgeneric/viewgeneric.component';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcpagingModule } from '@adins/ucpaging';
import { ShowErrorsComponent } from '../test-new/show-errors.component';
<<<<<<< HEAD

=======
>>>>>>> origin


@NgModule({
    exports: [
        UcAddressComponent,
        UcContactInfoComponent,
        SearchComponent,
        UCGridFooterComponent,
        SearchV2Component,
        UcgridviewComponent,
        UcInfoComponent,
        SearchV2Component,
        LookupgenericComponent,
        UcpagingComponent,
        ViewgenericComponent,
<<<<<<< HEAD
        LookupgenericComponent,
        ShowErrorsComponent
=======
    LookupgenericComponent,
    ShowErrorsComponent
>>>>>>> origin
    ],
    imports: [
        FormsModule,
        NgbModule,
        RouterModule,
        HttpModule,
        CommonModule,
        LookupzipcodeModule,
        UCSearchModule,
        UcgridfooterModule,
        UcSubsectionModule,
        UclookupgenericModule,
        UcpagingModule
    ],
    declarations: [
        UcAddressComponent,
        SearchV2Component,
        UcContactInfoComponent,
        SearchComponent,
        UCGridFooterComponent,
        UcgridviewComponent,
        UcInfoComponent,
        SearchV2Component,
        LookupgenericComponent,
        UcpagingComponent,
        ViewgenericComponent,
<<<<<<< HEAD
        LookupgenericComponent,
        ShowErrorsComponent
=======
      LookupgenericComponent,
      ShowErrorsComponent
>>>>>>> origin
    ]
})

export class SharingComponentModule { }
