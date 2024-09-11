import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router:Router) { }


  ngOnInit() {
  }

  irvehiculos(){
    this.router.navigateByUrl("/vehiculos");
  }

  irviajes(){
    this.router.navigateByUrl("/viajes");
  }
  cerrarsesion() {
    this.router.navigateByUrl("/login");
  }
}