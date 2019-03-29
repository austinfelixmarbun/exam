import { NgModule } from '@angular/core';
import { ProspectComponent} from 'app/prospect/prospect.component';
import { ProspectRoutingModule } from 'app/prospect/prospect-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharingModule } from 'app/shared/sharing.module';


@NgModule({
    imports: [
        ProspectRoutingModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharingModule,
        CommonModule
    ],
    declarations: [
        ProspectComponent
    ]
})
export class ProspectModule { }
