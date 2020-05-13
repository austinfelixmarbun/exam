import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Dummy1Component } from "./dummy1/dummy1.component";
import { Dummy2Component } from "./dummy2/dummy2.component";
import { Dummy3Component } from "./dummy3/dummy3.component";
import { DummyComponent } from "./dummy/dummy.component";
import { Dummy4Component } from "./dummy4/dummy4.component";
import { Dummy5Component } from "./dummy5/dummy5.component";
import { Dummy6Component } from "./dummy6/dummy6.component";
import { Dummy7Component } from "./dummy7/dummy7.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dummy',
        component: DummyComponent,
        data: {
          title: 'Dummy'
        }
      },
      {
        path: 'dummy1',
        component: Dummy1Component,
        data: {
          title: 'Dummy 1'
        }
      },
      {
        path: 'dummy2',
        component: Dummy2Component,
        data: {
          title: 'Dummy 2'
        }
      },
      {
        path: 'dummy3',
        component: Dummy3Component,
        data: {
          title: 'Dummy 3'
        }
      },
      {
        path: 'dummy4',
        component: Dummy4Component,
        data: {
          title: 'Dummy 4'
        }
      },
      {
        path: 'dummy5',
        component: Dummy5Component,
        data: {
          title: 'Dummy 5'
        }
      },
      {
        path: 'dummy6',
        component: Dummy6Component,
        data: {
          title: 'Dummy 6'
        }
      },
      {
        path: 'dummy7',
        component: Dummy7Component,
        data: {
          title: 'Dummy 7'
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
export class TestNewRoutingModule { }
