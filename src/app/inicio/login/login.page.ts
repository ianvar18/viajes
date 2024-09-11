import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string = "";
  contrasena:string = "";

  constructor(private router:Router) { }


  ngOnInit() {
  }


  login(){
  
    if (this.usuario == "") {
      alert("Ingrese un usuario");
      return;
    }
    if (this.contrasena == "") {
      alert("Ingrese una contraseña");
      return;
    }
    if (this.usuario == "admin" && this.contrasena == 'admin') {
      this.router.navigateByUrl("/inicio");
    }else{
      alert("Credenciales incorrectas.");
    }
    
  }
  restcontrasena(){
    this.router.navigateByUrl("/restcontrasena");
  }
}