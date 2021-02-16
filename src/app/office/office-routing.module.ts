import { OfficeAreaAddEditComponent } from 'app/office/office-area/office-area-add-edit/office-area-add-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from 'app/office/office.component';
import { OfficeAddComponent } from 'app/office/office-add/office-add.component';
import { OfficeEmpPosComponent } from 'app/office/office-emp-pos/office-emp-pos.component';
import { OfficeEmpPosAddComponent } from 'app/office/office-emp-pos/office-emp-pos-add/office-emp-pos-add.component';
import { OfficeGroupMemberComponent } from './office-group-member/office-group-member.component';
import { OfficeGroupMemberAddComponent } from './office-group-member-add/office-group-member-add.component';
import { OfficeAreaPagingComponent } from './office-area/office-area-paging/office-area-paging.component';
import { OfficeAreaMemberPagingComponent } from './office-area/office-area-member/office-area-member-paging/office-area-member-paging.component';
import { OfficeAreaMemberAddComponent } from './office-area/office-area-member/office-area-member-add/office-area-member-add.component';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.PAGING,
        component: OfficeComponent,
        data: {
          title: 'Office'
        },
      },
      {
        path: PathConstant.ADD,
        component: OfficeAddComponent,
        data: {
          title: 'Add Office'
        }
      },
      {
        path: PathConstant.OFFICE_EMP_POS,
        component: OfficeEmpPosComponent,
        data: {
          title: 'Office Employee Position'
        }
      },
      {
        path: PathConstant.OFFICE_EMP_POS_ADD,
        component: OfficeEmpPosAddComponent,
        data: {
          title: 'Office Employee Position Add'
        }
      },
      {
        path: PathConstant.OFFICE_AREA,
        component: OfficeAreaPagingComponent,
        data: {
          title: 'Office Area'
        }
      },
      {
        path: PathConstant.OFFICE_GROUP_MEMBER,
        component: OfficeGroupMemberComponent,
        data: {
          title: 'Office Group Member'
        }
      },
      {
        path: PathConstant.OFFICE_GROUP_MEMBER_ADD,
        component: OfficeGroupMemberAddComponent,
        data: {
          title: 'Office Group Member Add'
        }
      },
      {
        path: PathConstant.OFFICE_AREA_DETAIL,
        component: OfficeAreaAddEditComponent,
        data: {
          title: 'Office Area Add Edit'
        }
      },
      {
        path: PathConstant.OFFICE_AREA_MEMBER,
        component: OfficeAreaMemberPagingComponent,
        data: {
          title: 'Office Area Member'
        }
      },
      {
        path: PathConstant.OFFICE_AREA_MEMBER_ADD,
        component: OfficeAreaMemberAddComponent,
        data: {
          title: 'Office Area Member Add'
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
