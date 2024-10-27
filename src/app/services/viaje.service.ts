import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http: HttpClient) { }

  // Método para obtener los viajes del usuario con async/await y lastValueFrom (GET)
  async obtenerViaje(parToken: string): Promise<any> {
    try {
      const params = {
        token: parToken
      };
      const response = await lastValueFrom(this.http.get<any>(`${environment.apiUrl}viaje/obtener`, { params }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Método para actualizar el estado del viaje (POST)
  async actualizarEstadoViaje(idViaje: number, estado: string, token: string): Promise<any> {
    try {
      const body = {
        id_viaje: idViaje,
        estado: estado,
        token: token
      };
      const response = await lastValueFrom(this.http.post<any>(`${environment.apiUrl}viaje/actualizar`, body));
      return response;
    } catch (error) {
      throw error;
    }
  }
}