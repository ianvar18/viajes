import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  email: string = '';
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async registro() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.contrasena);
      if (userCredential.user) {
        await this.firestore.collection('usuarios').doc(userCredential.user.uid).set({
          nombre: this.nombre,
          email: this.email,
          usuario: this.usuario
        });
        console.log('Usuario registrado con éxito');
        this.navCtrl.navigateForward('/inicio');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }

  irlogin() {
    this.navCtrl.navigateBack('/login');
  }
}
