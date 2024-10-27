import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  contrasena: string = "";

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }


  ngOnInit() {
  }


  async login() {
    if (this.usuario == "") {
      alert("Ingrese un usuario");
      return;
    }
    if (this.contrasena == "") {
      alert("Ingrese una contraseña");
      return;
    }

    try {
      const resultado = await this.afAuth.signInWithEmailAndPassword(this.usuario, this.contrasena);
      const token = await resultado.user?.getIdToken();

      
      if (resultado.user) {
        this.router.navigateByUrl("/inicio");
      }
    } catch (error) {
      alert("Credenciales incorrectas.");
    }
  }
  
  async loginConFirebase() {
    if (this.usuario == "") {
      alert("Ingrese un usuario");
      return;
    }
    if (this.contrasena == "") {
      alert("Ingrese una contraseña");
      return;
    }

    try {
      const resultado = await this.afAuth.signInWithEmailAndPassword(this.usuario, this.contrasena);
      if (resultado.user) {
        console.log('Inicio de sesión exitoso');
        this.router.navigateByUrl("/inicio");
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert("Error en el inicio de sesión. Por favor, verifica tus credenciales.");
    }
  }

  recuperarContrasena() {
    this.router.navigateByUrl("/restcontrasena");
    console.log('Función de recuperación de contraseña llamada');
  }
}
