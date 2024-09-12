import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
})
export class PerfilusuarioPage implements OnInit {

  nombre: string[] = ['Nombre: Rogelio Lopez'];
  correo: string[] = ['Correo: rogeliolopez@gmail.com'];
  telefono: string[] = ['Telefono: +569 34567843']
  miclasificacion: string[] = ['Mi Calificacion: 10/10 insano']

  constructor(private router:Router) { }

  ngOnInit() {
  }

  irlogin(){
    this.router.navigateByUrl("/inicio");
  }
}


