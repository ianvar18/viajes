import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restcontrasena',
  templateUrl: './restcontrasena.page.html',
  styleUrls: ['./restcontrasena.page.scss'],
})
export class RestcontrasenaPage implements OnInit {

  usuario:string = "";
  contrasena:string = "";
  confirmacioncontrasena:string = "";

  constructor(private router:Router) { }


  ngOnInit() {
  }


  restaurar(){
  
    if (this.usuario == "") {
      alert("Ingrese un usuario");
      return;
    }
    if (this.contrasena == "") {
      alert("Ingrese una contraseña");
      return;
    }
    if (this.contrasena != this.confirmacioncontrasena) {
      alert("Error en la confirmación")
      return;
    }
    else{
      alert("Ha cambiado su contraseña");
      this.router.navigateByUrl("/login");
    }
    
  }

  irlogin(){
    this.router.navigateByUrl("/login");
  }

}