// vehiculos.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit{
  vehiculos: string[] = ['Nissan GT-R', 'Ferrari Roma', 'Toyota Supra'];
  nuevoVehiculo: string = '';

  constructor(private router:Router) { }

  ngOnInit(){
    const vehiculosGuardados = localStorage.getItem('vehiculos');
  if (vehiculosGuardados) {
    this.vehiculos = JSON.parse(vehiculosGuardados);
  }
}

  agregarVehiculo() {
    if (this.nuevoVehiculo.trim() !== '') {
      this.vehiculos.push(this.nuevoVehiculo);
      this.nuevoVehiculo = '';
      localStorage.setItem('vehiculos', JSON.stringify(this.vehiculos));
    }
  }

  irlogin(){
    this.router.navigateByUrl("/inicio");
  }
}
