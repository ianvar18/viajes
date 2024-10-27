import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  usuario: string = '';
  contrasena: string = '';
  nombre: string = '';
  telefono: string = '';
  imagen: any;

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private usuarioService: UsuarioService
  ) {}

  async registro() {
    try {
      // Registrar usuario en Firebase
      const result = await this.afAuth.createUserWithEmailAndPassword(
        this.usuario,
        this.contrasena
      );
      console.log('Usuario registrado en Firebase:', result.user);
      
      const token = await result.user?.getIdToken();
      if (token) {
        // Llamada al servicio de usuarios para agregar a la base de datos
        const req = await this.usuarioService.agregarUsuario(
          {
            p_correo_electronico: this.usuario,
            p_nombre: this.nombre,
            p_telefono: this.telefono,
            token: token
          },
          this.imagen // Enviar imagen capturada como parte del usuario
        );
        console.log('Usuario agregado a la base de datos:', req);
      }

      this.mostrarAlerta('Éxito', 'Usuario registrado correctamente');
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      this.mostrarAlerta('Error', 'No se pudo registrar el usuario');
    }
  }

  // Método para capturar una foto del usuario
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    
    if (image.webPath) {
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.imagen = {
        fname: 'foto.' + image.format,
        src: image.webPath,
        file: blob
      };
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para navegar al login
  irlogin() {
    this.navCtrl.navigateForward('/login');
  }
}