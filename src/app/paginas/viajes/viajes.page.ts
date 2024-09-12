import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage {
  viajes: string[] = ['Rancagua', 'Ocean Drive']; 
  nuevoViaje: string = ''; 

  constructor(private router:Router) {}

  // Método para agregar un nuevo viaje
  agregarViaje() {
    if (this.nuevoViaje.trim().length > 0) {
      this.viajes.push(this.nuevoViaje); 
      this.nuevoViaje = ''; 
    }
  }

  irlogin(){
    this.router.navigateByUrl("/inicio");
  }
}


