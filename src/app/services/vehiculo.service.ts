import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  // Método GET para obtener un vehículo
  async obtenerVehiculo(parToken: string) {
    try {
      const params = { token: parToken };
      const response = await lastValueFrom(this.http.get<any>(`${environment.apiUrl}vehiculo/obtener`, { params }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Método POST para agregar un vehículo
  async agregarVehiculo(datosVehiculo: any) {
    try {
      const response = await lastValueFrom(this.http.post<any>(`${environment.apiUrl}vehiculo/agregar`, datosVehiculo));
      return response;
    } catch (error) {
      throw error;
    }
  }
}