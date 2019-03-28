import { OfficeAreaAddEditComponent } from './office-area/office-area-add-edit/office-area-add-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from './office.component';
import { OfficeAddComponent } from './office-add/office-add.component';
import { OfficeAreaPagingComponent } from './office-area/office-area-paging/office-area-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
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
