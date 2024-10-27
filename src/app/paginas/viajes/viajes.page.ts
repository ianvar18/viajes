import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service'; // Servicio para obtener los viajes
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service'; // Importar StorageService para obtener el token

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  viajes: any[] = [];  // Array para almacenar los viajes obtenidos
  nuevoViaje: string = '';
  loaded: boolean = false;
  usuario: any = [];  // Usuario puede tener otros datos
  correo: string = '';  // El correo del usuario

  constructor(
    private router: Router,
    private viajeService: ViajeService, // Servicio para manejar los viajes
    private helper: HelperService, // Servicio de utilidades (alertas, loaders, etc.)
    private storage: StorageService // Servicio para manejar el almacenamiento local
  ) {}

  ngOnInit() {
    this.cargarViajes(); // Cargar los viajes al inicializar el componente
  }

  // Método para cargar los viajes desde el servicio
  async cargarViajes() {
    try {
      this.loaded = false;

      // Recuperar el token del almacenamiento
      const storageData = await this.storage.obtenerStorage();
      const token = storageData?.token;

      if (token) {
        // Llamar al servicio para obtener los viajes, pasando el token real
        const respuesta = await this.viajeService.obtenerViaje(token);
        if (respuesta && respuesta.data) {
          this.viajes = respuesta.data;  // Asignar los viajes obtenidos al array
        } else {
          this.helper.showAlert('No se encontraron viajes', 'Información');
        }
      } else {
        this.helper.showAlert('No se encontró token. Inicia sesión nuevamente.', 'Error');
        this.router.navigateByUrl('/login'); // Redirigir al login si no hay token
      }
      
      this.loaded = true; // Marcar que los datos han sido cargados
    } catch (error) {
      console.error('Error al cargar los viajes:', error);
      this.helper.showAlert('Error al cargar los viajes', 'Error');
      this.loaded = true;  // Para detener el loader en caso de error
    }
  }

  // Método para agregar un nuevo viaje manualmente
  agregarViaje() {
    if (this.nuevoViaje.trim().length > 0) {
      this.viajes.push({
        ubicacion_origen: this.nuevoViaje,
        ubicacion_destino: 'Destino predeterminado', // Ajusta según los datos que necesites
        patente: 'PAT123',
        color: 'Color predeterminado',
        marca: 'Marca predeterminada',
        modelo: 'Modelo predeterminado',
        imagen_vehiculo: 'ruta/de/imagen.png' // Ajusta con la imagen correcta
      });
      this.nuevoViaje = '';  // Limpiar el campo después de agregar
    } else {
      this.helper.showAlert('El campo de nuevo viaje está vacío', 'Advertencia');
    }
  }

  // Método para seleccionar un viaje
  seleccionarViaje(idUsuario: number) {
    console.log(`Viaje seleccionado: ${idUsuario}`);
    // Aquí puedes redirigir o mostrar detalles del viaje seleccionado
  }

  // Método para ir al inicio (login)
  irlogin() {
    this.router.navigateByUrl('/inicio');
  }
}