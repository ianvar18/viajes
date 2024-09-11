import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestcontrasenaPage } from './restcontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: RestcontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestcontrasenaPageRoutingModule {}
