import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuSettingRoutingComponent } from 'app/menu/menu-setting-routing.component';
import { MenuSettingComponent } from './menu-setting.component';
import { AddMenuSettingComponent } from './add/add-menu.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchComponent, UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UclookupgenericModule } from '@adins/uclookupgeneric';

@NgModule({
  imports: [
    MenuSettingRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UclookupgenericModule,
    UcgridfooterModule
  ],
  declarations: [
    MenuSettingComponent,
    AddMenuSettingComponent
  ]
})
export class MenuSettingModule { }
 