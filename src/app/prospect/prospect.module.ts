import { NgModule } from '@angular/core';
import { ProspectComponent} from './prospect.component';
import { ProspectRoutingModule } from './prospect-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ProspectRoutingModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        ProspectComponent
    ]
})
export class ProspectModule { }
