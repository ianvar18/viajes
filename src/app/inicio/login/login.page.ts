import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, AnimationController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChildren(IonInput) inputs!: QueryList<IonInput>;

  credenciales = {
    correo: '',
    contrasena: ''
  };

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) {}

  async animateInput(ev: any) {
    const animation = this.animationCtrl
      .create()
      .addElement(ev.target)
      .duration(300)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.1)', opacity: '0.8' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

    await animation.play();
  }

  async login() {
    try {
      const resultado = await this.afAuth.signInWithEmailAndPassword(
        this.credenciales.correo,
        this.credenciales.contrasena
      );

      if (resultado.user) {
        console.log('Usuario logueado:', resultado.user.email);
        this.router.navigate(['/inicio']);
      }
    } catch (error: any) {
      console.error('Error en login:', error);
      await this.mostrarError(this.obtenerMensajeError(error.code));
    }
  }

  private obtenerMensajeError(codigo: string): string {
    switch (codigo) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido';
      case 'auth/user-disabled':
        return 'Usuario deshabilitado';
      default:
        return 'Error al iniciar sesión';
    }
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
