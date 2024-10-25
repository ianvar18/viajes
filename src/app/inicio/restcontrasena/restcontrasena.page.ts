import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restcontrasena',
  templateUrl: './restcontrasena.page.html',
  styleUrls: ['./restcontrasena.page.scss'],
})
export class RestcontrasenaPage {
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController
  ) {}

  async restaurar() {
    if (!this.email) {
      this.mostrarAlerta('Error', 'Por favor, ingrese su correo electrónico.');
      return;
    }

    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.mostrarAlerta('Éxito', 'Se ha enviado un correo electrónico para restablecer su contraseña.');
      this.irlogin();
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo enviar el correo electrónico de restablecimiento. Verifique su dirección de correo.');
    }
  }

  irlogin() {
    this.navCtrl.navigateBack('/login');
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
