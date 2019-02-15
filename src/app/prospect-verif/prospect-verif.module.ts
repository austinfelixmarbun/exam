import { SharingModule } from 'app/shared/sharing.module';
import { NgModule } from '@angular/core';
import { ProspectVerifComponent} from './prospect-verif.component';
import { ProspectVerifRoutingModule } from './prospect-verif-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
      ProspectVerifRoutingModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SharingModule
    ],
    declarations: [
      ProspectVerifComponent
    ]
})
export class ProspectVerifModule { }
