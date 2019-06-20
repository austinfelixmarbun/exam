import { OfficeAreaAddEditComponent } from 'app/office/office-area/office-area-add-edit/office-area-add-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from 'app/office/office.component';
import { OfficeAddComponent } from 'app/office/office-add/office-add.component';
import { OfficeEmpPosComponent } from 'app/office/office-emp-pos/office-emp-pos.component';
import { OfficeEmpPosAddComponent } from 'app/office/office-emp-pos/office-emp-pos-add/office-emp-pos-add.component';
import { OfficeAreaPagingComponent } from 'app/office/office-area/office-area-paging/office-area-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paging',
        component: OfficeComponent,
        data: {
          title: 'Office'
        },
      },
      {
        path: 'add',
        component: OfficeAddComponent,
        data: {
          title: 'Add Office'
        }
      },
      {
        path: 'officeEmpPos',
        component: OfficeEmpPosComponent,
        data: {
          title: 'Office Employee Position'
        }
      },
      {
        path: 'officeEmpPosAdd',
        component: OfficeEmpPosAddComponent,
        data: {
          title: 'Office Employee Position Add'
        }
      },
      {
        path: 'officeArea',
        component: OfficeAreaPagingComponent,
        data: {
          title: 'Office Area'
        }
      },
      {
        path: 'officeArea/detail',
        component: OfficeAreaAddEditComponent,
        data: {
          title: 'Office Area Add Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule { }
