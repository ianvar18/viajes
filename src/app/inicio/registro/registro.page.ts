import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario:string = "";
  contrasena:string = "";

  constructor(private router:Router) { }


  ngOnInit() {
  }


  registro(){
  
    if (this.usuario == "") {
      alert("Ingrese un usuario");
      return;
    }
    if (this.contrasena == "") {
      alert("Ingrese una contraseña");
      return;
    }
    else{
      alert("Registro exitoso");
      this.router.navigateByUrl("/login");
    }
    
  }

  irlogin(){
    this.router.navigateByUrl("/login");
  }

}