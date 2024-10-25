import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"vargasyanez-2024","appId":"1:486413180619:web:b9bbbf218d1405b0c5054e","storageBucket":"vargasyanez-2024.appspot.com","apiKey":"AIzaSyBlMq0oh1vjxsK9umDfeqtThAa6sS0zSNk","authDomain":"vargasyanez-2024.firebaseapp.com","messagingSenderId":"486413180619"})), provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
})
export class AppModule {}
