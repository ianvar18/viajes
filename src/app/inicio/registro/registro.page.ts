import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController
  ) {}

  async registro() {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        this.usuario,
        this.contrasena
      );
      console.log('Usuario registrado:', result.user);
      this.mostrarAlerta('Éxito', 'Usuario registrado correctamente');
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      this.mostrarAlerta('Error', 'No se pudo registrar el usuario');
    }
  }

  irlogin() {
    this.navCtrl.navigateForward('/login');
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
