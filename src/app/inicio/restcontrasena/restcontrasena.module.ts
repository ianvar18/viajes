import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestcontrasenaPageRoutingModule } from './restcontrasena-routing.module';

import { RestcontrasenaPage } from './restcontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestcontrasenaPageRoutingModule
  ],
  declarations: [RestcontrasenaPage]
})
export class RestcontrasenaPageModule {}
