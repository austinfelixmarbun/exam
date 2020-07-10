import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Template1Component } from "./template/template1/template1.component";
import { Test1Component } from "./test1/test1.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'template1',
        component: Template1Component,
        data: {
          title: 'template 1'
        }
      },
      {
        path: 'test1',
        component: Test1Component,
        data: {
          title: 'test 1'
        }
      },
      {
        path: 'test-provider',
        loadChildren: './test-provider/testProvider.module#TestProviderModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule { }
