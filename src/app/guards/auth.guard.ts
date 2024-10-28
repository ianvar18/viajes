import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: StorageService) {}

  async canActivate(): Promise<boolean> {
    // Obtenemos los datos almacenados para verificar el token
    const token = await this.storage.obtenerStorage();
    
    if (token && token.length > 0 && token[0].token) {
      // Si el token existe, permitimos el acceso a la ruta
      return true;
    } else {
      // Si no hay token, redirigimos al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}