import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuSettingRoutingComponent } from 'app/menu/menu-setting-routing.component';
import { SharingModule } from 'app/shared/sharing.module';
import { MenuSettingComponent } from './menu-setting.component';
import { AddMenuSettingComponent } from './add/add-menu.component';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyAddComponent } from './currency/currency-add/currency-add.component';

@NgModule({
  imports: [
    MenuSettingRoutingComponent,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    MenuSettingComponent,
    AddMenuSettingComponent,
    CurrencyComponent,
    CurrencyAddComponent
  ]
})
export class MenuSettingModule { }
 