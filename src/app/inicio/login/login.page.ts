import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { HelperService } from '../../services/helper.service';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";  // Almacena el correo del usuario
  contrasena: string = "";  // Almacena la contraseña del usuario
  token: string = "";  // Token obtenido tras el login
  datosUsuario: any = [];  // Almacena los datos del usuario obtenidos desde la API

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
    if (!this.usuario) {
      await this.helper.showAlert("Ingrese un usuario", "Error de validación");
      return;
    }
    if (!this.contrasena) {
      await this.helper.showAlert("Ingrese una contraseña", "Error de validación");
      return;
    }

    // Mostrar un loader mientras se realiza el login
    const loader = await this.helper.showLoader("Iniciando sesión...");

    try {
      // Llamada a FirebaseService para autenticarse
      const resultado = await this.firebase.login(this.usuario, this.contrasena);
      console.log('Resultado de Firebase login:', resultado);

      if (resultado && resultado.user) {
        const token = await resultado.user.getIdToken();  // Obtener el token de Firebase
        console.log('Token obtenido:', token);
        
        this.token = token;

        // Llamada a UsuarioService para obtener los datos del usuario desde la API
        const req = await this.usuarioService.obtenerUsuario({
          p_correo: this.usuario,
          token: token
        });

        if (req && req.data) {
          this.datosUsuario = req.data;
          console.log('Datos del usuario procesados:', this.datosUsuario);

          // Guardar el token y los datos del usuario en el Storage
          const jsonToken = {
            token: this.token,
            usuario_id: this.datosUsuario[0]?.id_usuario,
            usuario_correo: this.datosUsuario[0]?.correo_electronico
          };

          await this.storage.agregarToken(jsonToken);
          console.log('Datos guardados en el Storage correctamente');

          // Mostrar un mensaje de éxito
          await this.helper.showToast("Login correcto");
          console.log('Mensaje de éxito mostrado');

          // Redirigir a la página de inicio
          this.router.navigateByUrl("/inicio");
          console.log('Redirigiendo a la página de inicio');
        } else {
          console.error("Error al obtener datos de usuario");
          await this.helper.showAlert("No se pudieron obtener los datos del usuario.", "Error");
        }

      } else {
        console.error("Error en la autenticación de Firebase");
        await this.helper.showAlert("Credenciales incorrectas.", "Error");
      }

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      await this.helper.showAlert("Ocurrió un error durante el inicio de sesión. Por favor, intente nuevamente.", "Error");
    } finally {
      // Ocultar el loader una vez finalizado el login
      loader.dismiss();
    }
  }

  recuperarContrasena() {
    // Navegar a la página de recuperación de contraseña
    this.router.navigateByUrl("/restcontrasena");
  }

  registro() {
    // Navegar a la página de registro
    this.router.navigateByUrl("/registro");
  }

}