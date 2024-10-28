import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { HelperService } from '../../services/helper.service';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { UserModel } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = "";  // Predefinido para pruebas, puedes cambiarlo a un campo vacío
  contrasena: string = "";  // Predefinido para pruebas
  token: string = "";  // Token obtenido tras el login
  usuario: UserModel[] = [];  // Almacena los datos del usuario obtenidos desde la API

  constructor(
    private router: Router,  // Inyección de Router para navegación
    private firebase: FirebaseService,  // Inyección de FirebaseService para autenticación
    private helper: HelperService,  // Inyección de HelperService para mostrar feedback visual
    private storage: StorageService,  // Inyección de StorageService para almacenar datos localmente
    private usuarioService: UsuarioService  // Inyección de UsuarioService para obtener datos del usuario
  ) { }

  ngOnInit() {
    // Inicializar cualquier cosa necesaria cuando el componente se cargue
  }

  async login() {
    // Validaciones de los campos de usuario y contraseña
    if (this.correo == "") {
      await this.helper.showAlert("Ingrese un correo", "Error de validación");
      return;
    }
   
    if (this.contrasena == "") {
      await this.helper.showAlert("Ingrese una contraseña", "Error de validación");
      return;
    }
  
    // Mostrar un loader mientras se realiza el login
    const loader = await this.helper.showLoader("Iniciando sesión...");
  
    try {
      // Llamada a FirebaseService para autenticarse
      const reqFirebase = await this.firebase.login(this.correo, this.contrasena);
      const token = await reqFirebase.user?.getIdToken();  // Obtener el token de Firebase
      
      if (token) {
        this.token = token;

        // Verificar los datos enviados a la API
        console.log('Correo enviado a la API:', this.correo);
        console.log('Token enviado a la API:', token);

        // Llamada a UsuarioService para obtener los datos del usuario desde la API
        const req = await this.usuarioService.obtenerUsuario({
          p_correo: this.correo,
          token: token
        });
  
        // Verificar la respuesta de la API
        if (req && req.data && req.data.length > 0) {
          this.usuario = req.data;
          console.log('Datos del usuario procesados:', this.usuario);
  
          // Guardar los datos del usuario en el Storage
          const jsonToken = [
            {
              token: this.token,
              usuario_id: this.usuario[0].id_usuario,
              usuario_correo: this.usuario[0].correo_electronico
            }
          ];
          await this.storage.agregarToken(jsonToken);
          console.log('Datos guardados en el Storage correctamente');
  
          // Mostrar un mensaje de éxito
          await this.helper.showToast("Login correcto");
          this.router.navigateByUrl("/inicio");
        } else {
          console.error("La API no devolvió datos del usuario.");
          await this.helper.showAlert("No se pudieron obtener los datos del usuario.", "Error");
        }
      }
  
    } catch (error: any) {  
      // Manejar el error si existe una respuesta desde Firebase o la API
      console.error("Error en el inicio de sesión:", error);
      
      let msg = "Ocurrió un error al iniciar sesión.";
      
      if (error.code == "auth/invalid-email") {
        msg = "Correo electrónico inválido.";
      } else if (error.code == "auth/wrong-password") {
        msg = "Contraseña incorrecta.";
      } else if (error.code == "auth/user-not-found") {
        msg = "Usuario no encontrado.";
      }
      
      await this.helper.showAlert(msg, "Error");
    } finally {
      loader.dismiss();
    }
  }

  recuperarContrasena() {
    // Redirige a la página de recuperación de contraseña
    this.router.navigateByUrl("/reset-password");
  }

  registro() {
    // Redirige a la página de registro
    this.router.navigateByUrl("/registro");
  }
}