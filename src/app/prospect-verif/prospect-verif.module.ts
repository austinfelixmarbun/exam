import { SharingModule } from 'app/shared/sharing.module';
import { NgModule } from '@angular/core';
import { ProspectVerifComponent} from './prospect-verif.component';
import { ProspectVerifRoutingModule } from './prospect-verif-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProspectVerifDetailComponent } from './prospect-verif-detail/prospect-verif-detail.component';


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
      ProspectVerifComponent,
      ProspectVerifDetailComponent
    ]
})
export class ProspectVerifModule { }
