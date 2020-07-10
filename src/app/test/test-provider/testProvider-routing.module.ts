import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestProviderComponent } from "./test-provider.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'provider',
        component: TestProviderComponent,
        data: {
          title: 'Provider'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestProviderRoutingModule { }
